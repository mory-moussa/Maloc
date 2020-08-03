import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HistoriqueComponent} from "./historique.component";
import {LogComponent} from "./log/log.component";


const routes: Routes = [{
  path: '',
  component: HistoriqueComponent,
  children: [
    {
      path: 'log',
      component: LogComponent,
    },
  ],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriqueRoutingModule {
}
