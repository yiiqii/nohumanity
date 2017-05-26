/* eslint-disable */

var GameOver = function (layer) {
  this._layer = layer;

  Tiny.Container.call(this);

  this.addChild(this.createRetry());
};

GameOver.prototype = Object.create(Tiny.Container.prototype);
GameOver.prototype.constructor = GameOver;

GameOver.prototype.createRetry = function () {
  var retry = Tiny.Sprite.fromFrame('retry.png');
  retry.setAnchor(0.5);
  retry.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2 + 120);
  retry.setEventEnabled(true);
  retry.tap = retry.mouseup = this.onRetry;

  return retry;
};

GameOver.prototype.onRetry = function () {
  console.log('--- retry ---');

  this.parent._layer.start();
};
