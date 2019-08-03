function events() {
    this._events = {};
}
events.prototype.on = function(eventName, callback) {
    if (eventName !== 'newListener') {
        if (this._events[eventName]) this._events[eventName].forEach(cb=>cb(eventName));
    }
    if (this._events[eventName]) {
        this._events[eventName].push(callback);
    }else{
        this._events[eventName] = [callback];
    }
}
events.prototype.emit = function(eventName) {
    if (this._events[eventName]) {
        this._events[eventName].forEach(fn=>fn());
    }
}
events.prototype.off = function(eventName, callback) {
    this._events[eventName] = this._events[eventName].map(cb => callback !== callback && cb.l !== callback);
}
events.prototype.once = function(eventName, callback) {
    let that = this;
    function one(...args) {
        callback(...args);
        that.off(eventName, one);
    }
    one.l = callback;
    this.on(eventName, one);
}