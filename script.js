"use strict";

window.addEventListener("load", initColor);

function initColor() {
  document.querySelector("#colorpicker").addEventListener("input", selectColor);
}

function selectColor() {
  let hex = this.value;
  showColor(hex);
}
function showColor(hex) {
  showHex(hex);
  let rgb = hexToRgb(hex);
  showRgb(rgb);
  let hsl = rgbtoHsl(rgb.r, rgb.g, rgb.b);
  showHsl(hsl);
}

function delegator(hex) {
  let rgb = hexToRgb(hex);
  let hsl = rgbtoHsl(rgb.r, rgb.g, rgb.b);
  view({ hex, rgb, hsl });
}

function hexToRgb(hex) {
  // hex = document.querySelector("body > div > p.hex > span").innerHTML;
  let r = hex.substring(1, 3);
  let g = hex.substring(3, 5);
  let b = hex.substring(5, 7);

  r = Number.parseInt(r, 16);
  g = Number.parseInt(g, 16);
  b = Number.parseInt(b, 16);

  return { r, g, b };
  // showRgb(rgb);
  // rgbtoHsl(r, g, b);
}

function rgbtoHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = Math.floor(h);
  s = Math.floor(s);
  l = Math.floor(l);
  // console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  return { h, s, l };
  // showHsl(hsl);
}

// function view(obj) {
//   showHex(obj.hex);
//   showRgb(obj.rgb);
//   showHsl(obj.hsl);
// }

function showHex(hex) {
  document.querySelector("body > div > p.hex > span").innerHTML = hex;
  document.querySelector(
    "body > div > div > div:nth-child(3)"
  ).style.backgroundColor = hex;
  // hexToRgb(hex);
}

function showRgb(rgb) {
  let rgbText = `${rgb.r} ${rgb.g} ${rgb.b}`;
  document.querySelector("body > div > p.rgb > span").innerHTML = rgbText;
}

function showHsl(hsl) {
  let hslText = `${hsl.h}% ${hsl.s}% ${hsl.l}%`;
  document.querySelector("body > div > p.hsl > span").innerHTML = hslText;
}
