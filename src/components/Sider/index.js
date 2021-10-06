import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Layout } from 'antd';
import { getCollapseSider, makeSelectUser } from 'global.selectors';
import MainMenu from '../Menu';
import './style.css';

/* eslint-disable indent */
function Sider(props) {
  return (
    <Layout.Sider collapsed={props.collapse}>
      <div className="logo" />
      <MainMenu theme="dark" />
    </Layout.Sider>
  );
}

Sider.propTypes = {
  collapse: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  collapse: getCollapseSider(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, memo)(withRouter(props => <Sider {...props} />));
