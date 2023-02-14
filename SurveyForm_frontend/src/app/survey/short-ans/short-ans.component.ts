import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-short-ans',
  templateUrl: './short-ans.component.html',
  styleUrls: ['./short-ans.component.scss'],
})
export class ShortAnsComponent {

  constructor(public fb:FormBuilder){}
  // questionControl = new FormControl('');
  // answerControl = new FormControl('');

  surveyForm = this.fb.group({
    question : this.fb.array([
      this.fb.control('')
    ])
  })

  // @Output() valueEvent = new EventEmitter<void>();

  getValue() {
    return this.questions.value;
  }

  get questions()
  {
    return this.surveyForm.get('question') as FormArray;
  }

  addNewQuestion(){
    this.questions.push(this.fb.control(''));
  }

  removeQuestion(){
    this.questions.removeAt(this.questions.length-1);
  }

}

