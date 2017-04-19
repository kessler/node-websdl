
const _ref           = require('ref');
const _ref_array     = require('ref-array');
const _ref_struct    = require('ref-struct');
const _ffi           = require('ffi');
const _void_type     = _ref.types.void;
const _void_pointer  = _ref.refType(_void_type);
const _double        = _ref.types.double;
const _int           = _ref.types.int;
const _int_pointer   = _ref.refType(_int);
const _uint8         = _ref.types.uint8;
const _uint8_pointer = _ref.refType(_uint8);
const _uint32        = _ref.types.uint32;
const _string        = _ref.types.CString;


const SDL_Color = _ref_struct({
	r: _uint8,
	g: _uint8,
	b: _uint8,
	a: _uint8
});

const _SDL_Color_pointer = _ref.refType(SDL_Color);

const SDL_Palette = _ref_struct({
	ncolors:  _int,
	colors:   _SDL_Color_pointer,
	version:  _uint32,
	refcount: _int
});

const _SDL_Palette_pointer = _ref.refType(SDL_Palette);

const SDL_PixelFormat = _ref_struct({
	format:        _uint32,
	palette:       _SDL_Palette_pointer,
	BitsPerPixel:  _uint8,
	BytesPerPixel: _uint8,
	padding:       _ref_array(_uint8, 2), // uint8[2]
	Rmask:         _uint32,
	Gmask:         _uint32,
	Bmask:         _uint32,
	Amask:         _uint32,
	Rloss:         _uint8,
	Gloss:         _uint8,
	Bloss:         _uint8,
	Aloss:         _uint8,
	Rshift:        _uint8,
	Gshift:        _uint8,
	Bshift:        _uint8,
	Ashift:        _uint8,
	refcount:      _int
});

const _SDL_PixelFormat_pointer = _ref.refType(SDL_PixelFormat);

const SDL_Point = _ref_struct({
	x: _int,
	y: _int
});

const _SDL_Point_pointer = _ref.refType(SDL_Point);

const SDL_Rect = _ref_struct({
	x: _int,
	y: _int,
	w: _int,
	h: _int
});

const _SDL_Rect_pointer = _ref.refType(SDL_Rect);

const SDL_Surface = _ref_struct({
	flags:     _uint32,
	format:    _SDL_PixelFormat_pointer,
	w:         _int,
	h:         _int,
	pitch:     _int,
	pixels:    _void_pointer,
	userdata:  _void_pointer,
	locked:    _int,
	lock_data: _void_pointer,
	clip_rect: SDL_Rect,
	map:       _void_pointer,
	refcount:  _int
});

const _SDL_Surface_pointer = _ref.refType(SDL_Surface);



const _renderer_pointer = _ref.refType(_void_type);
const _texture_pointer  = _ref.refType(_void_type);
const _window_pointer   = _ref.refType(_void_type);
const SDL               = _ffi.Library(__dirname + '/lib/' + process.platform + '/' + process.arch + '/libSDL2-2.0' + _ffi.LIB_EXT, {
	SDL_Init:              [ _int,            [ _uint32 ] ],
	SDL_Quit:              [ _void_type,      [] ],

	SDL_CreateWindow:      [ _window_pointer, [ _string, _int, _int, _int, _int, _uint32 ] ],
	SDL_ShowWindow:        [ _void_type,      [ _window_pointer ] ],
	SDL_HideWindow:        [ _void_type,      [ _window_pointer ] ],
	SDL_MaximizeWindow:    [ _void_type,      [ _window_pointer ] ],
	SDL_MinimizeWindow:    [ _void_type,      [ _window_pointer ] ],
	SDL_DestroyWindow:     [ _void_type,      [ _window_pointer ] ],
	SDL_SetWindowPosition: [ _void_type,      [ _window_pointer, _int, _int ] ],
	SDL_GetWindowPosition: [ _void_type,      [ _window_pointer, _int_pointer, _int_pointer ] ],
	SDL_SetWindowSize:     [ _void_type,      [ _window_pointer, _int, _int ] ],
	SDL_GetWindowSize:     [ _void_type,      [ _window_pointer, _int_pointer, _int_pointer ] ],

	SDL_CreateRenderer:           [ _renderer_pointer, [ _window_pointer, _int, _uint32 ] ],
	SDL_CreateTexture:            [ _texture_pointer,  [ _renderer_pointer, _uint32, _int, _int, _int ] ],
	SDL_CreateTextureFromSurface: [ _texture_pointer,  [ _renderer_pointer, _SDL_Surface_pointer ] ],
	SDL_SetRenderDrawColor:       [ _int, [ _renderer_pointer, _uint8, _uint8, _uint8, _uint8 ] ],
	SDL_GetRenderDrawColor:       [ _int, [ _renderer_pointer, _uint8_pointer, _uint8_pointer, _uint8_pointer, _uint8_pointer ] ],
	SDL_SetRenderDrawBlendMode:   [ _int, [ _renderer_pointer, _int ] ],
	SDL_GetRenderDrawBlendMode:   [ _int, [ _renderer_pointer, _int_pointer ] ],
	SDL_RenderClear:              [ _int, [ _renderer_pointer ] ],
	SDL_RenderDrawPoint:          [ _int, [ _renderer_pointer, _int, _int ] ],
	SDL_RenderDrawPoints:         [ _int, [ _renderer_pointer, _SDL_Point_pointer, _int ] ],
	SDL_RenderDrawLine:           [ _int, [ _renderer_pointer, _int, _int, _int, _int ] ],
	SDL_RenderDrawLines:          [ _int, [ _renderer_pointer, _SDL_Point_pointer, _int ] ],
	SDL_RenderDrawRect:           [ _int, [ _renderer_pointer, _SDL_Rect_pointer ] ],
	SDL_RenderDrawRects:          [ _int, [ _renderer_pointer, _SDL_Rect_pointer, _int ] ],
	SDL_RenderFillRect:           [ _int, [ _renderer_pointer, _SDL_Rect_pointer ] ],
	SDL_RenderFillRects:          [ _int, [ _renderer_pointer, _SDL_Rect_pointer, _int ] ],
	SDL_RenderCopy:               [ _int, [ _renderer_pointer, _texture_pointer, _SDL_Rect_pointer, _SDL_Rect_pointer ] ],
	SDL_RenderCopyEx:             [ _int, [ _renderer_pointer, _texture_pointer, _SDL_Rect_pointer, _SDL_Rect_pointer, _double, _SDL_Point_pointer, _int ] ],
	SDL_RenderReadPixels:         [ _int, [ _renderer_pointer, _SDL_Rect_pointer, _uint32, _void_pointer, _int ] ],
	SDL_RenderPresent:            [ _void_type, [ _renderer_pointer ] ],
	SDL_DestroyTexture:           [ _void_type, [ _texture_pointer  ] ],
	SDL_DestroyRenderer:          [ _void_type, [ _renderer_pointer ] ]

});

