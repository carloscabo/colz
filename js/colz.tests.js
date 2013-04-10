var c1, c2, c3;

$(document).ready(function() {
  // la magia aquí

  // Hex color
  c1 = new colz.Color('#f26c4f');

  test( "Hex Color to other color-spaces", function() {

    equal( c1.rgb.toString() , "rgb(242,108,79)", c1.rgb.toString() );
    equal( c1.rgba.toString() ,"rgba(242,108,79,1)", c1.rgba.toString() );
    equal( c1.hsl.toString() , "hsl(11,86%,63%)", c1.hsl.toString() );
    equal( c1.hsla.toString() ,"hsla(11,86%,63%,1)", c1.hsla.toString() );
  });

  test( "Updating alpha value", function() {

    c1.setAlpha(0.5);

    equal( c1.rgb.toString() , "rgb(242,108,79)", c1.rgb.toString() );
    equal( c1.rgba.toString() ,"rgba(242,108,79,0.5)", c1.rgba.toString() );
    equal( c1.hsl.toString() , "hsl(11,86%,63%)", c1.hsl.toString() );
    equal( c1.hsla.toString() ,"hsla(11,86%,63%,0.5)", c1.hsla.toString() );

  });

  test( "Updating HUE value", function() {

    c1.setHue(280);

    equal( c1.rgb.toString() , "rgb(188,80,242)" );
    equal( c1.rgba.toString() ,"rgba(188,80,242,0.5)" );
    equal( c1.hsl.toString() , "hsl(280,86%,63%)" );
    equal( c1.hsla.toString() ,"hsla(280,86%,63%,0.5)" );
    equal( c1.hex ,"#bc50f2" )

  });

  test( "Testing individual components, r, g, b, h, s, l, a", function() {

    equal( c1.r, 188);
    equal( c1.g, 80);
    equal( c1.b, 242);
    equal( c1.h, 280);
    equal( c1.s, 86);
    equal( c1.l, 63);
    equal( c1.a, 0.5);

  });

  test( "Creating color from RGBa", function() {

    // RGBA color
    c1 = new colz.Color(0, 114, 188, 0.35);

    equal( c1.rgb.toString() , "rgb(0,114,188)" );
    equal( c1.rgba.toString() ,"rgba(0,114,188,0.35)" );
    equal( c1.hsl.toString() , "hsl(204,100%,37%)" );
    equal( c1.hsla.toString() ,"hsla(204,100%,37%,0.35)" );

  });

  test( "Updating alpha value", function() {

    c1.setAlpha(0.88);

    equal( c1.rgb.toString() , "rgb(0,114,188)" );
    equal( c1.rgba.toString() ,"rgba(0,114,188,0.88)" );
    equal( c1.hsl.toString() , "hsl(204,100%,37%)" );
    equal( c1.hsla.toString() ,"hsla(204,100%,37%,0.88)" );

  });

  test( "Updating h, s, l with setHue, setLum, and setSat", function() {

    c1.setHue(189);
    c1.setSat(99);
    c1.setLum(35);

    equal( c1.rgb.toString() , "rgb(1,151,178)" );
    equal( c1.rgba.toString() ,"rgba(1,151,178,0.88)" );
    equal( c1.hsl.toString() , "hsl(189,99%,35%)" );
    equal( c1.hsla.toString() ,"hsla(189,99%,35%,0.88)" );
    equal( c1.hex ,"#0197b2" )

  });

  test( "Creating RGB color", function() {

    // RGB color
    c1 = new colz.Color(242, 108, 79);

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

  });

  test( "Creating shot Hex color ('#fff')", function() {

    // Hex short format
    c1 = new colz.Color('F00');
    equal( c1.rgb.toString() , "rgb(255,0,0)" );
    equal( c1.rgba.toString() ,"rgba(255,0,0,1)" );

  });

  test( "Convert Photoshop HSB to HSL", function() {

    // Photoshop HSB color
    deepEqual( colz.hsbToRgb(204, 100, 74), [0, 113, 188]);
    deepEqual( colz.rgbToHsb(0, 113, 188), [204, 100, 74]);

    // equal( "1", "2" );
  });

  // Color schemes visual samples
  var sch = [];
  var tcol = '#F43E71';
  sch.push(new colz.ColorScheme.Compl(tcol));
  sch.push(new colz.ColorScheme.Triad(tcol));
  sch.push(new colz.ColorScheme.Tetrad(tcol));
  sch.push(new colz.ColorScheme.Analog(tcol));
  sch.push(new colz.ColorScheme.Accent(tcol));
  sch.push(new colz.ColorScheme.Split(tcol));
  sch.push(new colz.ColorScheme(tcol, [50,60,80]));

  // Loop color schemes
  for (i = 0, lensc = sch.length; i < lensc; i++) {

    var html = '<div class="cs">';
    for (j = 0, len = sch[i].palette.length; j < len; j++) {
      html = html + '<div class="swatch" style="background:';
      html = html + sch[i].palette[j].hex;
      html = html + '">' + sch[i].palette[j].hex + '</div>';
    }

    html = html + '</div>';
    $('#color-schemes').append(html);

  }


});
