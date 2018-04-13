require('./css/index.less');
require('tinyjs-plugin-extract');

import * as resources from './game/resources';
import MainMenuLayer from './game/MainMenuLayer';
import StartLayer from './game/StartLayer';

var config = {
  showFPS: true,
  referWidth: 375,
  dpi: 2,
  renderType: Tiny.RENDERER_TYPE.CANVAS,
  renderOptions: {
    backgroundColor: 0xffffff,
  },
};
if (navigator.userAgent.toLowerCase().indexOf('mobile') === -1) {
  config.width = window.innerWidth;
  config.height = window.innerHeight;
  config.fixSize = true;
}
Tiny.app = new Tiny.Application(config);

const main = {
  init () {
    // console.log('init');
    Tiny.resources = resources;
    this.resourceLoad();
  },
  resourceLoad () {
    const progress = document.getElementById('progress');
    const percent = document.getElementById('percent');

    Tiny.Loader.run({
      resources: Object.values(resources),
      onProgress (pre, res) {
        // console.log('percent:', pre + '%', res.name);
        const num = ~~pre;
        //更新UI
        percent.innerHTML = `${num}%`;
        progress.style.width = `${num}%`;
      },
      onAllComplete () {
        // console.log('all complete');
        //clear DOM
        const body = document.body;
        body.removeChild(percent);
        body.removeChild(progress.parentNode);

        Tiny.app.run(new MainMenuLayer());
      },
    });
  },
};
main.init();

// 页面压后台，让游戏停下来
document.addEventListener('pause', function (e) {
  const startLayer = Tiny.app.stage.children[ 0 ];
  if (startLayer instanceof StartLayer) {
    startLayer.pause();
    Tiny.app.render();
    Tiny.app.pause();
    return;
  }
  Tiny.app.pause();
}, false);

// 页面恢复运行，让游戏继续
document.addEventListener('resume', function (e) {
  const startLayer = Tiny.app.stage.children[ 0 ];
  if (startLayer instanceof StartLayer) {
    return;
  }
  Tiny.app.resume();
}, false);
