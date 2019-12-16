class ScreenLogo extends Screen {
  constructor(args) {
    super(args);

    this.addChild({
      animation: new Animation({
        sprites: [
          new Sprite(this.assetManager, "background", {
            width: 640,
            height: 480
          })
        ]
      }),
      transition: new Transition({
        start: null,
        end: { x: 320, y: 240, zoom: 1 },
        length: 0,
        rewind: false,
        loop: false
      })
    });

    this.addChild({
      animation: new Animation({
        sprites: [
          new Sprite(this.assetManager, "press-enter", {
            width: 757,
            height: 175
          })
        ]
      }),
      transition: new Transition({
        start: null,
        end: { x: 320, y: 340, zoom: 0.5 },
        length: 0,
        rewind: false,
        loop: false
      })
    });

    this.addChild({
      animation: new Animation({
        sprites: [
          new Sprite(this.assetManager, "copyright", { width: 522, height: 79 })
        ]
      }),
      transition: new Transition({
        start: null,
        end: { x: 500, y: 450, zoom: 1 / 2 },
        length: 0,
        rewind: false,
        loop: false
      })
    });

    this.addChild({
      animation: new Animation({
        sprites: [
          new Sprite(this.assetManager, "logo", { width: 356, height: 175 })
        ]
      }),
      transition: new Transition({
        start: { x: 320, y: 160, zoom: 1.25 },
        end: { x: 320, y: 160, zoom: 1.75 },
        length: 1000,
        rewind: false,
        loop: true
      })
    });

    window.addEventListener("keyup", this.onKeyUp);
  }

  cleanup() {
    super.cleanup();
    window.removeEventListener("keyup", this.onKeyUp);
  }

  onKeyUp = ({ key }) => {
    if (key === "Enter") {
      this.screenManager.changeScreen("how-to-play");
    }
  };

  render(ctx) {
    super.render(ctx);
  }

  update(delta) {
    super.update(delta);
  }
}

screens["logo"] = ScreenLogo;
