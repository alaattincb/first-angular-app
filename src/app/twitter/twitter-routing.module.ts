import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwitterListComponent } from './twitter-list/twitter-list.component';

const routes: Routes = [
  {
    path: '',
    component: TwitterListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwitterRoutingModule { }
