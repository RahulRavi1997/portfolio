var clr = {
  h: Number($('#hue').val()),
  s: Number($('#sat').val()),
  l: Number($('#lig').val()),
  r: Number($('#red').val()),
  b: Number($('#blue').val()),
  g: Number($('#green').val()),
  t: Number($('#transparent').val())
}

br = String( Number($('#border').val() / 10 ) ) + 'vh';

function updateUI(isrgb) {
      var centerColor = 'hsl('+clr.h+','+clr.s+'%,'+clr.l+'%,'+ clr.t/100+')';
      var centerShadow = '0px 1vh 3vh hsla('+(clr.h-30)+','+(clr.s*0.7)+'%,'+(clr.l*0.5)+'%, 0.3)';
      var centerColorWithoutTransaparency = 'hsl('+clr.h+','+clr.s+'%,'+clr.l+'%,1)';
      $('.center-color').css('background-color', centerColor);
      $('.center-color-wot').css('background-color', centerColorWithoutTransaparency);
      $('.center-shadow').css('box-shadow', centerShadow);
      $('.center-color').css('border-radius', br);
      
      var backDark = 'hsl('+(clr.h-30)+','+(clr.s*0.8)+'%,'+(clr.l*0.9)+'%)';
      var backLight = 'hsl('+(clr.h+30)+','+(clr.s*1.2)+'%,'+(clr.l*1.1)+'%)';
      var backGrad = 'linear-gradient( 35deg, '+backDark+', '+backLight+' )';
      $('.back-color').css('background', backGrad);

  if (!isrgb) {
      var rgb = hslToRgb(clr.h/360, clr.s/100, clr.l/100);
      clr.r = rgb.r;
      clr.b = rgb.b;
      clr.g = rgb.g;
      $('#red').val(clr.r); 
      $('#blue').val(clr.b);
      $('#green').val(clr.g);
  }
      setLabelColor();
}

function setLabelColor() {
      var ir = Math.floor((255-clr.r)*1);
      var ig = Math.floor((255-clr.g)*1);
      var ib = Math.floor((255-clr.b)*1);
      $('.label').css('color', 'rgb('+ir+','+ig+','+ib+')');
      $('body').css('color', 'rgb('+ir+','+ig+','+ib+')');
}

function updateRBG() {
    var hsl = rgbToHsl(clr.r, clr.g, clr.b);
    clr.h = hsl.h;
    clr.s = hsl.s;
    clr.l = hsl.l;
    $('#hue').val(clr.h);
    $('#lig').val(clr.l);
    $('#sat').val(clr.s);
    updateUI(true);
}

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l;
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
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

    return {r:Math.round(r * 255), g:Math.round(g * 255), b:Math.round(b * 255)};
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0;
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {h:h*360, s:s*100, l:l*100};
}


$('#red').on('mousemove change', function(){
  clr.r = Number($('#red').val());
  updateRBG();
})
$('#blue').on('mousemove change', function(){
  clr.b = Number($('#blue').val());
  updateRBG();
})
$('#green').on('mousemove change', function(){
  clr.g = Number($('#green').val());
  updateRBG();
})
$('#transparent').on('mousemove change', function(){
  clr.t = Number($('#transparent').val());
  updateRBG();
})

$('#hue').on('mousemove change', function(){
  clr.h = Number($('#hue').val());
  updateUI();
})
$('#sat').on('mousemove change', function(){
  clr.s = Number($('#sat').val());
  updateUI();
})
$('#lig').on('mousemove change', function(){
  clr.l = Number($('#lig').val());
  updateUI();
})
$('#border').on('mousemove change', function(){
  br = String( Number($('#border').val() / 10 ) ) + 'vh';
  updateUI();
})

$(document).ready(function(){
  clr.r = Number($('#red').val()),
  clr.b= Number($('#blue').val()),
  clr.g= Number($('#green').val()),
  clr.t = Number($('#transparent').val())
  updateUI();
  updateRBG();
  function changeNav() {
      $('#home-content').hide();
      $('#experience-content').hide();
      $('#projects-content').hide();
      $('#awards-content').hide();
      $('#hackathons-content').hide();
      
      $('#experience').removeClass('active');
      $('#projects').removeClass('active');
      $('#awards').removeClass('active');
      $('#hackathons').removeClass('active');
      
      $(this).addClass('active');
      if (this.id === "theme") {
          $('#theme-content').toggle();
      } else {
          $('#' + this.id + '-content').show();
          $('#theme-content').hide();
      }
  }
  $("#theme").click(changeNav);
  $("#home").click(changeNav);
  $("#experience").click(changeNav);
  $("#projects").click(changeNav);
  $("#awards").click(changeNav);
  $("#hackathons").click(changeNav);
});
