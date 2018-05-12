var ref = require('ref');
var ref_array     = require('ref-array');
var ref_struct    = require('ref-struct');
var ffi = require('ffi');
var wchar_t = require('ref-wchar');
var path = require('path');

// basic type
var void_type = ref.types.void;
var int = ref.types.int;
var uint = ref.types.uint;
var long = ref.types.long;
var ulong = ref.types.ulong;
var longlong = ref.types.longlong;
var ulonglong = ref.types.ulonglong;
var float = ref.types.float;
var double = ref.types.double;
var size_t = ref.types.size_t;
var char = ref.types.char;
var string = ref.types.CString;
var uint32 = ref.types.uint32;
var uint8  = ref.types.uint8;

// basic pointer
var void_ptr = ref.refType(void_type);
var char_ptr = ref.refType(char);
var string_ptr = ref.refType(string);
var size_t_ptr = ref.refType(size_t);
var wchar_ptr = wchar_t.string;

// structs and pointers of structs
const TTF_Font	 = ref_struct({})
const TTF_Font_pointer = ref.refType(TTF_Font)

const SDL_Rect = ref_struct({
	x: int,
	y: int,
	w: int,
	h: int
});

const SDL_Rect_pointer = ref.refType(SDL_Rect);

const SDL_Color = ref_struct({
	r: uint8,
	g: uint8,
	b: uint8,
	a: uint8
});

const SDL_Color_pointer = ref.refType(SDL_Color);

const SDL_Palette = ref_struct({
	ncolors:  int,
	colors:   SDL_Color_pointer,
	version:  uint32,
	refcount: int
});

const SDL_Palette_pointer = ref.refType(SDL_Palette);

const SDL_PixelFormat = ref_struct({
	format:        uint32,
	palette:       SDL_Palette_pointer,
	BitsPerPixel:  uint8,
	BytesPerPixel: uint8,
	padding:       ref_array(uint8, 2), // uint8[2]
	Rmask:         uint32,
	Gmask:         uint32,
	Bmask:         uint32,
	Amask:         uint32,
	Rloss:         uint8,
	Gloss:         uint8,
	Bloss:         uint8,
	Aloss:         uint8,
	Rshift:        uint8,
	Gshift:        uint8,
	Bshift:        uint8,
	Ashift:        uint8,
	refcount:      int
});

const SDL_PixelFormat_pointer = ref.refType(SDL_PixelFormat);

const SDL_Surface = ref_struct({
	flags:     uint32,
	format:    SDL_PixelFormat_pointer,
	w:         int,
	h:         int,
	pitch:     int,
	pixels:    void_ptr,
	userdata:  void_ptr,
	locked:    int,
	lock_data: void_ptr,
	clip_rect: SDL_Rect,
	map:       void_ptr,
	refcount:  int
});

const SDL_Surface_pointer = ref.refType(SDL_Surface);

// global function
var library = path.join(__dirname, 'lib', process.platform, process.arch, 'libSDL2_ttf-2.0.0' + ffi.LIB_EXT);
var SDL_ttf = ffi.Library(library, {
	TTF_Init: [int,[]],
	TTF_OpenFont: [TTF_Font_pointer, [string, size_t]],
	TTF_RenderUTF8_Solid: [SDL_Surface_pointer, [TTF_Font_pointer, string, SDL_Color]]
});

module.exports = SDL_ttf;