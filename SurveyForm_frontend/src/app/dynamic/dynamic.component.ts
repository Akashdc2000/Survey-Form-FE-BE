import { Component,OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import {  Router } from '@angular/router';
import { AllservicesService } from '../allservices.service';

// export interface JsonFormData{
//   data:RootObject[]
// }

export interface Survey {
  question: string;
  answertype: string;
  options: string[];
}

export class RootObject {
  title: string="";
  email: string="";
  survey: Survey[]=[];
}

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})

export class DynamicComponent  implements OnInit{

  public data:any;
  public url:string='';
  public surveyID:String='';
  dynamicForm=this.fb.group({})

  constructor(
    public allservices:AllservicesService,
    private fb:FormBuilder,
    private route: Router
  ) {
    
   }
  ngOnInit() {
    //To get a SurveyID from URL
    this.url=(this.route.routerState.snapshot.url)
    this.surveyID=this.url.split('/')[2]
    
    this.allservices.getSurveyStructure(this.surveyID).subscribe((response:RootObject)=>{
      // console.log(response);
      this.data=response
      // this.formField=response;
      // console.log(this.formField);
      // this.setDynamicForm();
  });

  
}

setDynamicForm(){
  // for(const control of controls)
  // {
  //   this.dynamicForm.addControl(control.title,this.fb.control(control.survey))
  //   console.log(typeof controls)
  // }

  // console.log(JSON.parse(JSON.stringify(this.data.survey[0])).question)
}
saveForm(){
  console.log(this.dynamicForm.value)
}
}
