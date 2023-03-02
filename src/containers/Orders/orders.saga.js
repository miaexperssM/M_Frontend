import { takeLatest, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  getOrdersSuccess,
  getOrdersFailure,
  addOrdersFailure,
  addOrdersSuccess,
  addOrderListSuccess,
  addOrderListFailure,
  getOrdersByUpdatedAtSuccess,
  getOrdersByUpdatedAtFailure,
  delOrdersSuccess,
  delOrdersFailure,
  getOrdersAction,
  modifyOrdersSuccess,
  modifyOrdersFailure,
  modifyOrdersWithZoneIdSuccess,
  modifyOrdersWithZoneIdFailure,
  trackOrdersFailure,
  trackOrdersSuccess,
  trackOrderListFailure,
  trackOrderListSuccess,
} from './orders.actions';
import {
  GET_ORDERS_REQUEST,
  ADD_ORDER_REQUEST,
  MODIFY_ORDER_REQUEST,
  DEL_ORDER_REQUEST,
  TRACK_ORDER_REQUEST,
  ADD_ORDER_LIST_REQUEST,
  TRACK_ORDER_LIST_REQUEST,
  GET_ORDERS_UPDATED_AT_REQUEST,
} from './orders.constants';
import {
  getOrdersAPI,
  getOrdersByUpdatedAtAPI,
  getOrderByTrackingNumberAPI,
  postOrdersByTrackingNumberListAPI,
  postOrdersAPI,
  putOrdersAPI,
  delOrdersAPI,
  putOrdersWithZoneIdAPI,
} from './orders.api';
import {
  makeSelectMAWB,
  makeSelectContainerNumber,
  makeSelectTrackingNumber,
  makeSelectShipper,
  makeSelectShipperAddress,
  makeSelectShipperPhoneNumber,
  makeSelectDestinationCountry,
  makeSelectRecipient,
  makeSelectRUT,
  makeSelectRecipientEmail,
  makeSelectRecipientPhoneNumber,
  makeSelectRegion,
  makeSelectProvince,
  makeSelectComuna,
  makeSelectAddress,
  makeSelectWeight,
  makeSelectValue,
  makeSelectDescription,
  makeSelectQuantity,
  makeSelectOrdersById,
  makeSelectWidth,
  makeSelectHeight,
  makeSelectLength,
} from './orders.selectors';

export function* getOrdersSaga({ payload: { offset, limit } }) {
  try {
    const ordersList = yield call(getOrdersAPI, { offset, limit });
    yield put(getOrdersSuccess(ordersList));
  } catch (error) {
    yield put(getOrdersFailure(error));
  }
}

export function* getOrdersByUpdatedAtSaga({ payload: { from, to } }) {
  try {
    console.log({ from, to });
    const ordersList = yield call(getOrdersByUpdatedAtAPI, { from, to });
    yield put(getOrdersByUpdatedAtSuccess(ordersList));
  } catch (error) {
    yield put(getOrdersByUpdatedAtFailure(error));
  }
}

export function* trackOrderSaga({ payload: trackingNumber }) {
  try {
    const order = yield call(getOrderByTrackingNumberAPI, { trackingNumber: trackingNumber });
    yield put(trackOrdersSuccess(order));
  } catch (error) {
    yield put(trackOrdersFailure(error));
  }
}

export function* trackOrderListSaga({ payload: trackingNumberList }) {
  if (trackingNumberList.length !== 0) {
    const list = trackingNumberList.map(trackingNumber => trackingNumber.toString());
    try {
      const orderList = yield call(postOrdersByTrackingNumberListAPI, list);
      console.log(orderList);
      yield put(trackOrderListSuccess(orderList));
    } catch (error) {
      console.log('trackOrderListSaga error', error);
      yield put(trackOrderListFailure());
    }
  } else {
    yield put(trackOrderListFailure());
  }
}

export function* postOrderListSaga({ payload: list }) {
  if (list.payload.length !== 0) {
    for (const data of list.payload) {
      try {
        const newOrder = yield call(postOrdersAPI, data);
        yield put(addOrderListSuccess(newOrder));
      } catch (error) {
        console.log('postOrderListSaga error', error);
        yield put(addOrderListFailure(error));
      }
    }
  }
}

