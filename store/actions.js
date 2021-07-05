import * as types from './types';

export const fetchJobsAction = (jobs) => ({
  type: types.FETCH_JOBS,
  payload: jobs
});

export const fetchFiltersAction = (filters) => ({
  type: types.FETCH_FILTERS,
  payload: filters
});

export const updateSortersAction = (sorters) => ({
  type: types.UPDATE_SORTERS,
  payload: sorters
});

export const updatePositionAction = (sorters) => ({
  type: types.UPDATE_POSITION,
  payload: sorters
});

export const updateSearchValueAction = (sorters) => ({
  type: types.UPDATE_SEARCH_VALUE,
  payload: sorters
});

export const updateAppliedFiltersAction = (sorters) => ({
  type: types.UPDATE_APPLIED_FILTERS,
  payload: sorters
});
