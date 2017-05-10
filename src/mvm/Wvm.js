import Reactive from './Reactive'
import Watcher from './Watcher'
import * as util from './util'
class Wvm {
  constructor (opts = {}) {
    var {data, keys} = opts
    this._data = data
    this._keys = keys
    for (let i in data) {
      new Reactive(this._data, i, this._data[i])
    }
    new Watcher(this.update.bind(this), util.noop)
  }
  update () {
    this._keys.forEach(key => {
      this._data[key]
    })
    console.log('render')
  }
}

export default Wvm