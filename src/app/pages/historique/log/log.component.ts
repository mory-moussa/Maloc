import {Component} from "@angular/core";
import {LogInterface} from "../../../interfaces/log/log.interface";
import {DatePipe} from "@angular/common";
import {device} from "../../dashboard/devices/interfaces/device.interface";

@Component({
  selector: 'ngx-log',
  templateUrl: 'log.component.html',
  styleUrls: ['log.component.scss'],
})

export class LogComponent {


  test : any;
  imei:number;
  columns : any = {};
  ObjectKeys = Object.keys;
  source:Array<any> = [];
  mySettings;
  settings:{
    mode:'inline',
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      display: true,
      perPage: 200
    },
    columns : {

    }
  };
  afficher(a,b)
  {
    console.log(a);
    console.log(b);
    this.columns[b].enable = !this.columns[b].enable;
    if(this.columns[b].enable) {
      this.settings.columns[b] = {
        title: b,
        type:this.columns[b].type,
        editable:false,
        addable: false,
        valuePrepareFunction: (date) => {
          if(this.columns[b].type == 'date')
          {
            var r:Date;
            var d = null;
            try {
              r = new Date(Number(date));
              d = new DatePipe('en-EN').transform(r, 'yyyy-MM-dd HH:mm:ss');
            }catch (e) {
              console.log(date);
              r=new Date(date);
              d = new DatePipe('en-EN').transform(r, 'yyyy-MM-dd HH:mm:ss');
            }
             if (d) {
              return d;
            }
          }
          else if(this.columns[b].type == 'number')
          {
            return Number(date).toFixed(0);
          }
          else if(this.columns[b].type == 'float')
          {
            return Number(date).toFixed(5);
          }
          return date;
        }

      };
    }else
    {
      delete this.settings.columns[b];
    }
    console.log(this.settings);
    console.log(this.source);
    this.mySettings = Object.assign({}, this.settings);

  }
  toUtc_time(d:Date) : Date
  {
    return new Date(d.getTime()-(d.getTimezoneOffset()*60*1000));
  }
  show()
  {
    this.settings={
      mode: 'inline',
      actions: {
        add: false,
        edit: false,
        delete: false
      },
      pager: {
        display: true,
        perPage: 200
      },
      columns:{
      }
    };
    this.mySettings=Object.assign({}, this.settings);
    this.columns = {};
    if(!this.test.end)
    {
      this.test.end = this.test.start;
    }
    this.logService.get_log(this.imei ,this.toUtc_time(this.test.start).getTime() , this.toUtc_time(this.test.end).getTime()).then(data=>
    {
      this.source=data.datas;

      this.columns = data.columns;
      console.log(data);
    });
    //alert(JSON.stringify(this.test)+" "+this.imei+" "+this.test.start.getTimezoneOffset());
  }
  constructor(private logService:LogInterface)
  {
    this.settings={
      mode: 'inline',
      actions: {
        add: false,
        edit: false,
        delete: false
      },
      pager: {
        display: true,
        perPage: 200
      },
      columns:{
      }
    };
    this.mySettings=Object.assign({}, this.settings);

  }

}
