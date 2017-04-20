
# node-websdl

SDL for the Web and ECMAScript - as it should be.

This project contains opinionated bindings for
the [SDL](https://libsdl.org/) library and ships
a shared library with its installation.

The bindings are made for ECMAScript 2016+, so
most static pointer-using APIs have been refactored
to allow much cleaner usage.


## Example

This demo requires an `image.png` (preferably 128x128
pixels) in the same folder.

```javascript
let window   = SDL.createWindow('Basic Test', 100, 100, 640, 480, SDL.WINDOW.shown | SDL.WINDOW.resizable);
let renderer = SDL.createRenderer(window, -1, SDL.RENDERER.accelerated);
let texture  = SDL.createTexture(renderer, __dirname + '/image.png');
let dest     = new SDL.Rect({
    x: 32,
    y: 32,
    w: 128,
    h: 128
});


setInterval(function() {

	renderer.setDrawColor(128, 128, 128, 255);

	renderer.clear();
	renderer.copy(texture, null, dest);
	renderer.present();

}, 1000 / 30);
```

