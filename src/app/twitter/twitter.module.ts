import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwitterRoutingModule } from './twitter-routing.module';
import { TwitterListComponent } from './twitter-list/twitter-list.component';

@NgModule({
  declarations: [TwitterListComponent],
  imports: [
    CommonModule,
    TwitterRoutingModule
  ]
})
export class TwitterModule { }
