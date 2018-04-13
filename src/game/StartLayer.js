import Hero from './Hero';
import DustCell from './DustCell';
import Bomb from './Bomb';
import Lines from './Lines';
import Score from './Score';
import GameOverLayer from './GameOverLayer';
import PauseLayer from './PauseLayer';
import CollisionManager from './CollisionManager';

class StartLayer extends Tiny.Container {
  constructor() {
    super();

    //背景
    this._background = Tiny.Sprite.fromImage(Tiny.resources.bgJPG);
    this._background.setScale(2);

    //hero
    this._hero = new Hero(this);

    //粒子
    this._dustCell = new DustCell(this);

    //线容器
    this._linesContainer = new Tiny.Container();
    this._lines = new Lines();

    //炸弹容器
    this._bombConatainer = new Bomb(this);

    //结束layer
    this._gameOverLayer = new GameOverLayer(this);

    //碰撞检测
    this._collisionManager = new CollisionManager(this);

    //得分
    this._score = new Score(this);

    //继续
    this._pauseLayer = new PauseLayer(this);

    this._die = false;

    this._speed = 1;
    this._times = 0;
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
  }

  init() {
    this.addChild(this._background);
    this.addChild(this._linesContainer);
    this.addChild(this._hero);
    this.addChild(this._dustCell);
    this.addChild(this._bombConatainer);
    this.addChild(this._score);
    this.addChild(this._pauseLayer);
    this.addChild(this._gameOverLayer);
    this.start();
  }

  updateTransform() {
    if (!this._die) {
      this._lTicker && this.lTick();
      this._slTicker && this.slTick();
    }
    this._clTicker && this.clearTick();
    this._collisionManager.update();

    this.containerUpdateTransform();
  }

  start() {
    // console.log('--- game start ---');
    this._die = false;
    this._times = 0;
    this._hero.resume();
    this._dustCell.clear();
    this._lines.reset();
    this._gameOverLayer.setVisible(false);
  }

  gameOver() {
    // console.log('--- game over ---');
    this._die = true;
    this._hero.die();
    this._dustCell.create(this._hero.getPositionX(), this._hero.getPositionY());
    this._gameOverLayer.setVisible(true);
  }

  createLines(solidify) {
    this._lines.create(solidify);
    this._linesContainer.removeChildren();
    this._linesContainer.addChild(this._lines);
    solidify && (this._lines.data = Tiny.app.renderer.plugins.extract.pixels(this._lines));
  }

  lTick() {
    this._lCurrentTime += this._speed;

    const round = (this._lCurrentTime + 0.5) | 0;

    this._lCurrentTime = this._lCurrentTime % this._lTime;

    if (round >= this._lTime) {
      this._times++;
      this._score.show(this._times);

      // console.log(new Date().getSeconds(), 'createLines');
      this.createLines();

      this._lTicker = false;
      this._slTicker = true;
      this._clTicker = false;
    }
  }

  slTick() {
    this._slCurrentTime += this._speed;

    const round = (this._slCurrentTime + 0.5) | 0;

    this._slCurrentTime = this._slCurrentTime % this._slTime;

    if (round >= this._slTime) {
      // console.log(new Date().getSeconds(), 'createSolidifyLines');
      this.createLines(true);

      this._lTicker = true;
      this._slTicker = false;
      this._clTicker = true;
    }
  }

  clearTick() {
    this._clCurrentTime += this._speed;

    const round = (this._clCurrentTime + 0.5) | 0;

    this._clCurrentTime = this._clCurrentTime % this._clTime;

    if (round >= this._clTime) {
      // console.log(new Date().getSeconds(), 'clearLines');
      this._linesContainer.removeChildren();
      this._lines.clear();

      this._lTicker = true;
      this._slTicker = false;
      this._clTicker = false;
    }
  }

  isDead() {
    return this._die;
  }

  pause() {
    this._pauseLayer.show();
  }
}

export default StartLayer;
