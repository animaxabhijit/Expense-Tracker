import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ActionReducer, MetaReducer, StoreModule} from "@ngrx/store";
import {localStorageSync} from "ngrx-store-localstorage";
import {SharedModule} from "./modules/shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EffectsModule} from "@ngrx/effects";


export function sessionStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [
      'expense-tracker.shared',
    ],
    rehydrate: true,
    storage: sessionStorage
  })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [sessionStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {metaReducers}),
    EffectsModule.forRoot([]),
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
