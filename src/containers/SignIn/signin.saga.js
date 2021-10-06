import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { POST_SIGN_IN_REQUEST } from './signin.constants';
import { getMe, postSignInAPI } from './signin.api';
import { postSignInFailure, postSignInSuccess } from './signin.actions';
import { makeSelectEmail, makeSelectPassword } from './signin.selectors';
import { addInfoUser, alertInfoShow } from '../../global.actions';

export function* postSignInSaga() {
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());

  try {
    const user = yield call(postSignInAPI, { email, password });
    yield put(postSignInSuccess(user));
    localStorage.setItem('token', user.data.access_token);
    const me = yield call(getMe);
    yield put(addInfoUser(me));
    yield put(
      alertInfoShow({
        display: true,
        msg: 'User & Password Anda Benar',
        type: 'success',
      }),
    );
    yield put(push('/'));
  } catch (error) {
    yield put(postSignInFailure(error));
  }
}

export default function* signInSaga() {
  yield takeLatest(POST_SIGN_IN_REQUEST, postSignInSaga);
}
