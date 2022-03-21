import request from 'utils/request';

export function postSignUpAPI(payload) {
  return request.post('v1/signup', payload);
}
