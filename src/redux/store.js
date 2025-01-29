import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import carReducer from './slices/carSlice';
import { carSaga } from './sagas/carSaga';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    carSaga(),
  ]);
}

export const store = configureStore({
  reducer: {
    car: carReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ 
      thunk: false,
      serializableCheck: false
    }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;