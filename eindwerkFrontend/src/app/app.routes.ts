import { Routes} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HoehetwerktComponent } from './pages/footer/product/hoehetwerkt/hoehetwerkt.component';
import { PuntensysteemComponent } from './pages/footer/product/puntensysteem/puntensysteem.component';
import { AboutUsComponent } from './pages/footer/bedrijf/about-us/about-us.component';
import { ContactComponent } from './pages/footer/bedrijf/contact/contact.component';



export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'instellingen', component: SettingsComponent }, 
    { path: 'footer/product/how-it-works', component: HoehetwerktComponent },
    { path: 'footer/product/puntensysteem', component: PuntensysteemComponent },
    { path: 'footer/bedrijf/about-us', component: AboutUsComponent },
    { path: 'footer/bedrijf/contact', component: ContactComponent }
];



