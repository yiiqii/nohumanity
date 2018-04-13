class Hero extends Tiny.AnimatedSprite {
  constructor(layer) {
    const textures = [
      Tiny.Texture.fromFrame('tileset-vendor-hero-1.png'),
      Tiny.Texture.fromFrame('tileset-vendor-hero-2.png'),
    ];

    super(textures);

    this._layer = layer;
    this.data = Tiny.app.renderer.plugins.extract.pixels(this);
    this.animationSpeed = 0.05;
    this.setAnchor(0.5);
    this.setRotation(Tiny.deg2radian(-10));
    this.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
    this.setEventEnabled(true);

    this.play();
    this.swing();
    this.listenDrag();
  }

  listenDrag() {
    let dragging = false;
    let pointData = null;
    const clickHandler = function (data) {
      data.stopPropagation();
      pointData = data;
      dragging = true;
    };
    const leaveHandler = function (data) {
      dragging = false;
      pointData = null;
    };
    this.on('pointerdown', clickHandler);
    this.on('pointerup', leaveHandler);
    this.on('pointerupoutside', leaveHandler);
    this.on('pointermove', (data) => {
      const layer = this._layer;
      if (dragging && pointData && !layer.isDead()) {
        const newPos = pointData.data.getLocalPosition(this.parent);
        this.setPosition(newPos.x, newPos.y);

        if (layer._collisionManager.heroVsLines()) {
          layer.gameOver();
        }
      }
    });
  }

  swing() {
    const swingAction = Tiny.RotateTo(200, {rotation: Tiny.deg2radian(10)});
    this.runAction(Tiny.RepeatForever(Tiny.Back(swingAction)));
  }

  die() {
    this.setVisible(false);
  };

  resume() {
    this.setVisible(true);
    this.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  }
}

export default Hero;
