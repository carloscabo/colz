/**
 * Colorz (or Colz) is a Javascript "library" to help
 * in color conversion between the usual color-spaces
 * Hex - Rgb - Hsl / Hsv - Hsb
 *
 * It provides some helpers to output Canvas / CSS
 * color strings.
 *
 * by Carlos Cabo 2013
 * http://carloscabo.com
 *
 * Some formulas borrowed from Wikipedia or other authors.
*/

/* Namespace container */

var colz = colz || {};

/*
 ==================================
 Color constructors
 ==================================
*/

colz.Rgb = function (col) {
  this.r = col[0];
  this.g = col[1];
  this.b = col[2];
};

colz.Rgb.prototype.toString = function () {
  return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
};

colz.Rgba = function (col) {
  this.r = col[0];
  this.g = col[1];
  this.b = col[2];
  this.a = col[3];
};

colz.Rgba.prototype.toString = function () {
  return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
};

colz.Hsl = function (col) {
  this.h = col[0];
  this.s = col[1];
  this.l = col[2];
};

colz.Hsl.prototype.toString = function () {
  return 'hsl(' + this.h + ',' + this.s + '%,' + this.l + '%)';
};

colz.Hsla = function (col) {
  this.h = col[0];
  this.s = col[1];
  this.l = col[2];
  this.a = col[3];
};

colz.Hsla.prototype.toString = function () {
  return 'hsla(' + this.h + ',' + this.s + '%,' + this.l + '%,' + this.a + ')';
};

/*
 ==================================
 Main Colz color object
 ==================================
*/

colz.color = function () {
  this.hex = null;
  this.r = null;
  this.g = null;
  this.b = null;
  this.h = null;
  this.s = null;
  this.l = null;
  this.a = null;
  this.hsl = null;
  this.hsla = null;
  this.rgb = null;
  this.rgba = null;
  /*this.hslString = null;
  this.hslaString = null;
  this.rgbString = null;
  this.rgbaString = null;*/

  // Init
  this.init(arguments);


}; //colz.color

colz.color.prototype.init = function (arg) {

  // Argument is string -> Hex color
  if (typeof arg[0] === 'string') {
    // Add initial '#' if missing
    if (arg[0][0] !== '#') { arg[0] = '#' + arg[0]; }
    // If Hex in #fff format convert to #ffffff
    if (arg[0].length < 7) {
      arg[0] = '#' + arg[0][1] + arg[0][1] + arg[0][2] + arg[0][2] + arg[0][3] + arg[0][3];
    }

    this.hex = arg[0].toLowerCase();

    this.rgb = new colz.Rgb(colz.hexToRgb(this.hex));
    this.r = this.rgb.r;
    this.g = this.rgb.g;
    this.b = this.rgb.b;
    this.a = 1.0;
    this.rgba = new colz.Rgba([this.r, this.g, this.b, this.a]);
  }

  // First argument is number -> Rgb[A]
  if (typeof arg[0] === 'number') {
    this.r = arg[0];
    this.g = arg[1];
    this.b = arg[2];
    if (typeof arg[3] === 'undefined') {
      this.a = 1.0;
    } else {
      this.a = arg[3];
    }

    this.rgb  = new colz.Rgb([this.r, this.g, this.b]);
    this.rgba = new colz.Rgba([this.r, this.g, this.b, this.a]);
    this.hex = colz.rgbToHex([this.r, this.g, this.b]);
  }

  // Argument is Array -> Rgb[A]
  if (arg[0] instanceof Array) {
    this.r = arg[0][0];
    this.g = arg[0][1];
    this.b = arg[0][2];
    if (typeof arg[0][3] === 'undefined') {
      this.a = 1.0;
    } else {
      this.a = arg[0][3];
    }

    this.rgb  = new colz.Rgb([this.r, this.g, this.b]);
    this.rgba = new colz.Rgba([this.r, this.g, this.b, this.a]);
    this.hex = colz.rgbToHex([this.r, this.g, this.b]);
  }

  // Common
  this.hsl = new colz.Hsl(colz.rgbToHsl([this.r, this.g, this.b]));
  this.h = this.hsl.h;
  this.s = this.hsl.s;
  this.l = this.hsl.l;
  this.hsla = new colz.Hsla([this.h, this.s, this.l, this.a]);
}; // init

colz.color.prototype.setHue = function (newhue) {
  this.h = newhue;
  this.hsl.h = newhue;
  this.hsla.h = newhue;
  this.updateFromHsl();
}; // setHue

colz.color.prototype.setSat = function (newsat) {
  this.s = newsat;
  this.hsl.s = newsat;
  this.hsla.s = newsat;
  this.updateFromHsl();
}; // setSat

colz.color.prototype.setLum = function (newlum) {
  this.l = newlum;
  this.hsl.l = newlum;
  this.hsla.l = newlum;
  this.updateFromHsl();
}; // setLum

colz.color.prototype.setAlpha = function (newalpha) {
  this.a = newalpha;
  this.hsla.a = newalpha;
  this.rgba.a = newalpha;
};

