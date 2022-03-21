import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_FAILURE,
  GET_ORDERS_SUCCESS,
  TRACK_ORDER_REQUEST,
  TRACK_ORDER_SUCCESS,
  TRACK_ORDER_FAILURE,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
  DEL_ORDER_REQUEST,
  DEL_ORDER_SUCCESS,
  DEL_ORDER_FAILURE,
  MODIFY_ORDER_REQUEST,
  MODIFY_ORDER_SUCCESS,
  MODIFY_ORDER_FAILURE,
  HANDLE_ADD_ORDER_MODAL_SHOW,
  HANDLE_ADD_ORDER_MODAL_CANCEL,
  HANDLE_MODIFY_ORDER_MODAL_SHOW,
  HANDLE_MODIFY_ORDER_MODAL_CANCEL,
  ON_CHANGE_MAWB,
  ON_CHANGE_CONTAINER_NUMBER,
  ON_CHANGE_TRACKING_NUMBER,
  ON_CHANGE_SHIPPER,
  ON_CHANGE_SHIPPER_PHONE_NUMBER,
  ON_CHANGE_SHIPPER_ADDRESS,
  ON_CHANGE_DESTINATION_COUNTRY,
  ON_CHANGE_RECIPIENT,
  ON_CHANGE_RUT,
  ON_CHANGE_RECIPIENT_PHONE_NUMBER,
  ON_CHANGE_RECIPIENT_EMAIL,
  ON_CHANGE_REGION,
  ON_CHANGE_PROVINCE,
  ON_CHANGE_COMUNA,
  ON_CHANGE_ADDRESS,
  ON_CHANGE_WEIGHT,
  ON_CHANGE_VALUE,
  ON_CHANGE_DESCRIPTION,
  ON_CHANGE_QUANTITY,
} from './orders.constants';

export const getOrdersAction = payload => ({ type: GET_ORDERS_REQUEST, payload });
export const getOrdersSuccess = payload => ({ type: GET_ORDERS_SUCCESS, payload });
export const getOrdersFailure = payload => ({ type: GET_ORDERS_FAILURE, payload });

export const trackOrdersAction = payload => ({ type: TRACK_ORDER_REQUEST, payload });
export const trackOrdersSuccess = payload => ({ type: TRACK_ORDER_SUCCESS, payload });
export const trackOrdersFailure = payload => ({ type: TRACK_ORDER_FAILURE, payload });

export const addOrdersAction = payload => ({ type: ADD_ORDER_REQUEST, payload });
export const addOrdersSuccess = payload => ({ type: ADD_ORDER_SUCCESS, payload });
export const addOrdersFailure = payload => ({ type: ADD_ORDER_FAILURE, payload });

export const delOrdersAction = payload => ({ type: DEL_ORDER_REQUEST, payload });
export const delOrdersSuccess = payload => ({ type: DEL_ORDER_SUCCESS, payload });
export const delOrdersFailure = payload => ({ type: DEL_ORDER_FAILURE, payload });

export const modifyOrdersAction = payload => ({ type: MODIFY_ORDER_REQUEST, payload });
export const modifyOrdersSuccess = payload => ({ type: MODIFY_ORDER_SUCCESS, payload });
export const modifyOrdersFailure = payload => ({ type: MODIFY_ORDER_FAILURE, payload });

export const handleAddOrderModalShowAction = payload => ({ type: HANDLE_ADD_ORDER_MODAL_SHOW, payload });
export const handleAddOrderModalCancelAction = payload => ({ type: HANDLE_ADD_ORDER_MODAL_CANCEL, payload });

export const handleModifyOrderModalShowAction = payload => ({ type: HANDLE_MODIFY_ORDER_MODAL_SHOW, payload });
export const handleModifyOrderModalCancelAction = payload => ({ type: HANDLE_MODIFY_ORDER_MODAL_CANCEL, payload });

export const onChangeMAWBAction = payload => ({ type: ON_CHANGE_MAWB, payload });
export const onChangeContainerNumberAction = payload => ({ type: ON_CHANGE_CONTAINER_NUMBER, payload });
export const onChangeTrackingNumberAction = payload => ({ type: ON_CHANGE_TRACKING_NUMBER, payload });
export const onChangeShipperAction = payload => ({ type: ON_CHANGE_SHIPPER, payload });
export const onChangeShipperPhoneNumberAction = payload => ({ type: ON_CHANGE_SHIPPER_PHONE_NUMBER, payload });
export const onChangeShipperAddressAction = payload => ({ type: ON_CHANGE_SHIPPER_ADDRESS, payload });
export const onChangeDestinationCountryAction = payload => ({ type: ON_CHANGE_DESTINATION_COUNTRY, payload });
export const onChangeRecipientAction = payload => ({ type: ON_CHANGE_RECIPIENT, payload });
export const onChangeRUTAction = payload => ({ type: ON_CHANGE_RUT, payload });
export const onChangeRecipientPhoneNumberAction = payload => ({ type: ON_CHANGE_RECIPIENT_PHONE_NUMBER, payload });
export const onChangeRecipientEmailAction = payload => ({ type: ON_CHANGE_RECIPIENT_EMAIL, payload });
export const onChangeRegionAction = payload => ({ type: ON_CHANGE_REGION, payload });
export const onChangeProvinceAction = payload => ({ type: ON_CHANGE_PROVINCE, payload });
export const onChangeComunaAction = payload => ({ type: ON_CHANGE_COMUNA, payload });
export const onChangeAddressAction = payload => ({ type: ON_CHANGE_ADDRESS, payload });
export const onChangeWeightAction = payload => ({ type: ON_CHANGE_WEIGHT, payload });
export const onChangeValueAction = payload => ({ type: ON_CHANGE_VALUE, payload });
export const onChangeDescriptionAction = payload => ({ type: ON_CHANGE_DESCRIPTION, payload });
export const onChangeQuantityAction = payload => ({ type: ON_CHANGE_QUANTITY, payload });
