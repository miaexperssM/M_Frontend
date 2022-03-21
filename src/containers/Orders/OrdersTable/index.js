import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Table, Button, Popconfirm } from 'antd';
import { selectOrdersList } from '../orders.selectors';
import {
  handleModifyOrderModalCancelAction,
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
  modifyOrdersAction,
  delOrdersAction,
} from '../orders.actions';
import { Admin } from 'utils/enum';
import { makeSelectUser } from 'global.selectors';
import { Link } from 'react-router-dom';

function OrdersTable(props) {
  /* ------------------ */
  /* -     Const     - */
  /* ------------------ */
  const columns = [
    {
      title: 'MAWB',
      dataIndex: 'MAWB',
      key: 'MAWB',
    },
    {
      title: 'Container Num',
      dataIndex: 'containerNumber',
      key: 'containerNumber',
    },
    {
      title: 'Tracking Num',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
    },
    { title: 'Shipper', dataIndex: 'shipper', key: 'shipper' },
    {
      title: 'Shipper Phone Num ',
      dataIndex: 'shipperPhoneNumber',
      key: 'shipperPhoneNumber',
    },
    {
      title: 'Shipper Address',
      dataIndex: 'shipperAddress',
      key: 'shipperAddress',
    },

    { title: 'Destination Country', dataIndex: 'destinationCountry', key: 'destinationCountry' },
    {
      title: 'Recipient',
      dataIndex: 'recipient',
      key: 'recipient',
    },
    {
      title: 'RUT',
      dataIndex: 'RUT',
      key: 'RUT',
    },
    {
      title: 'Recipient Phone Num',
      dataIndex: 'recipientPhoneNumber',
      key: 'recipientPhoneNumber',
    },
    {
      title: 'Recipient Email',
      dataIndex: 'recipientEmail',
      key: 'recipientEmail',
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: 'Province',
      dataIndex: 'province',
      key: 'province',
    },
    {
      title: 'Comuna',
      dataIndex: 'comuna',
      key: 'comuna',
    },
    {
      title: 'Detail Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Item Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Search',
      dataIndex: 'search',
      key: 'search',
      render: (value, record) => renderSearchButton(value, record),
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (value, record) => renderEditButton(value, record),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      render: (value, record) => renderDeleteButton(value, record),
    },
  ];

  /* ------------------ */
  /* -     Handler     - */
  /* ------------------ */

  const renderEditButton = (value, record) => {
    return <Button onClick={() => renderEditModal(value, record)}>Edit</Button>;
  };

  const renderSearchButton = (value, record) => {
    return (
      <Button>
        <Link
          to={`/zones/${record.address}, ${record.comuna}, ${record.province}, ${record.region}, ${record.destinationCountry}`}
        >
          Go TO
        </Link>
      </Button>
    );
  };

  const renderDeleteButton = (value, record) => {
    return (
      <Popconfirm
        title="Are you sure to delete this order?"
        onConfirm={() => handleDelete(record.id)}
        okText="Yes"
        cancelText="No"
        disabled={props.user.permissions !== Admin}
      >
        <Button disabled={props.user.permissions !== Admin}>Delete</Button>
      </Popconfirm>
    );
  };

  const handleDelete = id => {
    props.delOrders(id);
  };

  const renderEditModal = (value, record) => {
    props.onModifyOrder();
    props.setModifyingId(record.id);
    props.onChangeMAWB(record.MAWB);
    props.onChangeContainerNumber(record.containerNumber);
    props.onChangeTrackingNumber(record.trackingNumber);
    props.onChangeShipper(record.shipper);
    props.onChangeShipperPhoneNumber(record.shipperPhoneNumber);
    props.onChangeShipperAddress(record.shipperAddress);
    props.onChangeDestinationCountry(record.destinationCountry);
    props.onChangeRecipient(record.recipient);
    props.onChangeRUT(record.RUT);
    props.onChangeRecipientPhoneNumber(record.recipientPhoneNumber);
    props.onChangeRecipientEmail(record.recipientEmail);
    props.onChangeRegion(record.region);
    props.onChangeProvince(record.province);
    props.onChangeComuna(record.comuna);
    props.onChangeAddress(record.address);
    props.onChangeWeight(record.weight);
    props.onChangeValue(record.value);
    props.onChangeDescription(record.description);
    props.onChangeQuantity(record.quantity);
  };

  /* ------------------ */
  /* -     Render     - */
  /* ------------------ */
  return <Table dataSource={props.ordersList} columns={columns} />;
}

OrdersTable.propTypes = {
  ordersList: PropTypes.array,
  onDeleteOrder: PropTypes.func,
  onModifyOrderModalShow: PropTypes.func,
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
  setModifyingId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  ordersList: selectOrdersList,
  user: makeSelectUser(),
});

const mapDispatchToProps = dispatch => ({
  modifyOrders: id => dispatch(modifyOrdersAction(id)),
  onDeleteOrder: id => dispatch(delOrdersAction(id)),
  handleModifyOrderModalCancel: () => dispatch(handleModifyOrderModalCancelAction()),
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

export default compose(withConnect, memo)(OrdersTable);
