class EventBusClass {
    constructor() {
        this.listeners = {};
    }

    addListener(type, callback, scope) {
        let args = [];
        const numOfArgs = arguments.length;
        for (let i = 0; i < numOfArgs; i++) {
            args.push(arguments[i]);
        }
        args = args.length > 3 ? args.splice(3, args.length - 1) : [];
        if (typeof this.listeners[type] !== "undefined") {
            this.listeners[type].push({scope: scope, callback: callback, args: args});
        } else {
            this.listeners[type] = [
                {scope: scope, callback: callback, args: args}
            ];
        }
    }

    dispatch(type, target) {
        let numOfListeners = 0;
        const event = {
            type: type
        };
        let args = [];
        const numOfArgs = arguments.length;
        for (let i = 0; i < numOfArgs; i++) {
            args.push(arguments[i]);
        }
        args = args.length > 1 ? args.splice(1, args.length - 1) : [];
        args = [event].concat(args);
        if (typeof this.listeners[type] !== "undefined") {
            const numOfCallbacks = this.listeners[type].length;
            for (let i = 0; i < numOfCallbacks; i++) {
                const listener = this.listeners[type][i];
                if (listener && listener.callback) {
                    const concatArgs = args.concat(listener.args);
                    listener.callback.apply(listener.scope, concatArgs);
                    numOfListeners += 1;
                }
            }
        }
    }

}

export default new EventBusClass();