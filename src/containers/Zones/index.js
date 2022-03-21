import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Input, Button, InputNumber, Tag, notification, Tabs, message } from 'antd';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectUser } from 'global.selectors';
import { useInjectReducer } from 'utils/injectReducer';
import {
  getZonesAction,
  handleAddZoneModalShowAction,
  handleModifyZoneModalShowAction,
  modifyZonesAction,
} from './zones.actions';
import reducer from './zones.reducer';
import saga from './zones.saga';
import { useLocation } from 'react-router-dom';
import AddZoneModal from './AddZoneModal';
import ModifyZoneModal from './ModifyZoneModal';
import ZonesTable from './ZonesTable';
import ZonesMap from './ZonesMap';
import { user } from 'utils/enum';

const key = 'zones';

function Zones(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const location = useLocation();

  const [searchLocation, setSearchLocation] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longtidue, setLongtidue] = useState(0);

  const [modifyingId, setModifyingId] = React.useState(0);
  const [google, setGoogle] = React.useState();
  const [googlemap, setGoogleMap] = React.useState();

  const [tabsKey, setTabsKey] = React.useState('1');

  let service;
  let infowindow;

  const handleLon = e => {
    if (e) {
      setLongtidue(e);
    }
  };

  const handleLat = e => {
    if (e) {
      setLatitude(e);
    }
  };

  const handleSearchLocation = e => {
    setSearchLocation(e.target.value);
  };

  const onPlaceSearch = (depth, place) => {
    if (place) {
      console.log('search location:', place);
      const request = { query: place, fields: ['name', 'geometry'] };
      service = new google.maps.places.PlacesService(googlemap);
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < results.length; i++) {
            console.log('search result:', results[i]);
          }
          const marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: googlemap,
            title: 'search result',
          });
          googlemap.setCenter(results[0].geometry.location);
          googlemap.setZoom(16);
          console.log(marker);
        } else if (status === 'ZERO_RESULTS' && results === null) {
          message.error('No result');
        }
      });
    } else {
      console.log('search location:', searchLocation);
      const request = { query: searchLocation, fields: ['name', 'geometry'] };
      service = new google.maps.places.PlacesService(googlemap);
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < results.length; i++) {
            console.log('search result:', results[i]);
          }
          const marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: googlemap,
            title: 'search result',
          });
          googlemap.setCenter(results[0].geometry.location);
          googlemap.setZoom(16);
          console.log(marker);
        } else if (status === 'ZERO_RESULTS' && results === null) {
          message.error('No result');
        }
      });
    }
  };

  const onCoordsSearch = (depth, point) => {
    if (point) {
      console.log('search coords:', `lon:${point.lng},lat:${point.lat}`);
      const curlongtidue = point.lng;
      const curlatitude = point.lat;
      if (curlongtidue > -180 && curlongtidue < 180 && curlatitude > -85 && curlatitude < 85) {
        googlemap.setCenter({ lng: curlongtidue, lat: curlatitude });
        googlemap.setZoom(depth || 8);
        const marker = new google.maps.Marker({
          position: { lng: curlongtidue, lat: curlatitude },
          map: googlemap,
          title: 'search result',
        });
      } else {
        notification.error('coordinates input is not correct');
      }
    } else {
      console.log('search coords:', `lon:${longtidue},lat:${latitude}`);
      if (longtidue > -180 && longtidue < 180 && latitude > -85 && latitude < 85) {
        googlemap.setCenter({ lng: longtidue, lat: latitude });
        googlemap.setZoom(depth || 8);
        const marker = new google.maps.Marker({
          position: { lng: longtidue, lat: latitude },
          map: googlemap,
          title: 'search result',
        });
      } else {
        notification.error('coordinates input is not correct');
      }
    }
  };

  useEffect(() => {
    props.getZones();
  }, []);

  React.useEffect(() => {
    const searchAddress = location.pathname.split('/')[2] || '';
    if (searchAddress !== '') {
      if (google && googlemap) {
        onPlaceSearch(12, searchAddress);
      }
    }
  }, [location, google, googlemap]);

  const { TabPane } = Tabs;

  return (
    <>
      <Helmet>
        <title>Zones List</title>
        <meta name="Zones" content="Zones List" />
      </Helmet>

      <div style={{ marginLeft: '40px', marginBottom: '10px' }}>
        <h1 style={{ fontSize: 'x-large' }}> Zones List </h1>
      </div>
      <Tabs activeKey={tabsKey} onTabClick={setTabsKey}>
        <TabPane tab="Map" key="1">
          <Row>
            <Col span={24}>
              <ZonesMap
                setGoogle={setGoogle}
                google={google}
                setGoogleMap={setGoogleMap}
                googleMap={googlemap}
              ></ZonesMap>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={20}>
              <Input placeholder="Location" onChange={handleSearchLocation} />
            </Col>
            <Col span={4}>
              <Button onClick={() => onPlaceSearch()}>Search</Button>
            </Col>
          </Row>

          <Row style={{ marginTop: '10px' }}>
            <Col span={10}>
              <Tag>Latitude</Tag>
              <InputNumber style={{ width: '200px' }} onChange={handleLat} />
            </Col>
            <Col span={10}>
              <Tag>Longitude</Tag>
              <InputNumber style={{ width: '200px' }} onChange={handleLon} />
            </Col>
            <Col span={4}>
              <Button onClick={() => onCoordsSearch()}>Search</Button>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Data table" key="2" disabled={props.user.permissions !== user ? false : true}>
          <Row>
            <Col span={24}>
              <ZonesTable
                setModifyingId={setModifyingId}
                onModifyZones={props.handleModifyZoneModalShow}
                setLatitude={setLatitude}
                setLongtidue={setLongtidue}
                onCoordsSearch={onCoordsSearch}
                setTabsKey={setTabsKey}
              />
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      <AddZoneModal />
      <ModifyZoneModal modifyingId={modifyingId} />
    </>
  );
}

Zones.propTypes = {
  getZones: PropTypes.func,
  handleAddZoneModalShow: PropTypes.func,
  handleModifyZoneModalShow: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({ user: makeSelectUser() });

const mapDispatchToProps = dispatch => ({
  getZones: () => dispatch(getZonesAction()),
  handleAddZoneModalShow: () => dispatch(handleAddZoneModalShowAction()),
  handleModifyZoneModalShow: () => dispatch(handleModifyZoneModalShowAction()),
  modifyZones: id => dispatch(modifyZonesAction(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Zones);
