import {
  locationSortFunction,
  roleSortFunction,
  experienceSortFunction,
  departmentSortFunction
} from './sort-functions';
import { SORT_KEY_ORDER } from '../enums';

/**
 * Method to calculate weeks between dates
 * @param {Date} date1 - first date.
 * @param {Date} date2 -second date.
 */
export const weeksBetween = (date1, date2) => {
  return Math.round((date1 - date2) / (7 * 24 * 60 * 60 * 1000));
};

/**
 * Method to filter jobs array by search input
 * @param {Array} jobs - jobs array.
 * @param {string} searchValue - input search value.
 */
export const filterJobsByInput = (jobs, searchValue) => {
  jobs.forEach((job) => {
    job.items = job.items?.filter((jobDetail) => {
      return (
        jobDetail.job_title.toLowerCase().includes(searchValue) ||
        jobDetail.name.toLowerCase().includes(searchValue) ||
        jobDetail.type.toLowerCase().includes(searchValue)
      );
    });
  });
  jobs = jobs.filter((job) => job.items?.length > 0);
  return jobs;
};

/**
 * Method to update applied fitlers to the state
 * @param {object} appliedFilters
 * @param {object} payload
 */
export const updateAppliedFilters = (appliedFilters, payload) => {
  const { key: filterKey, value: filterValue } = payload;
  if (appliedFilters[filterKey]) {
    if (appliedFilters[filterKey].includes(filterValue)) {
      appliedFilters[filterKey] = appliedFilters[filterKey].filter(
        (filter) => filter !== filterValue
      );
      if (!appliedFilters[filterKey].length) {
        delete appliedFilters[filterKey];
      }
    } else {
      appliedFilters[filterKey].push(filterValue);
    }
  } else {
    appliedFilters[filterKey] = [filterValue];
  }
  return appliedFilters;
};

/**
 * Method to filter jobs array by applied filters
 * @param {Array} jobs - jobs array.
 * @param {string} appliedFilters - filters applied on the search.
 */
export const filterJobsByAppliedFilters = (jobs, appliedFilters) => {
  const filterKeys = Object.keys(appliedFilters);
  if (filterKeys.length > 0) {
    jobs.forEach((job) => {
      job.items = job.items.filter((jobDetail) => {
        for (const key of filterKeys) {
          let flag = false;
          if (Array.isArray(jobDetail[key])) {
            for (const filter of jobDetail[key]) {
              if (appliedFilters[key].includes(filter)) {
                flag = true;
                break;
              }
            }
          } else if (appliedFilters[key].includes(jobDetail[key])) flag = true;
          if (!flag) return false;
        }
        return true;
      });
    });
    return jobs.filter((job) => job.items.length > 0);
  }
  return jobs;
};

/**
 * Method to sort jobs array based on sorters
 * @param {Array} jobs - jobs array.
 * @param {object} sorters - object containing different sorters.
 * @param {object} position - object containing current position of user {latitude, longitude}.
 */
export const sortJobs = (jobs, sorters, position) => {
  for (const sortKey of Object.keys(sorters)) {
    if (sorters[sortKey] !== SORT_KEY_ORDER.DEFAULT) {
      switch (sortKey) {
        case 'location':
          jobs = locationSortFunction(jobs, sorters[sortKey], position);
          break;
        case 'experience':
          jobs = experienceSortFunction(jobs, sorters[sortKey]);
          break;
        case 'role':
          jobs = roleSortFunction(jobs, sorters[sortKey]);
          break;
        case 'department':
          jobs = departmentSortFunction(jobs, sorters[sortKey]);
          break;
        default:
          break;
      }
    }
  }
  return jobs;
};

/**
 * Method to update sorters in the state
 * @param {object} sorters - object containing different sorters.
 * @param {string} sortKey - string containing key of the sorter which needs to be updated.
 */
export const updateSorters = (sorters, sortKey) => {
  sorters[sortKey] = (sorters[sortKey] + 1) % 3;
  return sorters;
};

/**
 * Method to update job count
 * @param {Array} jobs - array containing jobs.
 */
export const updateJobCount = (jobs) => {
  jobs.forEach((job) => {
    job.total_jobs_in_hospital = job.items.length;
  });
  return jobs;
};

export const getJobCountReducer = (accumulator, currentValue) =>
  accumulator + currentValue.total_jobs_in_hospital;

export const getFilterByHeading = (heading) => (state) => {
  if (state?.appliedFilters) {
    const newFilters = { ...state?.appliedFilters };
    return newFilters[heading];
  }
  return [];
};
