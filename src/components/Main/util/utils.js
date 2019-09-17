export function formatNumber(number, pad) {
    var str = "" + number;
    return pad.substring(0, pad.length - str.length) + str;
}

export function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    var ret = formatNumber(hrs, "00") + ':' + formatNumber(mins, "00");

    if (secs > 0 || ms > 0) {
        ret = ret + ":" + formatNumber(secs, "00");
    }

    if (ms > 0) {
        ret = ret + ":" + formatNumber(ms, "00");
    }

    return ret;
}

export function addBrackets(value) {
    var patt = /^\[.*\]$/gs;
    if (patt.test(value) === false) {
        value = '[' + value + ']';
    }
    return value;
}

export function separateByComma(value) {
    const patt = /}[\s\n]*{/g;
    return value.replace(patt, "},{");
}