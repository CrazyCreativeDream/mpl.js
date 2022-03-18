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


import jsproxy from './demo/jsproxy.js'
const handle = async (req)=>{
  if (req.method == 'GET' || req.method == 'HEAD' )return new Response('TRYPOST!')
  const form = await req.formData()
  console.log(form)
  return new Response(form.get('name'))
  //return jsproxy(req)
  //return fetch('https://google.com')
}
export default handle


