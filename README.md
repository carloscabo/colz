colz
====

Colz. Javascript library to convert colors between RGB / Hex / HSL / HSV / HSB color spaces. It provides several toString helpers to ease its use in CSS / HTML5 Canvas projects.

Also provides some helpers to create "color schemes" or "color palettes".

You can see a living example of it usage at:  
[http://rgb.to](http://rgb.to/ "Rgb to color conversion utility").

Usage
=====

You can create a color initializing the object with an Hex, or an RGB / RGBa value this way:

    color1 = new colz.Color('#f26c4f');
    color2 = new colz.Color('#f00'); // Short Hex
    color3 = new colz.Color(0, 114, 188); // Rgb
    color4 = new colz.Color(0, 114, 188, 0.1); // Rgba

    // You can pass Rgb in array format too
    color5 = new colz.Color([0, 114, 188]); // Rgb
    color6 = new colz.Color([0, 114, 188, 0.1]); // Rgba
    

Once initialized you can get the color in several formats accesing the object's properties.

    color1.hex  // #f26c4f
    color1.rgb  // {r: 242, g: 108, b: 79}
    color1.rgba // {r: 242, g: 108, b: 79, a: 1}
    color1.hsl  // {h: 11, s: 86, l: 63}
    color1.hsla // {h: 11, s: 86, l: 63, a: 1}
    
    // Also its individual componets
    
    color1.r // 242
    color1.g // 108
    color1.b // 79
    color1.h // 11

Provides four private methods to update your color HSLa settings that automatically update all the colorspaces values.

    color1.setHue(206);    // Update Hue
    color1.setLum(86);     // Update Luminosity
    color1.setSat(35);     // Update Saturation
    color1.setAlpha(0.88); // Update alpha
    

You can get a random color using

    c1 = colz.randomColor(); // Return colz.Color object

Any of the colorspaces have an "toString" method to ease its usage in CSS / HTML5 Canvas projects.

    color1.rgb.toString();  // "rgb(0,114,188)"
    color1.rgba.toString(); // "rgba(0,114,188,0.88)"
    color1.hsl.toString();  // "hsl(204,100%,37%)"
    color1.hsla.toString(); // "hsla(204,100%,37%,0.88)"
    
And two public methods to convert HSB Colors (the color-space used in Adobe applications like Photoshop) to RGB of HSL.

    colz.hsbToRgb(204, 100, 74); // [249, 132, 14]
    colz.hsbToHsl(204, 100, 74); // [204, 100, 37]
    
Sometimes its usefull to get a relative value representing the darkness / lightness of a color. Maybe helpfull to decide the color of a text to be more readable over a colored background, for instance.

I adapted the W3C formula to get the "Relative Luminance" of a color, I'm my test seems that a color with a value > 0.35 its light enough to read a black text over it.

Must be said that this value could vary depending on the "gamma" value of the user display, but as far I know the "gamma" value is unreacheable from Javascript so its the best approximation I can do right now.


    colz.getRelativeLuminance(201,50,165); // RGB
    colz.getRelativeLuminance('#c932a5'); //
    // Both return 0.17415323977742278 
    
More info about the "Relative Luminance" at:
http://www.w3.org/TR/WCAG20/#relativeluminancedef

Color Schemes / Paletes
=======================

Color Schemes are colz.Color collections so you can handle all the colors you are using in a project in a single object, easier to iterate and to work with. Think about it as a a 'palette' where you store all your colors.

To create a custom color scheme / palette is as simple as passing an array of colors to the constructor:

    myColors = new colz.ColorScheme(['#ffff0','#fb0102']);
    
    // You can also pass RGB color arrays
    myColors = new colz.ColorScheme([[255, 01, 03], [254, 12, 23]]);
    
    // Access your palette with myColors.palette[i]
    
Another way is to pass a single color and an array of HUE shifts. So if you want to get 2 aditional colors with their HUEs "rotated" 120º (usually called "Triad Complementary colors") you can do it this way:

    // Creating a "triad"
    myPalette = new colz.ColorScheme('#f00', [120, 240]);
    
To ease the generation of complementary colors ColorScheme provides some "shortcut" constructors.

    // Complementary color (HUE + 180º)
    myColors = new colz.ColorScheme.Compl(base_color));
    
    // Triad (HUE + 120º, HUE + 240º)
    myColors = new colz.ColorScheme.Triad(base_color));
    
    // Tetrad / quad (HUE +60º, +180º, +240º)
    myColors = new colz.ColorScheme.Tetrad(base_color));
    
    // Analogous (-45º, +45º)
    myColors = new colz.ColorScheme.Analog(base_color));
    
    // Accent analogous (-45º, +45, +180º)
    myColors = new colz.ColorScheme.Accent(base_color));
    
    // Split complementary (+150º, +210º)
    myColors = new colz.ColorScheme.Split(base_color));
    
    // Custom degrees
    myColors = new colz.ColorScheme(base_color, [50,60,80]));
    
Take a look to the colz.test.js to see some working samples.

Thanks
======

Thanks to Alex Gorbatchev for his help adapting it to "Universal Module Format" and minification (https://github.com/alexgorbatchev) and @derodo for its comments about gamma.
