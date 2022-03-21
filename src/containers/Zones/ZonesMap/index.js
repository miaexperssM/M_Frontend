import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { selectZonesList } from '../zones.selectors';

import GoogleMapComp from './GoogleMapComp';

function ZonesMap(props) {
  /* ------------------ */
  /* -     Const     - */
  /* ------------------ */
  const google = props.google;
  const googleMap = props.googleMap;
  /* ------------------ */
  /* -     Handler     - */
  /* ------------------ */

  /* ------------------ */
  /* -     Render     - */
  /* ------------------ */
  return (
    <div>
      <div id="map" style={{ height: '70vh', width: '100%' }}>
        <GoogleMapComp
          setGoogle={props.setGoogle}
          google={google}
          googleMap={googleMap}
          setGoogleMap={props.setGoogleMap}
        />
      </div>
    </div>
  );
}

ZonesMap.propTypes = {
  zonesList: PropTypes.array,
  google: PropTypes.object,
  googleMap: PropTypes.object,
  setGoogle: PropTypes.func,
  setGoogleMap: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  zonesList: selectZonesList,
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ZonesMap);
