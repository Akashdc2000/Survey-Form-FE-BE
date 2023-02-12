import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AllservicesService } from '../../allservices.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    public router: Router,
    public allservices: AllservicesService
  ) { }

  ngOnInit(): void {
  }
  registerForm = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    email: new FormControl(""),
    mobile: new FormControl(""),
    password: new FormControl(""),
    rpwd: new FormControl(""),
  });

  registerSubmitted() {
    //console.log(typeof this.registerForm.value);
    try {
      this.allservices.registerUser(this.registerForm.value).subscribe(data => {
        console.log(data)
        let result = (JSON.parse(JSON.stringify(data)).message)
        if (result == "Registration Successful..")
          this.router.navigate(['/signin']);
        else
          this.router.navigate(['/register']);
        alert(result)
      })

    } catch (error) {
      console.log(error)
    }


    //Test 1

    // try {
    //   let survey_id;
    //    this.allservices.getSurveyID({email:this.registerForm.value.email,title:this.registerForm.value.firstname}).subscribe(data1=>{
    //     console.log(data1)  
    //     survey_id=JSON.parse(JSON.stringify(data1)).survey_id

    //       this.allservices.getSurveyStructure(survey_id).subscribe(data=>{
    //         console.log(JSON.parse(JSON.stringify(data)).survey[0].question);
    
    
    //         (JSON.parse(JSON.stringify(data)).survey).forEach((que:any) => {
    //             console.log(que.question,que.answertype,que.options)
    //             que.options.forEach((opt:any) => {
    //               console.log(opt) //get Indivisual Option
    //             });
    //         });
    //       })
    //    })

    // } catch (error) {
      
    // }

  }
}
