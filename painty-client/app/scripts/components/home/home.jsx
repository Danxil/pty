import React from 'react'
import Template from './home.tpl.jsx'
import GameApplicationAPI from '../../api/gameApplicationAPI.js'
import GameAPI from '../../api/gameAPI.js'
import suspend from 'suspend'

var Home = React.createClass({
  render,
  getInitialState,
  componentDidMount: suspend(componentDidMount),
  createGameApplication
});

module.exports = Home;

function render() {
  return Template.apply(this);
}

function getInitialState() {
  return {}
}

function *componentDidMount() {
  var gameApplicationResult = yield GameApplicationAPI.on()
  var game = yield GameAPI.subscribe(gameApplicationResult.data.gameId)

  console.log(game)
}

//==========================

function createGameApplication() {
  window.userId = this.refs.userId.getValue()

  GameApplicationAPI.create(this.refs.userId.getValue())
}