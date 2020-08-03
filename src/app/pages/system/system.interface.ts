import { Observable } from 'rxjs';

export interface System {
  value: number;
  min: number;
  max: number;
}

export abstract class SystemInterface {
  abstract getSystemData(): Observable<any>;
  abstract getSystemData_p(): Observable<System>;
}
