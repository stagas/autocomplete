
/*!
 *
 * autocomplete
 *
 * MIT
 *
 */

/**
 * Module dependencies.
 */

var Dropdown = require('dropdown')

/**
 * Exports.
 */

module.exports = autocomplete

/**
 * autocomplete
 *
 * Attach autocomplete to an element.
 *
 * @param {Element} input
 * @param {Array} [items]
 * @param {Function} [fn]
 * @return {Dropdown} autocomplete
 * @api public
 */

function autocomplete (input, items, fn) {
  // parse arguments
  if ('function' == typeof items) {
    fn = items
    items = []
  }

  // create dropdown
  var dropdown = Dropdown(input)

  // remember last value
  var lastValue = null

  // add items
  items.forEach(function (item) {
    dropdown.add(item)
  })

  // remember latest fn
  var latest

  // get input value on keyup
  input.onkeyup = input.onfocus = function (ev) {
    var val = input.value
    if (val === lastValue) return
    lastValue = val

    // filter already inserted items
    dropdown.filter(match(val))
    dropdown.show()

    // fetch async
    if (fn) {
      latest = function me (res) {
        // only run if it's the latest
        if (latest !== me) return
        if (!res.length) return
        dropdown.items.slice().forEach(function (item) {
          var index = res.indexOf(item.text)
          if (!~index) {
            dropdown.remove(item.text)
          }
          else {
            res.splice(index, 1)
          }
        })
        res.forEach(function (item) {
          dropdown.add(item)
        })
        dropdown.filter(match(val))
        dropdown.show()
      }
      fn(val, latest)
    }
  }

  // replace value in input on select
  dropdown.on('select', function (item) {
    if (!item) return
    if (input.value != item.text) {
      input.focus()
      input.value = lastValue = item.text
    }
  })

  return dropdown
}

/**
 * Match helper.
 *
 * Creates a filter function.
 *
 * @param  {String} val
 * @return {Function} fn
 * @api private
 */

function match (val) {
  val = val.toLowerCase()
  return function (item) {
    return !val.length || !!~item.text.toLowerCase().indexOf(val)
  }
}
