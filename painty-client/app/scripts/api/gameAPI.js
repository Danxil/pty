import Q from 'q'
import socket from './socket.js'

module.exports = {
  subscribe,
  unsubscribe,
  on,
  off,
  addAction
};

var prefix = ''

function subscribe(gameId) {
  var url = prefix + '/game/' + gameId + '/subscribe'

  var defer = Q.defer()
  socket.request({
    method: 'get',
    url,
  }, function(data, jwres) {
    if (jwres.error) {
      defer.reject(jwres.error);
    }

    defer.resolve(data);
  })

  return defer.promise
}

function unsubscribe(gameId) {
  var url = prefix + '/game/' + gameId + '/unsubscribe'

  var defer = Q.defer()
  socket.request({
    method: 'get',
    url,
  }, function(data, jwres) {
    if (jwres.error) {
      defer.reject(jwres.error);
    }

    defer.resolve(data);
  })

  return defer.promise
}

function addAction(gameId, data) {
  var url = prefix + '/game/' + gameId

  var defer = Q.defer()
  socket.request({
    method: 'put',
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
  return socket.on('game', callback)
}

function off() {
  return socket.off('game')
}