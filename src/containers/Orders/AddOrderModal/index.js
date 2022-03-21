import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Modal, Input, Tag, InputNumber } from 'antd';

import {
  selectAddOrderModalVisible,
  selectAddOrderModalLoading,
  makeSelectMAWB,
  makeSelectContainerNumber,
  makeSelectTrackingNumber,
  makeSelectShipper,
  makeSelectShipperAddress,
  makeSelectShipperPhoneNumber,
  makeSelectDestinationCountry,
  makeSelectRecipient,
  makeSelectRecipientEmail,
  makeSelectRecipientPhoneNumber,
  makeSelectRUT,
  makeSelectRegion,
  makeSelectProvince,
  makeSelectComuna,
  makeSelectAddress,
  makeSelectWeight,
  makeSelectValue,
  makeSelectDescription,
  makeSelectQuantity,
} from '../orders.selectors';
import {
  handleAddOrderModalCancelAction,
  onChangeMAWBAction,
  onChangeContainerNumberAction,
  onChangeTrackingNumberAction,
  onChangeShipperAction,
  onChangeShipperPhoneNumberAction,
  onChangeShipperAddressAction,
  onChangeDestinationCountryAction,
  onChangeRecipientAction,
  onChangeRUTAction,
  onChangeRecipientPhoneNumberAction,
  onChangeRecipientEmailAction,
  onChangeRegionAction,
  onChangeProvinceAction,
  onChangeComunaAction,
  onChangeAddressAction,
  onChangeWeightAction,
  onChangeValueAction,
  onChangeDescriptionAction,
  onChangeQuantityAction,
  addOrdersAction,
} from '../orders.actions';

function AddOrderModal(props) {
  return (
    <Modal
      title="AddOrder"
      visible={props.addOrderModalVisible}
      onOk={props.addOrders}
      confirmLoading={props.addOrderModalLoading}
      onCancel={props.handleAddOrderModalCancel}
    >
      <div style={{ marginBottom: 10 }}>
        <Input placeholder="MAWB" onChange={props.onChangeMAWB} value={props.MAWB} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Input placeholder="Container Num" onChange={props.onChangeContainerNumber} value={props.containerNumber} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Input placeholder="Tracking Num" onChange={props.onChangeTrackingNumber} value={props.trackingNumber} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Input placeholder="Shipper" onChange={props.onChangeShipper} value={props.shipper} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Input
          placeholder="Shipper Phone Number"
          onChange={props.onChangeShipperPhoneNumber}
          value={props.shipperPhoneNumber}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Input placeholder="Shipper" onChange={props.onChangeShipperAddress} value={props.shipperAddress} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Input
          placeholder="Destination Country"
          onChange={props.onChangeDestinationCountry}
          value={props.destinationCountry}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Input placeholder="Recipient" onChange={props.onChangeRecipient} value={props.recipient} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Input placeholder="RUT" onChange={props.onChangeRUT} value={props.RUT} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Input
          placeholder="Recipient Phone Num"
          onChange={props.onChangeRecipientPhoneNumber}
          value={props.recipientPhoneNumber}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Input placeholder="Recipient Email" onChange={props.onChangeRecipientEmail} value={props.recipientEmail} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Input placeholder="Region" onChange={props.onChangeRegion} value={props.region} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Input placeholder="Province" onChange={props.onChangeProvince} value={props.province} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Input placeholder="Comuna" onChange={props.onChangeComuna} value={props.comuna} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Input placeholder="Detail Address" onChange={props.onChangeAddress} value={props.address} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Tag>Weight</Tag>
        <InputNumber onChange={props.onChangeWeight} value={props.weight} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Tag>Value</Tag>
        <InputNumber onChange={props.onChangeValue} value={props.value} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Input placeholder="Description" onChange={props.onChangeDescription} value={props.description} />
      </div>
      <div style={{ marginBottom: 10 }}>
        <Tag>Quantity</Tag>
        <InputNumber onChange={props.onChangeQuantity} value={props.quantity} />
      </div>
    </Modal>
  );
}

