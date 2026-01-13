import { Menu } from './menu.model';

export const horizontalMenuItems = [
    //new Menu (1, 'NAV.HOME', '/', null, null, false, 0),  #'/properties',
    new Menu (20, 'NAV.PROPERTIES', null, null, null,true, 0),
      new Menu (21, 'Todos los inmuebles', '/propiedades', null, null, false, 20),
      new Menu (22, 'Subasta', '/subasta', null, null, false, 20),
      new Menu (23, 'Venta directa', '/venta-directa', null, null, false, 20),
      new Menu (24, 'Cesión de remate', '/cesion-de-remate', null, null, false, 20),
      new Menu (25, 'CESIÓN DE CRÉDITO', '/cesion-de-credito', null, null, false, 20),
      new Menu (40, 'NAV.SERVICES', null, null, null, true, 0),
      new Menu (41, 'Saneamiento jurídico', null, 'https://oportunalia.com/oportunidades-inmobiliarias/saneamiento-juridico/', null, false, 40),
      new Menu (41, 'Aseguramiento y adecuación', null, 'https://oportunalia.com/oportunidades-inmobiliarias/aseguramiento-y-adecuacion/', null, false, 40),
      new Menu (41, 'Servicio Integral', null, 'https://oportunalia.com/oportunidades-inmobiliarias/servicio-integral/', null, false, 40),
   /* new Menu (43, 'LOGIN', '/login', null, null, false, 40),
      new Menu (44, 'REGISTER', '/register', null, null, false, 40),
      new Menu (47, 'NAV.TERMS_CONDITIONS', '/terms-conditions', null, null, false, 40),
      new Menu (51, 'NAV.LEGAL_DISCLAIMER', '/legal-disclaimer', null, null, false, 40), */
    new Menu (60, 'NAV.ABOUT_US', null, null, null, true, 0),
      new Menu (61, 'NAV.ABOUT_US', null, 'https://oportunalia.com/oportunidades-inmobiliarias/conoce-mas/', null, false, 60),
      new Menu (62, 'NAV.HOW_TO_BUY', null, 'https://oportunalia.com/oportunidades-inmobiliarias/como-comprar/', null, false, 60),
      new Menu (63, 'Preguntas frecuentes', null, 'https://oportunalia.com/oportunidades-inmobiliarias/faq/', null, false, 60),
      new Menu (64, 'BLOG', null, 'https://oportunalia.com/oportunidades-inmobiliarias/', null, false, 60),
    new Menu (70, 'NAV.CONTACT', '/contacto', null, null, false, 0),
    new Menu (80, 'LOGIN', '/login', null, null, false, 0),
]

export const verticalMenuItems = [
    new Menu (20, 'NAV.PROPERTIES', null, null, null, true, 0),
    new Menu (21, 'Todos los inmuebles', '/propiedades', null, null, false, 20),
      new Menu (22, 'Subasta', '/subasta', null, null, false, 20),
      new Menu (23, 'Venta directa', '/venta-directa', null, null, false, 20),
      new Menu (24, 'Cesión de remate', '/cesion-de-remate', null, null, false, 20),
      new Menu (25, 'CESIÓN DE CRÉDITO', '/cesion-de-credito', null, null, false, 20),
      new Menu (40, 'NAV.SERVICES', null, null, null, true, 0),
      new Menu (41, 'Saneamiento jurídico', null, 'https://oportunalia.com/oportunidades-inmobiliarias/saneamiento-juridico/', null, false, 40),
      new Menu (41, 'Aseguramiento y adecuación', null, 'https://oportunalia.com/oportunidades-inmobiliarias/aseguramiento-y-adecuacion/', null, false, 40),
      new Menu (41, 'Servicio Integral', null, 'https://oportunalia.com/oportunidades-inmobiliarias/servicio-integral/', null, false, 40),
   /* new Menu (43, 'LOGIN', '/login', null, null, false, 40),
      new Menu (44, 'REGISTER', '/register', null, null, false, 40),
      new Menu (45, 'FAQs', '/faq', null, null, false, 40),
      new Menu (47, 'NAV.TERMS_CONDITIONS', '/terms-conditions', null, null, false, 40),
      new Menu (51, 'NAV.LEGAL_DISCLAIMER', '/legal-disclaimer', null, null, false, 40),
      new Menu (49, 'NAV.HOW_TO_BUY', '/como-comprar', null, null, false, 40), */
    new Menu (60, 'NAV.ABOUT_US', null, null, null, true, 0),
    new Menu (61, 'NAV.ABOUT_US', null, 'https://oportunalia.com/oportunidades-inmobiliarias/conoce-mas/', null, false, 60),
      new Menu (62, 'NAV.HOW_TO_BUY', null, 'https://oportunalia.com/oportunidades-inmobiliarias/como-comprar/', null, false, 60),
      new Menu (63, 'Preguntas frecuentes', null, 'https://oportunalia.com/oportunidades-inmobiliarias/faq/', null, false, 60),
      new Menu (64, 'BLOG', null, 'https://oportunalia.com/oportunidades-inmobiliarias/', null, false, 60),
    new Menu (70, 'NAV.CONTACT', '/contacto', null, null, false, 0),
    new Menu (80, 'LOGIN', '/login', null, null, false, 0),
    new Menu (80, 'REGISTER', '/register', null, null, false, 0)
]
