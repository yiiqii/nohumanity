/* eslint-disable */

var Dust = function (layer) {
  this._layer = layer;
  this._instance = null;

  Tiny.Container.call(this);
};

Dust.prototype = Object.create(Tiny.Container.prototype);
Dust.prototype.constructor = Dust;

//OVERWRITE
Dust.prototype.updateTransform = function () {
  if (this._layer._die) {
    this._instance && this._instance.update();
  }

  this.containerUpdateTransform();
};

Dust.prototype.create = function (x, y) {
  this._instance = new Tiny.Dust(x, y, function () {
      return Tiny.Sprite.fromFrame('fragment.png')
    }, this,
    {
      number: 50,
      gravity: 0.01,
      randomSpacing: true,
      minAngle: 1, maxAngle: 6.18,
      minSize: 4, maxSize: 8,
      minSpeed: 2, maxSpeed: 12,
      minScaleSpeed: 0.0005, maxScaleSpeed: 0.001,
      minAlphaSpeed: 0.0005, maxAlphaSpeed: 0.001,
      minRotationSpeed: -0.1, maxRotationSpeed: 0.1
    });

  return this._instance;
};

Dust.prototype.clear = function () {
  this.removeChildren();
};
