import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  if(localStorage.getItem('jwtToken')){
    const userRole  =  localStorage.getItem('role')
    console.log(userRole);
    const allowedRoles = route.data['roles'] as Array<string>;
    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }
  }
  return false ;
};
