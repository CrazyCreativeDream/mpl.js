exports.main_handler = async (event, context, callback) => {
    const request = new Request(new URL(event.path, 'https://localhost'), {
        method: event.httpMethod,
        headers: new Headers(event.headers),
        body: event.httpMethod !== 'GET' && event.httpMethod !== 'HEAD' ? await (new Promise((resolve, reject) => {
            let data = []
            event.body.on('data', chunk => {
                data.push(chunk)
            })
            event.body.on('end', () => {
                resolve(Buffer.concat(data))
            })
        }
        )) : null
    })
    const response = await handle(request)
    return {
        statusCode: response.status || 200,
        headers: response.headers,
        body: Buffer.from(await response.arrayBuffer()).toString('base64'),
        isBase64Encoded: true
    }
}