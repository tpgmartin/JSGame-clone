"use strict";

function GameObject (options) {
    var self = this;
    this.components = new Object();
    this.enabled = true;
    this.width = 0;
    this.height = 0;
    this.visible = true;
    this.onUpdate = function () {};
    this.onFixedUpdate = function () {};

    this.__update = function (JSGameEngine) {
        this.onUpdate(JSGameEngine);
    };

    this.__fixedUpdate = function (JSGameEngine) {
        this.onFixedUpdate(JSGameEngine);
    };

    this.__init = function () {};
    this.parent = undefined;
    this.transform = new Transform({parent: this});
    this.__construct(this, options);
}

GameObject.prototype = new Constructor();
GameObject.prototype.constructor = GameObject;

GameObject.prototype.toString = function () {
    return JSON.stringify(this);
};

GameObject.prototype.getComponent = function (type) {
    for (var prop in this) {
        if (this[prop] instanceof type) {
            return this[prop];
        }
    }

    for (var prop in this.components) {
        if (this.components[prop] instanceof type) {
            return this.components[prop];
        }
    }

    return null;
};

module.exports = GameObject;