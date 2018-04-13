import Dust from 'tinyjs-plugin-dust';

class DustCell extends Tiny.Container {
  constructor(layer) {
    super();

    this._layer = layer;
    this._instance = null;
  }

  updateTransform() {
    if (this._layer.isDead()) {
      this._instance && this._instance.update();
    }

    this.containerUpdateTransform();
  }

  create(x, y) {
    this._instance = new Dust(x, y, function () {
      return Tiny.Sprite.fromFrame('tileset-vendor-fragment.png');
    }, this, {
      number: 50,
      gravity: 0.01,
      randomSpacing: true,
      minAngle: 1,
      maxAngle: 6.18,
      minSize: 2,
      maxSize: 12,
      minSpeed: 2,
      maxSpeed: 12,
      minScaleSpeed: 0.0005,
      maxScaleSpeed: 0.001,
      minAlphaSpeed: 0.0005,
      maxAlphaSpeed: 0.001,
      minRotationSpeed: -0.1,
      maxRotationSpeed: 0.1,
    });

    return this._instance;
  }

  clear() {
    this.removeChildren();
  }
}

export default DustCell;
