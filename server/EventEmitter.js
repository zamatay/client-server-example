class EventEmitter {

    listeners = [];

    fire(message) {
        console.log(this.listeners.length);
        let listener
        while (listener =  this.listeners.pop()){
            listener(message);
        }
    }

    register(listener) {
        console.log('addHandler');
        this.listeners.push(listener);
    }
}

module.exports = EventEmitter;