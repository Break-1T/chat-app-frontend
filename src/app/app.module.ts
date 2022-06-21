import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatWindowComponent } from './pages/chat_window/chat_window.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ErrorComponent } from './pages/error/error.component';
import { AuthorizeGuardService } from './services/AuthorizeGuard.service';
import { HeaderNavComponent } from './Components/header-nav/header-nav.component';
import { UserSettingComponent } from './pages/user-setting/user-setting.component';
import { GroupComponent } from './Components/group/group.component';
import { ChatComponent } from './Components/chat/chat.component';
import { ChatMessageComponent } from './Components/chat-message/chat-message.component';

const appRoutes: Routes =
[
  {path: '', redirectTo: 'login', pathMatch:"full"},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: AuthorizationComponent},
  {path: 'chat', component: ChatWindowComponent, canActivate: [AuthorizeGuardService]},
  {path: 'settings', component: UserSettingComponent, canActivate: [AuthorizeGuardService]},
  {path: 'error', component: ErrorComponent},

  // {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ChatWindowComponent,
    AuthorizationComponent,
    SignUpComponent,
    ErrorComponent,
    HeaderNavComponent,
    UserSettingComponent,
    GroupComponent,
    ChatComponent,
    ChatMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers:
  [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService
  ],
bootstrap: [AppComponent]
})
export class AppModule { }
