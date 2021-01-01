addEventListener('fetch', event =>
	event.respondWith(handleRequest(event.request))
)

const handleRequest = async request => {
  let url = new URL(request.url);
	try {
		request = new Request(request.url.slice(url.origin.length+1), request)

	  if (request.headers.has('origin')) request.headers.delete('origin')
	  if (request.headers.has('referer')) request.headers.delete('referer')
	  let response = await fetch(request)
	  response = new Response(response.body, response)
	  response.headers.set('access-control-allow-origin', '*')
	  return response
	} catch {
		return new Response("Bad Request", request)
	}
}