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
    Response,
} from 'node-fetch'

import handle from './../handle/index.js'
export default async (req, res) => {
    const request  = new Request(new URL(req.url, 'https://localhost'),{
        method: req.method,
        headers: new Headers(req.headers),
        body: req.body?req.body:null
    })
    const response = await handle(request)
    response.headers.forEach((value, key) => {
        res.setHeader(key, value)
    })
    res.writeHead(response.status||200, response.headers)
    res.end(Buffer.from(await response.arrayBuffer()))
}