export function* postOrdersSaga() {
  const MAWB = yield select(makeSelectMAWB);
  const containerNumber = yield select(makeSelectContainerNumber);
  const trackingNumber = yield select(makeSelectTrackingNumber);
  const shipper = yield select(makeSelectShipper);
  const shipperAddress = yield select(makeSelectShipperAddress);
  const shipperPhoneNumber = yield select(makeSelectShipperPhoneNumber);
  const destinationCountry = yield select(makeSelectDestinationCountry);
  const recipient = yield select(makeSelectRecipient);
  const RUT = yield select(makeSelectRUT);
  const recipientPhoneNumber = yield select(makeSelectRecipientPhoneNumber);
  const recipientEmail = yield select(makeSelectRecipientEmail);
  const region = yield select(makeSelectRegion);
  const province = yield select(makeSelectProvince);
  const comuna = yield select(makeSelectComuna);
  const address = yield select(makeSelectAddress);
  const weight = yield select(makeSelectWeight);
  const value = yield select(makeSelectValue);
  const description = yield select(makeSelectDescription);
  const quantity = yield select(makeSelectQuantity);

  try {
    const newOrder = yield call(postOrdersAPI, {
      MAWB,
      containerNumber,
      trackingNumber,
      shipper,
      shipperAddress,
      shipperPhoneNumber,
      destinationCountry,
      recipient,
      RUT,
      recipientEmail,
      recipientPhoneNumber,
      region,
      province,
      comuna,
      address,
      weight,
      value,
      description,
      quantity,
    });
    yield put(addOrdersSuccess(newOrder));
  } catch (error) {
    console.log('postOrdersSaga errror', error);
    yield put(addOrdersFailure(error));
  }
}

export function* putOrdersSaga({ payload: id }) {
  const MAWB = yield select(makeSelectMAWB);
  const containerNumber = yield select(makeSelectContainerNumber);
  const trackingNumber = yield select(makeSelectTrackingNumber);
  const shipper = yield select(makeSelectShipper);
  const shipperAddress = yield select(makeSelectShipperAddress);
  const shipperPhoneNumber = yield select(makeSelectShipperPhoneNumber);
  const destinationCountry = yield select(makeSelectDestinationCountry);
  const recipient = yield select(makeSelectRecipient);
  const RUT = yield select(makeSelectRUT);
  const recipientPhoneNumber = yield select(makeSelectRecipientPhoneNumber);
  const recipientEmail = yield select(makeSelectRecipientEmail);
  const region = yield select(makeSelectRegion);
  const province = yield select(makeSelectProvince);
  const comuna = yield select(makeSelectComuna);
  const address = yield select(makeSelectAddress);
  const weight = yield select(makeSelectWeight);
  const height = yield select(makeSelectHeight);
  const length = yield select(makeSelectLength);
  const width = yield select(makeSelectWidth);
  const value = yield select(makeSelectValue);
  const description = yield select(makeSelectDescription);
  const quantity = yield select(makeSelectQuantity);

  try {
    yield call(putOrdersAPI, {
      id,
      MAWB,
      containerNumber,
      trackingNumber,
      shipper,
      shipperAddress,
      shipperPhoneNumber,
      destinationCountry,
      recipient,
      RUT,
      recipientEmail,
      recipientPhoneNumber,
      region,
      province,
      comuna,
      address,
      weight,
      height,
      length,
      width,
      value,
      description,
      quantity,
    });
    yield put(modifyOrdersSuccess());
    yield put(getOrdersAction());
  } catch (error) {
    yield put(modifyOrdersFailure(error));
  }
}

export function* putOrdersWithZoneIdSaga({ payload: { id, zoneId } }) {
  try {
    yield call(putOrdersWithZoneIdAPI, { id, zoneId });
    yield put(modifyOrdersWithZoneIdSuccess());
  } catch (error) {
    yield put(modifyOrdersWithZoneIdFailure(error));
  }
}

export function* delOrdersSaga({ payload: id }) {
  try {
    yield call(delOrdersAPI, { id });
    yield put(delOrdersSuccess());
    yield put(getOrdersAction());
  } catch (error) {
    yield put(delOrdersFailure(error));
  }
}

export default function* usersSaga() {
  yield takeEvery(GET_ORDERS_REQUEST, getOrdersSaga);
  yield takeEvery(ADD_ORDER_REQUEST, postOrdersSaga);
  yield takeEvery(MODIFY_ORDER_REQUEST, putOrdersSaga);
  yield takeEvery(DEL_ORDER_REQUEST, delOrdersSaga);
  yield takeEvery(TRACK_ORDER_REQUEST, trackOrderSaga);
  yield takeEvery(TRACK_ORDER_LIST_REQUEST, trackOrderListSaga);
  yield takeEvery(ADD_ORDER_LIST_REQUEST, postOrderListSaga);
  yield takeLatest(GET_ORDERS_UPDATED_AT_REQUEST, getOrdersByUpdatedAtSaga);
}
