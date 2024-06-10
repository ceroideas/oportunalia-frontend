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
          { path: 'how-to-buy', loadChildren: () => import('./pages/how-to-buy/how-to-buy.module').then(m => m.HowToBuyModule) },
          { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
          { path: 'properties', loadChildren: () => import('./pages/properties/properties.module').then(m => m.PropertiesModule) },
          { path: 'agents', loadChildren: () => import('./pages/agents/agents.module').then(m => m.AgentsModule) },
          { path: 'compare', loadChildren: () => import('./pages/compare/compare.module').then(m => m.CompareModule) },
          { path: 'pricing', loadChildren: () => import('./pages/pricing/pricing.module').then(m => m.PricingModule) },
          { path: 'faq', loadChildren: () => import('./pages/faq/faq.module').then(m => m.FaqModule) },
          { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
          { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
          { path: 'terms-conditions', loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsModule) },
          { path: 'legal-disclaimer', loadChildren: () => import('./pages/legal-disclaimer/legal-disclaimer.module').then(m => m.LegalDisclaimerModule) },
          { path: 'privacy-policy', loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
          { path: 'cookie-policy', loadChildren: () => import('./pages/cookie-policy/cookie-policy.module').then(m => m.CookiePolicyModule) },
          { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule) },
          { path: 'submit-property', loadChildren: () => import('./pages/submit-property/submit-property.module').then(m => m.SubmitPropertyModule) },
          { path: 'blog', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule) }
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
