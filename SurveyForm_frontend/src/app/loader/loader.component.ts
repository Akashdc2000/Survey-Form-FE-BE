import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(
    public router:Router
  ){
    
  }
public readonly text='SURVEY'.split('');

public readonly lastIndex= this.text.length -1;
public readonly duration=2;
public readonly delay= (this.duration *.5) /this.lastIndex;
loader=true;
ngOnInit():void{
  setTimeout(() => {
    this.loader=false;
    this.router.navigate(['/signin']);
  }, 5000);
}
}