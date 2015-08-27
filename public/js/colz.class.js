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

/*
 Universal JavaScript Module, supports AMD (RequireJS), Node.js, and the browser.
 https://gist.github.com/kirel/1268753
*/

(function (name, definition) {
  if (typeof define === 'function') { // AMD
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) { // Node.js
    module.exports = definition();
  } else { // Browser
    var theModule = definition(), global = this, old = global[name];
    theModule.noConflict = function () {
      global[name] = old;
      return theModule;
    };
    global[name] = theModule;
  }
})('colz', function () {
  /* Namespace container */

  var
    round = Math.round,
    toString = 'toString',
    colz = colz || {},
    Rgb,
    Rgba,
    Hsl,
    Hsla,
    Color,
    ColorScheme,
    hexToRgb,
    componentToHex,
    rgbToHex,
    rgbToHsl,
    hue2rgb,
    hslToRgb,
    rgbToHsb,
    hsbToRgb,
    hsbToHsl,
    hsvToHsl,
    hsvToRgb,
    randomColor
    ;

  /*
   ==================================
   Color constructors
   ==================================
  */

  Rgb = colz.Rgb = function (col) {
    this.r = col[0];
    this.g = col[1];
    this.b = col[2];
  };

  Rgb.prototype[toString] = function () {
    return 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
  };

  Rgba = colz.Rgba = function (col) {
    this.r = col[0];
    this.g = col[1];
    this.b = col[2];
    this.a = col[3];
  };

  Rgba.prototype[toString] = function () {
    return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
  };

  Hsl = colz.Hsl = function (col) {
    this.h = col[0];
    this.s = col[1];
    this.l = col[2];
  };

  Hsl.prototype[toString] = function () {
    return 'hsl(' + this.h + ',' + this.s + '%,' + this.l + '%)';
  };

  Hsla = colz.Hsla = function (col) {
    this.h = col[0];
    this.s = col[1];
    this.l = col[2];
    this.a = col[3];
  };

  Hsla.prototype[toString] = function () {
    return 'hsla(' + this.h + ',' + this.s + '%,' + this.l + '%,' + this.a + ')';
  };

  /*
   ==================================
   Main Colz color object
   ==================================
  */

  Color = colz.Color = function () {
    this.hex =
    this.r =
    this.g =
    this.b =
    this.h =
    this.s =
    this.l =
    this.a =
    this.hsl =
    this.hsla =
    this.rgb =
    this.rgba = null;
    /*this.hslString = null;
    this.hslaString = null;
    this.rgbString = null;
    this.rgbaString = null;*/

    // Init
    this.init(arguments);
  }; //colz.color

  var colorPrototype = Color.prototype;

  colorPrototype.init = function (arg) {
    var _this = this;

    // Argument is string -> Hex color
    if (typeof arg[0] === 'string') {
      // Add initial '#' if missing
      if (arg[0].charAt(0) !== '#') { arg[0] = '#' + arg[0]; }
      // If Hex in #fff format convert to #ffffff
      if (arg[0].length < 7) {
        arg[0] = '#' + arg[0][1] + arg[0][1] + arg[0][2] + arg[0][2] + arg[0][3] + arg[0][3];
      }

      _this.hex = arg[0].toLowerCase();

      _this.rgb = new Rgb(hexToRgb(_this.hex));
      _this.r = _this.rgb.r;
      _this.g = _this.rgb.g;
      _this.b = _this.rgb.b;
      _this.a = 1.0;
      _this.rgba = new Rgba([_this.r, _this.g, _this.b, _this.a]);
    }

    // First argument is number -> Rgb[A]
    if (typeof arg[0] === 'number') {
      _this.r = arg[0];
      _this.g = arg[1];
      _this.b = arg[2];
      if (typeof arg[3] === 'undefined') {
        _this.a = 1.0;
      } else {
        _this.a = arg[3];
      }

      _this.rgb  = new Rgb([_this.r, _this.g, _this.b]);
      _this.rgba = new Rgba([_this.r, _this.g, _this.b, _this.a]);
      _this.hex = rgbToHex([_this.r, _this.g, _this.b]);
    }

    // Argument is Array -> Rgb[A]
    if (arg[0] instanceof Array) {
      _this.r = arg[0][0];
      _this.g = arg[0][1];
      _this.b = arg[0][2];
      if (typeof arg[0][3] === 'undefined') {
        _this.a = 1.0;
      } else {
        _this.a = arg[0][3];
      }

      _this.rgb  = new Rgb([_this.r, _this.g, _this.b]);
      _this.rgba = new Rgba([_this.r, _this.g, _this.b, _this.a]);
      _this.hex = rgbToHex([_this.r, _this.g, _this.b]);
    }

    // Common
    _this.hsl = new Hsl(colz.rgbToHsl([_this.r, _this.g, _this.b]));
    _this.h = _this.hsl.h;
    _this.s = _this.hsl.s;
    _this.l = _this.hsl.l;
    _this.hsla = new Hsla([_this.h, _this.s, _this.l, _this.a]);
  }; // init

  colorPrototype.setHue = function (newhue) {
    var _this = this;

    _this.h = newhue;
    _this.hsl.h = newhue;
    _this.hsla.h = newhue;
    _this.updateFromHsl();
  }; // setHue

  colorPrototype.setSat = function (newsat) {
    var _this = this;

    _this.s = newsat;
    _this.hsl.s = newsat;
    _this.hsla.s = newsat;
    _this.updateFromHsl();
  }; // setSat

  colorPrototype.setLum = function (newlum) {
    var _this = this;

    _this.l = newlum;
    _this.hsl.l = newlum;
    _this.hsla.l = newlum;
    _this.updateFromHsl();
  }; // setLum

  colorPrototype.setAlpha = function (newalpha) {
    this.a = newalpha;
    this.hsla.a = newalpha;
    this.rgba.a = newalpha;
  };

  colorPrototype.updateFromHsl = function () {
    // Updates Rgb
    this.rgb = null;
    this.rgb = new Rgb(colz.hslToRgb([this.h, this.s, this.l]));

    this.r = this.rgb.r;
    this.g = this.rgb.g;
    this.b = this.rgb.b;
    this.rgba.r = this.rgb.r;
    this.rgba.g = this.rgb.g;
    this.rgba.b = this.rgb.b;

    // Updates Hex
    this.hex = null;
    this.hex = rgbToHex([this.r, this.g, this.b]);
  };

  /*
   ==================================
   Public Methods
   ==================================
  */

  randomColor = colz.randomColor = function () {
    var r = "#" + Math.random().toString(16).slice(2, 8);
    return new Color(r);
  };

  hexToRgb = colz.hexToRgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  };

  componentToHex = colz.componentToHex = function (c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  // You can pass 3 numeric values or 1 Array
  rgbToHex = colz.rgbToHex = function () { //r, g, b
    var arg, r, g, b;

    arg = arguments;

    if (arg.length > 1) {
      r = arg[0];
      g = arg[1];
      b = arg[2];
    } else {
      r = arg[0][0];
      g = arg[0][1];
      b = arg[0][2];
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
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
  rgbToHsl = colz.rgbToHsl = function () {
    var arg, r, g, b, h, s, l, d, max, min;

    arg = arguments;

    if (typeof arg[0] === 'number') {
      r = arg[0];
      g = arg[1];
      b = arg[2];
    } else {
      r = arg[0][0];
      g = arg[0][1];
      b = arg[0][2];
    }

    r /= 255;
    g /= 255;
    b /= 255;

    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    //CARLOS
    h = round(h * 360);
    s = round(s * 100);
    l = round(l * 100);

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

  hue2rgb = colz.hue2rgb = function (p, q, t) {
    if (t < 0) { t += 1; }
    if (t > 1) { t -= 1; }
    if (t < 1 / 6) { return p + (q - p) * 6 * t; }
    if (t < 1 / 2) { return q; }
    if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6; }
    return p;
  };

  hslToRgb = colz.hslToRgb = function () {
    var arg, r, g, b, h, s, l, q, p;

    arg = arguments;

    if (typeof arg[0] === 'number') {
      h = arg[0] / 360;
      s = arg[1] / 100;
      l = arg[2] / 100;
    } else {
      h = arg[0][0] / 360;
      s = arg[0][1] / 100;
      l = arg[0][2] / 100;
    }

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {

      q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      p = 2 * l - q;
      r = colz.hue2rgb(p, q, h + 1 / 3);
      g = colz.hue2rgb(p, q, h);
      b = colz.hue2rgb(p, q, h - 1 / 3);
    }
    return [round(r * 255), round(g * 255), round(b * 255)];
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
  rgbToHsb = colz.rgbToHsb = function (r, g, b) {
    var max, min, h, s, v, d;

    r = r / 255;
    g = g / 255;
    b = b / 255;

    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    v = max;

    d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0; // achromatic
    } else {
      switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    // map top 360,100,100
    h = round(h * 360);
    s = round(s * 100);
    v = round(v * 100);

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
  hsbToRgb = colz.hsbToRgb = function (h, s, v) {

    var r, g, b, i, f, p, q, t;

    // h = h / 360;
    if (v === 0) { return [0, 0, 0]; }

    s = s / 100;
    v = v / 100;
    h = h / 60;

    i = Math.floor(h);
    f = h - i;
    p = v * (1 - s);
    q = v * (1 - (s * f));
    t = v * (1 - (s * (1 - f)));

    if (i === 0) {
      r = v; g = t; b = p;
    } else if (i === 1) {
      r = q; g = v; b = p;
    } else if (i === 2) {
      r = p; g = v; b = t;
    } else if (i === 3) {
      r = p; g = q; b = v;
    } else if (i === 4) {
      r = t; g = p; b = v;
    } else if (i === 5) {
      r = v; g = p; b = q;
    }

    r = Math.floor(r * 255);
    g = Math.floor(g * 255);
    b = Math.floor(b * 255);

    return [r, g, b];
  };

  /* Convert from Hsv */
  hsbToHsl = colz.hsbToHsl = function (h, s, b) {
    return colz.rgbToHsl(colz.hsbToRgb(h, s, b));
  };

  /* Alias */
  hsvToHsl = colz.hsvToHsl = colz.hsbToHsl;
  hsvToRgb = colz.hsvToRgb = colz.hsbToRgb;

  /*
   ==================================
   Color Scheme Builder
   ==================================
  */

  ColorScheme = colz.ColorScheme = function (color_val, angle_array) {
    this.palette = [];

    if (angle_array === undefined && color_val instanceof Array) {
      // Asume you passing a color array ['#f00','#0f0'...]
      this.createFromColors(color_val);
    } else {
      // Create scheme from color + hue angles
      this.createFromAngles(color_val, angle_array);
    }
  };

  var colorSchemePrototype = ColorScheme.prototype;

  colorSchemePrototype.createFromColors = function (color_val) {
    for (var i in color_val) {
      if (color_val.hasOwnProperty(i)) {
        //console.log(color_val[i]);
        this.palette.push(new Color(color_val[i]));
      }
    }
    return this.palette;
  }; // createFromColors

  colorSchemePrototype.createFromAngles = function (color_val, angle_array) {

    this.palette.push(new Color(color_val));

    for (var i in angle_array) {
      if (angle_array.hasOwnProperty(i)) {
        var tempHue = (this.palette[0].h  + angle_array[i]) % 360;
        this.palette.push(new Color(colz.hslToRgb([tempHue, this.palette[0].s, this.palette[0].l])));
      }
    }
    return this.palette;
  }; // createFromAngles

  /* Complementary colors constructors */
  ColorScheme.Compl = function (color_val) {
    return new ColorScheme(color_val, [180]);
  };

  /* Triad */
  ColorScheme.Triad = function (color_val) {
    return new ColorScheme(color_val, [120,240]);
  };

  /* Tretrad */
  ColorScheme.Tetrad = function (color_val) {
    return new ColorScheme(color_val, [60,180,240]);
  };

  /* Analogous */
  ColorScheme.Analog = function (color_val) {
    return new ColorScheme(color_val, [-45,45]);
  };

  /* Split complementary */
  ColorScheme.Split = function (color_val) {
    return new ColorScheme(color_val, [150,210]);
  };

  /* Accented Analogous */
  ColorScheme.Accent = function (color_val) {
    return new ColorScheme(color_val, [-45,45,180]);
  };

  return colz;
});
