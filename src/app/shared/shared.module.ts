import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: []
})
export class SharedModule {
}
