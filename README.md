colz
====

Colz. Javascript library to convert colors between RGB / Hex / HSL / HSV / HSB color spaces. It provides several toString helpers to ease its use in CSS / HTML5 Canvas projects.

Usage
=====

You can create a color initializing the object with an Hex, or an RGB / RGBa value this way:

    color1 = new colz.color('#f26c4f');
    color2 = new colz.color('#f00'); // Short Hex
    color3 = new colz.color(0, 114, 188); // Rgb
    color4 = new colz.color(0, 114, 188, 0.1); // Rgba

    // You can pass Rgb in array format too
    color5 = new colz.color([0, 114, 188]); // Rgb
    color6 = new colz.color([0, 114, 188, 0.1]); // Rgba
    

Once initialized you can get the color in several formats accesing the object's properties.

    color1.hex  // #f26c4f
    color1.rgb  // {0: 242, 1: 108, 2: 79}
    color1.rgba // {0: 242, 1: 108, 2: 79, 3: 1}
    color1.hsl  // {0: 11, 1: 86, 2: 63}
    color1.hsla // {0: 11, 1: 86, 2: 63, 3: 1}
    
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
    
Any of the colorspaces have an "toString" method to ease its usage in CSS / HTML5 Canvas projects.

    color1.rgb.toString();  // "rgb(0,114,188)"
    color1.rgba.toString(); // "rgba(0,114,188,0.88)"
    color1.hsl.toString();  // "hsl(204,100%,37%)"
    color1.hsla.toString(); // "hsla(204,100%,37%,0.88)"
    
And two public methods to convert HSB Colors (the color-space used in Adobe applications like Photoshop) to RGB of HSL.

    colz.hsbToRgb(204, 100, 74); // [249, 132, 14]
    colz.hsbToHsl(204, 100, 74); // [204, 100, 37]


