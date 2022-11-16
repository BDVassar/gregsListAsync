import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {


  // SECTION cars
  //#region 
  /** @type {import('./Models/Car').Car[]} */
  cars = []

  /** @type {import('./Models/Car').Car|null} */
  activeCar = null
  //#endregion

  // SECTION houses
  //#region 
  /** @type {import('./Models/House').House[]} */
  houses = []

  /** @type {import('./Models/House').House|null} */
  activeHouse = null
  //#endregion

  // SECTION jobs
  //#region 
  /** @type {import('./Models/Job').Job[]} */
  jobs = []

  /** @type {import('./Models/Job').Job|null} */
  activeJob = null
  //#endregion

}


export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
