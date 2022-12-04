import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Table, Button, Input, Tag, Icon } from 'antd';
import { selectOrdersList, selectAddOrderFailList, selectAddOrderSuccessList } from '../orders.selectors';
import { makeSelectUser } from 'global.selectors';
import { Link } from 'react-router-dom';
import 'App.css';

function UploadOrdersTable(props) {
  const [ordersList, setOrdersList] = React.useState([]);

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
    { title: 'Shipper', dataIndex: 'shipper', key: 'shipper' },
    {
      title: 'Shipper Phone Num ',
      dataIndex: 'shipperPhoneNumber',
      key: 'shipperPhoneNumber',
    },
    { title: 'Destination Country', dataIndex: 'destinationCountry', key: 'destinationCountry' },
    {
      title: 'Recipient',
      dataIndex: 'recipient',
      key: 'recipient',
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
      title: 'Search',
      dataIndex: 'search',
      key: 'search',
      render: (value, record) => renderSearchButton(value, record),
    },
  ];

  /* ------------------ */
  /* -     Handler     - */
  /* ------------------ */

  const renderResultTag = (value, record) => {
    const isSuccess = props.addOrderSuccessList?.some(order => order.trackingNumber == record.trackingNumber);
    return <Tag color={isSuccess ? 'green' : 'red'}>{isSuccess ? 'Success' : 'Failed'}</Tag>;
  };

  const filterResult = (value, record) => {
    const isSuccess = props.addOrderSuccessList?.some(order => order.trackingNumber == record.trackingNumber);
    const result = isSuccess ? 'Success' : 'Failed';
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
  /* ------------------ */
  /* -     Render     - */
  /* ------------------ */
  return (
    <Table
      dataSource={ordersList}
      columns={columns}
      style={{ width: '120vw' }}
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
};

const mapStateToProps = createStructuredSelector({
  ordersList: selectOrdersList,
  addOrderFailList: selectAddOrderFailList,
  addOrderSuccessList: selectAddOrderSuccessList,
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(UploadOrdersTable);
