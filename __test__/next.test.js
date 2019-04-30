const nextWrapper = require('..')

test('next-wrapper', done => {
    nextWrapper(function async0(next) {
        setTimeout(() => {
            console.log('async-0')
            next()
        }, 200)
    })

    nextWrapper(function async1(next) {
        setTimeout(() => {
            console.log('async-1')
            next()
        }, 200)
    })

    nextWrapper(function async2(next) {
        setTimeout(() => {
            console.log('async-2')
            setTimeout(done, 200) // make sure async-2 is prior
        }, 200)
    })
});