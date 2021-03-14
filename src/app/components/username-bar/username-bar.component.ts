import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-username-bar',
  templateUrl: './username-bar.component.html',
  styleUrls: ['./username-bar.component.scss']
})
export class UsernameBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  name = 'Angular 4';
  url = '';
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
         this.url = event.target.result;
      }
    }
  }

  public delete(){
    // this.url = null;
  }
}
