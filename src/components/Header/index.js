import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Avatar, Button, Card, Col, Drawer, Layout, Menu, Row, Typography } from 'antd';
import { getCollapseMenu, getCollapseSider, makeSelectUser } from 'global.selectors';
import { isMobile } from 'react-device-detect';
import { MenuOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import md5 from 'md5';
import { clearInfoUser, collapsedSider, collapseMenu as collapseMenuA } from '../../global.actions';
import MainMenu from '../Menu';

const { SubMenu } = Menu;

function Header(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const collapseMenu = () => {
    if (isMobile) {
      dispatch(collapseMenuA(!props.menuCol));
    } else {
      dispatch(collapsedSider(!props.sider));
    }
  };
  const logout = () => {
    localStorage.clear();
    dispatch(clearInfoUser());
    history.push('/signin');
  };
  return (
    <Layout.Header
      style={{
        width: '100%',
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{
          width: '100%',
        }}
      >
        {isMobile ? (
          <>
            <Row>
              <Col>
                <Button type="primary" onClick={collapseMenu}>
                  <MenuOutlined />
                </Button>
              </Col>
            </Row>
            <Drawer title="Menu" placement="left" width={200} onClose={collapseMenu} visible={props.menuCol}>
              {props.user && (
                <Card color="grey">
                  <Row>
                    <Col xs={24}>
                      <Avatar
                        size="large"
                        style={{
                          display: 'block',
                          margin: 'auto',
                        }}
                        src={`https://www.gravatar.com/avatar/${md5(props.user?.email)}`}
                      />
                    </Col>
                    <Col xs={24} style={{ textAlign: 'center', marginTop: 5 }}>
                      <Typography.Text>{props.user?.nama}</Typography.Text>
                    </Col>
                    <Col xs={24} style={{ textAlign: 'center', marginTop: 5 }}>
                      <Button type="primary" onClick={logout}>
                        Keluar
                      </Button>
                    </Col>
                  </Row>
                </Card>
              )}
              <MainMenu theme="light" />
            </Drawer>
          </>
        ) : (
          <>
            <Col xs={18}>
              <Button type="primary" onClick={collapseMenu}>
                <MenuOutlined />
              </Button>
            </Col>
            <Col xs={24 - 18}>
              {props.user && (
                <Menu mode="horizontal" theme="dark">
                  <SubMenu
                    key="SubMenu"
                    icon={
                      <>
                        <Avatar
                          size="large"
                          style={{ margin: 5 }}
                          src={`https://www.gravatar.com/avatar/${md5(props.user?.email)}`}
                        />
                      </>
                    }
                    title={`${props.user?.nis} - ${props.user?.nama}`}
                  >
                    <Menu.Item onClick={logout} key="logout">
                      Keluar
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              )}
            </Col>
          </>
        )}
      </Row>
    </Layout.Header>
  );
}

Header.propTypes = {
  user: PropTypes.object,
  sider: PropTypes.bool,
  menuCol: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  collapse: getCollapseMenu(),
  sider: getCollapseSider(),
  menuCol: getCollapseMenu(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, memo)(Header);
