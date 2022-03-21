import React, { memo } from 'react';
import readXlsxFile from 'read-excel-file';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
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

function UploadFileModal(props) {
  async function readFile() {
    let isDetailInfoSheet;
    const input = document.getElementById('xlsxInput');
    input.addEventListener('change', () => {
      props.setUploadingPercent(0);
      props.setFiles(input.files || []);
      readXlsxFile(input.files[0], { getSheets: true }).then(sheets => {
        isDetailInfoSheet = sheets.find(sheet => sheet === 'Detail info') !== undefined ? true : false;
      });
      readXlsxFile(input.files[0], { sheet: 'Detail info' }).then(async rows => {
        for (let index = 0; index < rows.length; index++) {
          props.setUploadingPercent(Math.ceil(index / rows.length) * 100);

          if (index === 1) {
            if (rows[index].length !== 19) {
              return;
            }
          }
          if (index >= 2) {
            const row = rows[index];
            const data = {
              MAWB: row[0],
              containerNumber: row[1],
              tackingNumber: row[2],
              shipper: row[3],
              shipperPhoneNumber: row[4].toString(),
              shipperAddress: row[5],
              destinationCountry: row[6],
              recipient: row[7],
              RUT: row[8].toString(),
              recipientPhoneNumber: row[9].toString(),
              recipientEmail: row[10],
              region: row[11],
              province: row[12],
              comuna: row[13],
              address: row[14],
              weight: row[15],
              value: row[16],
              description: row[17],
              quantity: row[18],
            };
            await uploadOrder(data);
          }
        }
      });
    });
  }
  async function uploadOrder(data) {
    await props.onChangeMAWB(data.MAWB);
    await props.onChangeContainerNumber(data.containerNumber);
    await props.onChangeTrackingNumber(data.tackingNumber);
    await props.onChangeShipper(data.shipper);
    await props.onChangeShipperPhoneNumber(data.shipperPhoneNumber);
    await props.onChangeShipperAddress(data.shipperAddress);
    await props.onChangeDestinationCountry(data.destinationCountry);
    await props.onChangeRecipient(data.recipient);
    await props.onChangeRUT(data.RUT);
    await props.onChangeRecipientPhoneNumber(data.recipientPhoneNumber);
    await props.onChangeRecipientEmail(data.recipientEmail);
    await props.onChangeRegion(data.region);
    await props.onChangeProvince(data.province);
    await props.onChangeComuna(data.comuna);
    await props.onChangeAddress(data.address);
    await props.onChangeWeight(data.weight);
    await props.onChangeValue(data.value);
    await props.onChangeDescription(data.description);
    await props.onChangeQuantity(data.quantity);
    await props.addOrders();
  }

  React.useEffect(() => {
    readFile();
  }, []);

  return <React.Fragment />;
}

UploadFileModal.propTypes = {
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
  onChangeMAWB: e => dispatch(onChangeMAWBAction(e)),
  onChangeContainerNumber: e => dispatch(onChangeContainerNumberAction(e)),
  onChangeTrackingNumber: e => dispatch(onChangeTrackingNumberAction(e)),
  onChangeShipper: e => dispatch(onChangeShipperAction(e)),
  onChangeShipperPhoneNumber: e => dispatch(onChangeShipperPhoneNumberAction(e)),
  onChangeShipperAddress: e => dispatch(onChangeShipperAddressAction(e)),
  onChangeDestinationCountry: e => dispatch(onChangeDestinationCountryAction(e)),
  onChangeRecipient: e => dispatch(onChangeRecipientAction(e)),
  onChangeRUT: e => dispatch(onChangeRUTAction(e)),
  onChangeRecipientEmail: e => dispatch(onChangeRecipientEmailAction(e)),
  onChangeRecipientPhoneNumber: e => dispatch(onChangeRecipientPhoneNumberAction(e)),
  onChangeRegion: e => dispatch(onChangeRegionAction(e)),
  onChangeProvince: e => dispatch(onChangeProvinceAction(e)),
  onChangeComuna: e => dispatch(onChangeComunaAction(e)),
  onChangeAddress: e => dispatch(onChangeAddressAction(e)),
  onChangeWeight: e => dispatch(onChangeWeightAction(e)),
  onChangeValue: e => dispatch(onChangeValueAction(e)),
  onChangeDescription: e => dispatch(onChangeDescriptionAction(e)),
  onChangeQuantity: e => dispatch(onChangeQuantityAction(e)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(UploadFileModal);
