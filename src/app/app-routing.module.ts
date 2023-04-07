import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowContentComponent } from './show-content/show-content.component';

const routes: Routes = [{ path: "", component: ShowContentComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
