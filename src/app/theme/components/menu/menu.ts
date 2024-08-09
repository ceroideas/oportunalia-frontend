import { Menu } from './menu.model';

export const horizontalMenuItems = [
    //new Menu (1, 'NAV.HOME', '/', null, null, false, 0),  #'/properties',
    new Menu (20, 'NAV.PROPERTIES', null, null, null,true, 0),
      new Menu (21, 'Todos los inmuebles', '/properties', null, null, false, 20),
      new Menu (22, 'Subasta', '/properties', null, null, false, 20),
      new Menu (23, 'Venta directa', '/properties', null, null, false, 20),
      new Menu (24, 'Cesión de remate', '/properties', null, null, false, 20),
    /* new Menu (40, 'NAV.SERVICES', null, null, null, true, 0),
      new Menu (43, 'LOGIN', '/login', null, null, false, 40),
      new Menu (44, 'REGISTER', '/register', null, null, false, 40),
      new Menu (47, 'NAV.TERMS_CONDITIONS', '/terms-conditions', null, null, false, 40),
      new Menu (51, 'NAV.LEGAL_DISCLAIMER', '/legal-disclaimer', null, null, false, 40), */
    new Menu (60, 'NAV.ABOUT_US', null, null, null, true, 0),
      new Menu (61, 'NAV.ABOUT_US', '/about', null, null, false, 60),
      new Menu (62, 'NAV.HOW_TO_BUY', '/how-to-buy', null, null, false, 60),
      new Menu (63, 'Preguntas frecuentes', '/faq', null, null, false, 60),
      new Menu (64, 'BLOG', '/blog', null, null, false, 60),
    new Menu (70, 'NAV.CONTACT', '/contact', null, null, false, 0),
    new Menu (80, 'LOGIN', '/login', null, null, false, 0),
]

export const verticalMenuItems = [
    new Menu (20, 'NAV.PROPERTIES', '/properties', null, null, true, 0),
    new Menu (21, 'Todos los inmuebles', '/properties', null, null, false, 20),
      new Menu (22, 'Subasta', '/properties', null, null, false, 20),
      new Menu (23, 'Venta directa', '/properties', null, null, false, 20),
      new Menu (24, 'Cesión de remate', '/properties', null, null, false, 20),
    /* new Menu (40, 'NAV.SERVICES', null, null, null, true, 0),
      new Menu (43, 'LOGIN', '/login', null, null, false, 40),
      new Menu (44, 'REGISTER', '/register', null, null, false, 40),
      new Menu (45, 'FAQs', '/faq', null, null, false, 40),
      new Menu (47, 'NAV.TERMS_CONDITIONS', '/terms-conditions', null, null, false, 40),
      new Menu (51, 'NAV.LEGAL_DISCLAIMER', '/legal-disclaimer', null, null, false, 40),
      new Menu (49, 'NAV.HOW_TO_BUY', '/how-to-buy', null, null, false, 40), */
    new Menu (60, 'NAV.ABOUT_US', '/about', null, null, true, 0),
    new Menu (61, 'NAV.ABOUT_US', '/about', null, null, false, 60),
      new Menu (62, 'NAV.HOW_TO_BUY', '/how-to-buy', null, null, false, 60),
      new Menu (63, 'Preguntas frecuentes', '/faq', null, null, false, 60),
      new Menu (64, 'BLOG', '/blog', null, null, false, 60),
    new Menu (70, 'NAV.CONTACT', '/contact', null, null, false, 0),
    new Menu (80, 'LOGIN', '/login', null, null, false, 0)
]
