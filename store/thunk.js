import { fetchFiltersAction, fetchJobsAction } from './actions';

export const fetchJobs = () => (dispatch, getState) => {
  const { searchInputValue, sorters, appliedFilters, position } = getState();

  fetch('/api/jobs' + (searchInputValue ? '?search=' + searchInputValue : ''), {
    body: JSON.stringify({
      filters: appliedFilters,
      sorters: sorters,
      position: position
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    .then((res) => res.json())
    .then((res) => dispatch(fetchJobsAction(res.jobs)));
};

export const fetchFilters = () => (dispatch) => {
  fetch('/api/filters', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
    .then((res) => res.json())
    .then((res) => dispatch(fetchFiltersAction(res)));
};
