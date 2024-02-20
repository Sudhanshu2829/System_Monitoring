import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,FontAwesomeModule,HttpClientModule,
  ],
  exports:[
    CommonModule,FontAwesomeModule,HttpClientModule,
  ]
})
export class SharedModule { }
