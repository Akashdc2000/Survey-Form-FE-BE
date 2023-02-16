import { HeadComponent } from '../head/head.component';
import { ShortAnsComponent } from '../short-ans/short-ans.component';
import { NumberComponent } from '../number/number.component';
import { EmailComponent } from '../email/email.component';
import { SingleCorrectComponent } from '../single-correct/single-correct.component';
import { MultipleCorrectComponent } from '../multiple-correct/multiple-correct.component';

import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { AllservicesService } from 'src/app/allservices.service';
import { Router } from '@angular/router';



//Questions Format
export class Survey {
  question: string | null | undefined;
  answertype: string;
  options: string[] = []
  constructor(question: string, answerType: string, option: string[]) {
    this.question = question
    this.answertype = answerType
    this.options = option
  }
}

//Parent Object
export class RootObject {
  title: string | null;
  email: string | null;
  survey: Survey[] = [];
  constructor(title: string, email: string, survey: Survey[]) {
    this.title = title
    this.email = email
    this.survey = survey
  }
}



@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit{

  constructor(
    public allservices:AllservicesService,
    public router:Router
    ) { }
    
  ngOnInit(): void {
    if(!localStorage.getItem('token'))
      this.router.navigate(['/signin']);
  }

  formElements = [
    'Title',
    'Email',
    'Short Answer',
    'Single Correct',
    'Multiple Correct',
    'Number',
  ];

  mainForm = [
    'Title',
    'Email',
  ];

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (
      event.previousContainer.id === 'formElements' &&
      event.container.id === 'mainForm'
    ) {
      const formElement = event.previousContainer.data[event.previousIndex];
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      event.container.data[event.currentIndex] = formElement;
    } else if (
      event.previousContainer.id === 'mainForm' &&
      event.container.id === 'formElements'
    ) {
      event.previousContainer.data.splice(event.previousIndex, 1);
    }
  }

  @ViewChild(HeadComponent)
  headComponent!: HeadComponent;

  @ViewChild(ShortAnsComponent)
  shortAnsComponent!: ShortAnsComponent;

  @ViewChild(NumberComponent)
  numberComponent!: NumberComponent;

  @ViewChild(EmailComponent)
  emailComponent!: EmailComponent;

  @ViewChild(SingleCorrectComponent)
  singleCorrectComponent!: SingleCorrectComponent;

  @ViewChild(MultipleCorrectComponent)
  multipleCorrectComponent!: MultipleCorrectComponent;

  onFormSubmit() {
    //root object
    let jsonobj: RootObject = new RootObject('', '', []);

    for (let i = 0; i < this.mainForm.length; i++) {
      let que: Survey = new Survey("", "", [])
      const key = this.mainForm[i];
      switch (key) {

        case 'Title':
          jsonobj.title = this.headComponent.getValue()
          break;

        case 'Short Answer':
          let short = this.shortAnsComponent.getValue();
          short.forEach((question: string | null) => {
            let que: Survey = new Survey("", "", [])
            que.question = question;
            que.answertype = 'text';
            jsonobj.survey.push(que);
          });
          break;

        case 'Email':
          jsonobj.email = this.emailComponent.getValue();
          break;

        case 'Multiple Correct':

          let multiple = this.multipleCorrectComponent.getValue();
          que.question = multiple.question;
          que.answertype = 'multiple';

          if (multiple.option)
            (multiple.option).forEach((ele: any) => {
              que.options.push(ele);
            });

          jsonobj.survey.push(que)
          break;

        case 'Single Correct':
          let single = this.singleCorrectComponent.getValue();
          que.question = single.question;
          que.answertype = 'single';

          if (single.option)
            (single.option).forEach((ele: any) => {
              que.options.push(ele);
            });

          jsonobj.survey.push(que)
          break;

        case 'Number':
          let number = this.numberComponent.getValue();

          que.question = number.question;
          que.answertype = 'text';
          jsonobj.survey.push(que);
          break;
        default:
          break;
      }
    }

    console.log(jsonobj);
    // // Store formData in the database
   this.allservices.createSurvey(jsonobj).subscribe(response=>{
    console.log(response);
    alert("Survey Created Successfully....");
    location.reload();

   })

  }


  history()
  {
      let email=localStorage.getItem('email')
      this.allservices.getUserIDByEmail(email).subscribe(response=>{
        console.log(JSON.parse(JSON.stringify(response)).user_id)
        let user_id=JSON.parse(JSON.stringify(response)).user_id;
        this.router.navigate([`/history/${user_id}`])
      })
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['/signin']) 
  }
}
