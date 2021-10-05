import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import Header from 'components/Header';
import Sider from 'components/Sider';
import PrivateRoute from 'components/PrivateRoute';
import mainRoutes from 'routes/mainRoutes';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getLoadingState } from './global.selectors';

function App(props) {

  return (
    <Spin
      spinning={props.loading}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Helmet
          titleTemplate="%s - LMS"
          defaultTitle="LMS SMK"
        >
          <meta name="description" content="LMS SMK Kesehatan Rajawali" />
        </Helmet>
        <Header />
        <Layout>
           <Sider />
           <Layout>
             <Layout.Content style={{ margin: '16px' }}>
               <Switch>{mainRoutes.map(route => (route.auth ? <PrivateRoute {...route} /> : <Route {...route} />))}</Switch>
             </Layout.Content>
             <Layout.Footer style={{ textAlign: 'center' }}>SMK Kesehatan Rajawali</Layout.Footer>
           </Layout>
        </Layout>
      </Layout>
    </Spin>
  );
}

const mapDispatchToProps = dispatch => ({

});
const mapStateToProps = createStructuredSelector({
  loading: getLoadingState(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
