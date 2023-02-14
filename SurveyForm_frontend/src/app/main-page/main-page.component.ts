import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, copyArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder,FormGroup, FormArray,FormControl, RequiredValidator, Validators, FormsModule } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']


})

export class MainPageComponent {
  questionControl = new FormControl('');
  answerControl = new FormControl('');

  getValue() {
    console.log('Question: ', this.questionControl.value);
    console.log('Answer: ', this.answerControl.value);
    return {
      question: this.questionControl.value,
      answer: this.answerControl.value,
    };
  }
  components = ['Text Area', 'Single Choice Question', 'Multiple Choice Question'];
  // components=[
  //   { 
  //     type: 'text'
  //   }
  // ]

  text : any ;
  surveyform=[
    {
      type:'',
      quest:'Text Area'
    },
    {
      type:'',
      quest:'Single Choice Question'
    },
    {
      type:'',
      quest:'Multiple Choice Question'
    }
  ]
  Form = [ 'Check e-mail'];
drop(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    copyArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
ngOnInit(){
  // this.surveyForm = this._fb.group({
  //   title : ["", Validators.required],
  //   email : ["", Validators.required],
  //   questions: this._fb.array([])

  // })
}
public userForm: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.userForm = this._fb.group({
      address: this._fb.array([this.addAddressGroup()])
    });
  }
  //Append Fields Set
  private addAddressGroup(): FormGroup {
    return this._fb.group({
      ques: [],
      type: [],
      option: []
    });
  }
  //Add Fields
  addAddress1(): void {
    this.addressArray.push(this.addAddressGroup());
  }
  addAddress2(): void {
    this.addressArray.push(this.addAddressGroup());
  }
  //Remove Fields
  removeAddress(index: number): void {
    this.addressArray.removeAt(index);
  }
  //Fields Array
  get addressArray(): FormArray {
    return <FormArray>this.userForm.get('address');
  }

  onDelete(item: any): void {
    this.addressArray.removeAt(item);
  }

  display(){
    console.log("h");
  }


}
