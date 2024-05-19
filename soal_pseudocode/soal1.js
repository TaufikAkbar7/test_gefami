var func = function () {
    let init = 50;
    for (var i = 0; i < 11; i++) {
        switch (true) {
            case init <= 60:
                console.log("".concat(init, " KURANG"));
                break;
            case init > 60 && init <= 7:
                console.log("".concat(init, " CUKUP"));
                break;
            case init > 70 && init <= 80:
                console.log("".concat(init, " BAIK"));
                break;
            default:
                console.log("".concat(init, " LUAR BIASA"));
                break;
        }
        init += 5;
    }
};
func();
