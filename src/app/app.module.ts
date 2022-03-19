import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SingleDishComponent } from './shared/single-dish/single-dish.component';
import { RegisterComponent } from './pages/register/register.component';
import { ModalComponent } from './shared/modal/modal.component';
import { CategoryComponent } from './pages/menu/category/category.component';
import { MenuModule } from './pages/menu/menu.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BasketModule } from './pages/basket/basket.module';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { categoryReducer } from './store/category/category.reducer';
import { dishReducer } from './store/dish/dish.reducer';
import { CategoriesEffects } from './store/category/category.effects';
import { DishesEffects } from './store/dish/dish.effects';
import { AdminModule } from './pages/admin/admin.module';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
   
 
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule,
    AdminModule,
    ReactiveFormsModule,
    BasketModule,
    StoreModule.forRoot({auth:authReducer,category:categoryReducer,dish:dishReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects,CategoriesEffects,DishesEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
