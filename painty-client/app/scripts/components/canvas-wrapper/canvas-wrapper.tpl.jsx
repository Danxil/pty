import React from 'react'
import {Button, Input} from 'react-bootstrap'

function getEstimatorsActions(gameUsersActions) {
  var gameUserActions = _.cloneDeep(gameUsersActions).reverse();
  
  var estimatorsActions = _.filter(gameUserActions, function(gameUserAction) {
    return gameUserAction.action.instrument == 'estimate';
  })

  estimatorsActions = _.uniqBy(estimatorsActions, 'game_user');

  return estimatorsActions
}

module.exports = function() {
  var gameUser = this.props.gameUser;
  var estimatorsActions = getEstimatorsActions(this.props.gameUsersActions);

  var votes = _.filter(estimatorsActions, function(gameUserAction) {
    return gameUserAction.action.gameUserId == gameUser.id
  })

  return <div>
    <p>
      User login: {gameUser.user.login}
    </p>
    <p>
      Game user id: {gameUser.id}
    </p>
    <div className={'canvas-wrapper ' + gameUser.id}>
      <canvas className="canvas upper"
              width="300"
              height="300"
              id={gameUser.id + '-upper'}>
      </canvas>
      <canvas className="canvas lower"
              width="300"
              height="300"
              id={gameUser.id + '-lower'}>
      </canvas>
      <div className="painty-area"></div>
      <div className="brush" id={gameUser.id + '-brush'}>
        <img src="http://iconizer.net/files/Shimmer_Icons/orig/brush.png"
             alt=""/>
      </div>
      <div className="cursor" id={gameUser.id + '-cursor'}>
        <i></i>
      </div>
    </div>
    <span>{votes.length}</span>
  </div>
};
