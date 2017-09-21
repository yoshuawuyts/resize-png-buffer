# resize-png-buffer

Resize a PNG buffer into square images of different sizes.

## Usage

``` javascript
var resizePngBuffer = require('resize-png-buffer')
var fs = require('fs')

var resize = resizePngBuffer(fs.readFileSync('image.png'))

resize([96, 96], function (err, buffer) {
  if (err) return next(err)
  fs.writeFile('image-96x96.png', buffer, next)
})
```

### `resize = resizePngBuffer(buffer)`

Returns a `resize` function, where `buffer` is the contents of a PNG file
as a Node.js [Buffer](https://nodejs.org/api/buffer.html).

### `resize(shape, done(err, buffer))`

Resizes the image using `shape`, an array with `[width, height]` for the output
image. Calls `done(err, buffer)` when complete, where `buffer` is the contents
of the output PNG file as a Node.js [Buffer](https://nodejs.org/api/buffer.html).

## License

MIT