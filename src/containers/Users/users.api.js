import request from 'utils/request';

export function getUsersAPI() {
  // return request.get('v1/users?limit=100');
  return request.get('v1/users');
}

export function postUsersAPI(payload) {
  return request.post('v1/addUser', payload);
}

export function putUsersAPI(payload) {
  return request.put(`v1/users/${payload.id}`, payload);
}

export function delUsersAPI(payload) {
  return request.delete(`v1/users/${payload.id}`);
}
