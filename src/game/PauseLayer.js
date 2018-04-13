class PauseLayer extends Tiny.Container {
  constructor(layer) {
    super();

    this._layer = layer;

    const pause = Tiny.Sprite.fromFrame('tileset-vendor-continue.png');
    pause.setAnchor(0.5);
    pause.setScale(2);
    pause.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height - pause.height - 50);
    pause.setEventEnabled(true);
    pause.on('pointerdown', () => {
      this.setVisible(false);

      Tiny.app.resume();
    });
    this.setVisible(false);
    this.addChild(pause);
  }

  show() {
    this.setVisible(true);
  }
}

export default PauseLayer;
