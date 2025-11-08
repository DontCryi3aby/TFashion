import { all } from 'redux-saga/effects';

import authSaga from 'src/features/auth/authSaga';

export default function* rootSaga() {
    yield all([authSaga()]);
}
