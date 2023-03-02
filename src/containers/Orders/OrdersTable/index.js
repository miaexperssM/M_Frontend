import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Table, Button, Popconfirm, Select } from 'antd';
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
  onChangeHeightAction,
  onChangeLengthAction,
  onChangeValueAction,
  onChangeDescriptionAction,
  onChangeQuantityAction,
  modifyOrdersAction,
  delOrdersAction,
  getOrdersAction,
  onChangeWidthAction,
} from '../orders.actions';
import { Admin } from 'utils/enum';
import { makeSelectUser } from 'global.selectors';
import { Link } from 'react-router-dom';
import { getZonesAPI } from 'containers/Zones/zones.api';
import { putOrdersWithZoneIdAPI } from 'containers/Orders/orders.api';

function OrdersTable(props) {
  const [zonesList, setZonesList] = React.useState([]);
  const [ordersList, setOrdersList] = React.useState(props.ordersList);

  const zoneListMemo = React.useMemo(() => {
    const list = zonesList.map(zone => {
      return { id: zone.id, title: zone.title };
    });
    return list;
  }, [zonesList]);
  /* ------------------ */
  /* -     Const     - */
  /* ------------------ */
  const columns = [
    {
      title: 'Tracking Num',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
      fixed: 'left',
      width: 100,
    },
    { title: 'Destination Country', dataIndex: 'destinationCountry', key: 'destinationCountry' },
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
      title: 'Update Date',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (value, record) => {
        if (value) {
          return value.toString().slice(0, 10);
        } else return 'Undefined';
      },
    },
    {
      title: 'Zone',
      dataIndex: 'zoneId',
      key: 'changeZoneId',
      render: (value, record) => renderChangeZoneSelection(value, record),
      fixed: 'right',
      width: 150,
    },
    {
      title: 'Scan Image',
      dataIndex: 'Scan Image',
      key: 'scanImage',
      render: (value, record) => renderImageButton(value, record),
      fixed: 'right',
      width: 100,
    },
    {
      title: 'Search',
      dataIndex: 'search',
      key: 'search',
      render: (value, record) => renderSearchButton(value, record),
      fixed: 'right',
      width: 100,
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (value, record) => renderEditButton(value, record),
      fixed: 'right',
      width: 100,
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      render: (value, record) => renderDeleteButton(value, record),
      fixed: 'right',
      width: 100,
    },
  ];

  /* ------------------ */
  /* -     Handler     - */
  /* ------------------ */

  const renderEditButton = (value, record) => {
    return <Button onClick={() => renderEditModal(value, record)}>Edit</Button>;
  };

  const renderImageButton = (value, record) => {
    const link = `https://miaexpress-images.s3.ap-southeast-1.amazonaws.com/${record.trackingNumber}.jpg`;
    return (
      <Button
        disabled={record.isImageUploaded == undefined || !record.isImageUploaded}
        onClick={() => window.open(link, '_blank')}
      >
        View Image
      </Button>
    );
  };

  const renderSearchButton = (value, record) => {
    return (
      <Button>
        <Link
          to={`/zones?address=${record.address}, ${record.comuna}, ${record.province}, ${record.region}, ${record.destinationCountry}`}
        >
          Go To
        </Link>
      </Button>
    );
  };

  const renderChangeZoneSelection = (value, record) => {
    const zone = zoneListMemo.find(zone => zone.id === record.zoneId);
    const isWarning = record.score <= 85;

    const options = zoneListMemo.map(zone => {
      return {
        value: zone.id,
        label: zone.title,
      };
    });

    const handleChangeZone = async e => {
      await changeZoneIdInOrder(record.id, e);
    };

    const changeZoneIdInOrder = async (orderId, zoneId) => {
      const res = await Promise.resolve(putOrdersWithZoneIdAPI({ id: orderId, zoneId }));
      if (res.status == 201) {
        const updatedOrderList = ordersList.map(order => {
          if (order.id === orderId) {
            return res.data;
          } else {
            return order;
          }
        });
        setOrdersList(updatedOrderList);
      }
    };

    return (
      <Select
        // showSearch
        disabled={zone === undefined}
        style={{ width: 150 }}
        // filterOption={(input, option) => (option?.label ?? '').includes(input)}
        style={{ color: !isWarning ? 'green' : 'red' }}
        value={zone?.title || 'NOT FOUND'}
        options={options}
        // onSearch={onSearch}
        // optionFilterProp="children"
        onChange={handleChangeZone}
      />
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
    props.onChangeLength(record.length);
    props.onChangeHeight(record.height);
    props.onChangeWidth(record.width);
    props.onChangeDescription(record.description);
    props.onChangeQuantity(record.quantity);
  };

  React.useEffect(() => {
    const getZones = async () => {
      const res = await Promise.resolve(getZonesAPI());
      if (res.status == 200) {
        setZonesList(res.data);
      }
    };
    getZones();
  }, []);

  React.useEffect(() => {
    setOrdersList(props.ordersList);
  }, [props.ordersList]);

  /* ------------------ */
  /* -     Render     - */
  /* ------------------ */
  return <Table dataSource={ordersList} columns={columns} loading={props.isLoading} scroll={{ x: 1300 }} />;
}

OrdersTable.propTypes = {
  isLoading: PropTypes.bool,
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
  onChangeLength: PropTypes.func,
  onChangeHeight: PropTypes.func,
  onChangeWidth: PropTypes.func,
  onChangeDescription: PropTypes.func,
  onChangeQuantity: PropTypes.func,
  setModifyingId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  ordersList: selectOrdersList,
  user: makeSelectUser(),
});

const mapDispatchToProps = dispatch => ({
  getOrders: payload => dispatch(getOrdersAction(payload)),
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
  onChangeHeight: e => dispatch(onChangeHeightAction(e)),
  onChangeLength: e => dispatch(onChangeLengthAction(e)),
  onChangeWidth: e => dispatch(onChangeWidthAction(e)),
  onChangeValue: e => dispatch(onChangeValueAction(e)),
  onChangeDescription: e => dispatch(onChangeDescriptionAction(e)),
  onChangeQuantity: e => dispatch(onChangeQuantityAction(e)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(OrdersTable);
