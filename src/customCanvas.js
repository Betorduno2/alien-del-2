export default class CustomCanvas {
    _type
    _canvas
    _context
  
    get type() {
      return this._type
    }
  
    get canvas() {
      return this._canvas
    }
  
    get context() {
      return this._context
    }
  
    constructor() {
      let myCustomCanvas = document.getElementById('myCustomCanvas')
      let myCustomContext = null
  
      if (myCustomCanvas) {
        const contextCreationConfig = {
          alpha: false,
          depth: false,
          antialias: true,
          premultipliedAlpha: true,
          stencil: true,
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
          powerPreference: 'default'
        }
  
        let WEBGL2Supported =
          // @ts-ignore
          typeof window.WebGL2RenderingContext !== undefined && window.WebGL2RenderingContext ? true : false
        let WEBGLSupported =
          // @ts-ignore
          typeof window.WebGLRenderingContext !== undefined && window.WebGLRenderingContext ? true : false
  
        // @ts-ignore
        if (WEBGL2Supported) myCustomContext = myCustomCanvas.getContext('webgl2', contextCreationConfig)
        // @ts-ignore
        if (!myCustomContext && WEBGLSupported)
          myCustomContext = myCustomCanvas.getContext('webgl', contextCreationConfig)
  
        if (myCustomContext) {
          // @ts-ignore
          if (WEBGL2Supported && myCustomContext instanceof WebGL2RenderingContext) window.RENDERING_CONTEXT = 'WEBGL2'
          if (WEBGLSupported && myCustomContext instanceof WebGLRenderingContext) window.RENDERING_CONTEXT = 'WEBGL'
        }
      }
      this._type = myCustomContext ? Phaser.WEBGL : Phaser.CANVAS
      this._canvas = myCustomCanvas ? myCustomCanvas : undefined
      // @ts-ignore
      this._context = myCustomContext ? myCustomContext : undefined
  
      console.log(`Rendering: ${window.RENDERING_CONTEXT}`)
    }
  }