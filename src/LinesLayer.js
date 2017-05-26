/* eslint-disable */

var LinesLayer = function () {
  Tiny.Container.call(this);

  this._g = new Tiny.Graphics();
  this._solidify = false;
  this._lineNum = 10;
  this._maxLineNum = 28;
  this._lineGroup = [];
};
LinesLayer.prototype = Object.create(Tiny.Container.prototype);
LinesLayer.prototype.constructor = LinesLayer;

LinesLayer.prototype.create = function (solidify) {
  var g = this._g;

  var space = 16, ww = Tiny.WIN_SIZE.width + space, wh = Tiny.WIN_SIZE.height + space;
  this._solidify = solidify;

  g.clear();

  if (!this._solidify) {
    ++this._lineNum;
    if (this._lineNum >= this._maxLineNum) {
      this._lineNum = this._maxLineNum;
    }
    console.log('lineNum:', this._lineNum);

    for (var i = 0; i < this._lineNum; i++) {
      var arr = [], ran, sx, sy, ex, ey, direction = Tiny.randomBool();

      arr.push(Tiny.randomFromArray([1, 1, 2, 2, 2, 3, 3, 3, 4, 6, 8]));

      ran = Tiny.randomFromArray([-1, 0, 2, 4, 6, 8, 10, 11]) % 2;//[-1,0,1]

      if (direction) {//横向
        sx = -space;
        sy = Tiny.random(-space, wh);

        if (ran == -1) {
          ex = Tiny.random(ww / 2, ww);
          ey = wh;
        } else if (ran == 0) {
          ex = ww;
          ey = Tiny.random(-space, wh);
        } else {
          ex = Tiny.random(ww / 2, ww);
          ey = -space;
        }
      } else { //竖向
        sx = Tiny.random(-space, ww);
        sy = -space;

        if (ran == -1) {
          ex = -space;
          ey = Tiny.random(wh / 2, wh);
        } else if (ran == 0) {
          ex = Tiny.random(-space, ww);
          ey = wh;
        } else {
          ex = ww;
          ey = Tiny.random(wh / 2, wh);
        }
      }

      this._lineGroup.push(arr.concat([sx, sy, ex, ey, ran, direction]));

      g.lineStyle(1, 0x333333, 0.1);
      g.moveTo(sx, sy);
      g.lineTo(ex, ey);
    }
  } else {
    this._lineGroup.forEach(function (item) {
      var sx = item[1], sy = item[2], ex = item[3], ey = item[4];
      g.lineStyle(item[0], 0x333333);
      g.moveTo(sx, sy);
      g.lineTo(ex, ey);
    });
  }

  var texture = Tiny.app.renderer.generateTexture(g);
  var trh = texture.baseTexture.realHeight, trw = texture.baseTexture.realWidth;
  var diffX = space / 2, diffY = space / 2;

  if (!this._solidify) {
    this._trh = trh;
    this._trw = trw;
  } else {
    diffX += (trw - this._trw) / 2;
    diffY += (trh - this._trh) / 2;
  }

  texture.frame = new Tiny.Rectangle(diffX, diffY, ww - diffX, wh - diffY);
  var sprite = new Tiny.Sprite(texture);

  this.removeChildren();
  this.addChild(sprite);
};

LinesLayer.prototype.run = function () {

};

LinesLayer.prototype.reset = function () {
  this._lineNum = 10;
};

LinesLayer.prototype.clear = function () {
  this._lineGroup = [];
  this._g.clear();
  this.removeChildren();
};
