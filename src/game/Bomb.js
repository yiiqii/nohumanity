class Bomb extends Tiny.Container {
  constructor(layer) {
    super();

    this._layer = layer;
    this._bombList = [];
    this._pos = {
      x: 0,
      y: 0,
    };
    this._bombSet = {
      num: 0,
      counter: 0,
      ran: 0,
      posX: 0,
      posY: 0,
      isBig: false,
    };
    this._speed = 1;
    this._currentTime = 0;
    this._time = 480 / 16;
  }

  updateTransform() {
    this.tick();
    this.containerUpdateTransform();
  }

  create() {
    const layer = this._layer;
    const bombSet = this._bombSet;
    const hero = layer._hero;
    const bomb = Tiny.Sprite.fromFrame('tileset-vendor-bomb.png');
    const w = bomb.width;
    const h = bomb.height;
    const winWidth = Tiny.WIN_SIZE.width;
    const winHeight = Tiny.WIN_SIZE.height;
    let endX = -w;
    let endY = -h;
    let targetX = hero.getPositionX();
    let targetY = hero.getPositionY();
    let angle = 0;
    let scale = Tiny.randomFromArray([0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.5, 0.5, 0.8]);
    let speed = scale === 0.2 ? 6000 : 8000;// 导弹越小速度越快

    if (layer.isDead()) {
      targetX = Tiny.randomInt(0, Tiny.WIN_SIZE.width);
      targetY = Tiny.randomInt(0, Tiny.WIN_SIZE.height);
    }

    if (bombSet.counter >= bombSet.num) {
      bombSet.counter = 0;
      bombSet.num = Tiny.randomInt(8, 16);
      bombSet.ran = Tiny.randomBool();
      bombSet.x = Tiny.randomInt(0, winWidth);
      bombSet.y = Tiny.randomInt(0, winHeight);
      bombSet.posX = Tiny.randomFromArray([-w, winWidth]);
      bombSet.posY = Tiny.randomFromArray([-h, winHeight]);
      bombSet.isBig = false;
    } else {
      //大号导弹每轮只生成一次
      if (scale === 0.8) {
        if (this.isBig) {
          scale = 0.2;
        } else {
          this.isBig = true;
          speed = 12000;//大号导弹速度慢点
        }
      }
    }
    bomb.setScale(scale);
    bombSet.counter++;

    const x = bombSet.x;
    const y = bombSet.y;

    if (bombSet.ran) {
      this._pos.x = bombSet.posX;
      this._pos.y = y;

      endY = winWidth * ((targetY - y) / targetX) + y;
      angle = Math.atan2(y - endY, winWidth + endX);
      if (this._pos.x === -w) {
        endX = winWidth + w;
        angle = Tiny.PI_2 / 2 - Math.atan2(y - endY, endX);
      }
    } else {
      this._pos.x = x;
      this._pos.y = bombSet.posY;

      endX = winHeight * ((targetX - x) / targetY) + x;
      angle = Math.atan2(winHeight + endY, x - endX);
      if (this._pos.y === -h) {
        endY = winHeight + h;
        angle = -Math.atan2(endY, x - endX);
      }
    }
    bomb.setPosition(this._pos.x, this._pos.y);
    bomb.setRotation(angle);
    //t.log(bomb.x, bomb.y, endX, endY);
    this.addChild(bomb);

    // 定义 Action
    const mtAction = Tiny.MoveTo(speed, {
      x: [endX],
      y: [endY],
    });
    mtAction.onComplete = () => {
      this.removeChild(bomb);
      Tiny.arrayRemoveObject(this._bombList, bomb);
    };
    bomb.runAction(mtAction);
    bomb.data = Tiny.app.renderer.plugins.extract.pixels(bomb);
    this._bombList.push(bomb);
  }

  clear() {
    this.removeChildren();
  }

  tick() {
    this._currentTime += this._speed;

    const round = (this._currentTime + 0.5) | 0;

    this._currentTime = this._currentTime % this._time;

    if (round >= this._time) {
      for (let i = 0; i < Tiny.randomFromArray([1, 2, 3, 4]); i++) {
        this.create();
      }
    }
  }
}

export default Bomb;
