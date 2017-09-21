const resizePngBuffer = require('./')
const map = require('map-limit')
const fs = require('fs')

const resize = resizePngBuffer(fs.readFileSync('image.png'))

map([
  96, 128, 196, 72, 57, 64, 32, 48,
  60, 76, 114, 120, 144, 152, 180, 192, 512
], 10, function (size, next) {
  resize([size, size], function (err, buffer) {
    if (err) return next(err)
    fs.writeFile(`modified-${size}x${size}.png`, buffer, next)
  })
}, function (err) {
  if (err) throw err
  console.log('done! ✨')
})
