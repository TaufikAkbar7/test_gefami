const triagle = (length = 1) => {
    let asterisk = '';
    for (let i = 0; i < length; i++) {
        for (let j = 0; j <= i; j++) {
            asterisk += ' *'
        }
        asterisk += '\n'
    }
    console.log(asterisk);
}

triagle(5);