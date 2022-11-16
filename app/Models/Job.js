
export class Job {
  constructor(data) {
    this.id = data.id || ''
    this.company = data.company || ''
    this.jobTitle = data.jobTitle || ''
    this.hours = data.hours || 0
    this.rate = data.rate || 0
    this.description = data.description || ''
  }


  get JobTemplate() {
    return `
    <div class="col-12 col-md-4 p-4">
      <div class="card">
        <img src="" class="card-img-top"
          alt="">
        <div class="card-body">
          <h5 class="card-title d-flex justify-content-between mb-2">
            <span>${this.company} /  ${this.jobTitle} </span>
            <span>$ ${this.rate}</span>
          </h5>
          <div class="d-flex justify-content-between">
            <button onclick="app.carsController.setActiveHouse('${this.id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            See Details
            </button>
            <button  class="btn btn-info"  onclick="app.jobsController.setActive('${this.id}')">
            <i class="mdi mdi-pencil"></i>
            </button>
            <button onclick="app.jobsController.removeJob('${this.id}')" title="Delete house!" class="btn btn-danger">
              <i class="mdi mdi-delete"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    `
  }

  static GetJobFormTemplate(job) {
    if (!job) {
      job = new Job({}) // this car will be empty and not fill out the form
    }
    return `
    <form onsubmit="app.jobsController.${job.id ? `editHouse('${job.id}')` : 'createJob()'}">
      <div class="form-floating mb-3">
        <input required type="text" class="form-control" id="job-company" placeholder="Job Company"
          name="company" value="${job.company}">
        <label for="job-company">Company</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="text" class="form-control" id="job-jobTitle" placeholder="Job Jobtitle" name="jobTitle" value="${job.jobTitle}">
        <label for="job-jobTitle" >Job Title</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="job-hours" placeholder="Job Hours" name="hours" value="${job.hours}">
        <label for="job-hours">Hours</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="job-rate" placeholder="Job Rate" name="rate" value="${job.rate}">
        <label for="job-rate">Pay Rate</label>
      </div>
      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a description here" id="job-description"
          name="description">${job.description}</textarea>
        <label for="job-description">Description</label>
      </div>
      <button type="submit" class="btn btn-success mt-3">Submit</button>
      <button type="reset" class="btn btn-outline-danger mt-3">Reset</button>
    </form>
    `
  }
}