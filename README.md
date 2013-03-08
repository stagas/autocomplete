
# autocomplete

dropdown autocomplete for input elements

## Installing

```sh
$ component-install stagas/autocomplete
```

## API

Inherits all methods from [Dropdown](https://github.com/stagas/dropdown) and [Menu](https://github.com/stagas/menu).

### Autocomplete(input, [items], [asyncFn])

Attach autocomplete to an input element.

### Autocomplete.maxItems(n:Number)

Set the maximum number of visible items.

## Usage


With a default set:

```js
var autocomplete = require('autocomplete')
var ac = autocomplete(input, ["One", "Two", "Three"])
```

Using async results:

```js
autocomplete(input, function (str, callback) {
  someAsyncRequest(str, function (results) {
    callback(results)
  })
})
```

Both:

```js
autocomplete(input, ["One", "Two", "Three"], function (str, callback) {
  someAsyncRequest(str, function (results) {
    callback(results)
  })
})
```

## License

MIT
