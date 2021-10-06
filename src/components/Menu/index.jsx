import React, { memo } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { isMobile } from 'react-device-detect';
import { getCollapseMenu, makeSelectUser } from '../../global.selectors';
import mainRoutes from '../../routes/mainRoutes';
import { collapseMenu } from '../../global.actions';

function MainMenu(props) {
  const dispatch = useDispatch();
  const hideDrawer = () => {
    if (isMobile) {
      dispatch(collapseMenu(!props.menuCol));
    }
  };
  return (
    <Menu theme={props.theme} selectedKeys={[props.location.pathname]} mode="inline">
      {mainRoutes.map(route =>
        (!route.auth || (!route.permission && props.user) || props.user) && route.auth && !route.hide_auth ? (
          <Menu.Item key={route.path || '/notfound'} onClick={hideDrawer}>
            <Link to={route.path || '/notfound'}>
              <LegacyIcon type={route.icon} />
              <span>{route.name}</span>
            </Link>
          </Menu.Item>
        ) : (
          <></>
        ),
      )}
    </Menu>
  );
}

MainMenu.propTypes = {
  user: PropTypes.object,
  theme: PropTypes.string,
  location: PropTypes.object,
  menuCol: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  menuCol: getCollapseMenu(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, memo)(withRouter(MainMenu));
