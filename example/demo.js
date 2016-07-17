"use strict"

var game = new JSGameEngine({
    canvas: document.getElementById("screen")
});

var sprite = game.addComponent(new Sprite({
    image: "img/sprite.png",
    size: new Vector2({
        x: 100,
        y: 100
    }),
    visible: false
}));