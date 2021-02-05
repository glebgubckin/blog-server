const dayjs = require('dayjs')
require('dayjs/locale/ru')

class _ {
  getCurrentDate() {
    return dayjs()
  }

  getCurrentDateTime() {
    return dayjs(new Date())
  }
}

module.exports = new _()