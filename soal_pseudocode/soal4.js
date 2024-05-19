const numberToWords = (num = 10) => {
    if (num <= 0) {
        console.log('number cannot lower than 1');
        return;
    }
    
    if (num.toString().split('').length !== 4 && num < 2000) {
        console.log('number must 4 digit and greater than 2000');
        return;
    }

    const satuanDigit = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima' , 'Enam', 'Tujuh', 'Delapan', 'Sembilan']
    const belasanDigit = ['Sepuluh', '', '', '', '', '', '', '', '', '']

    const convertRibuan = (num) => {
      if (num >= 1000) {
        return convertRatusan(Math.floor(num / 1000)) + " Ribu " + convertRatusan(num % 1000);
      } else {
        return convertRatusan(num);
      }
    }
      
    const convertRatusan = (num) => {
      if (num > 99) {
        return satuanDigit[Math.floor(num / 100)] + " Ratus " + convertPuluhan(num % 100);
      } else {
        return convertPuluhan(num);
      }
    }
    
    const convertPuluhan = (num) => {
      switch (num) {
        case num < 10:
            return satuanDigit[num];
        case num === 10:
            return belasanDigit[num - 10];
        case num >= 10 && num < 20:
            return satuanDigit[num - 10] + ' Belas ';
        default:
            const satuanDigitCopy = satuanDigit.map((x) => x);    
            satuanDigitCopy.splice(1, 1, '')
            return satuanDigitCopy[Math.floor(num / 10)] + " Puluh " + satuanDigit[num % 10];
      }
    }
    return `${num}: ${convertRibuan(num)}`
}

console.log(numberToWords(2234))
console.log(numberToWords(8500))
console.log(numberToWords(7001))