import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { Layout, message, Spin } from 'antd';
import Header from 'components/Header';
import Sider from 'components/Sider';
import PrivateRoute from 'components/PrivateRoute';
import mainRoutes from 'routes/mainRoutes';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';
import { getAlertInfo, getLoadingState } from './global.selectors';

function App(props) {
  useEffect(() => {
    if (props.alert.display) {
      switch (props.alert.type) {
        case 'success':
          message.success(props.alert.msg);
          break;
        case 'info':
          message.info(props.alert.msg);
          break;
        case 'warning':
          message.warning(props.alert.msg);
          break;
        case 'error':
          message.error(props.alert.msg);
          break;
        default:
          break;
      }
    }
  }, [props.alert]);

  return (
    <Spin spinning={props.loading}>
      <Layout style={{ minHeight: '100vh' }}>
        <Helmet titleTemplate="%s - LMS" defaultTitle="LMS SMK">
          <meta name="description" content="LMS SMK Kesehatan Rajawali" />
        </Helmet>
        {!isMobile && <Sider />}
        <Layout className="site-layout">
          <Header />
          <Layout className="site-layout-background" style={{ padding: 0 }}>
            <Layout.Content style={{ margin: '16px' }}>
              <Switch>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                {mainRoutes.map(route => (route.auth ? <PrivateRoute {...route} /> : <Route {...route} />))}
              </Switch>
            </Layout.Content>
            <Layout.Footer style={{ textAlign: 'center' }}>SMK Kesehatan Rajawali</Layout.Footer>
          </Layout>
        </Layout>
      </Layout>
    </Spin>
  );
}

App.propTypes = {
  loading: PropTypes.bool,
  alert: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  loading: getLoadingState(),
  alert: getAlertInfo(),
});
const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(App);
