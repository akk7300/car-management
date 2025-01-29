import { takeLatest, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';
import { carActions } from '../slices/carSlice';
import { API_URL } from '../../constants/config';

export function* carSaga() {
  yield takeLatest(carActions.fetchCarsRequest.type, fetchCarsSaga);
  yield takeLatest(carActions.addCarRequest.type, addCarSaga);
  yield takeLatest(carActions.updateCarRequest.type, updateCarSaga);
  yield takeLatest(carActions.deleteCarRequest.type, deleteCarSaga);
  yield takeLatest(carActions.fetchCarModelsRequest.type, fetchCarModelsSaga);
}

function* fetchCarsSaga() {
  try {
    const { page, search } = yield select(state => ({
      page: state.car.page,
      search: state.car.search
    }));
    
    const response = yield call(
      axios.get,
      `${API_URL}/cars?page=${page}${search ? `&search=${search}` : ""}`
    );
    
    yield put(carActions.fetchCarsSuccess(response.data));
  } catch (error) {
    yield put(carActions.fetchCarsFailure(error.response?.data?.errors || {}));
    toast.error('Failed to fetch cars');
  }
}

function* addCarSaga(action) {
  try {
    yield call(axios.post, `${API_URL}/cars`, action.payload);
    yield put(carActions.addCarSuccess());
    toast.success('Car added successfully');
    yield put(carActions.fetchCarsRequest());
  } catch (error) {
    const errors = error.response?.data?.errors?.reduce((acc, err) => {
      acc[err.field] = err.message;
      return acc;
    }, {});
    yield put(carActions.addCarFailure(errors));
  }
}

function* updateCarSaga(action) {
  try {
    yield call(axios.put, `${API_URL}/cars/${action.payload.id}`, action.payload);
    yield put(carActions.updateCarSuccess());
    toast.success('Car updated successfully');
    yield put(carActions.fetchCarsRequest());
  } catch (error) {
    const errors = error.response?.data?.errors?.reduce((acc, err) => {
      acc[err.field] = err.message;
      return acc;
    }, {});
    yield put(carActions.updateCarFailure(errors));
  }
}

function* deleteCarSaga(action) {
  try {
    yield call(axios.delete, `${API_URL}/cars/${action.payload}`);
    yield put(carActions.deleteCarSuccess());
    toast.success('Car deleted successfully');
    yield put(carActions.fetchCarsRequest());
  } catch (error) {
    yield put(carActions.deleteCarFailure(error.response?.data?.errors || {}));
    toast.error('Failed to delete car');
  }
}

function* fetchCarModelsSaga() {
  try {
    const response = yield call(axios.get, `${API_URL}/car-models`);
    yield put(carActions.fetchCarModelsSuccess(response.data));
  } catch (error) {
    yield put(carActions.fetchCarModelsFailure(error.message));
    toast.error('Failed to fetch car models');
  }
}