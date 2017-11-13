/* eslint-disable */

var Bomb = function (layer) {
  this._layer = layer;

  Tiny.Container.call(this);

  this._bombList = [];
  this._pos = {
    x: 0,
    y: 0
  };
  this._bombSet = {
    num: 0,
    counter: 0,
    ran: 0,
    posX: 0,
    posY: 0,
    is08Scaled: false
  };
  this._speed = 1;
  this._currentTime = 0;
  this._time = 480 / 16;
};

Bomb.prototype = Object.create(Tiny.Container.prototype);
Bomb.prototype.constructor = Bomb;

//OVERWRITE
Bomb.prototype.updateTransform = function () {
  this.tick();

  this.containerUpdateTransform();
};

Bomb.prototype.clear = function () {
  this.removeChildren();
};

Bomb.prototype.create = function () {
  var bomb = Tiny.Sprite.fromFrame('bomb.png');
  var hero = this._layer._hero;
  var self = this;
  var x = 0;
  var y = 0;
  var winWidth = Tiny.WIN_SIZE.width;
  var winHeight = Tiny.WIN_SIZE.height;
  var w = bomb.width;
  var h = bomb.height;
  var targetX = hero.getPositionX();
  var targetY = hero.getPositionY();
  var endX = -w;
  var endY = -h;
  var angle = 0;
  var speed = Tiny.randomInt(6000, 7000);
  var scale = Tiny.randomFromArray([0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.8]);

  if (this._layer._die) {
    targetX = Tiny.randomInt(0, Tiny.WIN_SIZE.width);
    targetY = Tiny.randomInt(0, Tiny.WIN_SIZE.height);
  }

  if (this._bombSet.counter >= this._bombSet.num) {
    this._bombSet.counter = 0;
    this._bombSet.num = Tiny.randomInt(8, 16);
    this._bombSet.ran = Tiny.randomBool();
    this._bombSet.x = Tiny.randomInt(0, winWidth);
    this._bombSet.y = Tiny.randomInt(0, winHeight);
    this._bombSet.posX = Tiny.randomFromArray([-w, winWidth]);
    this._bombSet.posY = Tiny.randomFromArray([-h, winHeight]);
    this._bombSet.is08Scaled = false;
  } else {
    //大号导弹每轮只生成一次
    if (scale == 0.8) {
      if (this.is08Scaled) {
        scale = 0.2;
      } else {
        this.is08Scaled = true;
        speed = 8000;//大号导弹速度慢点
      }
    }
  }
  this._bombSet.counter++;
  x = this._bombSet.x;
  y = this._bombSet.y;

  bomb.setScale(scale);

  if (this._bombSet.ran) {
    this._pos.x = this._bombSet.posX;
    this._pos.y = y;

    endY = winWidth * ((targetY - y) / targetX) + y;
    angle = Math.atan2(y - endY, winWidth + endX);
    if (this._pos.x == -w) {
      endX = winWidth + w;
      angle = Tiny.PI_2 / 2 - Math.atan2(y - endY, endX);
    }
  } else {
    this._pos.x = x;
    this._pos.y = this._bombSet.posY;

    endX = winHeight * ((targetX - x) / targetY) + x;
    angle = Math.atan2(winHeight + endY, x - endX);
    if (this._pos.y == -h) {
      endY = winHeight + h;
      angle = -Math.atan2(endY, x - endX);
    }
  }
  bomb.setPosition(this._pos.x, this._pos.y);
  bomb.setRotation(angle);
  //t.log(bomb.x, bomb.y, endX, endY);
  this.addChild(bomb);
  var mtAction = Tiny.MoveTo(speed, {
    x: [endX],
    y: [endY]
  });
  mtAction.onComplete = function () {
    self.removeChild(bomb);
  };

  bomb.runAction(mtAction);
  bomb.data = Tiny.app.renderer.plugins.extract.pixels(bomb);
  this._bombList.push(bomb);
};

Bomb.prototype.tick = function () {
  this._currentTime += this._speed;

  var round = (this._currentTime + 0.5) | 0;

  this._currentTime = this._currentTime % this._time;

  if (round >= this._time) {
    for (var i = 0; i < Tiny.randomFromArray([1, 2, 3, 4]); i++) {
      this.create();
    }
  }
};
