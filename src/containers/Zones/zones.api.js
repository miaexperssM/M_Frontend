import request from 'utils/request';

export function getZonesAPI() {
  // return request.get('v1/zones?limit=100');
  return request.get('v1/zones');
}

export function postZonesAPI(payload) {
  return request.post('v1/addZone', payload);
}

export function putZonesAPI(payload) {
  return request.put(`v1/zones/${payload.id}`, payload);
}

export function delZonesAPI(payload) {
  return request.delete(`v1/zones/${payload.id}`);
}
