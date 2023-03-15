import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReturnUser } from '../models/ReturnUser';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  private observableUser: BehaviorSubject<ReturnUser> =
    new BehaviorSubject<ReturnUser>(new ReturnUser());

  get GetMyObservableUser() {
    return this.observableUser.asObservable();
  }

  set setMyObservableUser(user: ReturnUser) {
    this.observableUser.next(user);
  }
}
