const http = require("https")

const hostname = "127.0.0.1"
const port = 3000

var options = {
  hostname: "api.figma.com",
  host: "api.figma.com",
  port: null,
  path: "/v1/files/jNyYndJ2kJiwuIbDPX065J/",
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer figu_7qKJnucaMx4IL65_HqxQQkUADPlhn3KLHmvJ2nf0",
  },
}

const req = http.request(options, function (res) {
  const chunks = []

  res.on("data", function (chunk) {
    chunks.push(chunk)
  })

  res.on("end", function () {
    const body = Buffer.concat(chunks)
    console.log(body.toString())
    
  })
})

req.end()
