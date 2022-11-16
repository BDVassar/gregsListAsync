import { appState } from "../AppState.js";
import { Job } from "../Models/Job.js";

class JobsService {
  async createJob(jobData) {
    // @ts-ignore
    const res = await axios.post('https://bcw-sandbox.herokuapp.com/api/jobs', jobData)
    appState.jobs = [...appState.jobs, new Job(res.data)]
  }
  async getJobs() {
    // @ts-ignore
    const res = await axios.get('https://bcw-sandbox.herokuapp.com/api/jobs')
    console.log('[GOT JOBS]', res.data);
    appState.jobs = res.data.map(j => new Job(j))
  }

  setActive(id) {
    appState.activeJob = appState.jobs.find(j => j.id == id)
  }



}

export const jobsService = new JobsService()