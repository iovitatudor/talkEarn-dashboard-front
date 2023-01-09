const AdministratorGuard = async function (to, from, next) {
  const role = localStorage.getItem('expertRole');

  if (role !== 'Administrator') next({name: 'Dashboard'});
  else next();
};

export default AdministratorGuard;