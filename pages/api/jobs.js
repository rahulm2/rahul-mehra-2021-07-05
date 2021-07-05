import jobs from '../../data/jobs';
import {
  filterJobsByInput,
  filterJobsByAppliedFilters,
  sortJobs,
  updateJobCount
} from '../../utils';

export default async (req, res) => {
  res.statusCode = 200;

  const { method, query, body } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end();
  }

  if (body) {
    for (const key of Object.keys(body)) {
      if (typeof body[key] !== 'object') return res.status(400).end();
    }
  }
  let filterJobs = JSON.parse(JSON.stringify(jobs));

  const searchValue = query?.search?.toLowerCase();

  const position = body?.position;
  // @todo: implement filters and search
  if (searchValue) {
    filterJobs = filterJobsByInput(filterJobs, searchValue);
  }
  if (body?.filters) {
    filterJobs = filterJobsByAppliedFilters(filterJobs, body?.filters);
  }
  if (body?.sorters) {
    filterJobs = sortJobs(filterJobs, body?.sorters, position);
  }

  filterJobs = updateJobCount(filterJobs);
  // @todo: implement automated tests

  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()));

  res.json({ jobs: filterJobs });
};
