import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row } from 'antd';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectEmail, makeSelectPassword } from './signin.selectors';
import { onChangeEmailAction, onChangePasswordAction, postSignInAction } from './signin.actions';
import reducer from './signin.reducer';
import saga from './signin.saga';

const key = 'signin';

function SignIn(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <>
      <Helmet>
        <title>Masuk Sistem</title>
        <meta name="description" content="Masuk ke Sistem" />
      </Helmet>
      <Row>
        <Col
          md={{
            span: 8,
            offset: 8,
          }}
          xs={24}
        >
          <Card title="Halaman Login">
            <Form
              layout="vertical"
              onFinish={values => {
                props.onChangeEmail(values.username);
                props.onChangePassword(values.password);
                props.postSignIn();
              }}
              labelCol={{ xs: 24 }}
              wrapperCol={{ xs: 24 }}
            >
              <Form.Item name="username" label="Username">
                <Input placeholder="Masukan Username" prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <Input.Password placeholder="Masukan Password" prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Masuk
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

SignIn.propTypes = {
  postSignIn: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  email: makeSelectEmail(),
  password: makeSelectPassword(),
});

const mapDispatchToProps = dispatch => ({
  postSignIn: () => dispatch(postSignInAction()),
  onChangeEmail: e => dispatch(onChangeEmailAction(e)),
  onChangePassword: e => dispatch(onChangePasswordAction(e)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(SignIn);
