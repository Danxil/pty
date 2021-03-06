import Q from 'q'
import socket from './socket.js'

module.exports = {
  create,
  on,
  off
};

var prefix = ''

function create(data) {
  //var url = prefix + '/gameapplication/user/' + $.cookie('userId')
  var url = prefix + '/gameapplication'

  var defer = Q.defer()
  socket.request({
    method: 'post',
    url,
    data
  }, function(data, jwres) {
    if (jwres.error) {
      defer.reject(jwres.error);
    }

    defer.resolve(data);
  })

  return defer.promise
}

function on(callback) {
  socket.on('gameapplication', callback)
}

function off() {
  socket.off('gameapplication')
}