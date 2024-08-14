import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NewsComponent } from './news/news.component';
import { RolesComponent } from './roles/roles.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthGuard } from './auth.guard';
import { ReqresComponent } from './reqres/reqres.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ChatComponent } from './chat/chat.component';
import { ChatLoginComponent } from './chat-login/chat-login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'carousel', component: CarouselComponent },
  { path: 'news', component: NewsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent},
  { path: 'chat-login', component: ChatLoginComponent},
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'admin-page', component: AdminPageComponent, canActivate: [AuthGuard] },
  { path: 'reqres', component: ReqresComponent},
  { path: 'file-upload', component: FileUploadComponent},
  { path: 'twitter', loadChildren: () => import('./twitter/twitter.module').then(m => m.TwitterModule)},
  { path: '**', redirectTo: 'twitter'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
