var fibonnaci = function (deret = 20) {
    const arr = [0, 1];
    for (var i = 2; i < deret; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    console.log(arr);
};
fibonnaci();
