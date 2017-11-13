/* eslint-disable */

var Hero = function (layer) {
  this._layer = layer;
  this._type = 1;

  Tiny.Sprite.call(this);

  this.changeType(this._type);

  this.setAnchor(0.5);
  this.setScale(0.7);
  this.setRotation(Tiny.deg2radian(-10));
  this.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  this.setEventEnabled(true);
  this.collisionHeight = this.height - 20;
  this.swing();
  this.listenDrag(this);
};

Hero.prototype = Object.create(Tiny.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.changeType = function (type) {
  this._type = type;
  this.texture = Tiny.Texture.fromFrame('hero' + this._type + '.png')
};

Hero.prototype.swing = function () {
  var swingAction = Tiny.RotateTo(200, {rotation: Tiny.deg2radian(10)});
  this.runAction(Tiny.RepeatForever(Tiny.Back(swingAction)));
};

Hero.prototype.listenDrag = function (self) {
  var dragging = false;
  var pointData = null;
  var clickHandler = function (data) {
    data.stopPropagation();
    pointData = data;
    dragging = true;
  };
  var leaveHandler = function (data) {
    dragging = false;
    pointData = null;
  };
  this.on('pointerdown', clickHandler);
  this.on('pointerup', leaveHandler);
  this.on('pointerupoutside', leaveHandler);
  this.on('pointermove', (data) => {
    var layer = this._layer;
    if (dragging && pointData && !layer._die) {
      var newPos = pointData.data.getLocalPosition(this.parent);
      this.setPosition(newPos.x, newPos.y);

      if (layer._collisionManager.heroVsLines()) {
        layer.gameOver();
      }
    }
  });
};

Hero.prototype.die = function () {
  this.setVisible(false);
};

Hero.prototype.resume = function () {
  this.setVisible(true);
  this.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
};
