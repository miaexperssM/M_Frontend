import request from 'utils/request';

export function getRulesByLevelAPI(level) {
  return request.get(`v1/getRulesByLevel/${level}`);
}

export function postRulesAPI(payload) {
  return request.post('v1/postRule', payload);
}

export function putRulesAPI(payload) {
  return request.put(`v1/putRule/${payload.id}`, payload);
}

export function delRulesAPI(payload) {
  return request.delete(`v1/rules/${payload.id}`);
}

export function getPickResultByTrackingNumberAPI(level, trackingNumber) {
  return request.get(`v1/sortPick/level/${level}/${trackingNumber}`);
}
