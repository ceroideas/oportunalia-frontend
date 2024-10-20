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
      answer: 'Oportunalia es una plataforma que nace con el objetivo de democratizar las inversiones en inmuebles procedentes de ejecuciones hipotecarias y concursos de acreedores. Oportunalia ha sido capaz de revolucionar este sector, identificando un nicho de mercado poco desarrollado y de acercar este tipo de inmuebles tanto a grandes inversores como a particulares, convirtiéndose así en una plataforma líder. Además, Oportunalia te ofrecemos la posibilidad de acompañarte en tu inversión desde el inicio hasta el final, ofreciéndote apoyo jurídico y seguridad en todo momento.'
    },
    {
      question: '¿Qué tengo que hacer para registrarme?',
      status: 'Agents FAQs',
      answer: 'Deberás acceder al \'Área de Usuarios\', seleccionar \'Regístrate\' e ingresar los datos solicitados por la web. Antes de completar el registro, la plataforma te permitirá filtrar tus preferencias para enviarte notificaciones futuras.',
    },
    {
      question: '¿Tengo que subir a la web alguna documentación para registrarme?',
      status: 'Question about renting',
      answer: 'El registro no lo requiere, pero si deseas participar en alguna subasta, venta directa o cesión de remate, deberás acceder a tu cuenta a través del Área de Usuarios y subir ambas caras de tu DNI/NIE.'
    },
    {
      question: 'Tengo problemas para registrarme. No me llega el correo de validación',
      status: 'Question about selling',
      answer: 'Revisa en la carpeta de Spam de tu correo. Si no te ha llegado nada, por favor contacta con nosotros.'
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
      answer: 'Sí. Para hacerlo, primero deberás registrarte como usuario y luego subir a \'Mis Representaciones\' el documento que lo acredite.'
    },
    {
      question: '¿Puedo hacer dos registros con el mismo correo electrónico?',
      status: 'Question about selling',
      answer: 'Lo lamentamos, pero no es posible. Cada correo electrónico se vincula a usuario.'
    },
    {
      question: '¿Tengo que hacer un depósito para pujar?',
      status: 'Question about selling',
      answer: 'No en todos los casos. Cuando sea necesario, se indicará en la publicación y se detallará el importe correspondiente.'
    },
    {
      question: '¿Dónde tengo que ingresar el depósito?',
      status: 'Question about selling',
      answer: 'Encontraras esta información en el apartado “Instrucciones depósito”.'
    },
    {
      question: '¿Cómo justifico que he hecho el depósito?',
      status: 'Question about selling',
      answer: 'Debes subir el comprobante de la transferencia realizada. Para hacerlo, encontrarás un cuadro en la publicación que indica "Seleccionar archivo". Una vez que subas el comprobante, nuestro equipo lo validará y podrás participar.'
    },
    {
      question: '¿Estaré informado de la evolución del proceso?',
      status: 'Question about selling',
      answer: 'Por supuesto, la información se irá actualizando en nuestra web. Si deseas recibir correos electrónicos sobre el proceso, debes marcar las opciones de "Gestionar notificaciones" en el apartado de "Mi cuenta".'
    }
  ]

  public faqsEsp = [
    {
      question: '¿Cuál es la diferencia entre subasta, cesión de remate y venta directa?',
      status: 'Question about selling',
      answer: `Una <b>subasta</b> es un proceso de venta en el que se ofrece un bien inmueble (como una casa, apartamento, terreno o local comercial) al mejor postor. Las pujas se realizan a través de la web, y puedes hacer tantas ofertas como desees mientras la subasta esté activa. Cada subasta se regirá por sus propias reglas, que podrás consultar en las Condiciones Particulares disponibles en la pestaña de "Condiciones Específicas".
      <br><br>
      La <b>venta directa</b> es un proceso en el que se realiza una oferta a través de la web. Es confidencial, de modo que la web te mostrará el número de ofertas recibidas, pero nunca el importe. Una vez que finalice el proceso, se contactará al usuario que haya realizado la oferta más alta.
      <br><br>
      En el proceso de <b>cesión de remate</b>, Oportunalia ofrece activos que ya han sido subastados y en los que el adjudicatario cede su derecho de adjudicación a un tercero.`
    },
    {
      question: '¿Qué significa el Precio mínimo?',
      status: 'Question about selling',
      answer: 'Cuando se indique en la publicación un precio mínimo no podrán realizarse pujas u ofertas por debajo de ese importe.'
    },
    {
      question: 'Si soy el mejor postor de la subasta/cesión de remate o venta directa, ¿cuáles son los pasos a seguir?',
      status: 'Agents FAQs',
      answer: 'No te preocupes, el equipo de Oportunalia contactará contigo y te guiará y acompañará en todo el proceso. Nunca estarás solo en este camino; el equipo de Oportunalia, compuesto por abogados especializados en la materia, te acompañará y guiará desde el inicio de la inversión hasta el final.'
    },
    {
      question: '¿Cómo funciona la Puja automática?',
      status: 'Question about renting',
      answer: 'Solo está operativa en las subastas. Tendrás que incluir tu importe máximo de puja, y la propia web irá realizando pujas de acuerdo con los tramos, hasta alcanzar tu importe máximo.'
    },
    {
      question: '¿A qué gastos tendré que hacer frente además del importe de la puja u oferta?',
      status: 'Question about selling',
      answer: 'Tendrás que hacerte cargo de los siguientes gastos: cuotas pendientes de la comunidad de propietarios e Impuesto sobre Bienes Inmuebles, si los hubiera (según la ley), así como los gastos de inscripción registral y el correspondiente Impuesto sobre Transmisiones Patrimoniales. También deberás pagar nuestra comisión, que se indicará en la web.'
    },
    {
      question: '¿Puedo visitar los inmuebles?',
      status: 'Question about renting',
      answer: 'El equipo de Oportunalia te indicará en cada si la opción de visita está disponible. Si lo desea, previo encargo, nuestro equipo puede realizar un informe de situación ocupacional del inmueble, facilitando fotografías y demás información del inmueble.'
    },
    {
      question: '¿Puedo comprar con hipoteca?',
      status: 'Agents FAQs',
      answer: 'La respuesta es sí, pero en el caso de los activos que están en subasta o cesión de remate, debes tener en cuenta que no se podrá acceder a ellos para tasar.Se podría recurrir a financiación alternativa (préstamo puente) y una vez tengamos la posesión del activo hipotecarlo.'
    },
    {
      question: '¿En qué momento debo pagar la comisión de Oportunalia?',
      status: 'Question about selling',
      answer: 'El equipo de Oportunalia te enviará la factura correspondiente, en la que se indicará el plazo para hacer efectivo el pago.'
    },
    {
      question: 'Si resulto el mejor postor, ¿puedo retirar mi puja/oferta?',
      status: 'Question about selling',
      answer: 'Puedes hacerlo enviando un correo a <a href=mailto"info@oportunalia.com">info@oportunalia.com</a>, y se te considerará desistido. Sin embargo, debes tener en cuenta que desde Oportunalia nos reservamos el derecho de interponer las acciones legales pertinentes en los casos en que no se haya realizado el pago de nuestros honorarios.'
    },
    {
      question: '¿Qué documentación es necesaria para cumplir con los requisitos de Prevención de Blanqueo de Capitales y Financiación del Terrorismo?',
      status: 'Question about selling',
      answer:  `

      Tendrás que aportar como mínimo la siguiente documentación: <br><br>
      <ul>
        <li>DNI/NIE/CIF</li>
        <li>Origen de los fondos (fondos propios, hipoteca, etc.)</li>
        <li>Extracto bancario (60 días)</li>
        <li>Nómina o IRPF</li>
        <li>Vida laboral</li>
        <li>Certificado empadronamiento</li>
        <li>Escritura constitución y nombramiento administrador (sólo empresas)</li>
        <li>Impuesto sociedades</li>
        <li>IVA</li>
      <ul>

      `
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
