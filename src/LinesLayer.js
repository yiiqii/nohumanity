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
  var space = 16; // 固定值，避免创建的线条首尾在画布显示有"缺口"，值的规则为 lineWidth 的最大值
  var ww = Tiny.WIN_SIZE.width + space; // 线条占据画布的宽度
  var wh = Tiny.WIN_SIZE.height + space; // 线条占据画布的高度
  this._solidify = solidify;

  g.clear();

  if (!this._solidify) {
    ++this._lineNum;
    if (this._lineNum >= this._maxLineNum) {
      this._lineNum = this._maxLineNum;
    }
    console.log('lineNum:', this._lineNum);

    for (var i = 0; i < this._lineNum; i++) {
      var sx; // 线条起点 x
      var sy; // 线条起点 y
      var ex; // 线条终点 x
      var ey; // 线条终点 y
      var direction = Tiny.randomBool(); // 随机水平方向 or 垂直方向
      var lineWidth = Tiny.randomFromArray([1, 1, 2, 2, 2, 3, 3, 3, 4, 6, 8]);
      var endRan = Tiny.randomFromArray([-1, 0, 0, 0, 0, 0, 0, 1]) % 2;

      if (direction) {//横向
        sx = -space;
        sy = Tiny.random(-space, wh);

        if (endRan == -1) {
          ex = Tiny.random(ww / 2, ww);
          ey = wh;
        } else if (endRan == 0) {
          ex = ww;
          ey = Tiny.random(-space, wh);
        } else {
          ex = Tiny.random(ww / 2, ww);
          ey = -space;
        }
      } else { //竖向
        sx = Tiny.random(-space, ww);
        sy = -space;

        if (endRan == -1) {
          ex = -space;
          ey = Tiny.random(wh / 2, wh);
        } else if (endRan == 0) {
          ex = Tiny.random(-space, ww);
          ey = wh;
        } else {
          ex = ww;
          ey = Tiny.random(wh / 2, wh);
        }
      }

      this._lineGroup.push([lineWidth, sx, sy, ex, ey, endRan, direction]);
      g.lineStyle(1, 0x333333, 0.1);
      g.moveTo(sx, sy);
      g.lineTo(ex, ey);
    }
  } else {
    this._lineGroup.forEach(function (item) {
      var sx = item[1];
      var sy = item[2];
      var ex = item[3];
      var ey = item[4];
      g.lineStyle(item[0], 0x333333);
      g.moveTo(sx, sy);
      g.lineTo(ex, ey);
    });
  }

  var texture = Tiny.app.renderer.generateTexture(g);
  var sprite = new Tiny.Sprite(texture);
  sprite.position.x -= space;
  sprite.position.y -= space;

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
