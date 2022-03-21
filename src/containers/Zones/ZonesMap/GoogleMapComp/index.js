import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Loader } from 'google-maps';
import { handleAddZoneModalShowAction, onChangePointsAction } from '../../zones.actions';
import { selectZonesList } from '../../zones.selectors';
import { calCenter } from '../../../../utils/calCenter';
import dayjs from 'dayjs';

function GoogleMapComp(props) {
  /* ------------------ */
  /* -     Const     - */
  /* ------------------ */
  let infoWindow;
  let map;

  const [points, setPoints] = useState([]);

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (document.getElementById('map')) {
      initMap();
    } else {
      console.log('map div is ' + document.getElementById('map'));
    }
  }, [props.zonesList.length]);

  async function initMap() {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const options = { libraries: ['drawing', 'places'] };
    const loader = new Loader(apiKey, options);
    const google = await loader.load();
    props.setGoogle(google);

    const latestZone = props.zonesList.sort((a, b) => dayjs(b.updatedAt) - dayjs(a.updatedAt))[0];
    const initLngLat =
      props.zonesList.length !== 0
        ? calCenter(latestZone.points)
        : {
            lat: -35.6808829,
            lng: -71.6085956,
          };
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: initLngLat,
    });

    props.setGoogleMap(map);

    props.zonesList.forEach(zone => {
      const coords = zone.points;
      const area = new google.maps.Polygon({
        paths: coords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      });

      area.setMap(map);
      area.addListener('click', showInfo);
      infoWindow = new google.maps.InfoWindow();
    });

    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
      },
      markerOptions: {
        icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      },
      polygonOptions: {
        editable: true,
      },
    });

    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
      const coordinates = polygon.getPath().getArray();
      coordinates.forEach(cor => {
        const lng = cor.lng();
        const lat = cor.lat();
        const newPoints = points.push({ lat: lat, lng: lng });
        setPoints(newPoints);
      });
      props.onChangePoints(points);
      setPoints([]);
      props.handleAddZoneModalShow();
    });
  }
  /* ------------------ */
  /* -     Handler     - */
  /* ------------------ */
  function showInfo(event) {
    const polygon = this;
    const vertices = polygon.getPath();
    let contentString =
      '<b>Zone Info</b><br>' + 'Clicked location: <br>' + event.latLng.lat() + ',' + event.latLng.lng() + '<br>';

    // Iterate over the vertices.
    for (let i = 0; i < vertices.getLength(); i++) {
      const xy = vertices.getAt(i);
      const result = props.zonesList.find(zone => {
        const test = zone.points.find(point => approximatelyEqual(point.lat, xy.lat()));
        if (test !== undefined) {
          return true;
        } else {
          return false;
        }
      });
      console.log('result', result);

      if (result !== undefined) {
        contentString +=
          '<br>' + 'Area Info ' + ':<br>' + 'Title: ' + result.title + '<br>' + 'Description: ' + result.description;
        break;
      }
    }

    // Replace the info window's content and position.
    infoWindow.setContent(contentString);
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  }

  const approximatelyEqual = (v1, v2, epsilon = 0.0000000001) => Math.abs(v1 - v2) < epsilon;

  /* ------------------ */
  /* -     Render     - */
  /* ------------------ */
  return <React.Fragment />;
}

GoogleMapComp.propTypes = {
  zonesList: PropTypes.array,
  handleAddZoneModalShow: PropTypes.func,
  onChangePoints: PropTypes.func,
  google: PropTypes.object,
  googleMap: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  zonesList: selectZonesList,
});

const mapDispatchToProps = dispatch => ({
  handleAddZoneModalShow: () => dispatch(handleAddZoneModalShowAction()),
  onChangePoints: e => dispatch(onChangePointsAction(e)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(GoogleMapComp);
