import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Table, Button, Input, Tag, Icon, Select } from 'antd';
import { selectOrdersList, selectAddOrderFailList, selectAddOrderSuccessList } from '../orders.selectors';
import { modifyOrdersWithZoneIdAction } from '../orders.actions';
import { makeSelectUser } from 'global.selectors';
import { Link } from 'react-router-dom';
import 'App.css';
import { getZonesAPI } from 'containers/Zones/zones.api';
import { putOrdersWithZoneIdAPI } from '../orders.api';

function UploadOrdersTable(props) {
  const [ordersList, setOrdersList] = React.useState([]);
  const [zonesList, setZonesList] = React.useState([]);
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
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (value, record) => renderResultTag(value, record),
      onFilter: (value, record) => filterResult(value, record),
      filters: [
        { text: 'Failed', value: 'Failed' },
        { text: 'Success', value: 'Success' },
      ],
    },
    {
      title: 'Tracking Num',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
    },
    {
      title: 'Localization Accuracy',
      dataIndex: 'score',
      key: 'score',
      render: (value, record) => renderAccuracyTag(value, record),
    },
    {
      title: 'Zone',
      dataIndex: 'zoneId',
      key: 'changeZoneId',
      render: (value, record) => renderChangeZoneSelection(value, record),
      width: 300,
    },
    {
      title: 'Search',
      dataIndex: 'search',
      key: 'search',
      render: (value, record) => renderSearchButton(value, record),
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
  ];

  /* ------------------ */
  /* -     Handler     - */
  /* ------------------ */

  const renderResultTag = (value, record) => {
    const isSuccess = props.addOrderSuccessList?.some(order => order.trackingNumber == record.trackingNumber);
    return <Tag color={isSuccess ? 'green' : 'red'}>{isSuccess ? 'Success' : 'Failed'}</Tag>;
  };

  const renderAccuracyTag = (value, record) => {
    const isWarning = record.score <= 85;
    const accuracy = record.score ? record.score.toFixed(2) : 0;
    return <Tag color={!isWarning ? 'green' : 'red'}>{accuracy}</Tag>;
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
      if (e !== 'NOT FOUND') {
        await changeZoneIdInOrder(record.id, e);
      } else {
        await changeZoneIdInOrder(record.id, undefined);
      }
    };

    const onSearch = e => {
      console.log(e);
    };

    return (
      <Select
        showSearch
        className="select-in-table"
        disabled={!props.addOrderSuccessList?.some(order => order.trackingNumber == record.trackingNumber)}
        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        style={{ color: !isWarning ? 'green' : 'red' }}
        placeholder={zone?.title.padEnd('15') || `NOT FOUND`}
        options={options}
        onSearch={onSearch}
        optionFilterProp="children"
        onChange={handleChangeZone}
      />
    );
  };

  const filterResult = (value, record) => {
    const isSuccess = props.addOrderSuccessList?.some(order => order.trackingNumber == record.trackingNumber);
    const result = isSuccess ? (record.score > 85 ? 'Success' : 'Warning') : 'Failed';
    return result === value;
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

  React.useEffect(() => {
    setOrdersList(props.addOrderFailList.concat(props.addOrderSuccessList));
  }, [props.addOrderFailList, props.addOrderSuccessList]);

  React.useEffect(() => {
    const getZones = async () => {
      const res = await Promise.resolve(getZonesAPI());
      if (res.status == 200) {
        setZonesList(res.data);
      }
    };
    getZones();
  }, []);
  /* ------------------ */
  /* -     Render     - */
  /* ------------------ */
  return (
    <Table
      dataSource={ordersList}
      columns={columns}
      style={{ width: '100vw' }}
      rowClassName={(record, index) =>
        props.addOrderSuccessList?.some(order => order.trackingNumber == record.trackingNumber)
          ? 'table-row-light'
          : 'table-row-dark'
      }
    />
  );
}

UploadOrdersTable.propTypes = {
  ordersList: PropTypes.array,
  addOrderFailList: PropTypes.array,
  addOrderSuccessList: PropTypes.array,
  modifyOrdersWithZoneId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  ordersList: selectOrdersList,
  addOrderFailList: selectAddOrderFailList,
  addOrderSuccessList: selectAddOrderSuccessList,
  user: makeSelectUser(),
});

const mapDispatchToProps = dispatch => ({
  modifyOrdersWithZoneId: ({ id, zoneId }) => dispatch(modifyOrdersWithZoneIdAction({ id, zoneId })),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UploadOrdersTable);
