const resample = require('ndarray-resample')
const savePixels = require('save-pixels')
const getPixels = require('get-pixels')
const ndarray = require('ndarray')
const bl = require('bl')

module.exports = resizePngBuffer

function resizePngBuffer (image) {
  var pixels = null
  var queue = []

  getPixels(image, 'image/png', function (err, _pixels) {
    if (err) return done(err)

    pixels = _pixels
    for (var i = 0; i < queue.length; i++) {
      handle(queue[i][0], queue[i][1])
    }

    queue = null
  })

  return handle

  function handle (shape, done) {
    if (shape[0] !== shape[1]) return process.nextTick(done.bind(null, new Error(
        '[resize-png-buffer] We currently only support square output images. Sorry! PRs welcome :D'
      )))

    if (!pixels) return queue.push([shape, done])

    var cropped = pixels
    var width = pixels.shape[0]
    var height = pixels.shape[1]
    if (width > height) {
      var trim = Math.floor((width - height) / 2)
      cropped = cropped.hi(width - trim, height)
      cropped = cropped.lo(trim, 0)
    } else {
      var trim = Math.floor((height - width) / 2)
      cropped = cropped.hi(width, height - trim)
      cropped = cropped.lo(0, trim)
    }

    var outputShape = shape.concat(4) // RGBA = 4 channels
    var outputData = new Uint8ClampedArray(shape[0] * shape[1] * 4)
    var output = ndarray(outputData, outputShape)

    for (var i = 0; i < 4; i++) {
      resample(output.pick(null, null, i), cropped.pick(null, null, i))
    }

    savePixels(output, 'png').pipe(bl(done))
  }
}