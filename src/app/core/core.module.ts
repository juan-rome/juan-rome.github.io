import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    NavBarComponent,
    ProfileComponent
  ],
  exports: [
    NavBarComponent,
    ProfileComponent
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule.');
    }
  }
}
