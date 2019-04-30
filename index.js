exports = module.exports = nextWrapper

/**
 * state 启动状态
 * 
 * 0 - 未启动
 * 1 - 已启动
 */
let state = 0
let idx = 0
let queue = []

function nextWrapper(fn) {
    if (typeof fn === 'function') {
        queue.push(fn)
    }

    if (!state) {
        state = 1
        fn(next)
    }
}

function next() {
    if (queue.length <= idx + 1) {
        return false // 异步队列执行完毕
    }

    if (typeof queue[++idx] === 'function') {
        queue[idx](next)
    }
}