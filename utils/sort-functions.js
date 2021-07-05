import { SORT_KEY_ORDER, EXPERIENCE_SORT_ORDER } from '../enums';

export const departmentSortFunction = (jobs, sorter) => {
  jobs.forEach((job) => {
    job.items = job.items.sort((item1, item2) => {
      if (sorter === SORT_KEY_ORDER.ASC) {
        if (item1.department.sort().join() > item2.department.sort().join()) {
          return 1;
        }
        return -1;
      } else {
        if (
          item1.department.sort().reverse().join() >
          item2.department.sort().reverse().join()
        ) {
          return -1;
        }
        return 1;
      }
    });
  });
  return jobs;
};

export const locationSortFunction = (jobs, sorter, position) => {
  jobs.sort((job1, job2) => {
    const location1 = job1.items[0].location.split(',');
    const location2 = job2.items[0].location.split(',');
    if (
      distance(
        location1[0],
        location1[1],
        position.latitude,
        position.longitude
      ) >
      distance(
        location2[0],
        location2[1],
        position.latitude,
        position.longitude
      )
    ) {
      return sorter === SORT_KEY_ORDER.ASC ? 1 : -1;
    }
    return sorter === SORT_KEY_ORDER.ASC ? -1 : 1;
  });

  return jobs;
};

export const roleSortFunction = (jobs, sorter) => {
  jobs.forEach((job) => {
    job.items = job.items.sort((item1, item2) => {
      if (item1.role > item2.role) {
        return sorter === SORT_KEY_ORDER.ASC ? 1 : -1;
      }
      return sorter === SORT_KEY_ORDER.ASC ? -1 : 1;
    });
  });
  return jobs;
};

export const experienceSortFunction = (jobs, sorter) => {
  jobs.forEach((job) => {
    job.items = job.items.sort((item1, item2) => {
      if (
        EXPERIENCE_SORT_ORDER[item1.experience.toUpperCase()] >
        EXPERIENCE_SORT_ORDER[item2.experience.toUpperCase()]
      ) {
        return sorter === SORT_KEY_ORDER.ASC ? 1 : -1;
      }
      return sorter === SORT_KEY_ORDER.ASC ? -1 : 1;
    });
  });
  return jobs;
};

const distance = (lat1, lon1, lat2, lon2) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;

    dist = dist * 1.609344;

    return dist;
  }
};
