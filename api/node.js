import fetch, {
    Blob,
    blobFrom,
    blobFromSync,
    File,
    fileFrom,
    fileFromSync,
    FormData,
    Headers,
    Request,
    Response
} from 'node-fetch'

import handle from './../handle/index.js'
import http from 'http'
http.createServer(async (req, res) => {
    const request = new Request(new URL(req.url, 'https://localhost'), {
        method: req.method,
        headers: new Headers(req.headers),
        body: req.method !== 'GET' && req.method !== 'HEAD' ? await (new Promise((resolve, reject) => {
            let data = []
            req.on('data', chunk => {
                data.push(chunk)
            })
            req.on('end', () => {
                resolve(Buffer.concat(data))
            })
        })) : null
    })
    const response = await handle(request)
    response.headers.forEach((value, key) => {
        if(
            key.toLowerCase() == 'connection' ||
            key.toLowerCase() == 'content-length' ||
            key.toLowerCase() == 'content-encoding' ||
            key.toLowerCase() == 'transfer-encoding' ||
            key.toLowerCase() == 'date' ||
            key.toLowerCase() == 'server'
        ){
            return
        }else{

            res.setHeader(key, value)
        }
    })
    res.writeHead(response.status || 200,response.statusText || "OK")
    
    res.end(Buffer.from(await response.arrayBuffer()))


}).listen(9000)
console.log('listening on http://localhost:9000')

