import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../Services/auth';
import { inject } from '@angular/core';

export const authGardGuard: CanActivateFn = (route, state) => {
  let _auth : Auth = inject(Auth);
  let _router  : Router = inject(Router)

  if(localStorage.getItem("Token")!=null){
    _auth.ChangeUserState();
    // _router.navigate(['Home']);
    return true;
  }
  else {
    _router.navigate(['Login']);
    return false;
  }
};
