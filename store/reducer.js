import { updateAppliedFilters, updateSorters } from '../utils';
import { SORT_KEY_ORDER } from '../enums';
import * as types from './types';

const initialState = {
  searchInputValue: '',
  sorters: {
    department: SORT_KEY_ORDER.DEFAULT,
    experience: SORT_KEY_ORDER.DEFAULT,
    role: SORT_KEY_ORDER.DEFAULT,
    location: SORT_KEY_ORDER.DEFAULT
  },
  appliedFilters: {},
  jobs: [],
  filters: {},
  position: { longitude: 0, latitude: 0 }
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_FILTERS:
      return {
        ...state,
        filters: action.payload
      };
    case types.FETCH_JOBS:
      return {
        ...state,
        jobs: action.payload
      };
    case types.UPDATE_SEARCH_VALUE:
      return {
        ...state,
        searchInputValue: action.payload
      };
    case types.UPDATE_APPLIED_FILTERS:
      return {
        ...state,
        appliedFilters: {
          ...updateAppliedFilters(state.appliedFilters, action.payload)
        }
      };
    case types.UPDATE_SORTERS:
      return {
        ...state,
        sorters: {
          ...updateSorters(state.sorters, action.payload)
        }
      };
    case types.UPDATE_POSITION:
      return {
        ...state,
        position: {
          ...action.payload
        }
      };
    default:
      return state;
  }
}

export default reducer;
