import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const allowedRoles = route.data['role'] as Array<string>;
  if (userInfo && allowedRoles.includes(userInfo.role)) {
    return true;
  }
  const url = '/login';
  const urlSegmentGroup = new UrlSegmentGroup([new UrlSegment('login', {})], {});
  return new UrlTree(urlSegmentGroup);
};
