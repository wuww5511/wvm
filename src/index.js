import Wvm from './mvm/Wvm'
window.test = new Wvm({
  data: {
    message: 'test',
    var1: 'var1'
  },
  keys: ['var1']
})

test._data.message = ''
test._data.var1 = ''