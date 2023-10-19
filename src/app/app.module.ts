import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// eager laoded components
import { HomeComponent } from './home/components/home/home.component';
// init token service 
import { AppInitService } from './init';
import { MaterialModule } from './modules/material/material-module';
// interceptors
import { ChatbotInterceptor } from './home/interceptors/chatbot.interceptor';

export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => { 
    return appInitService.Init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    AppInitService,
    { provide: APP_INITIALIZER,useFactory: initializeApp, 
      deps: [AppInitService], 
      multi: true},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ChatbotInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
