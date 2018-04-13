import StartLayer from './StartLayer';

class MainMenuLayer extends Tiny.Container {
  constructor() {
    super();

    const container = new Tiny.Container();
    // 蜜蜂
    const hero = new Tiny.AnimatedSprite([
      Tiny.Texture.fromFrame('tileset-vendor-hero-1.png'),
      Tiny.Texture.fromFrame('tileset-vendor-hero-2.png'),
    ]);
    hero.animationSpeed = 0.05;
    hero.setAnchor(0.5);
    hero.setPositionY(-20);
    hero.play();
    container.addChild(hero);

    const title = Tiny.Sprite.fromFrame('tileset-vendor-title.png');
    title.setAnchor(0.5);
    title.setScale(2);
    title.setPositionY(title.height);
    container.addChild(title);

    // 说明
    const text = new Tiny.Text('移动蜜蜂，躲避激光和导弹，不要让它受伤害', {
      fill: '#999999',
    });
    text.setAnchor(0.5);
    text.setPositionY(title.height + hero.height + text.height);
    container.addChild(text);

    this.addChild(container);
    container.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height * 0.2);

    // 开始按钮
    const startBtn = Tiny.Sprite.fromFrame('tileset-vendor-start.png');
    startBtn.setAnchor(0.5);
    startBtn.setScale(1.6);
    startBtn.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2 + 100);
    startBtn.setEventEnabled(true);
    startBtn.on('pointerdown', this.onReady);
    this.addChild(startBtn);
  }

  onReady() {
    // console.log('--- start ---');

    Tiny.app.replaceScene(new StartLayer());
  }
}

export default MainMenuLayer;
