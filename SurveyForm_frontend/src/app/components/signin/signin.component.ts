import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AllservicesService } from '../../allservices.service'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  constructor(
    public router: Router,
    public allservices: AllservicesService
  ) {

  }
  title = 'mainProject';
  email = '';
  password = '';

  ngOnInit() {

  }
  async logInUser() {
    try {
      this.allservices.login({ email: this.email, password: this.password }).subscribe(data => {
        console.log(data)
        let response=JSON.parse(JSON.stringify(data))
        console.log(response)
        if(response.message=="authorized")
        {
          localStorage.setItem('token',response.token)
          console.log(response.token)
          alert("Login Successfully Done")
          this.router.navigate(['/mainpage']);
        }
        else{
          alert("Invalid Credentails ")
          this.router.navigate(['/signin']);
        }
      })
    } catch (error) {
        console.log("Errror")
    }

  }

}

