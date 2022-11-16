import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { housesService } from "../Services/HousesService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"


function _drawHouses() {
  let template = ''
  appState.houses.forEach(h => template += h.ListTemplate)
  setHTML('listings', template)
}


function _drawHouseForm() {
  let house = appState.activeHouse
  setHTML('listing-form', House.GetHouseFormTemplate(house))
}
export class HousesController {

  constructor() {
    appState.on('houses', _drawHouses)
    appState.on('activeHouse', _drawHouseForm)

  }

  async getHouses() {
    try {
      await housesService.getHouses()
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  async setActive(id) {
    try {
      await housesService.setActive(id)
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  async createHouse() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let houseData = getFormData(form)
      Pop.toast('Created', 'success')
      // @ts-ignore
      form.reset()
      await housesService.createHouse(houseData)

    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  async editHouse(id) {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let houseData = getFormData(form)
      await housesService.editHouse(houseData, id)
      Pop.toast('Editing', 'success')
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }

  async removeHouse(id) {
    try {
      if (await Pop.confirm('Are you sure you want to delete this houses?')) {
        housesService.removeHouse(id)
      }
    } catch (error) {
      Pop.error(error.message)
      console.error(error)
    }
  }


  showHouses() {
    this.getHouses()
    _drawHouseForm()
  }
}