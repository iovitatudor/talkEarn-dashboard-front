import {ExpertsApi} from "../api/ContentApi";
import {SetApiError} from "../api/errors";
import store from '../store';

const AuthGuard = async function (to, from, next) {
  const hasToken = localStorage.hasOwnProperty('token');
  const hasAuth = localStorage.hasOwnProperty('authExpert');
  const hasRole = localStorage.hasOwnProperty('expertRole');

  try {
    await ExpertsApi.getAll();
    if (!hasToken || !hasAuth || !hasRole) FailEntry('Something is wrong.', next);
    else next();
  } catch (err) {
    FailEntry(err, next);
  }
};

const FailEntry = function (err, next) {
  const additional = 'Please try to login again.';
  SetApiError(err, additional);
  store.dispatch('auth/onLogout');
  next({name: 'Login'})
};

export default AuthGuard;