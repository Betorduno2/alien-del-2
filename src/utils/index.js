const isMobile = () => {
    let result = false;
    const userAgent = navigator.userAgent;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        result = true;
    }

    return result;
};

const goToFinalState = (currentScene, isFail = true) => {
    const mainScene = currentScene.scene.get('Play');
    mainScene.sound.mute = true;
    mainScene.scene.pause();

    currentScene.scene.remove('Play');
    currentScene.scene.remove('GUI');
    if (isFail) {
        currentScene.scene.launch('FailState');
    } else {
        currentScene.scene.launch('WinState');
    }
};

const getSaveData = () => {
    let data = { isNew: true };
    if (localStorage.getItem("shit-eternal") == null) {
       localStorage.setItem("shit-eternal",  JSON.stringify(data));

       return null;
    } else {
        data = JSON.parse(localStorage.getItem("shit-eternal"));
    }

    return  data;
}


export {
    goToFinalState,
    getSaveData
}