
export class House {

  constructor(data) {
    this.id = data.id || ''
    this.bedrooms = data.bedrooms || 0
    this.bathroom = data.bathrooms || 0
    this.levels = data.levels || 0
    this.imgUrl = data.imgUrl || ''
    this.year = data.year || 0
    this.price = data.price || 0
    this.description = data.description || ''
  }

  get ListTemplate() {
    return `
    <div class="col-12 col-md-4 p-4">
      <div class="card">
        <img src="${this.imgUrl}" class="card-img-top"
          alt="">
        <div class="card-body">
          <h5 class="card-title d-flex justify-content-between mb-2">
            <span>${this.bedrooms} bedroom /  ${this.bathroom} bathroom</span>
            <span>$ ${this.price}</span>
          </h5>
          <div class="d-flex justify-content-between">
            <button onclick="app.carsController.setActiveHouse('${this.id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            See Details
            </button>
            <button  class="btn btn-info"  onclick="app.housesController.setActive('${this.id}')">
            <i class="mdi mdi-pencil"></i>
            </button>
            <button onclick="app.housesController.removeHouse('${this.id}')" title="Delete house!" class="btn btn-danger">
              <i class="mdi mdi-delete"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    `
  }


  static GetHouseFormTemplate(house) {
    if (!house) {
      house = new House({}) // this car will be empty and not fill out the form
    }
    return `
    <form onsubmit="app.housesController.${house.id ? `editHouse('${house.id}')` : 'createHouse()'}">
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="house-bedrooms" placeholder="House Bedrooms"
          name="bedrooms" value="${house.bedrooms}">
        <label for="car-make">Bedrooms</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="house-bathrooms" placeholder="House Bathrooms" name="bathrooms" value="${house.bathroom}">
        <label for="house-bathrooms" >Bathrooms</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="url" class="form-control" id="house-img" placeholder="House Image" name="imgUrl" value="${house.imgUrl}">
        <label for="house-img">Image</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="house-price" placeholder="House Price" name="price" value="${house.price}">
        <label for="House-price">Price</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="house-year" placeholder="House Year" name="year" value="${house.year}">
        <label for="house-year">Year</label>
      </div>
      <div class="form-floating mb-3">
        <input required type="number" class="form-control" id="house-levels" placeholder="House Levels" name="levels" value="${house.levels}">
        <label for="house-levels">Levels</label>
      </div>
      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a description here" id="house-description"
          name="description">${house.description}</textarea>
        <label for="house-description">Description</label>
      </div>
      <button type="submit" class="btn btn-success mt-3">Submit</button>
      <button type="reset" class="btn btn-outline-danger mt-3">Reset</button>
    </form>
    `
  }
}


// ${house.id ? `editCar('${house.id}')` : 'createHouse()'}

