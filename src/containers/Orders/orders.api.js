import request from 'utils/request';

export function getOrdersAPI() {
  return request.get('v1/orders');
}

export function getOrdersByUpdatedAtAPI(payload) {
  return request.get(`v1/orders/updatedAt/${payload.from}/${payload.to}`);
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
