import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { selectOrdersList } from '../orders.selectors';
import { makeSelectUser } from 'global.selectors';
import { getOrdersAction, getOrdersByUpdatedAtAction, trackOrderListAction } from '../orders.actions';
import { Modal, Row, Col, Button, Tabs, Input, Spin, Tag, notification, Progress, DatePicker } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;

const { RangePicker } = DatePicker;

function SearchingModal(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [trackingNumberSearchArray, setTrackingNumberSearchArray] = React.useState([]);
  const [datePickerRange, setDatePickerRange] = React.useState(undefined);
  const [searchResultNumber, setSearchResultNumber] = React.useState(undefined);

  function onDatePickerChange(date, dateString) {
    if (date === null) {
      setDatePickerRange(undefined);
    } else {
      setDatePickerRange(date);
    }
  }

  function onTrackingNumberInputChange(e) {
    if (e.target.value !== '') {
      const array = e.target.value.split(/[.,!,?,\n, ]/);
      setTrackingNumberSearchArray(array);
    } else {
      setTrackingNumberSearchArray([]);
    }
  }

  async function onSearchTrackingNumberList() {
    if (trackingNumberSearchArray.length === 0) {
      notification['warning']({
        message: `Tracking Number cannot be null`,
        duration: 3,
      });
    } else {
      console.log(trackingNumberSearchArray);
      props.getTrackOrderList(trackingNumberSearchArray);
    }
  }

  useEffect(() => {
    setTrackingNumberSearchArray([]);
    setDatePickerRange(undefined);
    setSearchResultNumber(undefined);
  }, [props.isVisiable]);

  useEffect(() => {
    setSearchResultNumber(props.ordersList.filter(order => order.value !== 'Not Found').length);
  }, [props.ordersList]);

  return (
    <Modal
      okText="Save"
      cancelText="Reset"
      title="Orders Search"
      visible={props.isVisiable}
      width={1000}
      onOk={() => {
        props.setIsVisiable(false);
      }}
      closable={false}
      confirmLoading={isLoading}
      onCancel={() => {
        props.setIsVisiable(false);
      }}
    >
      <Row style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Col span={12}>
          <Row>Search by Update Date:</Row>
          <Row>
            <RangePicker onChange={onDatePickerChange} format={'DD-MM-YYYY'} allowClear value={datePickerRange} />
            <Button
              type="primary"
              onClick={() => {
                setIsLoading(true);
                props.getOrdersByUpdatedAt({ from: datePickerRange[0].format(), to: datePickerRange[1].format() });
                setIsLoading(false);
              }}
            >
              Search
            </Button>
          </Row>
          {datePickerRange !== undefined ? (
            <Row>Searching days: {dayjs(datePickerRange[1]).diff(dayjs(datePickerRange[0]), 'days')}</Row>
          ) : (
            <React.Fragment />
          )}
        </Col>
        <Col span={12}>
          <Row>Search by Tracking Number:</Row>
          <Row>
            <Input.Group compact>
              <TextArea
                rows={5}
                style={{ width: 'calc(100% - 200px)' }}
                onChange={onTrackingNumberInputChange}
                value={trackingNumberSearchArray.toString()}
                allowClear
              />
              <Button
                type="primary"
                onClick={() => {
                  setIsLoading(true);
                  onSearchTrackingNumberList();
                  setIsLoading(false);
                }}
              >
                Search
              </Button>
            </Input.Group>
            {trackingNumberSearchArray.length !== 0 ? (
              <Row>Searching Items: {trackingNumberSearchArray.length}</Row>
            ) : (
              <React.Fragment />
            )}
          </Row>
        </Col>
      </Row>
      {searchResultNumber !== undefined ? (
        <Row>Search Result Items: {searchResultNumber} Orders</Row>
      ) : (
        <React.Fragment />
      )}
    </Modal>
  );
}

SearchingModal.propTypes = {
  ordersList: PropTypes.array,
  isVisiable: PropTypes.bool,
  setIsVisiable: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  ordersList: selectOrdersList,
  user: makeSelectUser(),
});

const mapDispatchToProps = dispatch => ({
  getOrders: payload => dispatch(getOrdersAction(payload)),
  getTrackOrderList: trackingNumberList => dispatch(trackOrderListAction(trackingNumberList)),
  getOrdersByUpdatedAt: date => dispatch(getOrdersByUpdatedAtAction(date)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SearchingModal);
