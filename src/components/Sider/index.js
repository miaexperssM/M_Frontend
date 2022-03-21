import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Layout, Icon, Menu } from 'antd';

import mainRoutes from 'routes/mainRoutes';
import { makeSelectUser } from 'global.selectors';

/* eslint-disable indent */

const renderSiderItems = props => {
  return mainRoutes.map(route => {
    // Hide route from sider menu if defined true and hide sign in item after user logged in
    if (route.hide || (props.user && route.path === '/signin') || (!props.user && route.path === '/signout'))
      return <React.Fragment />;
    // Check route for auth
    else {
      if (
        !route.auth ||
        (!route.permission && props.user) ||
        (props.user && props.user.permissions.includes(route.permission))
      ) {
        return (
          <Menu.Item key={route.path || '/notfound'}>
            <Link to={route.path || '/notfound'}>
              <Icon type={route.icon} />
              <span>{route.name}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        return <React.Fragment />;
      }
    }
  });
};

function Sider(props) {
  return (
    <Layout.Sider breakpoint={'sm'} collapsedWidth={0} zeroWidthTriggerStyle={{ top: '4px' }}>
      <Menu theme="dark" selectedKeys={[props.location.pathname]} mode="inline">
        {renderSiderItems(props)}
      </Menu>
    </Layout.Sider>
  );
}

Sider.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, memo)(withRouter(props => <Sider {...props} />));