colz.color.prototype.updateFromHsl = function () {
  // Updates Rgb
  this.rgb = null;
  this.rgb = new colz.Rgb(colz.hslToRgb([this.h, this.s, this.l]));

  this.r = this.rgb.r;
  this.g = this.rgb.g;
  this.b = this.rgb.b;
  this.rgba.r = this.rgb.r;
  this.rgba.g = this.rgb.g;
  this.rgba.b = this.rgb.b;

  // Updates Hex
  this.hex = null;
  this.hex = colz.rgbToHex([this.r, this.g, this.b]);
};

/*
 ==================================
 Public Methods
 ==================================
*/

colz.hexToRgb = function (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
};

colz.componentToHex = function (c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

// You can pass 3 numeric values or 1 Array
colz.rgbToHex = function () { //r, g, b
  var r, g, b;
  if (arguments.length > 1) {
    r = arguments[0];
    g = arguments[1];
    b = arguments[2];
  } else {
    r = arguments[0][0];
    g = arguments[0][1];
    b = arguments[0][2];
  }
  return "#" + colz.componentToHex(r) + colz.componentToHex(g) + colz.componentToHex(b);
};

/**
* Converts an RGB color value to HSL. Conversion formula
* adapted from http://en.wikipedia.org/wiki/HSL_color_space.
*
* @param   Number  r       The red color value
* @param   Number  g       The green color value
* @param   Number  b       The blue color value
* @return  Array           The HSL representation
*/
colz.rgbToHsl = function () {
  var r, g, b;

  if (typeof arguments[0] === 'number') {
    r = arguments[0];
    g = arguments[1];
    b = arguments[2];
  } else {
    r = arguments[0][0];
    g = arguments[0][1];
    b = arguments[0][2];
  }

  r /= 255;
  g /= 255;
  b /= 255;

  var
    max = Math.max(r, g, b), min = Math.min(r, g, b),
    h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
    case g: h = (b - r) / d + 2; break;
    case b: h = (r - g) / d + 4; break;
    }

    h /= 6;

    //CARLOS
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
  }
  return [h, s, l];
};

/**
* Converts an HSL color value to RGB. Conversion formula
* adapted from http://en.wikipedia.org/wiki/HSL_color_space.
*
* @param   Number  h       The hue
* @param   Number  s       The saturation
* @param   Number  l       The lightness
* @return  Array           The RGB representation
*/

colz.hslToRgb = function () {
  var r, g, b, h, s, l;

  if (typeof arguments[0] === 'number') {
    h = arguments[0] / 360;
    s = arguments[1] / 100;
    l = arguments[2] / 100;
  } else {
    h = arguments[0][0] / 360;
    s = arguments[0][1] / 100;
    l = arguments[0][2] / 100;
  }

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t){
      if(t < 0) t += 1;
      if(t > 1) t -= 1;
      if(t < 1/6) return p + (q - p) * 6 * t;
      if(t < 1/2) return q;
      if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

/**
 * Converts an RGB color value to HSB / HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSB representation
 */
colz.rgbToHsb = function (r, g, b) {
  r = r/255, g = g/255, b = b/255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h, s, v];
};

/**
* Converts an HSB / HSV color value to RGB. Conversion formula
* adapted from http://en.wikipedia.org/wiki/HSV_color_space.
*
* @param   Number  h       The hue
* @param   Number  s       The saturation
* @param   Number  v       The value
* @return  Array           The RGB representation
*/
colz.hsbToRgb = function (h, s, v) {

  var r, g, b, i, f, p, q, t;

  // h = h / 360;
  if ( s == 0 ) { return [0,0,0]; }

  s = s / 100;
  v = v / 100;
  h = h / 60;

  i = Math.floor(h);
  f = h - i;
  p = v * (1 - s);
  q = v * (1 - (s * f));
  t = v * (1 - (s * (1 - f)));

  if (i == 0) { r = v; g = t; b = p; }
  else if (i == 1) { r = q; g = v; b = p;}
  else if (i == 2) { r = p; g = v; b = t;}
  else if (i == 3) { r = p; g = q; b = v;}
  else if (i == 4) { r = t; g = p; b = v;}
  else if (i == 5) { r = v; g = p; b = q;}
  r = Math.floor(r*255);
  g = Math.floor(g*255);
  b = Math.floor(b*255);

  return [r, g, b];
}

/* Convert from Hsv */
colz.hsbToHsl = function (h, s, b){
  return colz.rgbToHsl(colz.hsbToRgb(h, s, b));
};

/* Alias */
colz.hsvToHsl = colz.hsbToHsl;
colz.hsvToRgb = colz.hsbToRgb;

/*
 ==================================
 Color schemes
 ==================================
*/

colz.ColorScheme = function (color_value, angle_array) {
  this.palette = [];

  // Initilize
  this.init(color_value, angle_array)
}

colz.ColorScheme.prototype.init = function (color_value, angle_array) {

  this.palette.push(new colz.color(color_value))

  for (var i in angle_array) {
    var tempHue = (this.palette[0].h  + angle_array[i]) % 360;
    this.palette.push(new colz.color(colz.hslToRgb([tempHue, this.palette[0].s, this.palette[0].l])));
  }

  return this.palette;
} //hueAngleVariants

/* Complementary colors */
colz.ColorScheme.Comp = function (color_value) {
  return new colz.ColorScheme(color_value, [180]);
}

/* Triad */
colz.ColorScheme.Triad = function (color_value) {
  return new colz.ColorScheme(color_value, [120,120]);
}
