import Dep from './Dep'
class Reactive {
  constructor (obj, key, val) {
    this._val = val
    this._dep = new Dep()
    Object.defineProperty(obj, key, {
      get: () => {
        if (Dep.target) {
          this._dep.add(Dep.target)
        }
        return this._val
      },
      set: (value) => {
        if (value === this._val) {
          return
        }
        this._val = value
        this._dep.notify()
      }
    })
  }
}

export default Reactive