const SDL_image = _ffi.Library(__dirname + '/lib/' + process.platform + '/' + process.arch + '/libSDL2_image-2.0' + _ffi.LIB_EXT, {
	IMG_Load: [ _SDL_Surface_pointer, [ _string ] ]
});



// export global

SDL.INIT = {
	timer:          0x00000001,
	audio:          0x00000010,
	video:          0x00000020,
	joystick:       0x00000200,
	haptic:         0x00001000,
	gamecontroller: 0x00002000,
	events:         0x00004000,
	noparachute:    0x00100000
};

SDL.INIT.everything = SDL.INIT.timer | SDL.INIT.audio | SDL.INIT.video | SDL.INIT.joystick | SDL.INIT.haptic | SDL.INIT.gamecontroller | SDL.INIT.events;


SDL.BLENDMODE = {
	none:  0x00000000,
	blend: 0x00000001,
	add:   0x00000002,
	mod:   0x00000004
};

SDL.RENDERER = {
	software:      0x00000001,
	accelerated:   0x00000002,
	presentvsync:  0x00000004,
	targettexture: 0x00000008
};

SDL.RENDERERFLIP = {
	none:       0x00000000,
	horizontal: 0x00000001,
	vertical:   0x00000002
};

SDL.WINDOW = {
	fullscreen:         0x00000001,
	opengl:             0x00000002,
	shown:              0x00000004,
	hidden:             0x00000008,
	borderless:         0x00000010,
	resizable:          0x00000020,
	minimized:          0x00000040,
	maximized:          0x00000080,
	input_grabbed:      0x00000100,
	input_focus:        0x00000200,
	mouse_focus:        0x00000400,
	fullscreen_desktop: 0x00000001 | 0x00001000,
	foreign:            0x00000800,
	allow_highdpi:      0x00002000
};




module.exports = {

	INIT:      SDL.INIT,
	BLENDMODE: SDL.BLENDMODE,
	WINDOW:    SDL.WINDOW,
	RENDERER:  SDL.RENDERER,

	Point:   SDL_Point,
	Rect:    SDL_Rect,
	Surface: SDL_Surface,

	init: SDL.SDL_Init,
	quit: SDL.SDL_Quit,

	createWindow:      SDL.SDL_CreateWindow,
	showWindow:        SDL.SDL_ShowWindow,
	hideWindow:        SDL.SDL_HideWindow,
	maximizeWindow:    SDL.SDL_MaximizeWindow,
	minimizeWindow:    SDL.SDL_MinimizeWindow,
	destroyWindow:     SDL.SDL_DestroyWindow,
	setWindowPosition: SDL.SDL_SetWindowPosition,
	getWindowPosition: SDL.SDL_GetWindowPosition,
	setWindowSize:     SDL.SDL_SetWindowSize,
	getWindowSize:     SDL.SDL_GetWindowSize,

	createRenderer:           SDL.SDL_CreateRenderer,
	createTexture:            SDL.SDL_CreateTexture,
	createTextureFromSurface: SDL.SDL_CreateTextureFromSurface,
	setRenderDrawColor:       SDL.SDL_SetRenderDrawColor,
	getRenderDrawColor:       SDL.SDL_GetRenderDrawColor,
	setRenderDrawBlendMode:   SDL.SDL_SetRenderDrawBlendMode,
	getRenderDrawBlendMode:   SDL.SDL_GetRenderDrawBlendMode,
	renderClear:              SDL.SDL_RenderClear,
	renderDrawPoint:          SDL.SDL_RenderDrawPoint,
	renderDrawPoints:         SDL.SDL_RenderDrawPoints,
	renderDrawLine:           SDL.SDL_RenderDrawLine,
	renderDrawLines:          SDL.SDL_RenderDrawLines,
	renderDrawRect:           SDL.SDL_RenderDrawRect,
	renderDrawRects:          SDL.SDL_RenderDrawRects,
	renderFillRect:           SDL.SDL_RenderFillRect,
	renderFillRects:          SDL.SDL_RenderFillRects,
	renderCopy:               SDL.SDL_RenderCopy,
	renderCopyEx:             SDL.SDL_RenderCopyEx,
	renderReadPixels:         SDL.SDL_RenderReadPixels,
	renderPresent:            SDL.SDL_RenderPresent,
	destroyTexture:           SDL.SDL_DestroyTexture,
	destroyRenderer:          SDL.SDL_DestroyRenderer,



	/*
	 * CUSTOM API
	 */

	loadImage: SDL_image.IMG_Load

};

