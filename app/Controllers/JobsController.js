import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { jobsService } from "../Services/JobsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function _drawJobs() {
  let template = ''
  appState.jobs.forEach(j => template += j.JobTemplate)
  setHTML('listings', template)
}

function _drawJobsForm() {
  let job = appState.activeJob
  setHTML('listing-form', Job.GetJobFormTemplate(job))
}

export class JobsController {
  constructor() {
    appState.on('jobs', _drawJobs)
    appState.on('activeJob', _drawJobsForm)
  }

  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }
  async setActive(id) {
    try {
      await jobsService.setActive(id)
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  async createJob() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let jobData = getFormData(form)
      Pop.toast('Created', 'success')
      // @ts-ignore
      form.reset()
      await jobsService.createJob(jobData)
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  showJobs() {
    this.getJobs()
    _drawJobsForm()
  }
}