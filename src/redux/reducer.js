const initialState = {
  cars: [],
  meta: null,
  loading: false,
  errors: {},
  search: "",
  page: 1,
};

export const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAR_TYPES.FETCH_CARS_REQUEST:
    case CAR_TYPES.ADD_CAR_REQUEST:
    case CAR_TYPES.UPDATE_CAR_REQUEST:
    case CAR_TYPES.DELETE_CAR_REQUEST:
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case CAR_TYPES.FETCH_CARS_SUCCESS:
      return {
        ...state,
        cars: action.payload.data,
        meta: action.payload.meta,
        loading: false,
      };

    case CAR_TYPES.ADD_CAR_SUCCESS:
    case CAR_TYPES.UPDATE_CAR_SUCCESS:
    case CAR_TYPES.DELETE_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CAR_TYPES.FETCH_CARS_FAILURE:
    case CAR_TYPES.ADD_CAR_FAILURE:
    case CAR_TYPES.UPDATE_CAR_FAILURE:
    case CAR_TYPES.DELETE_CAR_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case CAR_TYPES.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
        page: 1,
      };

    case CAR_TYPES.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    default:
      return state;
  }
};
