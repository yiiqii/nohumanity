/* eslint-disable */

;
(function () {
  var config = {
    renderType: 2,
    showFPS: true,
    renderOptions: {
      antialias: true,
      backgroundColor: 0xffffff
    }
  };
  if (navigator.userAgent.toLowerCase().indexOf('mobile') != -1) {
    config.width = window.innerWidth;
    config.height = window.innerHeight;
  }
  Tiny.app = new Tiny.Application(config);

  var main = {
    init: function () {
      console.log('init');

      this.resourceLoad();
    },
    resourceLoad: function () {
      var resources = [];
      for (var key in RESOURCES) {
        resources.push(RESOURCES[key]);
      }
      var progress = document.getElementById('progress');
      var percent = document.getElementById('percent');

      Tiny.Loader.run({
        resources: resources,
        onProgress: function (pre) {
          console.log('percent:', pre + '%');

          var num = ~~pre;
          //更新UI
          percent.innerHTML = num + '%';
          progress.style.width = num + '%';
        },
        onAllComplete: function () {
          console.log('all complete');
          //clear DOM
          var body = document.body;
          body.removeChild(percent);
          body.removeChild(progress.parentNode);

          Tiny.app.run(new MainMenuLayer());
        }
      });
    }
  };

  main.init();
})();
