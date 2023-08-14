import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, AfterContentChecked, AfterViewInit, ViewChildren, Directive } from '@angular/core';
import { Question } from '../entities/question.entity';
import { isCategory, isQuestionType } from './object-type-check';


@Component({
  selector: 'app-custom-select-box',
  templateUrl: './custom-select-box.component.html',
  styleUrls: ['./custom-select-box.component.scss'],
})
export class CustomSelectBoxComponent implements OnInit {
  selectedElement: string = '';
  title: any = '';
  id: any;
  selectId: any;
  optId: any;

  @Input() ls: any[];

  @Input() service: Function;

  @Output() selectedOption = new EventEmitter<string | number>();

  constructor() {}

  listSource: any[] = [];
  list: any[] = [];

  ngOnInit(): void {
    
    this.listSource = this.ls;
    this.checkObjectType(this.ls);
  }

  checkObjectType(ls: any) {
    if (isQuestionType(ls)) {
      this.listSource.map((vl) => {
        this.list.push({ ID: vl, Name: vl });
      });
      this.listSource = this.list;
      this.title = 'Question Type';
    }
    else if(isCategory(ls[0])){
      this.listSource.map((vl)=>{
        this.list.push({ID: vl.ID, Name: vl.Name})
      })
    }
  }

  selectBox() {
    const select = document.getElementById(`select-box${this.id}`);
    const opt = document.getElementById(`option-box${this.id}`);
    select?.classList.toggle('active');
    opt?.classList.toggle('active');
  }

  selectOption(id: any) {
    let name: string = this.list.find((val)=> val.ID == id).Name
    this.selectedElement = name
    this.closeBox();
    this.selectedOption.emit(id);
  }

  searchOptions(event: any) {
    let q = event.target.value.toLowerCase();

    this.list = this.listSource.filter((val) =>
      val.Name.toLowerCase().includes(q)
    );
  }

  closeBox() {
    let opt = document.getElementById(`select-box${this.id}`);
    let select = document.getElementById(`option-box${this.id}`);
    select?.classList.remove('active');
    opt?.classList.remove('active');
  }

  checkIfClickOutside(data: any){
    if(data){
      this.closeBox()
    }
  }
}
