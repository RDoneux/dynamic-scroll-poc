import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { SectionComponent } from './components/section/section.component';
import { SectionFooterComponent } from './components/section-footer/section-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionTitleComponent,
    SectionComponent,
    SectionFooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
