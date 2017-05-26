/* eslint-disable */

var CollisionManager = function (layer) {
  this._layer = layer;
};

CollisionManager.prototype.constructor = CollisionManager;

CollisionManager.prototype.update = function () {
  if (!this._layer._die) {
    if (this.heroVsLines() || this.heroVsBomb()) {
      this._layer.gameOver();
    }
  }
};

CollisionManager.prototype.heroVsLines = function () {
  var hero = this._layer._hero, lines = this._layer._lines, linesContainer = this._layer._linesContainer;

  var collide = false;

  if (linesContainer.children.length == 0 || !lines._solidify) {
    collide = false;
  } else {
    collide = Tiny.isPixelCollision(
      hero,
      hero.getPositionX(),
      hero.getPositionY() - 5,
      true,
      lines,
      lines.getPositionX(),
      lines.getPositionY(),
      false);
  }

  return collide;
};

CollisionManager.prototype.heroVsBomb = function () {
  var hero = this._layer._hero, bombs = this._layer._bombConatainer._bombList;

  var collide = false;

  bombs.forEach(function (item) {
    !collide && (collide = Tiny.isPixelCollision(
      hero,
      hero.getPositionX(),
      hero.getPositionY() - 5,
      true,
      item,
      item.getPositionX(),
      item.getPositionY(),
      false));
  });

  return collide;
};
