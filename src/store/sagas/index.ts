import { all, fork } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import authSaga from "./authSaga";
import postsSaga from "./postsSaga";
import commentsSaga from "./commentsSaga";

export default function* rootSaga(): SagaIterator {
  yield all([fork(authSaga), fork(postsSaga), fork(commentsSaga)]);
}
