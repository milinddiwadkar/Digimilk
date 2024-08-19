import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';  // Import the component


const routes: Routes = [
  {path: 'login',loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule) },
  { path: 'roles-permissions', loadChildren: () => import('./pages/roles-permissions/roles-permissions.module').then(m => m.RolesPermissionsPageModule) },
  { path: 'users/add-users', loadChildren: () => import('./pages/users/add-users/add-users.module').then(m => m.AddUsersPageModule) },
  { path: 'users/users', loadChildren: () => import('./pages/users/users/users.module').then(m => m.UsersPageModule) },
  { path: 'masters/pro-type', loadChildren: () => import('./pages/masters/pro-type/pro-type.module').then(m => m.ProTypePageModule) },
  { path: 'masters/shift', loadChildren: () => import('./pages/masters/shift/shift.module').then(m => m.ShiftPageModule) },
  { path: 'masters/rate-chart', loadChildren: () => import('./pages/masters/rate-chart/rate-chart.module').then(m => m.RateChartPageModule) },
  { path: 'masters/farmer-loan-detail', loadChildren: () => import('./pages/masters/farmer-loan-detail/farmer-loan-detail.module').then(m => m.FarmerLoanDetailPageModule) },
  { path: 'masters/farmer-rd-details', loadChildren: () => import('./pages/masters/farmer-rd-details/farmer-rd-details.module').then(m => m.FarmerRdDetailsPageModule) },
  { path: 'masters/route-master', loadChildren: () => import('./pages/masters/route-master/route-master.module').then(m => m.RouteMasterPageModule) },
  { path: 'masters/set-min-snf-fat', loadChildren: () => import('./pages/masters/set-min-snf-fat/set-min-snf-fat.module').then(m => m.SetMinSnfFatPageModule) },
  { path: 'masters/settle-pay', loadChildren: () => import('./pages/masters/settle-pay/settle-pay.module').then(m => m.SettlePayPageModule) },
  { path: 'masters/manage-week', loadChildren: () => import('./pages/masters/manage-week/manage-week.module').then(m => m.ManageWeekPageModule) },
  { path: 'milk-collection', loadChildren: () => import('./pages/milk-collection/milk-collection.module').then(m => m.MilkCollectionPageModule) },
  { path: 'queries', loadChildren: () => import('./pages/queries/queries.module').then(m => m.QueriesPageModule) },
  { path: 'society-milk-collection', loadChildren: () => import('./pages/society-milk-collection/society-milk-collection.module').then(m => m.SocietyMilkCollectionPageModule) },
  { path: 'farmer-demand/pro-demand', loadChildren: () => import('./pages/farmer-demand/pro-demand/pro-demand.module').then(m => m.ProDemandPageModule) },
  { path: 'farmer-demand/dr-demand', loadChildren: () => import('./pages/farmer-demand/dr-demand/dr-demand.module').then(m => m.DrDemandPageModule) },
  { path: 'payments', loadChildren: () => import('./pages/payments/payments.module').then(m => m.PaymentsPageModule) },
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsPageModule) },
  { path: 'society-sales', loadChildren: () => import('./pages/society-sales/society-sales.module').then(m => m.SocietySalesPageModule) },
  { path: 'reports/union', loadChildren: () => import('./pages/reports/union/union.module').then(m => m.UnionPageModule) },
  { path: 'reports/supervisor-master', loadChildren: () => import('./pages/reports/supervisor-master/supervisor-master.module').then(m => m.SupervisorMasterPageModule) },
  { path: 'reports/society-samiti', loadChildren: () => import('./pages/reports/society-samiti/society-samiti.module').then(m => m.SocietySamitiPageModule) },
  { path: 'reports/demands', loadChildren: () => import('./pages/reports/demands/demands.module').then(m => m.DemandsPageModule) },
  { path: 'reports/society-sales', loadChildren: () => import('./pages/reports/society-sales/society-sales.module').then(m => m.SocietySalesPageModule) },
  { path: 'reports/society-milk-coll', loadChildren: () => import('./pages/reports/society-milk-coll/society-milk-coll.module').then(m => m.SocietyMilkCollPageModule) },
  { path: 'reports/queries', loadChildren: () => import('./pages/reports/queries/queries.module').then(m => m.QueriesPageModule) },
  { path: 'reports/qual-quan-check', loadChildren: () => import('./pages/reports/qual-quan-check/qual-quan-check.module').then(m => m.QualQuanCheckPageModule) },
  { path: 'reports/products', loadChildren: () => import('./pages/reports/products/products.module').then(m => m.ProductsPageModule) },
  { path: 'reports/payments', loadChildren: () => import('./pages/reports/payments/payments.module').then(m => m.PaymentsPageModule) },
  { path: 'reports/milk-coll', loadChildren: () => import('./pages/reports/milk-coll/milk-coll.module').then(m => m.MilkCollPageModule) },
  { path: 'reports/farmers', loadChildren: () => import('./pages/reports/farmers/farmers.module').then(m => m.FarmersPageModule) },
  { path: 'society-demands', loadChildren: () => import('./pages/society-demands/society-demands.module').then(m => m.SocietyDemandsPageModule) },
  { path: 'broadcast-message/screen-msg', loadChildren: () => import('./pages/broadcast-message/screen-msg/screen-msg.module').then(m => m.ScreenMsgPageModule) },
  { path: 'broadcast-message/farmer-screen-msg', loadChildren: () => import('./pages/broadcast-message/farmer-screen-msg/farmer-screen-msg.module').then(m => m.FarmerScreenMsgPageModule) },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)},
  {
    path: 'milk-types',
    loadChildren: () => import('./pages/masters/milk-types/milk-types.module').then( m => m.MilkTypesPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/masters/product/product.module').then( m => m.ProductPageModule)
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
