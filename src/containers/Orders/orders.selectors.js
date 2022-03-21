import { createSelector } from 'reselect';
import { find, sortBy } from 'lodash';
import { initialState } from './orders.reducer';

const selectOrdersDomain = state => state?.orders || initialState;

const selectOrdersList = createSelector(selectOrdersDomain, substate => {
  return sortBy(substate.ordersList, ['id']);
});

const selectAddOrderModalVisible = createSelector(selectOrdersDomain, substate => substate.addOrderModalVisible);
const selectAddOrderModalLoading = createSelector(selectOrdersDomain, substate => substate.addOrderModalLoading);

const selectModifyOrderModalVisible = createSelector(selectOrdersDomain, substate => substate.modifyOrderModalVisible);
const selectModifyOrderModalLoading = createSelector(selectOrdersDomain, substate => substate.modifyOrderModalLoading);

const selectTrackOrder = createSelector(selectOrdersDomain, substate => substate.trackOrder);

const makeSelectMAWB = createSelector(selectOrdersDomain, substate => substate.orderForm.MAWB);
const makeSelectContainerNumber = createSelector(selectOrdersDomain, substate => substate.orderForm.containerNumber);
const makeSelectTrackingNumber = createSelector(selectOrdersDomain, substate => substate.orderForm.trackingNumber);
const makeSelectShipper = createSelector(selectOrdersDomain, substate => substate.orderForm.shipper);
const makeSelectShipperPhoneNumber = createSelector(
  selectOrdersDomain,
  substate => substate.orderForm.shipperPhoneNumber,
);
const makeSelectShipperAddress = createSelector(selectOrdersDomain, substate => substate.orderForm.shipperAddress);
const makeSelectDestinationCountry = createSelector(
  selectOrdersDomain,
  substate => substate.orderForm.destinationCountry,
);
const makeSelectRecipient = createSelector(selectOrdersDomain, substate => substate.orderForm.recipient);
const makeSelectRUT = createSelector(selectOrdersDomain, substate => substate.orderForm.RUT);
const makeSelectRecipientPhoneNumber = createSelector(
  selectOrdersDomain,
  substate => substate.orderForm.recipientPhoneNumber,
);
const makeSelectRecipientEmail = createSelector(selectOrdersDomain, substate => substate.orderForm.recipientEmail);
const makeSelectRegion = createSelector(selectOrdersDomain, substate => substate.orderForm.region);
const makeSelectProvince = createSelector(selectOrdersDomain, substate => substate.orderForm.province);
const makeSelectComuna = createSelector(selectOrdersDomain, substate => substate.orderForm.comuna);
const makeSelectAddress = createSelector(selectOrdersDomain, substate => substate.orderForm.address);
const makeSelectWeight = createSelector(selectOrdersDomain, substate => substate.orderForm.weight);
const makeSelectValue = createSelector(selectOrdersDomain, substate => substate.orderForm.value);
const makeSelectDescription = createSelector(selectOrdersDomain, substate => substate.orderForm.description);
const makeSelectQuantity = createSelector(selectOrdersDomain, substate => substate.orderForm.quantity);

const makeSelectOrdersById = id =>
  createSelector(selectOrdersList, ordersList => {
    return find(ordersList, { id: id });
  });

export {
  selectOrdersDomain,
  selectOrdersList,
  selectAddOrderModalVisible,
  selectAddOrderModalLoading,
  selectModifyOrderModalVisible,
  selectModifyOrderModalLoading,
  selectTrackOrder,
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
};
