class GameOverLayer extends Tiny.Container {
  constructor(layer) {
    super();

    this._layer = layer;

    const retry = Tiny.Sprite.fromFrame('tileset-vendor-retry.png');
    retry.setAnchor(0.5);
    retry.setScale(2);
    retry.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2 + 120);
    retry.setEventEnabled(true);
    retry.on('pointerdown', () => {
      this.onRetry();
    });
    this.addChild(retry);

    const share = Tiny.Sprite.fromFrame('tileset-vendor-share.png');
    share.setAnchor(0.5);
    share.setScale(2);
    share.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2 + share.height + 160);
    share.setEventEnabled(true);
    share.on('pointerdown', () => {
      this.onShare();
    });
    this.addChild(share);
  }

  onRetry() {
    // console.log('--- retry ---');
    this._layer.start();
  }

  onShare() {
    // console.log('--- share ---');
    const score = this._layer._score.get();
    window.alert(score ? `我很强！我让蜜蜂躲过${score}波攻击。` : '你行吗？蜜蜂在我手里第一波就挂了。。');
  }
}

export default GameOverLayer;
