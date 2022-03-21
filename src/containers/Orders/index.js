import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Button, Tabs, Input, message, Spin, Tag } from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  delOrdersAction,
  getOrdersAction,
  handleAddOrderModalShowAction,
  handleModifyOrderModalShowAction,
  modifyOrdersAction,
  trackOrdersAction,
} from './orders.actions';
import reducer from './orders.reducer';
import saga from './orders.saga';
import { makeSelectUser } from 'global.selectors';
import { selectTrackOrder } from './orders.selectors';
import AddOrderModal from './AddOrderModal';
import ModifyOrderModal from './ModifyOrderModal';
import OrdersTable from './OrdersTable';
import UploadFileModal from './UploadFileModal';
import { Loader, LoaderOptions } from 'google-maps';
import { getZonesAction } from 'containers/Zones/zones.actions';
import { selectZonesList } from 'containers/Zones/zones.selectors';

const key = 'orders';

function Orders(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { TabPane } = Tabs;
  const [tabsKey, setTabsKey] = React.useState('1');
  const [destinationAddress, setDestinationAddress] = React.useState('');
  const [modifyingId, setModifyingId] = React.useState(0);
  const [files, setFiles] = React.useState([]);
  const googleRef = React.useRef();
  const [zoneResult, setZoneResult] = React.useState();
  const [inputTrackingNumber, setInputTrackingNumber] = React.useState('');
  const [searching, setSearching] = React.useState(false);
  const [uploadingPercent, setUploadingPercent] = React.useState(100);
  let service;

  useEffect(() => {
    init();
  }, []);

  async function init() {
    await props.getOrders();
  }

  async function getTrackOrder(trackingNumber) {
    setSearching(true);
    await props.getTrackOrder(trackingNumber);
  }

  async function getCoordinate(address) {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const options = { libraries: ['drawing', 'places'] };
    const loader = new Loader(apiKey, options);
    const google = await loader.load();
    googleRef.current = google;

    const request = {
      query: address,
      fields: ['name', 'geometry'],
    };

    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 1, lng: 103 },
      zoom: 15,
    });

    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          const latlng = { lat, lng };

          if (props.zonesList && props.zonesList.length !== 0) {
            const zone = props.zonesList.find(zone => {
              console.log('searching zone', latlng, zone);
              const points = zone.points;
              const isIn = isInPolygon(latlng, points);
              if (isIn === true) {
                console.log('find zone: ', zone);
              }
              return isIn;
            });
            console.log('zone', zone, latlng);
            setZoneResult(zone);
          } else if (props.zonesList && props.zonesList.length === 0) {
            message.warning('zones data error, please set or re-read zones data');
          } else {
            message.error('zones data error, please read zones data in Home page');
          }
          break;
        }
      } else if (status === 'ZERO_RESULTS' && results === null) {
        message.error('No result');
      }
      setSearching(false);
    });
  }

  function isInPolygon(checkPoint, polygonPoints) {
    let counter = 0;
    let i;
    let xinters;
    let p1, p2;
    let pointCount = polygonPoints.length;
    p1 = polygonPoints[0];

    for (i = 1; i <= pointCount; i++) {
      p2 = polygonPoints[i % pointCount];

      if (checkPoint.lat > Math.min(p1.lat, p2.lat) && checkPoint.lat <= Math.max(p1.lat, p2.lat)) {
        if (checkPoint.lng <= Math.max(p1.lng, p2.lng)) {
          if (p1.lat !== p2.lat) {
            xinters = ((checkPoint.lat - p1.lat) * (p2.lng - p1.lng)) / (p2.lat - p1.lat) + p1.lng;
            if (p1.lng === p2.lng || checkPoint.lng <= xinters) {
              counter++;
            }
          }
        }
      }
      p1 = p2;
    }
    if (counter % 2 === 0) {
      return false;
    } else {
      return true;
    }
  }

  useEffect(() => {
    console.log('track', props.trackOrder);
    const record = props.trackOrder;
    if (record) {
      setDestinationAddress(
        `${record.address}, ${record.comuna}, ${record.province}, ${record.region}, ${record.destinationCountry}`,
      );
      setInputTrackingNumber('');
    } else {
      setDestinationAddress('');
    }
  }, [props.trackOrder]);

  useEffect(() => {
    getCoordinate(destinationAddress);
  }, [destinationAddress]);

  return (
    <>
      <Helmet>
        <title>Orders List</title>
        <meta name="Orders" content="Orders List" />
      </Helmet>
      <div id="map" style={{ height: '0px' }}></div>

      <div style={{ marginLeft: '40px', marginBottom: '10px' }}>
        <h1 style={{ fontSize: 'x-large' }}> Orders List </h1>
      </div>
      <Tabs activeKey={tabsKey} onTabClick={setTabsKey}>
        <TabPane tab="Order Searching" key="1">
          <Row>
            <Col span={24}>
              <Input
                onPressEnter={e => {
                  getTrackOrder(e.target.value);
                }}
                value={inputTrackingNumber}
                onChange={e => setInputTrackingNumber(e.target.value)}
              ></Input>
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col span={8}>
              <p>Order Address</p>
            </Col>
            <Col span={16}>
              <p>{destinationAddress}</p>
            </Col>
          </Row>
          <Row>
            <Col span={8}>{searching ? <Spin spinning={searching} tip="Searching..." /> : <React.Fragment />}</Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col span={8}>
              <p>Zone Info:</p>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={8}>
              <p style={{ fontSize: '18px' }}>Title</p>
            </Col>
            <Col span={16}>
              <p style={{ fontSize: '28px' }}>{zoneResult ? zoneResult.title : ''}</p>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={8}>
              <p style={{ fontSize: '18px' }}>Description</p>
            </Col>
            <Col span={16}>
              <p style={{ fontSize: '28px' }}>{zoneResult ? zoneResult.description : ''}</p>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Order Data" key="2">
          <Row style={{ width: '85vw', overflowX: 'scroll' }}>
            <Col span={24}>
              <OrdersTable
                onModifyOrder={props.handleModifyOrderModalShow}
                setModifyingId={setModifyingId}
                delOrders={id => props.delOrders(id)}
              />
            </Col>
          </Row>
          <AddOrderModal />
          <ModifyOrderModal modifyingId={modifyingId} />
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" onClick={props.handleAddOrderModalShow}>
              Add
            </Button>
          </div>
          <UploadFileModal setFiles={setFiles} setUploadingPercent={setUploadingPercent} />
          <Row>
            <Col span={24}>
              <input type="file" id="xlsxInput" accept=".xlsx" multiple={false} />
              {uploadingPercent === 100 ? <React.Fragment /> : <Tag>Uploading</Tag>}
              {/* {uploadingPercent === 100 ? <React.Fragment /> : <Progress percent={uploadingPercent} status="active" />} */}
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </>
  );
}

Orders.propTypes = {
  getOrders: PropTypes.func,
  getZones: PropTypes.func,
  handleAddOrderModalShow: PropTypes.func,
  handleModifyOrderModalShow: PropTypes.func,
  delOrders: PropTypes.func,
  trackOrder: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  trackOrder: selectTrackOrder,
  zonesList: selectZonesList,
});

const mapDispatchToProps = dispatch => ({
  getZones: () => dispatch(getZonesAction()),
  getOrders: () => dispatch(getOrdersAction()),
  getTrackOrder: trackingNumber => dispatch(trackOrdersAction(trackingNumber)),
  delOrders: id => dispatch(delOrdersAction(id)),
  handleAddOrderModalShow: () => dispatch(handleAddOrderModalShowAction()),
  handleModifyOrderModalShow: () => dispatch(handleModifyOrderModalShowAction()),
  modifyOrders: id => dispatch(modifyOrdersAction(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Orders);
