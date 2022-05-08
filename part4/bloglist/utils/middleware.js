const unknownRoute = (_request, response, _next) => {
  response.status(404).end()
}

module.exports = { unknownRoute }
