import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademyService } from '../../../api/academy.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConstants } from '../../../global-constants';
import { environment } from '../../../../environments/environment';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-academy-purchase',
  templateUrl: './academy-purchase.component.html',
  styleUrls: ['./academy-purchase.component.scss']
})
export class AcademyPurchaseComponent implements OnInit, OnDestroy {

  public course: any = null;
  public loading = true;
  public processing = false;
  public courseId: number;
  public stripe: Stripe | null = null;
  public elements: StripeElements | null = null;
  public cardElement: StripeCardElement | null = null;
  public paymentIntent: any = null;
  public cardError: string | null = null;
  public SIMULATE_MODE = false; // Cambiar a false para usar Stripe real
  public stripeInitialized = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private academyService: AcademyService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Verificar autenticación
    if (!this.academyService.isAuthenticated()) {
      this.router.navigate(['/academy/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    this.route.params.subscribe(params => {
      this.courseId = params.id;
      this.loadCourse();
    });
  }

  ngOnDestroy(): void {
    if (this.cardElement) {
      this.cardElement.unmount();
    }
  }

  loadCourse(): void {
    this.loading = true;
    this.academyService.getCourse(this.courseId).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.course = response.response;
          
          // Construir URLs completas
          if (this.course.thumbnail_path) {
            this.course.thumbnail_url = this.getFileUrl(this.course.thumbnail_path);
          }
          
          // Verificar si ya tiene el curso
          if (this.course.is_purchased || this.course.has_access) {
            this.snackBar.open('✕ Ya tienes este curso comprado', '', { duration: 3000 });
            this.router.navigate(['/academy/course', this.courseId]);
            return;
          }

          // Si es gratis, redirigir
          if (this.course.is_free) {
            this.router.navigate(['/academy/course', this.courseId]);
            return;
          }

          // Crear payment intent (modo simulado o real)
          if (this.SIMULATE_MODE) {
            this.createPaymentIntent();
          } else {
            this.initializeStripe();
          }
        }
        this.loading = false;
      },
      (error: any) => {
        console.error('Error al cargar curso:', error);
        this.loading = false;
        this.snackBar.open('✕ Error al cargar el curso', '', { duration: 3000 });
        this.router.navigate(['/academy']);
      }
    );
  }

  getFileUrl(path: string): string {
    if (!path) return '';
    return `${GlobalConstants.apiBase}${path}`;
  }

  async initializeStripe(): Promise<void> {
    try {
      // Cargar Stripe con la clave pública
      this.stripe = await loadStripe(environment.stripe.publicKey);
      
      if (!this.stripe) {
        this.snackBar.open('✕ Error al cargar Stripe', '', { duration: 3000 });
        return;
      }

      // Crear payment intent primero y esperar a que termine
      await this.createPaymentIntent();
      
      // Una vez creado el payment intent, configurar los elementos
      // Usar setTimeout para asegurar que el DOM esté listo
      setTimeout(() => {
        if (this.paymentIntent && this.stripe && this.paymentIntent.client_secret) {
          console.log('Inicializando elementos de Stripe con client_secret:', this.paymentIntent.client_secret);
          this.elements = this.stripe.elements({
            clientSecret: this.paymentIntent.client_secret
          });
          
          // Esperar un poco más para asegurar que el DOM esté completamente renderizado
          setTimeout(() => {
            this.setupCardElement();
            this.stripeInitialized = true;
            this.cdr.detectChanges(); // Forzar detección de cambios
          }, 300);
        } else {
          console.error('No se pudo inicializar elementos de Stripe. PaymentIntent:', this.paymentIntent);
          this.snackBar.open('✕ Error al configurar el formulario de pago', '', { duration: 3000 });
        }
      }, 100);
    } catch (error) {
      console.error('Error al inicializar Stripe:', error);
      this.snackBar.open('✕ Error al inicializar Stripe', '', { duration: 3000 });
    }
  }

  setupCardElement(): void {
    if (!this.elements) {
      console.error('Elements no está inicializado');
      return;
    }

    // Verificar que el contenedor existe en el DOM
    const cardElementContainer = document.getElementById('card-element');
    if (!cardElementContainer) {
      console.error('Contenedor #card-element no encontrado en el DOM');
      // Reintentar después de un breve delay
      setTimeout(() => this.setupCardElement(), 200);
      return;
    }

    // Limpiar elemento anterior si existe
    if (this.cardElement) {
      try {
        this.cardElement.unmount();
      } catch (e) {
        console.warn('Error al desmontar elemento anterior:', e);
      }
    }

    // Crear elemento de tarjeta de Stripe
    this.cardElement = this.elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    });

    // Montar el elemento
    this.cardElement.mount('#card-element');

    // Escuchar errores de la tarjeta
    this.cardElement.on('change', (event: any) => {
      if (event.error) {
        this.cardError = event.error.message;
      } else {
        this.cardError = null;
      }
    });

    console.log('Elemento de tarjeta montado correctamente');
  }

  createPaymentIntent(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.SIMULATE_MODE) {
        // En modo simulado, creamos un payment intent simulado
        this.paymentIntent = {
          client_secret: 'pi_simulated_' + Date.now() + '_secret',
          payment_intent_id: 'pi_simulated_' + Date.now(),
          amount: this.course.price * 100,
          currency: 'EUR',
        };
        resolve();
        return;
      }

      // Modo real: llamar al backend
      this.processing = true;
      this.academyService.createPaymentIntent(this.courseId).subscribe(
        (response: any) => {
          if (response.code === 200 && response.response) {
            this.paymentIntent = response.response;
            console.log('PaymentIntent creado:', this.paymentIntent);
            this.processing = false;
            resolve();
          } else {
            const errorMsg = response.messages?.join(', ') || 'Error al crear el pago';
            this.snackBar.open('✕ ' + errorMsg, '', { duration: 3000 });
            this.processing = false;
            reject(new Error(errorMsg));
          }
        },
        (error: any) => {
          console.error('Error al crear PaymentIntent:', error);
          const errorMessage = error.error?.messages?.join(', ') || error.error?.message || 'Error al crear el pago';
          this.snackBar.open('✕ ' + errorMessage, '', { duration: 3000 });
          this.processing = false;
          reject(error);
        }
      );
    });
  }

  simulatePayment(): void {
    if (!confirm('¿Simular pago de ' + this.course.price + ' € por el curso "' + this.course.title + '"?')) {
      return;
    }

    // Verificar que el token existe
    const token = this.academyService.getToken();
    if (!token) {
      this.snackBar.open('✕ No estás autenticado. Por favor, inicia sesión nuevamente.', '', { duration: 3000 });
      this.router.navigate(['/academy/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    console.log('Token encontrado:', token ? 'Sí (longitud: ' + token.length + ')' : 'No');
    this.processing = true;
    this.academyService.simulatePayment(this.courseId).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.snackBar.open('✓ Pago simulado exitosamente', '', { duration: 3000 });
          // Redirigir al curso y recargar para actualizar el estado
          setTimeout(() => {
            this.router.navigate(['/academy/course', this.courseId]).then(() => {
              window.location.reload();
            });
          }, 1500);
        } else {
          this.snackBar.open('✕ ' + (response.messages?.join(', ') || 'Error al simular pago'), '', { duration: 3000 });
          this.processing = false;
        }
      },
      (error: any) => {
        console.error('Error al simular pago:', error);
        const errorMessage = error.error?.messages?.join(', ') || error.error?.message || 'Error al simular pago';
        this.snackBar.open('✕ ' + errorMessage, '', { duration: 3000 });
        this.processing = false;
      }
    );
  }

  async confirmPayment(): Promise<void> {
    if (!this.paymentIntent) {
      this.snackBar.open('✕ No hay payment intent creado', '', { duration: 3000 });
      return;
    }

    if (this.SIMULATE_MODE) {
      // En modo simulado, usar el método de simulación
      this.simulatePayment();
      return;
    }

    if (!this.stripe || !this.cardElement) {
      this.snackBar.open('✕ Stripe no está inicializado', '', { duration: 3000 });
      return;
    }

    this.processing = true;
    this.cardError = null;

    try {
      // Confirmar el pago con Stripe
      const { error, paymentIntent: confirmedPaymentIntent } = await this.stripe.confirmCardPayment(
        this.paymentIntent.client_secret,
        {
          payment_method: {
            card: this.cardElement,
          }
        }
      );

      if (error) {
        this.cardError = error.message;
        this.snackBar.open('✕ ' + error.message, '', { duration: 3000 });
        this.processing = false;
      } else if (confirmedPaymentIntent && confirmedPaymentIntent.status === 'succeeded') {
        // Confirmar en el backend
        this.confirmPaymentOnBackend(confirmedPaymentIntent.id);
      }
    } catch (error: any) {
      console.error('Error al confirmar pago:', error);
      this.snackBar.open('✕ Error al procesar el pago', '', { duration: 3000 });
      this.processing = false;
    }
  }

  confirmPaymentOnBackend(paymentIntentId: string): void {
    this.academyService.confirmPayment(this.courseId, paymentIntentId).subscribe(
      (response: any) => {
        if (response.code === 200) {
          this.snackBar.open('✓ Pago realizado exitosamente', '', { duration: 3000 });
          // Redirigir al curso y recargar para actualizar el estado
          setTimeout(() => {
            this.router.navigate(['/academy/course', this.courseId]).then(() => {
              window.location.reload();
            });
          }, 1500);
        } else {
          this.snackBar.open('✕ ' + (response.messages?.join(', ') || 'Error al confirmar el pago'), '', { duration: 3000 });
          this.processing = false;
        }
      },
      (error: any) => {
        console.error('Error al confirmar pago en backend:', error);
        const errorMessage = error.error?.messages?.join(', ') || error.error?.message || 'Error al confirmar el pago';
        this.snackBar.open('✕ ' + errorMessage, '', { duration: 3000 });
        this.processing = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/academy/course', this.courseId]);
  }
}

