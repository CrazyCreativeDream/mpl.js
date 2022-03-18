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
    const request = new Request(new URL(req.url, 'https://localhost'), {
        method: req.method,
        headers: new Headers(req.headers),
        body: req.body ? req.body : null
    })
    const response = await handle(request)
    response.headers.forEach((value, key) => {
        if (
            key.toLowerCase() == 'connection' ||
            key.toLowerCase() == 'content-length' ||
            key.toLowerCase() == 'content-encoding' ||
            key.toLowerCase() == 'transfer-encoding' ||
            key.toLowerCase() == 'date' ||
            key.toLowerCase() == 'server'
        ) {
            return
        } else {

            res.setHeader(key, value)
        }
    })


    res.writeHead(response.status || 200, response.statusText || "OK")

    res.end(Buffer.from(await response.arrayBuffer()))
}