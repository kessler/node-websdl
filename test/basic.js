#!/usr/bin/env node

// const SDL = require('sdl');
const SDL = require('../src/SDL.js');
const TTF_Font = require('../src/SDL_ttf.js')
SDL.init(SDL.INIT.everything);


let window = SDL.createWindow('Basic Test', 100, 100, 640, 480, SDL.WINDOW.shown | SDL.WINDOW.resizable);
let renderer = SDL.createRenderer(window, -1, SDL.RENDERER.accelerated);
let texture = SDL.createTexture(renderer, __dirname + '/image.png');
let dest = new SDL.Rect({
	x: 32,
	y: 32,
	w: 128,
	h: 128
});

let success = TTF_Font.TTF_Init()
if (success !== 0) {
	throw new Error('failed to init TTF_Font')
}

let font = TTF_Font.TTF_OpenFont('/Library/Fonts/Arial.ttf', 22)
let textSurface = TTF_Font.TTF_RenderUTF8_Blended(font, 'test 123', SDL.createColor(255, 255, 255, 255))
let textTexture = SDL.createTextureFromSurface(renderer, textSurface)
let result = SDL.queryTexture(textTexture)

let textDest = new SDL.Rect({
	x: 20,
	y: 10,
	w: result.w,
	h: result.h
});

let fx = 1;
let fy = 1;
let fc = 1;

let r = 64;
let g = 64;
let b = 80;
let a = 255;




setInterval(function() {

	let size = window.getSize();

	if (dest.x <= 0 || dest.x >= (size.width - 128)) fx = -1 * fx;
	if (dest.y <= 0 || dest.y >= (size.height - 128)) fy = -1 * fy;

	dest.x = dest.x + fx * 5;
	dest.y = dest.y + fy * 5;

	if (r === 0 || r === 255) {
		fc = -1 * fc;
		r += fc;
	} else {
		r += fc;
	}

	renderer.setDrawColor(r, g, b, a);
	renderer.clear();
	renderer.copy(texture, null, dest);
	renderer.copy(textTexture, null, textDest);
	renderer.present();

}, 1000 / 40);