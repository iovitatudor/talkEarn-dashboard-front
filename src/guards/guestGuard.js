const GuestGuard = function (to, from, next) {
  const hasToken = localStorage.hasOwnProperty('token');
  const hasAuth = localStorage.hasOwnProperty('authExpert');
  const hasRole = localStorage.hasOwnProperty('expertRole');
  if (hasToken && hasAuth && hasRole) next({name: 'Dashboard'});
  else next();
};

export default GuestGuard;