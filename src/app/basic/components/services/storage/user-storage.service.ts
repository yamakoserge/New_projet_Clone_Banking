import { Injectable } from '@angular/core';


const TOKEN ='S_TOKEN';
const USER = 'S_USER';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  [x: string]: any;

  constructor() { }

  public saveToken(token:string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static getToken(): string{
    return localStorage.getItem(TOKEN);
  }

  public saveUser(user):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): any{
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId(): string{
    const user = this.getUser();
    if(user === null){return '';}
    return user.userId;
  }

  static getUserRole(): string{
    const user = this.getUser();
    if(user === null){return '';}
    return user.user.role;
  }

  static isClientLoggedIn(): boolean{
    if(this.getToken()===null){
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'CLIENT';
  }

  static isCompanyLoggedIn(): boolean{
    if(this.getToken()===null){
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'COMPANY';
  }

  static signOut(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
