import React, { memo, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Card, Col, Row, Statistic } from 'antd';
import { CheckOutlined, HourglassFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { getStatisticData } from './home.selectors';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './home.reducer';
import { getStatisicAPI } from './home.api';
import { getStatistic } from './home.actions';

const key = 'home';

function Home({ dispatch, statistic }) {
  useInjectReducer({ key, reducer });

  useEffect(() => {
    getStatisicAPI().then(r => {
      dispatch(getStatistic(r.data.data));
    });
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Row>
        <Col xs={24} md={12}>
          <Card>
            <Statistic title="Sudah Dikerjakan" value={statistic.last} prefix={<CheckOutlined />} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <Statistic title="Belum Dikerjakan" value={statistic.current} prefix={<HourglassFilled />} />
          </Card>
        </Col>
      </Row>
    </>
  );
}

Home.propTypes = {
  statistic: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  statistic: getStatisticData(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Home);
