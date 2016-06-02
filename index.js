'use strict'

const net = require('net')

const MAX_PORT = 65535

/**
 * Check the port availability
 * @param  {Number}  port
 * @return {Promise}
 */
function isAvailable (port) {
  return new Promise((resolve, reject) => {
    const socket = net
      .connect(port)
      .setTimeout(400)

    socket.on('error', (error) => {
      if (error.code === 'ECONNREFUSED') {
        resolve(port)
        return
      }
      reject()
    })

    socket.on('timeout', () => {
      socket.destroy()
      reject()
    })

    socket.on('connect', () => {
      socket.destroy()
      reject()
    })
  })
}

/**
 * Find an open port between start and end
 * @param  {Number} start
 * @param  {Number} end
 * @return {Promise}
 */
function find (start, end) {
  end = end || MAX_PORT

  if (start < 1) {
    return Promise.reject('Start port must be greater than 0')
  }

  if (end > MAX_PORT) {
    return Promise.reject(`End port must be less than or equal to ${MAX_PORT}`)
  }

  if (start > end) {
    return Promise.reject('Start port must be less than or equal to end port')
  }

  function next (port) {
    if (port > end) {
      return Promise.reject('Could not find open port')
    }

    return isAvailable(port)
      .catch(() => next(port + 1))
  }

  return next(start)
}

find.isAvailable = isAvailable
module.exports = find
