import Phaser from 'phaser';

import Preload from './scenes/Preload.js';
import Boot from './scenes/Boot.js';
import Play from './scenes/Play.js';
import GUI from './scenes/GUI.js';
import CustomCanvas from './customCanvas.js';
import WinState from './scenes/WinState.js';
import FailState from './scenes/FailState.js';
import Menu from './scenes/Menu.js';

const DEFAULT_HEIGHT = 800;
const DEFAULT_WIDTH = 600;

const customCanvas = new CustomCanvas();

const config = {
  type: customCanvas.type,
  canvas: customCanvas.canvas,
  context: customCanvas.context,
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  pixelArt:true,
  BackgroundColor: '#A05043',
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
    Menu,
    Play,
    GUI,
    WinState,
    FailState
  ],
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 80 },
        debug: false
    }
  },
};

window.addEventListener('load', () => {
  new Phaser.Game(config)
})
