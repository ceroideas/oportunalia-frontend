import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  public faqsGen = [
    {
      question: '¿Qué es Oportunalia?',
      status: 'Question about selling',
      answer: 'Somos una entidad especializada experta en la gestión de subastas, cesiones de remate y ventas de todo tipo en la que se contribuye a mejorar los procedimientos de venta ya que ofrecemos agilidad, publicidad, transparencia y acompañamiento durante todo el proceso.'
    },
    {
      question: '¿Qué tengo que hacer para registrarme?',
      status: 'Agents FAQs',
      answer: 'Tendrás que entrar en el “Área de Usuarios”, seleccionar “Registro” e incluir los datos que te pide. Una vez hecho esto, le das a Aceptar y te enviará un correo de validación.'
    },
    {
      question: '¿Tengo que subir a la web alguna documentación para registrarme?',
      status: 'Question about renting',
      answer: 'Para el registro no es necesario, pero si quieres participar en nuestros procesos, tendrás que entrar en tu cuenta (a través de Acceso Usuarios) y subir las dos caras de tu DNI/NIE.'
    },
    {
      question: 'Tengo problemas para registrarme. No me llega el correo de validación',
      status: 'Question about selling',
      answer: 'Mira en la carpeta de Spam de tu correo. Si no te ha llegado nada, por favor contacta con nosotros.'
    },
    {
      question: '¿Me puedo registrar de forma gratuita?',
      status: 'Question about renting',
      answer: 'Por supuesto, el registro en nuestra web no tiene coste.'
    },
    {
      question: '¿Puedo darme de baja?',
      status: 'Agents FAQs',
      answer: 'Podrás darte de baja cuando quieras enviando un correo a <a href=mailto"info@oportunalia.com">info@oportunalia.com</a>'
    },
    {
      question: '¿Puedo pujar en nombre de un tercero?',
      status: 'Question about selling',
      answer: 'Por supuesto. Para hacerlo, primero tendrás que darte de alta como usuario y después deberás subir a “Mis Representaciones” el documento que justifique que puedes pujar en nombre de un tercero'
    },
    {
      question: '¿Puedo hacer dos registros con el mismo correo electrónico?',
      status: 'Question about selling',
      answer: 'Lo lamentamos, pero no es posible. Cada correo electrónico se vincula a usuario.'
    },
    {
      question: '¿Tengo que hacer un depósito para pujar?',
      status: 'Question about selling',
      answer: 'No en todos los casos. Cuando sea necesario se indicará en la publicación y se detallará el importe del mismo.'
    },
    {
      question: '¿Dónde tengo que ingresar el depósito?',
      status: 'Question about selling',
      answer: 'Encontraras esta información en el apartado “Instrucciones depósito”.'
    },
    {
      question: '¿Cómo justifico que he hecho el depósito?',
      status: 'Question about selling',
      answer: 'Tienes que subir el justificante de la transferencia realizada. Para ello, encontrarás un cuadro en la publicación en el que pone “seleccionar archivo”. ¡Una vez que subas el justificante, nuestro equipo lo validará y ya podrás participar!.'
    },
    {
      question: '¿Estaré informado de la evolución del proceso?',
      status: 'Question about selling',
      answer: 'Por supuesto, en nuestra web se irá actualizando la información. Si quieres recibir correos electrónicos informándote del proceso debes marcar las opciones de “Gestionar notificaciones” en el apartado de” Mi cuenta”.'
    }
  ]

  public faqsEsp = [
    {
      question: '¿Qué significa el Precio mínimo?',
      status: 'Question about selling',
      answer: 'Cuando se indique en la publicación un precio mínimo no podrán realizarse pujas u ofertas por debajo de ese importe.'
    },
    {
      question: 'Si soy el mejor postor de la subasta/cesión de remate o venta directa, ¿cuáles son los pasos a seguir?',
      status: 'Agents FAQs',
      answer: 'No te preocupes, el equipo de Oportunalia contactará contigo y te irá guiando y acompañando en todo el proceso.Maecenas aliquet cursus tellus in imperdiet. Vivamus consequat ipsum augue, a vulputate eros porta eu. Sed consectetur turpis a arcu dapibus, sit amet elementum dui posuere. Ut sodales nisl nec rhoncus dignissim. Nunc maximus est sed nibh mattis fringilla. Donec vehicula interdum neque bibendum feugiat. Sed porttitor elementum vehicula. Phasellus fermentum leo erat, non fermentum ipsum elementum sed. '
    },
    {
      question: '¿Cómo funciona la Puja automática?',
      status: 'Question about renting',
      answer: 'Sólo está operativa en las subastas. Tendrás que incluir tu importe máximo de puja y la propia web irá realizando pujas, de acuerdo con los tramos, hasta tu importe máximo.'
    },
    {
      question: '¿A qué gastos tendré que hacer frente además del importe de la puja u oferta?',
      status: 'Question about selling',
      answer: 'Tendrás que hacerte cargo de los siguientes gastos: cuotas pendientes de comunidad de propietarios e Impuesto de Bienes Inmuebles si los hubiese (según ley), así como los gastos de inscripción registral y el correspondiente Impuesto de Transmisiones Patrimoniales. También deberá pagar nuestra comisión que se indicará en la web.'
    },
    {
      question: '¿Puedo visitar los inmuebles?',
      status: 'Question about renting',
      answer: 'El equipo de Oportunalia te indicará en cada caso concreto si la opción de visita está disponible.'
    },
    {
      question: '¿Puedo comprar con hipoteca?',
      status: 'Agents FAQs',
      answer: 'La respuesta es sí, pero en caso de los activos que están en subasta o cesión de remate, debes tener en cuenta que no se podrá acceder a ellos para tasar.'
    },
    {
      question: '¿En qué momento debo pagar la comisión de Oportunalia?',
      status: 'Question about selling',
      answer: 'El equipo de Oportunalia te hará llegar la correspondiente factura en la que se indicará el plazo para hacer efectivo el pago.'
    },
    {
      question: 'Si resulto el mejor postor, ¿puedo retirar mi puja/oferta?',
      status: 'Question about selling',
      answer: 'Puedes hacerlo enviando un correo a info@oportunalia.com y se te tendrá por desistido, pero debes tener en cuenta que desde Oportunalia nos reservamos el derecho de interponer las acciones legales oportunas, en los casos en que no se haya realizado el pago de nuestros honorarios'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
