"use strict";

Math.flip = function(value, max){
    if(typeof value !== 'number' && typeof max !== 'number'){
        return NaN;
    }
    return Math.abs(max - parseInt(value));
}

Math.randomRange = function(min, max, integer){
    if(typeof min !== 'number' && typeof max !== 'number'){
        return NaN;
    }
    if(integer === true){
        return Math.floor(Math.random() * (max - min) + min);        
    }
    return Math.random() * (max - min) + min;
}

Math.invert = function (num) {
    return num * -1;
}

// returns number x, such that min <= x <= max for any value x
Math.clamp = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
}

Math.lerp = function(a, b, t){
    return (b - a) * t;
}

module.exports = Math;