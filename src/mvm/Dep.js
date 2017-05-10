class Dep {
  constructor () {
    this.id = Symbol('dep')
    this._watchers = []
  }
  
  add (watcher) {
    this._watchers.push(watcher)
    watcher.addDep(this)
  }
  
  notify () {
    this._watchers.forEach(watcher => {
      watcher.update()
    })
  }
  
  remove (id) {
    for (let i = 0; i < this._watchers.length; i++) {
      if (this._watchers[i].id === id) {
        this._watchers.splice(i, 1)
        break
      }
    }
  }
}

Dep.target = null

Dep._targets = []

Dep.pushTarget = function (watcher) {
  if (this.target) {
    this._targets.push(this.target)
  }
  this.target = watcher
}

Dep.popTarget = function () {
  this.target = this._targets.pop()
}

export default Dep