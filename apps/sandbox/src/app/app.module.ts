import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ErrorHandlersModule } from '@error-handlers/core';
import { SentryModule } from '@error-handlers/sentry';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ErrorHandlersModule.forRoot(),
    SentryModule.forRoot({ enabled: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
