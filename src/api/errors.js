import store from '../store';

export const SetApiError = function (err, additional= '') {
  let error = err + ' ' + additional;

  if(err.hasOwnProperty('response')) {
    if (err.response.hasOwnProperty('data')) {
      if (err.response.data.hasOwnProperty('message')){
        error = err.response.data.message + ' ' + additional;
      }
    }
  }
  store.dispatch('alert/onError', error);
}