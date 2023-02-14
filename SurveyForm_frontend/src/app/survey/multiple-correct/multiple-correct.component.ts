import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-multiple-correct',
  templateUrl: './multiple-correct.component.html',
  styleUrls: ['./multiple-correct.component.scss'],
})
export class MultipleCorrectComponent {


  questionControl = new FormControl('');

  constructor(public fb: FormBuilder) { }

  parentForm = new FormGroup({
    child: new FormArray([])
  })

  public root: any[] = [];

  multipleChioce = this.fb.group({
    question: [''],
    option: this.fb.array([
      this.fb.control('')
    ])
  })

  getValue() {
    const result = this.multipleChioce.value
    console.log(result);
    this.root.push(result)
    return result;
  }

  get options() {
    return this.multipleChioce.get('option') as FormArray;
  }

  addNewOptions() {
    this.options.push(this.fb.control(''));
  }

  removeOption() {
    this.options.removeAt(this.options.length - 1);
  }
}