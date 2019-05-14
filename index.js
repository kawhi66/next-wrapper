import EventCenter from './event-center'
// import uuid from "uuid/v1"

const uuid = require('uuid/v1')
const ecmap = {
    default: new EventCenter()
}

export function nextWrapper(fn, id) {
    const args = [].slice.call(arguments)
    const last = args[args.length - 1]
    let insId = 'default'
    let fnlist = []

    if (typeof last === 'string') {
        if (args.length === 2) {
            insId = id
            fnlist.push(fn)
        } else {
            insId = last
            fnlist = args.slice(0, -1)
        }
    } else {
        fnlist = args
    }

    if (!ecmap.hasOwnProperty(insId)) {
        ecmap[insId] = new EventCenter()
    }

    fnlist.forEach(item => {
        ecmap[insId].addEvents(item)
    })

    if (!ecmap[insId].getSnapShot().running) {
        ecmap[insId].init()
    }
}

export function nextGenerator() {
    const ins = new EventCenter()
    const id = uuid()
    ecmap[id] = ins

    return id
}