const isMobile = () => {
    let result = false;
    const userAgent = navigator.userAgent;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        result = true;
    }

    return result;
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
    getSaveData
}