AddOrderModal.propTypes = {
  addOrderModalVisible: PropTypes.bool,
  addOrderModalLoading: PropTypes.bool,
  MAWB: PropTypes.string,
  containerNumber: PropTypes.string,
  trackingNumber: PropTypes.string,
  shipper: PropTypes.string,
  shipperPhoneNumber: PropTypes.string,
  shipperAddress: PropTypes.string,
  destinationCountry: PropTypes.string,
  recipient: PropTypes.string,
  recipientPhoneNumber: PropTypes.string,
  recipientEmail: PropTypes.string,
  RUT: PropTypes.string,
  region: PropTypes.string,
  province: PropTypes.string,
  comuna: PropTypes.string,
  address: PropTypes.string,
  weight: PropTypes.number,
  value: PropTypes.number,
  description: PropTypes.string,
  quantity: PropTypes.number,
  addOrders: PropTypes.func,
  handleAddModalCancel: PropTypes.func,
  onChangeMAWB: PropTypes.func,
  onChangeContainerNumber: PropTypes.func,
  onChangeTrackingNumber: PropTypes.func,
  onChangeShipper: PropTypes.func,
  onChangeShipperPhoneNumber: PropTypes.func,
  onChangeShipperAddress: PropTypes.func,
  onChangeDestinationCountry: PropTypes.func,
  onChangeRecipient: PropTypes.func,
  onChangeRUT: PropTypes.func,
  onChangeRecipientEmail: PropTypes.func,
  onChangeRecipientPhoneNumber: PropTypes.func,
  onChangeRegion: PropTypes.func,
  onChangeProvince: PropTypes.func,
  onChangeComuna: PropTypes.func,
  onChangeAddress: PropTypes.func,
  onChangeWeight: PropTypes.func,
  onChangeValue: PropTypes.func,
  onChangeDescription: PropTypes.func,
  onChangeQuantity: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  addOrderModalVisible: selectAddOrderModalVisible,
  addOrderModalLoading: selectAddOrderModalLoading,
  MAWB: makeSelectMAWB,
  containerNumber: makeSelectContainerNumber,
  trackingNumber: makeSelectTrackingNumber,
  shipper: makeSelectShipper,
  shipperPhoneNumber: makeSelectShipperPhoneNumber,
  shipperAddress: makeSelectShipperAddress,
  destinationCountry: makeSelectDestinationCountry,
  recipient: makeSelectRecipient,
  RUT: makeSelectRUT,
  recipientPhoneNumber: makeSelectRecipientPhoneNumber,
  recipientEmail: makeSelectRecipientEmail,
  region: makeSelectRegion,
  province: makeSelectProvince,
  comuna: makeSelectComuna,
  address: makeSelectAddress,
  value: makeSelectValue,
  description: makeSelectDescription,
  quantity: makeSelectQuantity,
  weight: makeSelectWeight,
});

const mapDispatchToProps = dispatch => ({
  addOrders: () => dispatch(addOrdersAction()),
  handleAddOrderModalCancel: () => dispatch(handleAddOrderModalCancelAction()),
  onChangeMAWB: e => dispatch(onChangeMAWBAction(e.target.value)),
  onChangeContainerNumber: e => dispatch(onChangeContainerNumberAction(e.target.value)),
  onChangeTrackingNumber: e => dispatch(onChangeTrackingNumberAction(e.target.value)),
  onChangeShipper: e => dispatch(onChangeShipperAction(e.target.value)),
  onChangeShipperPhoneNumber: e => dispatch(onChangeShipperPhoneNumberAction(e.target.value)),
  onChangeShipperAddress: e => dispatch(onChangeShipperAddressAction(e.target.value)),
  onChangeDestinationCountry: e => dispatch(onChangeDestinationCountryAction(e.target.value)),
  onChangeRecipient: e => dispatch(onChangeRecipientAction(e.target.value)),
  onChangeRUT: e => dispatch(onChangeRUTAction(e.target.value)),
  onChangeRecipientEmail: e => dispatch(onChangeRecipientEmailAction(e.target.value)),
  onChangeRecipientPhoneNumber: e => dispatch(onChangeRecipientPhoneNumberAction(e.target.value)),
  onChangeRegion: e => dispatch(onChangeRegionAction(e.target.value)),
  onChangeProvince: e => dispatch(onChangeProvinceAction(e.target.value)),
  onChangeComuna: e => dispatch(onChangeComunaAction(e.target.value)),
  onChangeAddress: e => dispatch(onChangeAddressAction(e.target.value)),
  onChangeWeight: e => dispatch(onChangeWeightAction(e)),
  onChangeValue: e => dispatch(onChangeValueAction(e)),
  onChangeDescription: e => dispatch(onChangeDescriptionAction(e.target.value)),
  onChangeQuantity: e => dispatch(onChangeQuantityAction(e)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AddOrderModal);
