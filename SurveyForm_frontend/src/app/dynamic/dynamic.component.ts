import { Component, OnInit, Input, ChangeDetectionStrategy, ɵgetUnknownElementStrictMode } from '@angular/core';

import { FormBuilder, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AllservicesService } from '../allservices.service';

export class Survey {
  question: any;
  answertype: any;
  options: string[]=[];
}

export class RootObject {
  title: string = "";
  email: string = "";
  _id:string="";
  survey: Survey[] = [];
}

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})

export class DynamicComponent implements OnInit {

  public data: any;
  public checkedvalue=new Set()
  public url: string = '';
  public surveyID: String = '';
  // dynamicForm = this.fb.group({
  //   email:new FormControl('')
  // })
  email=""

  constructor(
    public allservices: AllservicesService,
    private fb: FormBuilder,
    private route: Router
  ) {

  }
  ngOnInit() {
   
      if(!localStorage.getItem('token'))
        this.route.navigate(['/signin']);
 
    //To get a SurveyID from URL
    this.url = (this.route.routerState.snapshot.url)
    this.surveyID = this.url.split('/')[2]

    this.allservices.getSurveyStructure(this.surveyID).subscribe((response: RootObject) => {
      // console.log(response);
      this.data = response;
    });


  }
  onChange(event:any){
    this.checkedvalue.add(event.target.value);
  }
  
  saveForm(form:NgForm) {
    const validateEmail = (email:any) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
    if(!validateEmail(this.email))
    {
      alert("Check Email Again..")
      return;
    }
    //console.log(this.dynamicForm.value)
    this.allservices.getSurveyStructure(this.surveyID).subscribe((response:RootObject)=>{
      let question=response.survey;
      // console.log(response)
      // console.log(form.value)
      //To convert Object into array
      let answer=Object.entries(form.value)
      
      answer.forEach(element => {
        if(element[1]===true)
          element[1]= Array.from(this.checkedvalue).join(',')
      });

      console.log(answer)
      let filldata={
        title:response.title,
        email:this.email,
        survey:[{}]
      }
      let i=0;
      question.forEach(que => {
        let q={
          question:que.question,
          answer:answer[i++][1]
        }
        filldata.survey.push(q)
      });
      filldata.survey.shift();
      console.log(filldata);
      
      console.log(response._id);

      //Add Response to Database
      this.allservices.saveResponse(filldata,response._id).subscribe(res=>{
        try {
          alert(JSON.parse(JSON.stringify(res)).message);
          
        } catch (error) {
          console.log("Error")
          alert("Response already Submitted with same Email ID..")
        }
        
        setTimeout(()=>{
          this.route.navigate(['/thankyou'])
        },500)
       
      })
      
    })
  }
}
