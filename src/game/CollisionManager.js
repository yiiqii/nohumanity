class CollisionManager {
  constructor(layer) {
    this._layer = layer;
  }

  update() {
    const layer = this._layer;
    if (!layer.isDead()) {
      if (this.heroVsLines() || this.heroVsBomb()) {
        layer.gameOver();
      }
    }
  }

  heroVsLines() {
    const layer = this._layer;
    const hero = layer._hero;
    const lines = layer._lines;
    const linesContainer = layer._linesContainer;
    let collide = false;

    if (linesContainer.children.length === 0 || !lines._solidify) {
      collide = false;
    } else {
      collide = Tiny.isPixelCollision(
        hero,
        hero.getPositionX(),
        hero.getPositionY(),
        true,
        lines,
        lines.getPositionX() - 16,
        lines.getPositionY() - 16,
        false);
    }

    return collide;
  }

  heroVsBomb() {
    const layer = this._layer;
    const hero = layer._hero;
    const bombs = layer._bombConatainer._bombList;
    let collide = false;

    bombs.forEach(function (item) {
      !collide && (collide = Tiny.isPixelCollision(
        hero,
        hero.getPositionX(),
        hero.getPositionY(),
        true,
        item,
        item.getPositionX(),
        item.getPositionY(),
        false));
    });

    return collide;
  }
}

export default CollisionManager;
