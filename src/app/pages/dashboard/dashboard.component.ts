import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NbDialogService, NbThemeService} from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import {device, DeviceInterface} from "./devices/interfaces/device.interface";
import {filter} from "rxjs/internal/operators";
import {DatePipe} from "@angular/common";
import {Ng2SmartTableComponent} from "ng2-smart-table/ng2-smart-table.component";
import {ShowcaseDialogComponent} from "../modal-overlays/dialog/showcase-dialog/showcase-dialog.component";
import {Promise, reject} from "q";

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  nbr: number;
  t: number;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy , OnInit {

  is_loaded = false;
  private alive = true;

  @ViewChild('table',null)
  smartTable: Ng2SmartTableComponent;
  ngOnInit()
  {

  }
  title_of_table="";
   god(type) : void
  {

    console.log(type);
    this.show_table=true;
    switch (type)
    {
      case 1:

        this.title_of_table="boitiers installer";
        this.source=this.device_all;
        break;
      case 2:

        this.title_of_table="boitiers bloquer";
        this.source=this.device_bloqued;
        break;
      case 3:

        this.title_of_table="boitiers fonctionnel";
        this.source=this.device_fonctionnel;
        break;
      case 4:

        this.title_of_table="boitiers desabonner";
        this.source=this.device_desabonned;
        break;
    }
    console.log("i m here !");
  }
  solarValue: number;
  nbr_boitier_installes: CardSettings = {
    title: 'Total des boitiers installer',
    iconClass: 'nb-lightbulb',
    type: 'primary',
    nbr:0,
    t:1
  };
  nbr_boitier_bloques: CardSettings = {
    title: 'Nombre des boitiers bloquer',
    iconClass: 'nb-alert',
    type: 'danger',
    nbr:0,
    t:2
  };
  nbr_boitier_fonctionnels: CardSettings = {
    title: 'Nombre des boitiers fonctionnel',
    iconClass: 'nb-checkmark-circle',
    type: 'info',
    nbr:0,
    t:3
  };
  nbr_boitier_desabonnees: CardSettings = {
    title: 'Nombre des boitiers non-abonner',
    iconClass: 'nb-close-circled',
    type: 'warning',
    nbr:0,
    t:4
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] =
  [
    this.nbr_boitier_installes,
    this.nbr_boitier_bloques,
    this.nbr_boitier_fonctionnels,
    this.nbr_boitier_desabonnees,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate:this.commonStatusCardsSet,
    dark: this.commonStatusCardsSet,
  };
  show_table:boolean;
  table_data=[];
  settings = {
    pager: {
      display: true,
      perPage: 50
    },
    actions: {
      add: false,
      edit: true,
      delete: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable:false,
        addable: false,
      },
      internal_code: {
        title: 'CODE INTERNE',
        type: 'string',

        editable:false,
        addable: false,
      },
      protocol_name: {
        title: 'PROTOCOL',
        type: 'string',

        editable:false,
        addable: false,
      },
      type_name: {
        title: 'SERIE',
        type: 'string',
        editable:false,
        addable: false,
      },
      imei: {
        title: 'IMEI',
        type: 'number',

        editable:false,
        addable: false,
      },
      sim: {
        title: 'SIM',
        type: 'number',
      },
      name: {
        title: 'NOM DU COMPTE',
        type: 'string',

        editable:false,
        addable: false,
      },
        date_server: {
        title: 'DATE SERVER',
        type: 'date',
          valuePrepareFunction: (date) => {
          var r = new Date(date);
            if (date) {
              return new DatePipe('en-EN').transform(r, 'yyyy-MM-dd HH:mm:ss');
            }
            return null;
          }
          ,
          filterFunction(date?: any, search?: string): boolean {
            var r = new Date(date);
            if(date)
            {
            let match = new DatePipe('en-EN').transform(r, 'yyyy-MM-dd HH:mm:ss');
            if (match.includes(search)) {
              //console.log(match+" "+search);
              return true;
            } else {
              return false;
            }
          }
          },
          editable:false,
          addable: false
        }
      ,

      end_date: {
        title: 'DATE D\'ECHEANCHE',
        type: 'date',
      editable:false,
      addable: false

    },
      start_date: {
        title: 'DATE D\'INSTALLATION',
        type: 'date',
        editable:false,
        addable: false

      },
        nbr_vehicle: {
        title: 'NOMBRE DE VEHICULES',
        type: 'number',
      },
    },
  };
  device_bloqued:device[];
  device_all:device[];
  device_fonctionnel:device[];
  device_desabonned:device[];
  source:device[];
  constructor(private themeService: NbThemeService,private dialogService: NbDialogService,
              private solarService: SolarData,private deviceService:DeviceInterface) {

    this.show_table=false;


    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });

    this.deviceService.getDeviceInfoData().then(data=>
    {
      console.log(data);
      this.deviceService.getBloqued_devices().subscribe(d=>
      {

        this.device_bloqued=d;
        this.deviceService.getTotal_devices().subscribe(d=>
        {

          this.device_all=d;
          this.deviceService.getDesabonned_devices().subscribe(d=>
          {
            this.device_desabonned=d;
            this.deviceService.getFonctionnel_devices().subscribe(d=>
            {
              this.device_fonctionnel=d;
              this.deviceService.getInfos().subscribe(data=>
              {
                console.log(data);

                this.nbr_boitier_installes.nbr=data.total;
                this.nbr_boitier_fonctionnels.nbr=data.operationnel;
                this.nbr_boitier_desabonnees.nbr=data.desabonned;
                this.nbr_boitier_bloques.nbr=data.bloqued;
                this.is_loaded = true;

              });
            });
          });
        });
      });


    });


  }
  ngAfterViewInit(): void {
    console.log('Values on ngAfterViewInit():');
    this.smartTable.edit.subscribe( (dataObject: any) => {
      console.log('Edit');
      console.log(dataObject);
    });
    this.smartTable.delete.subscribe( (dataObject: any) => {
      console.log('Delete');
      console.log(dataObject);
    });
    this.smartTable.create.subscribe( (dataObject: any) => {
      console.log('Create');
      console.log(dataObject);
    });
  }

  open() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }
   dialog_conf : TemplateRef<any>;
  openWithoutBackdrop_true_false(dialog:TemplateRef<any>)
  {
    this.dialogService.open(
      dialog,
      {
        context: ''+this.etat,
        hasBackdrop: false,
      });
  }
  d : boolean;
  openWithoutBackdrop(dialog: TemplateRef<any>) : Promise<any> {
    let promise = Promise((resolve, reject) =>
    {
      return this.dialogService.open(
        dialog,
        {
          context: 'Voulez-vous vraimenet supprimer la ligne ?',
          hasBackdrop: false,
        }).onClose.toPromise().then(d=>
      {
        console.log(this.d);
      resolve(this.d);
      },msg=>
      {
        console.log(msg);
        reject(msg);
      })
      ;
    });
      return promise;

  }

  data = {};
  etat="succes";
  confirmed=false;
  onDeleteConfirm(event,dialog:TemplateRef<any>,dialog_conf:TemplateRef<any>): void {
    console.log(dialog);
    this.data=event.data;
    this.openWithoutBackdrop(dialog).then(d=>
    {
      if(d==true)
      {
        this.confirmed=true;
        this.deviceService.delete_device(event.data.id).then(value=>
        {

          this.etat="succes";
          console.log("suppression bien !");
          this.openWithoutBackdrop_true_false(dialog_conf);
          event.confirm.resolve();
          this.confirmed=false;
          },msg=>
        {

          this.etat="echec";
          console.log("erreur de suppression !");
          this.openWithoutBackdrop_true_false(dialog_conf);

          event.confirm.resolve();
          this.confirmed=false;
        });
      }
      else {
        /*
        this.etat="echec";
        this.openWithoutBackdrop_true_false(dialog_conf);
        */
        event.confirm.reject();
        this.confirmed=false;
      }
        },msg=>
    {
      this.etat="echec";
      this.openWithoutBackdrop_true_false(dialog_conf);
      event.confirm.reject();
    })
  }
  me()
  {
    console.log("hi !!  "+JSON.stringify(this.data))
    return true;
  }
  onEditConfirm(event,dialog:TemplateRef<any>,dialog_conf:TemplateRef<any>): void {
    console.log(event);
    this.data=event.data;
    this.openWithoutBackdrop(dialog).then(d=>
    {
      if(d==true)
      {
        this.confirmed=true;
        this.deviceService.update_device(event.newData).then(value=>
        {

          this.etat="succes";
          console.log("modification bien !");
          this.openWithoutBackdrop_true_false(dialog_conf);
          event.confirm.resolve();
          this.confirmed=false;
        },msg=>
        {

          this.etat="echec";
          console.log("erreur de modification !");
          this.openWithoutBackdrop_true_false(dialog_conf);

          event.confirm.resolve();
          this.confirmed=false;
        });
      }
      else {
        /*
        this.etat="echec";
        this.openWithoutBackdrop_true_false(dialog_conf);
        */
        event.confirm.reject();
        this.confirmed=false;
      }
    },msg=>
    {
      this.etat="echec";
      this.openWithoutBackdrop_true_false(dialog_conf);
      event.confirm.reject();
    })
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
