class Score extends Tiny.Container {
  constructor() {
    super();

    this._num = 0;

    this.di = Tiny.Sprite.fromFrame('tileset-vendor-di.png');
    this.bo = Tiny.Sprite.fromFrame('tileset-vendor-bo.png');
    this.di.setPositionX(-100);
    this.bo.setPositionX(-100);
    this.di.setScale(2);
    this.bo.setScale(2);
    this.addChild(this.di);
    this.addChild(this.bo);
  }

  show(num) {
    this._num = num;

    const s = num.toString();
    const len = s.length;
    let w = 0;
    const numCell = new Tiny.Container();
    for (let i = 0; i < len; i++) {
      const n = Tiny.Sprite.fromFrame(`tileset-vendor-${s[i]}.png`);
      n.setScale(2);
      w = n.width;
      n.setPosition(w * i, 0);
      numCell.addChild(n);
    }
    this.di.setPositionX(-this.di.width);
    this.bo.setPositionX(numCell.width);
    this.addChild(numCell);
    this.setPosition(Tiny.WIN_SIZE.width / 2 - numCell.width / 2, -this.height);

    const action = Tiny.MoveTo(200, {y: 80});
    action.setEasing(Tiny.TWEEN.Easing.Exponential.Out);
    action.onComplete = () => {
      this.removeChild(numCell);
      Tiny.Action.cleanup(this);
    };
    this.runAction(Tiny.Repeat(2, Tiny.Back(action), 2200));
  }

  get() {
    return this._num;
  }
}

export default Score;
