import { Component, OnInit, Input, ChangeDetectionStrategy, ɵgetUnknownElementStrictMode } from '@angular/core';

import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AllservicesService } from '../allservices.service';

export interface Survey {
  question: string;
  answertype: string;
  options: string[];
}

export class RootObject {
  title: string = "";
  email: string = "";
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
  public url: string = '';
  public surveyID: String = '';
  dynamicForm = this.fb.group({})

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

  
  saveForm(form:NgForm) {
    //console.log(this.dynamicForm.value)
    this.allservices.getSurveyStructure(this.surveyID).subscribe((response:RootObject)=>{
      let question=response.survey;
      console.log(question)
      console.log(form.value)
      let answer=Object.entries(form.value)
    
      let i=0;
    
      // question.forEach(que => {
      //   que.options=answer[i]
      //   i=i+1;
      // });
      console.log(answer)
    })
  }
}
