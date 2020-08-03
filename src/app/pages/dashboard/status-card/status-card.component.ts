import { Component, Input } from '@angular/core';
import {DashboardComponent} from "../dashboard.component";

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card class='on'>
      <div class="icon-container">
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details" style="width: 100%">
        <div class="title h5" style="font-size: 16px;text-align: center;">{{ title }}</div>
        <div class="status paragraph-2" style="border-top: 1px black solid;
    text-align: center;
    font-size: 20px;
    font-weight: bolder;
    border-bottom: 1px black solid;
    line-height: 1.5;
    margin-bottom: 10px;">{{ nbr }}</div>
        <button  nbButton (click)="m()" style="padding: 1px 1px">
          plus de details
        </button>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() nbr: number;
  @Input() iconClass: string;
  @Input() t: number;
  constructor(private dashboardComponent : DashboardComponent)
  {

  }
  m()
  {
    console.log(this.t);
   this.dashboardComponent.god(this.t);
  }
}
