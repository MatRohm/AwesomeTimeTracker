import { BehaviorSubject } from 'rxjs'; 
export const emitter: BehaviorSubject<string> = new BehaviorSubject<string>('SAM');
emitter.next('SAM');