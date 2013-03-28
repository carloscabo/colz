var c1, c2, c3;

$(document).ready(function() {
  // la magia aquí

  test( "Hex Color to other color-spaces", function() {

    // Hex color
    c1 = new colz.color('#f26c4f');

    equal( c1.rgb.toString() , "rgb(242,108,79)" );
    equal( c1.rgba.toString() ,"rgba(242,108,79,1)" );
    equal( c1.hsl.toString() , "hsl(11,86%,63%)" );
    equal( c1.hsla.toString() ,"hsla(11,86%,63%,1)" );

    c1.setAlpha(0.5);

    equal( c1.rgb.toString() , "rgb(242,108,79)" );
    equal( c1.rgba.toString() ,"rgba(242,108,79,0.5)" );
    equal( c1.hsl.toString() , "hsl(11,86%,63%)" );
    equal( c1.hsla.toString() ,"hsla(11,86%,63%,0.5)" );

    c1.setHue(280);

    equal( c1.rgb.toString() , "rgb(188,80,242)" );
    equal( c1.rgba.toString() ,"rgba(188,80,242,0.5)" );
    equal( c1.hsl.toString() , "hsl(280,86%,63%)" );
    equal( c1.hsla.toString() ,"hsla(280,86%,63%,0.5)" );
    equal( c1.hex ,"#bc50f2" )

    equal( c1.r, 188);
    equal( c1.g, 80);
    equal( c1.b, 242);
    equal( c1.h, 280);
    equal( c1.s, 86);
    equal( c1.l, 63);
    equal( c1.a, 0.5);

    // RGBA color
    c1 = new colz.color(0, 114, 188, 0.35);

    equal( c1.rgb.toString() , "rgb(0,114,188)" );
    equal( c1.rgba.toString() ,"rgba(0,114,188,0.35)" );
    equal( c1.hsl.toString() , "hsl(204,100%,37%)" );
    equal( c1.hsla.toString() ,"hsla(204,100%,37%,0.35)" );

    c1.setAlpha(0.88);

    equal( c1.rgb.toString() , "rgb(0,114,188)" );
    equal( c1.rgba.toString() ,"rgba(0,114,188,0.88)" );
    equal( c1.hsl.toString() , "hsl(204,100%,37%)" );
    equal( c1.hsla.toString() ,"hsla(204,100%,37%,0.88)" );

    c1.setHue(189);
    c1.setSat(99);
    c1.setLum(35);

    equal( c1.rgb.toString() , "rgb(1,151,178)" );
    equal( c1.rgba.toString() ,"rgba(1,151,178,0.88)" );
    equal( c1.hsl.toString() , "hsl(189,99%,35%)" );
    equal( c1.hsla.toString() ,"hsla(189,99%,35%,0.88)" );
    equal( c1.hex ,"#0197b2" )

    // RGB color
    c1 = new colz.color(242, 108, 79);

    equal( c1.rgb.toString() , "rgb(242,108,79)" );
    equal( c1.rgba.toString() ,"rgba(242,108,79,1)" );
    equal( c1.hsl.toString() , "hsl(11,86%,63%)" );
    equal( c1.hsla.toString() ,"hsla(11,86%,63%,1)" );

    c1.setAlpha(0.5);

    equal( c1.rgb.toString() , "rgb(242,108,79)" );
    equal( c1.rgba.toString() ,"rgba(242,108,79,0.5)" );
    equal( c1.hsl.toString() , "hsl(11,86%,63%)" );
    equal( c1.hsla.toString() ,"hsla(11,86%,63%,0.5)" );

    c1.setHue(280);

    equal( c1.rgb.toString() , "rgb(188,80,242)" );
    equal( c1.rgba.toString() ,"rgba(188,80,242,0.5)" );
    equal( c1.hsl.toString() , "hsl(280,86%,63%)" );
    equal( c1.hsla.toString() ,"hsla(280,86%,63%,0.5)" );
    equal( c1.hex ,"#bc50f2" )

    // Hex short format
    c1 = new colz.color('F00');
    equal( c1.rgb.toString() , "rgb(255,0,0)" );
    equal( c1.rgba.toString() ,"rgba(255,0,0,1)" );

    // Photoshop HSB color
    deepEqual( colz.hsbToRgb(204, 100, 74), [0, 113, 188]);

    // equal( "1", "2" );
  });

});
