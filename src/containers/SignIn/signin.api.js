import request from 'utils/request';

export function postSignInAPI(payload) {
  return request.post('login', payload);
}
export function getMe() {
  return request.post('me');
}
