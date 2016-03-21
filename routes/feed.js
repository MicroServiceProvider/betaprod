const router = require('express').Router()

router.get('/', function(request, response) {
  response.json(
      [
          {name:'betaprod.co'},
          {name:'boxand.co'}
      ])
})

module.exports = router