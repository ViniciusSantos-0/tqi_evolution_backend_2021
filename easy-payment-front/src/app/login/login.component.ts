import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onLogin(): void {
    //dados do grupo
    var poolData = {
      UserPoolId: environment.UserPoolId, // Your user pool id here
      ClientId: environment.ClientId, // Your client id here
    };

    var userPool = new CognitoUserPool(poolData);
    //dados do usuario
    var UserData = {
      Username: this.email,
      Pool: userPool
    }
    var cognitoUser = new CognitoUser(UserData);
    //crendiais
    var authData = {
      Username: this.email,
      Password: this.password
    }
    var authDetails = new AuthenticationDetails(authData);

    //login
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) =>{
        console.log('token: '+ result.getAccessToken().getJwtToken);
        this.router.navigate(['/home']);
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));

      }
    })
  }

}
