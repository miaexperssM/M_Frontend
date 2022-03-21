import request from 'utils/request';

export function getOrdersAPI() {
  // return request.get('v1/users?limit=100');
  return request.get('v1/orders?limit=100');
}

export function getOrderByTrackingNumberAPI(payload) {
  return request.get(`v1/orders/track/${payload.trackingNumber}`);
}

export function postOrdersAPI(payload) {
  return request.post('v1/addOrder', payload);
}

export function putOrdersAPI(payload) {
  return request.put(`v1/orders/${payload.id}`, payload);
}

export function delOrdersAPI(payload) {
  return request.delete(`v1/orders/${payload.id}`);
}
