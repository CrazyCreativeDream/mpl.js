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




/*JSProxy快速示例
import jsproxy from './demo/jsproxy.js'
const handle = async (req)=>{
  return jsproxy(req)
}
*/

/*FormData获取
const handle = async (req)=>{
  if (req.method == 'GET' || req.method == 'HEAD' )return new Response('TRYPOST!')
  const form = await req.formData()
  return new Response(form.get('name'))
}
*/

/*简易反代
const handle = async (req) => {
  const rawURL = new URL(req.url)
  console.log(rawURL.pathname)

  return fetch('https://www.google.com' + rawURL.pathname)
}
*/

//mpl.js能传递什么?
const handle = async (req) => {
  const rawURL = new URL(req.url)
  return new Response(`
  <h1>MPL.js 服务端Demo</h1>
  <p>访问路径:${rawURL.pathname}</p>
  <p>访问参数:${rawURL.search}</p>
  <p>访问参数数组:${(() => {
      const arr = {}
      for (const [key, value] of rawURL.searchParams.entries()) {
        arr[key] = value
      }
      return JSON.stringify(arr)
    })()}</p>
  <p>访问方法:${req.method}</p>
  <p>访问头:${(() => {
      const arr = {}
      for (const [key, value] of req.headers.entries()) {
        arr[key] = value
      }
      return JSON.stringify(arr)
    })()}</p>
  <p>Cookie:${req.headers.get('cookie')}</p>
  <p>Cookie数组:${(() => {
      const arr = {}
      const cookie = req.headers.get('cookie')
      if (cookie) {
        for (const [key, value] of cookie.split(';').map(v => v.split('='))) {
          arr[key] = value
        }
      }
      return JSON.stringify(arr)

    })()}</p>
  <p>访问Body内容:${await req.text()}</p>

  `, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    }
  })
}


export default handle


