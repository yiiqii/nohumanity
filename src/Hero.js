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
  var swingAction = Tiny.RotateBy(200, {rotation: Tiny.deg2radian(10)});
  this.runAction(Tiny.RepeatForever(swingAction));
};

Hero.prototype.listenDrag = function (self) {
  self.mousedown = this.touchstart = function (data) {
    data.stopPropagation();
    self.pointData = data;
    self.dragging = true;
  };

  self.mouseup = this.mouseupoutside = this.touchend = this.touchendoutside = function (data) {
    self.dragging = false;
    self.pointData = null;
  };

  self.mousemove = self.touchmove = function (data) {
    if (self.dragging && self.pointData && !self._layer._die) {
      var newPos = self.pointData.data.getLocalPosition(self.parent);
      self.setPosition(newPos.x, newPos.y);

      if (self._layer._collisionManager.heroVsLines()) {
        self._layer.gameOver();
      }
    }
  };
};

Hero.prototype.die = function () {
  this.setVisible(false);
};

Hero.prototype.resume = function () {
  this.setVisible(true);
  this.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
};
