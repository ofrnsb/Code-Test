import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ProdListComponent } from './prod-list/prod-list.component';
import { AuthGuard } from 'src/services/AuthGuard.service';
import { UserListComponent } from './user-list/user-list.component';
import { CatListComponent } from './cat-list/cat-list.component';

const routes: Routes = [
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'us-list', component: ProdListComponent, canActivate: [AuthGuard] },
  { path: 'prod-list', component: UserListComponent },
  { path: 'cat-list', component: CatListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/admin-login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
