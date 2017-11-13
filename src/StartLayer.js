/* eslint-disable */

var StartLayer = function () {
  Tiny.Container.call(this);

  this._start = false;

  //背景
  this._background = Tiny.Sprite.fromImage(RESOURCES['s_bg_jpg']);

  //hero
  this._hero = new Hero(this);
  this._hero.data = Tiny.app.renderer.plugins.extract.pixels(this._hero);

  //粒子
  this._dust = new Dust(this);

  //线容器
  this._linesContainer = new Tiny.Container();
  this._lines = new LinesLayer();

  //炸弹容器
  this._bombConatainer = new Bomb(this);

  //结束layer
  this._gameOverLayer = new GameOver(this);

  //碰撞检测
  this._collisionManager = new CollisionManager(this);

  this._die = false;

  this._speed = 1;
  this._lCurrentTime = 0;
  this._slCurrentTime = 0;
  this._clCurrentTime = 0;
  this._lTime = 5000 / 16; //虚线定时
  this._slTime = 1000 / 16; //实线定时
  this._clTime = 1000 / 16;
  this._lTicker = true;
  this._slTicker = false;
  this._clTicker = false;

  this.init();
};
StartLayer.prototype = Object.create(Tiny.Container.prototype);
StartLayer.prototype.constructor = StartLayer;

StartLayer.prototype.init = function () {
  this.addChild(this._background);
  this.addChild(this._linesContainer);
  this.addChild(this._hero);
  this.addChild(this._dust);
  this.addChild(this._bombConatainer);
  this.addChild(this._gameOverLayer);
  this.start();
};

//OVERWRITE
StartLayer.prototype.updateTransform = function () {
  if (!this._die) {
    this._lTicker && this.lTick();
    this._slTicker && this.slTick();
  }
  this._clTicker && this.clearTick();
  this._collisionManager.update();

  this.containerUpdateTransform();
};

StartLayer.prototype.start = function () {
  console.log('--- game start ---');
  this._die = false;
  this._hero.resume();
  this._dust.clear();
  this._lines.reset();
  this._gameOverLayer.setVisible(false);
};

StartLayer.prototype.gameOver = function () {
  console.log('--- game over ---');
  this._die = true;
  this._hero.die();
  this._dust.create(this._hero.getPositionX(), this._hero.getPositionY());
  this._gameOverLayer.setVisible(true);
};

StartLayer.prototype.createLines = function (solidify) {
  this._lines.create(solidify);
  this._linesContainer.removeChildren();
  this._linesContainer.addChild(this._lines);
  solidify && (this._lines.data = Tiny.app.renderer.plugins.extract.pixels(this._lines));
};

StartLayer.prototype.lTick = function () {
  this._lCurrentTime += this._speed;

  var round = (this._lCurrentTime + 0.5) | 0;

  this._lCurrentTime = this._lCurrentTime % this._lTime;

  if (round >= this._lTime) {
    console.log(new Date().getSeconds(), 'createLines');
    this.createLines();

    this._lTicker = false;
    this._slTicker = true;
    this._clTicker = false;
  }
};

StartLayer.prototype.slTick = function () {
  this._slCurrentTime += this._speed;

  var round = (this._slCurrentTime + 0.5) | 0;

  this._slCurrentTime = this._slCurrentTime % this._slTime;

  if (round >= this._slTime) {
    console.log(new Date().getSeconds(), 'createSolidifyLines');
    this.createLines(true);

    this._lTicker = true;
    this._slTicker = false;
    this._clTicker = true;
  }
};

StartLayer.prototype.clearTick = function () {
  this._clCurrentTime += this._speed;

  var round = (this._clCurrentTime + 0.5) | 0;

  this._clCurrentTime = this._clCurrentTime % this._clTime;

  if (round >= this._clTime) {
    console.log(new Date().getSeconds(), 'clearLines');
    this._linesContainer.removeChildren();
    this._lines.clear();

    this._lTicker = true;
    this._slTicker = false;
    this._clTicker = false;
  }
};
