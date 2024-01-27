´´´javascript
    //GUI.js
    this.events.emit('change-background', { color: 'red' });

    //Play.js
    const GUI = this.scene.get('GUI');
    GUI.events.on('change-background', ({ color }) => {
        console.log('color: ', color);
    });
´´´