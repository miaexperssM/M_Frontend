import React, { memo } from 'react';
import readXlsxFile from 'read-excel-file';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as excelDataTransfer from 'utils/excelDataTransfer';

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
import { notification } from 'antd';

function UploadSimpleTemplateModal(props) {
  async function readFile() {
    try {
      let isDetailInfoSheet;
      const input = document.getElementById('xlsxSimpleInput');
      input.addEventListener('change', () => {
        if (input.files.length !== 0) {
          const dataList = [];
          props.setUploadingPercent(0);
          props.setFiles(input.files);
          readXlsxFile(input.files[0], { getSheets: true }).then(sheets => {
            console.log(sheets);
            isDetailInfoSheet = sheets.find(sheet => sheet === 'Detail info') !== undefined ? true : false;
          });
          console.log(input.files.length, isDetailInfoSheet);

          readXlsxFile(input.files[0], { sheet: 'Detail info' }).then(async rows => {
            for (let index = 0; index < rows.length; index++) {
              props.setUploadingPercent(Math.ceil(index / rows.length) * 100);

              if (index === 1) {
                if (rows[index].length !== 8) {
                  return;
                }
              }
              if (index >= 2) {
                const row = rows[index];
                const data = {
                  MAWB: '',
                  containerNumber: '',
                  trackingNumber: excelDataTransfer.stringTrans(row[0]),
                  shipper: '',
                  shipperPhoneNumber: '',
                  shipperAddress: '',
                  destinationCountry: excelDataTransfer.stringTrans(row[1]),
                  recipient: excelDataTransfer.stringTrans(row[2]),
                  RUT: '',
                  recipientPhoneNumber: excelDataTransfer.stringTrans(row[3]),
                  recipientEmail: '',
                  region: excelDataTransfer.stringTrans(row[4]),
                  province: excelDataTransfer.stringTrans(row[5]),
                  comuna: excelDataTransfer.stringTrans(row[6]),
                  address: excelDataTransfer.stringTrans(row[7]),
                  weight: 0,
                  value: 0,
                  description: '',
                  quantity: 0,
                };
                dataList.push(data);
              }
            }
            props.setUploadingDataList(dataList);
          });
        } else {
          props.setUploadingPercent(100);
          props.setFiles([]);
          props.setUploadingDataList([]);
        }
      });
    } catch (e) {
      console.error(e);
      notification['error']({
        message: 'Format Error, please check uploaded file',
      });
    }
  }

  React.useEffect(() => {
    readFile();
  }, []);

  return <React.Fragment />;
}

UploadSimpleTemplateModal.propTypes = {
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

export default compose(withConnect, memo)(UploadSimpleTemplateModal);
