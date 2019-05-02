exports = module.exports = EventCenter

/**
 * @description manager center for async events
 * @property _state - running status
 * @property _idx - index of current running event
 * @property _queue - async events queue
 */
function EventCenter() {
    this._state = 0
    this._idx = 0
    this._queue = []
}

EventCenter.prototype.init = function () {
    this._state = 0
    this._idx = 0
    if (typeof this._queue[this._idx] === 'function') {
        this._state = 1
        this._queue[this._idx](this.next.bind(this))
    }
}

EventCenter.prototype.addEvents = function (fn) {
    const args = [].slice.call(arguments)
    const fnt = ({}).toString.call(fn).toLowerCase().split(" ")[1].slice(0, -1)
    let events = []
    if (args.length > 1) {
        args.forEach(item => {
            if (typeof item === 'function') {
                events.push(item)
            } else {
                events.push(noop)
            }
        })
    } else {
        if (fnt === 'function') {
            events.push(fn)
        } else if (fnt === 'array') {
            fn.forEach(item => {
                if (typeof item === 'function') {
                    events.push(item)
                } else {
                    events.push(noop)
                }
            })
        }
    }

    this._queue = this._queue.concat(events)
}

EventCenter.prototype.next = function () {
    if (this._queue.length <= this._idx + 1) {
        return false // 异步队列执行完毕
    }

    if (typeof this._queue[++this._idx] === 'function') {
        this._queue[this._idx](this.next.bind(this))
    }
}

EventCenter.prototype.getSnapShot = function () {
    return {
        running: this._state ? true : false
    }
}

function noop(next) {
    next()
}