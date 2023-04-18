import { Component } from '@angular/core';
// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
//will be button
export class AuthComponent {
 // Inject the authentication service into the component through the constructor
 constructor(public auth: AuthService) {}
}
