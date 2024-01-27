import Phaser from 'phaser';

import Preload from './scenes/Preload.js';
import Boot from './scenes/Boot.js';
import Play from './scenes/Play.js';
import GUI from './scenes/GUI.js';
import CustomCanvas from './customCanvas.js';

const DEFAULT_HEIGHT = 800;
const DEFAULT_WIDTH = 600;

const customCanvas = new CustomCanvas();

const config = {
  type: customCanvas.type,
  canvas: customCanvas.canvas,
  context: customCanvas.context,
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    max: {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT
    }
  },
  scene: [
    Preload,
    Boot,
    Play,
    GUI
  ],
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        y: 1
      },
      debug: true,
      debugBodyColor: 0xffffff
    }
  }
};

window.addEventListener('load', () => {
  new Phaser.Game(config)
})
