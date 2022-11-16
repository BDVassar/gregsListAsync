import { appState } from "../AppState.js"
import { House } from "../Models/House.js"

class HouseService {
  async getHouses() {
    // @ts-ignore
    const res = await axios.get('https://bcw-sandbox.herokuapp.com/api/houses')
    console.log('[GOT HOUSES]', res.data)
    appState.houses = res.data.map(h => new House(h))
  }

  async setActive(id) {
    appState.activeHouse = appState.houses.find(h => h.id == id)
    console.log(appState.activeHouse)
  }

  async createHouse(houseData) {
    // @ts-ignore
    const res = await axios.post('https://bcw-sandbox.herokuapp.com/api/houses', houseData)
    console.log(res.data)
    appState.houses = [...appState.houses, new House(res.data)]
  }

  async editHouse(houseData, id) {
    // @ts-ignore
    const res = await axios.put('https://bcw-sandbox.herokuapp.com/api/houses/' + id, houseData)
    console.log('[EDIT HOUSE]', res.data)
    let index = appState.houses.findIndex(h => h.id == id)
    appState.houses.splice(index, 1, new House(res.data))
    appState.emit('houses')

  }
  async removeHouse(id) {
    // @ts-ignore
    const res = await axios.delete('https://bcw-sandbox.herokuapp.com/api/houses/' + id)
    appState.houses = appState.houses.filter(h => h.id != id)
  }

}

export const housesService = new HouseService()