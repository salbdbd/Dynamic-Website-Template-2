import { ContentComponent } from './content/content.component';
import { LoginComponent } from './login/login.component';
import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngb-modal';
import { StartupComponent } from './startup/startup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecivableMemberListComponent } from './recivable-member-list/recivable-member-list.component';
import { PageInformationComponent } from './page-information/page-information.component';
import { GeneralMemberComponent } from './general-member/general-member.component';
import { RegistrationComponent } from './registration/registration.component';
import { NoticeComponent } from './notice/notice.component';
import { ChairmanInfoComponent } from './chairman-info/chairman-info.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { CotactInfoComponent } from './cotact-info/cotact-info.component';
import { NewsEventsComponent } from './news-events/news-events.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomerInformationComponent } from './customer-information/customer-information.component';
import { CommitteeComponent } from './committee/committee.component';
import { OurProductComponent } from './our-product/our-product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MemberEntryFormComponent } from './member-entry-form/member-entry-form.component'
import { ImageControlComponent } from './shared/image-control/image-control.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CommonComponent } from './common-components/common/common.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { VideoComponent } from './video/video.component';
import { BasicModalComponent } from './basic-modal/basic-modal.component';
import { AboutComponent } from './about/about.component';
import { LiveChatApplicationComponent } from './live-chat-application/live-chat-application.component';
import { OurMemberListComponent } from './our-member-list/our-member-list.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { MemberShipCriteriaComponent } from './member-ship-criteria/member-ship-criteria.component';
import { ReportSelectListComponent } from './Roports/report-select-list/report-select-list.component'; 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    LoginComponent,
    StartupComponent,
    ContentComponent,
    RecivableMemberListComponent,
    PageInformationComponent,
    GeneralMemberComponent,
    RegistrationComponent,
    NoticeComponent,
    ChairmanInfoComponent,
    CompanyInfoComponent,
    CotactInfoComponent,
    NewsEventsComponent,
    CustomerInformationComponent,
    CommitteeComponent,
    OurProductComponent,
    ShoppingCartComponent,
    MemberEntryFormComponent,
    ImageControlComponent,
    TransactionComponent,
    CommonComponent,
    PhotoGalleryComponent,
    VideoComponent,
    BasicModalComponent,
    AboutComponent,
    LiveChatApplicationComponent,
    OurMemberListComponent,
    ForgetPasswordComponent,
    MemberShipCriteriaComponent,
    ReportSelectListComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ModalModule,
    BrowserAnimationsModule,
    NgSelectModule,
  ],
  providers: [],
  exports:[
    LoginComponent,
    ReactiveFormsModule
  ],
  entryComponents:[LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
