import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LockScreenComponent } from './pages/lock-screen/lock-screen.component';

export const routes: Routes = [
  {
      path: '',
      component: PagesComponent, children: [
          //{ path: '', redirectTo: '/landing', pathMatch: 'full' },
          { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
          { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
          { path: 'como-comprar', loadChildren: () => import('./pages/how-to-buy/how-to-buy.module').then(m => m.HowToBuyModule) },
          { path: 'contacto', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
          { path: 'propiedades', loadChildren: () => import('./pages/properties/properties.module').then(m => m.PropertiesModule) },
          { path: 'subasta', loadChildren: () => import('./pages/properties/properties.module').then(m => m.PropertiesModule) },
          { path: 'cesion-de-remate', loadChildren: () => import('./pages/properties/properties.module').then(m => m.PropertiesModule) },
          { path: 'venta-directa', loadChildren: () => import('./pages/properties/properties.module').then(m => m.PropertiesModule) },
          { path: 'agents', loadChildren: () => import('./pages/agents/agents.module').then(m => m.AgentsModule) },
          { path: 'compare', loadChildren: () => import('./pages/compare/compare.module').then(m => m.CompareModule) },
          { path: 'pricing', loadChildren: () => import('./pages/pricing/pricing.module').then(m => m.PricingModule) },
          { path: 'faq', loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule) },
          { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
          { path: 'password-reset', loadChildren: () => import('./pages/password-reset/password-reset.module').then(m => m.PasswordResetModule) },
          { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
          { path: 'terms-conditions', loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsModule) },
          { path: 'legal-disclaimer', loadChildren: () => import('./pages/legal-disclaimer/legal-disclaimer.module').then(m => m.LegalDisclaimerModule) },
          { path: 'privacy-policy', loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
          { path: 'quality-policy', loadChildren: () => import('./pages/quality-policy/quality-policy.module').then(m => m.QualityPolicyModule) },
          { path: 'modal-offers', loadChildren: () => import('./pages/modal-offers/modal-offers.module').then(m => m.ModalOffersModule) },
          { path: 'environmental-policy', loadChildren: () => import('./pages/environmental-policy/environmental-policy.module').then(m => m.EnvironmentalPolicyModule) },
          { path: 'cookie-policy', loadChildren: () => import('./pages/cookie-policy/cookie-policy.module').then(m => m.CookiePolicyModule) },
          { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) },
          { path: 'submit-property', loadChildren: () => import('./pages/submit-property/submit-property.module').then(m => m.SubmitPropertyModule) },
          { path: 'blog', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule) },          
          { path: 'interest', loadChildren: () => import('./pages/interest/interest.module').then(m => m.InterestModule) },

          { path: 'saneamiento-juridico', loadChildren: () => import('./pages/service1/service1.module').then(m => m.Service1Module) },
          { path: 'aseguramiento-y-adecuacion', loadChildren: () => import('./pages/service2/service2.module').then(m => m.Service2Module) },
          { path: 'servicio-integral', loadChildren: () => import('./pages/service3/service3.module').then(m => m.Service3Module) },

          // { path: 'timeline', loadChildren: () => import('./shared/timeline/timeline.module').then(m => m.TimelineModule) },

          // { path: 'interest', redirectTo: '/account/interests', pathMatch: 'full' },
          { path: 'cuenta-verificada/:token', loadChildren: () => import('./pages/verificar-cuenta/verificar-cuenta.module').then(m => m.VerificarCuentaModule) },
          { path: 'reestablecer-contra/:token', loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordModule) }
      ]
  },
  { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
  { path: 'lock-screen', component: LockScreenComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
    initialNavigation: 'enabledBlocking', // for one load page, without reload
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
