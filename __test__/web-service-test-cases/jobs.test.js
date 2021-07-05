/* eslint-disable no-undef */
import { createMocks } from 'node-mocks-http'
import fetchJobs from '../../pages/api/jobs'

describe('/api/jobs', () => {
  test('returns a list of all hospitals', async () => {
    const { req, res } = createMocks({
      method: 'POST'
    })

    await fetchJobs(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData()).jobs.length).toBe(20)
  })

  test('returns a list of places with Mam in name', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        search: 'Mam'
      }
    })

    await fetchJobs(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData()).jobs.length).toBe(1)
  })

  test('returns a list of all jobs with job type filter as per diem', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        filters: { job_type: ['Per-Diem'] }
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })

    await fetchJobs(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData()).jobs.length).toBe(13)
  })

  test('returns a list of all jobs with job type filter as per diem and part time', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        filters: { job_type: ['Per-Diem', 'Part-time'] }
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })

    await fetchJobs(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData()).jobs.length).toBe(20)
  })

  test('returns a list of all jobs with job type filter as part time and work schedule filter as day shift', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        filters: { job_type: ['Part-time'], work_schedule: ['Day shift'] }
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })

    await fetchJobs(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData()).jobs.length).toBe(12)
  })

  test('returns a list of all jobs with job type filter as part time and work schedule filter as day shift and sort by experience ASC', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        filters: { job_type: ['Part-time'], work_schedule: ['Night shift'] },
        sorters: {
          department: 0,
          experience: 1,
          role: 0,
          location: 0
        }
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })

    await fetchJobs(req, res)

    const { jobs } = JSON.parse(res._getData())
    const [firstHospital] = jobs

    expect(res._getStatusCode()).toBe(200)
    expect(firstHospital.items[0].experience).toBe('Internship')
    expect(firstHospital.items[1].experience).toBe('Senior')
  })

  test('returns a list of all jobs with job type filter as part time and work schedule filter as day shift and sort by experience DESC', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        filters: { job_type: ['Part-time'], work_schedule: ['Night shift'] },
        sorters: {
          department: 0,
          experience: 2,
          role: 0,
          location: 0
        }
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })

    await fetchJobs(req, res)

    const { jobs } = JSON.parse(res._getData())
    const [firstHospital] = jobs

    expect(res._getStatusCode()).toBe(200)
    expect(firstHospital.items[0].experience).toBe('Senior')
    expect(firstHospital.items[1].experience).toBe('Internship')
  })

  test('returns bad request as filters not passed as object', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        filters: 'Part-time'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })

    await fetchJobs(req, res)

    expect(res._getStatusCode()).toBe(400)
  })

  test('returns 405 as GET method is not allowed', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      body: {
        filters: { job_type: ['Part-time'], work_schedule: ['Day shift'] },
        sorters: {
          department: 0,
          experience: 1,
          role: 0,
          location: 0
        }
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })

    await fetchJobs(req, res)

    expect(res._getStatusCode()).toBe(405)
  })
})
