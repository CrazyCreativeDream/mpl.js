import handle from './../handle/index.js'
addEventListener('fetch', event => {
    event.respondWith(handle(event.request))
})
