import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { IconComponent } from './icon/icon.component';
import { MatChipsModule } from '@angular/material/chips';
import { ChipComponent, ChipSetComponent } from './chip-set/chip-set.component';
import { MatCardModule } from '@angular/material/card';

const CHIP_SET_CLASSES = [ChipSetComponent, ChipComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MatChipsModule,
    MatCardModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NgbModule,
    IconComponent,
    MatChipsModule,
    CHIP_SET_CLASSES,
    MatCardModule
  ],
  declarations: [
    IconComponent,
    ChipSetComponent,
    CHIP_SET_CLASSES
  ]
})
export class SharedModule {
}
