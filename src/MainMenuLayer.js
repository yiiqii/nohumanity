/* eslint-disable */

var MainMenuLayer = function () {
  Tiny.Container.call(this);

  //开始按钮
  this._startBtn = this.createStartBtn();
  this._startBtn.setEventEnabled(true);
  this._startBtn.tap = this._startBtn.mouseup = this.onReady;

  this.addChild(this._startBtn);
};
MainMenuLayer.prototype = Object.create(Tiny.Container.prototype);
MainMenuLayer.prototype.constructor = MainMenuLayer;

MainMenuLayer.prototype.createStartBtn = function () {
  var btn = Tiny.Sprite.fromFrame('play.png');
  btn.setAnchor(0.5);
  btn.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);

  return btn;
};

MainMenuLayer.prototype.onReady = function () {
  console.log('--- start ---');

  Tiny.app.replaceScene(new StartLayer());

};
