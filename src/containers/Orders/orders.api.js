import request from 'utils/request';

export function getOrdersAPI(payload) {
  const offset = payload.offset || 1;
  const limit = payload.limit || 100;
  return request.get(`v1/orders?offset=${offset}&&limit=${limit}`);
}

export function getOrdersByUpdatedAtAPI(payload) {
  return request.get(`v1/orders/updatedAt/${payload.from}/${payload.to}`);
}

export function getOrderByTrackingNumberAPI(payload) {
  return request.get(`v1/orders/track/${payload.trackingNumber}`);
}

export function postOrdersByTrackingNumberListAPI(payload) {
  return request.post(`v1/orders/trackList`, { trackingNumberList: payload });
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
