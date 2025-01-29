import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cars: [],
  meta: null,
  loading: false,
  errors: {},
  carModels: {},
  search: '',
  page: 1
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    fetchCarsRequest: (state) => {
      state.loading = true;
      state.errors = {};
    },
    fetchCarsSuccess: (state, action) => {
      state.loading = false;
      state.cars = action.payload.data;
      state.meta = action.payload.meta;
    },
    fetchCarsFailure: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    addCarRequest: (state) => {
      state.loading = true;
      state.errors = {};
    },
    addCarSuccess: (state) => {
      state.loading = false;
    },
    addCarFailure: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    updateCarRequest: (state) => {
      state.loading = true;
      state.errors = {};
    },
    updateCarSuccess: (state) => {
      state.loading = false;
    },
    updateCarFailure: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    deleteCarRequest: (state) => {
      state.loading = true;
      state.errors = {};
    },
    deleteCarSuccess: (state) => {
      state.loading = false;
    },
    deleteCarFailure: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    fetchCarModelsRequest: (state) => {
      state.loadingCarModels = true;
    },
    fetchCarModelsSuccess: (state, action) => {
      state.carModels = action.payload;
      state.loadingCarModels = false;
      state.carModelsError = null;
    },
    fetchCarModelsFailure: (state, action) => {
      state.loadingCarModels = false;
      state.carModelsError = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
  }
});

export const carActions = carSlice.actions;
export default carSlice.reducer;