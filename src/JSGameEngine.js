"use strict";

function JSGameEngine (options) {
    
    var self = this;
    this.components = {};
    this.canvas = document.createElement("canvas");
    this.width = 0;
    this.height = 0;
    this.time = new Time();
    this.__construct(this, options);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.width || window.innerWidth;
    this.canvas.height = this.height || window.innerHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    Time = this.time;

    this.update = function(delta){
        requestAnimationFrame(self.update);
        self.time.update(delta);
        var canvas = self.canvas;
        var ctx = self.ctx;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var Time = self.time;
        for(var index in self.components){
            var gameObject = self.components[index];
            for(var component in gameObject.components){
                if(!gameObject.components[component].parent){
                    gameObject.components[component].parent = gameObject;
                }
            }
            if(!gameObject.enabled){
                continue;
            }
            if(gameObject.visible){
                ctx.save();
                var rotation = gameObject.transform.rotation;
                var position = gameObject.transform.position;
                ctx.translate(position.x + gameObject.width / 2, position.y + gameObject.height / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.translate(Math.invert(position.x + gameObject.width / 2), Math.invert(position.y + gameObject.height / 2));
                for(var childComponent in gameObject.components){
                    gameObject.components[childComponent].__update(self);
                }
                gameObject.__update(self);
                ctx.restore();
            }
        }
    }

    this.fixedUpdate = function(delta){
        self.time.fixedUpdate(delta);
        var Time = self.time;
        for(var index in self.components){
            var gameObject = self.components[index];
            for(var component in gameObject.components){
                if(!gameObject.components[component].parent){
                    gameObject.components[component].parent = gameObject;
                }
            }
            if(!gameObject.enabled){
                continue;
            }
            for(var childComponent in gameObject.components){
                gameObject.components[childComponent].__update(self);
            }
            gameObject.__fixedUpdate(self);
        }
        setTimeout(function(){
            self.fixedUpdate(performance.now);
        }, Time.framerateToTime(50) * 1000);
    }

    requestAnimationFrame(this.update);
    this.fixedUpdate(performance.now);

}

JSGameEngine.prototype = new Constructor();
JSGameEngine.prototype.constructor = JSGameEngine;

module.exports = JSGameEngine