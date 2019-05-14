const {
    nextGenerator,
    nextWrapper
} = require('../next-wrapper')

describe('next-wrapper', () => {
    test('generate a unique id', () => {
        const id1 = nextGenerator()
        const id2 = nextGenerator()

        expect(id1).not.toBe(id2)
    })

    test('wrapper an async events with default id', done => {
        nextWrapper(function (next) {
            setTimeout(() => {
                console.log('async-0')
                next()
            }, 200)
        })

        nextWrapper(function (next) {
            setTimeout(() => {
                console.log('async-1')
                next()
            }, 200)
        })

        nextWrapper(function (next) {
            setTimeout(() => {
                console.log('async-2')
                setTimeout(done, 200) // make sure async-2 is prior consoled
            }, 200)
        })
    })

    test('wrapper an async events with an unique id', done => {
        const id = nextGenerator()
        nextWrapper(function (next) {
            setTimeout(() => {
                console.log('async-0')
                next()
            }, 200)
        }, id)
        nextWrapper(function (next) {
            setTimeout(() => {
                console.log('async-1')
                next()
            }, 200)
        }, id)
        nextWrapper(function (next) {
            setTimeout(() => {
                console.log('async-2')
                setTimeout(done, 200) // make sure async-2 is prior consoled
            }, 200)
        }, id)
    })
});