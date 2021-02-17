import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

const MessageBus = {
    listenFor: (event, fn) => eventEmitter.on(event, fn),
    listenOnce: (event, fn) => eventEmitter.once(event, fn),
    off: (event, fn) => eventEmitter.off(event, fn),
    emit: (event, payload) => eventEmitter.emit(event, payload),
};

Object.freeze(MessageBus);

export default MessageBus;
