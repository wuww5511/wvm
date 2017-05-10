import Dep from './Dep'
import * as util from './util'
class Watcher {
  constructor (getter = util.noop, cb = util.noop) {
    this.id = Symbol('watcher')
    this._getter = getter
    this._cb = cb
    this._deps = []
    this._value = this._get()
    
  }
  _get () {
    this.cleanup()
    Dep.pushTarget(this)
    var value = this._getter()
    Dep.popTarget()
    return value
  }
  update () {
    Watcher.add(this)
  }
  run () {
    var value = this._get()
    if (value === this._value) {
      return
    }
    this._cb(value, this._value)
    this._value = value
  }
  addDep (dep) {
    this._deps.push(dep)
  }
  cleanup () {
    this._deps.forEach(dep => {
      dep.remove(this.id)
    })
    this._deps = []
  }
}

Watcher.list = []

Watcher.IDLE = Symbol('idle')
Watcher.WAITING = Symbol('waiting')
Watcher.RUNNING= Symbol('running')

Watcher.status = Watcher.IDLE

Watcher.add = function (watcher) {
  var isExist = false
  this.list.forEach(li => {
    if (li.id === watcher) {
      isExist = true
    }
  })
  if (isExist) return
  this.list.push(watcher)
  if (this.status === this.IDLE) {
    this.run()
  }
}

Watcher.run = function () {
  this.status = this.WAITING
  setTimeout(() => {
    this.status = this.RUNNING
    this.list.forEach(watcher => {
      watcher.run()
    })
    this.status = this.IDLE
    this.list = []
  })
}

export default Watcher