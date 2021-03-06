"use strict";

window.addEventListener("load", initColor);

function initColor() {
  document.querySelector("#colorpicker").addEventListener("input", selectColor);
  document.querySelector("select").addEventListener("change", () => {
    let color = document.querySelector("#colorpicker").value;
    selectColor(color);
  });
}

function selectColor(color) {
  let hex = this.value;
  showColor(hex);
}

function showColor(hex) {
  showHex(hex);
  let rgb = hexToRgb(hex);
  showRgb(rgb);
  let hsl = rgbtoHsl(rgb.r, rgb.g, rgb.b);
  showHsl(hsl);
  viewController(getColorArray(getHarmony(hsl)));
}

function delegator(hex) {
  let rgb = hexToRgb(hex);
  let hsl = rgbtoHsl(rgb.r, rgb.g, rgb.b);
  view({ hex, rgb, hsl });
}

function hexToRgb(hex) {
  let r = hex.substring(1, 3);
  let g = hex.substring(3, 5);
  let b = hex.substring(5, 7);

  r = Number.parseInt(r, 16);
  g = Number.parseInt(g, 16);
  b = Number.parseInt(b, 16);

  return { r, g, b };
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
  return { h, s, l };
}

function showHex(hex) {
  document.querySelector("body > div > p.hex > span").innerHTML = hex;
  document.querySelector(".colorbox").style.backgroundColor = hex;
}

function showRgb(rgb) {
  let rgbText = `${rgb.r} ${rgb.g} ${rgb.b}`;
  document.querySelector("body > div > p.rgb > span").innerHTML = rgbText;
}

function showHsl(hsl) {
  let hslText = `${hsl.h}% ${hsl.s}% ${hsl.l}%`;
  document.querySelector("body > div > p.hsl > span").innerHTML = hslText;
}

function getHarmony(hsl) {
  // here we get the chosen harmony
  let select = document.querySelector("select");
  let selectedValue = select.options[select.selectedIndex].value;

  let hslArray;

  // switch is like if statements but in this case it makes more sense to make it with switch instead of if
  switch (selectedValue) {
    case "analogous":
      hslArray = getAnalagous(hsl);
      break;

    case "monochromatic":
      hslArray = getMonochromatic(hsl);
      break;

    case "triad":
      hslArray = getTriad(hsl);
      break;

    case "complementary":
      hslArray = getComplementary(hsl);
      break;

    case "compound":
      hslArray = getCompound(hsl);
      break;

    case "shades":
      hslArray = getShades(hsl);
      break;
  }

  // her laves et loop, så vi ikke får minusværdier.
  // Vi arbejder med en cirkel, og derfor skal vi sætte alle hsl værdier til at være indenfor 0 og 360.
  hslArray.forEach((element) => {
    if (element.h < 0) {
      element.h = element.h + 360;
    }
    if (element.h > 360) {
      element.h = element.h - 360;
    }
    if (element.l < 0) {
      element.l = element.l + 360;
    }
    if (element.l > 360) {
      element.l = element.l - 360;
    }
    if (element.s < 0) {
      element.s = element.s + 360;
    }
    if (element.s > 360) {
      element.s = element.s - 360;
    }
  });
  return hslArray;
}

function getAnalagous(hsl) {
  let hslArray = new Array(5);
  hslArray[2] = hsl;

  hslArray[0] = { h: hsl.h - 40, s: hsl.s, l: hsl.l };
  hslArray[1] = { h: hsl.h - 40, s: hsl.s, l: hsl.l };
  hslArray[3] = { h: hsl.h - 40, s: hsl.s, l: hsl.l };
  hslArray[4] = { h: hsl.h - 40, s: hsl.s, l: hsl.l };

  return hslArray;
}

function getMonochromatic(hsl) {
  let hslArray = new Array(5);
  hslArray[0] = hsl;

  hslArray[1] = { h: hsl.h, s: hsl.s, l: hsl.l + 10 };
  hslArray[2] = { h: hsl.h, s: hsl.s, l: hsl.l + 20 };
  hslArray[3] = { h: hsl.h, s: hsl.s, l: hsl.l + 30 };
  hslArray[4] = { h: hsl.h, s: hsl.s, l: hsl.l + 40 };

  return hslArray;
}

function getTriad(hsl) {
  let hslArray = new Array(5);
  hslArray[0] = hsl;

  hslArray[1] = { h: hsl.h + 60, s: hsl.s, l: hsl.l };
  hslArray[2] = { h: hsl.h + 120, s: hsl.s, l: hsl.l };

  return hslArray;
}

function getComplementary(hsl) {
  let hslArray = new Array(5);
  hslArray[0] = hsl;

  hslArray[1] = { h: hsl.h + 180, s: hsl.s, l: hsl.l };

  return hslArray;
}

function getCompound(hsl) {
  let hslArray = new Array(5);
  hslArray[0] = hsl;

  hslArray[1] = { h: hsl.h + 180, s: hsl.s, l: hsl.l };
  hslArray[2] = { h: hsl.h - 20, s: hsl.s, l: hsl.l };
  hslArray[3] = { h: hsl.h + 20, s: hsl.s, l: hsl.l };
  hslArray[4] = { h: hsl.h + 40, s: hsl.s, l: hsl.l };

  return hslArray;
}

function getShades(hsl) {
  let hslArray = new Array(5);
  hslArray[0] = hsl;

  hslArray[1] = { h: hsl.h, s: hsl.s, l: hsl.l + 20 };
  hslArray[2] = { h: hsl.h, s: hsl.s, l: hsl.l - 20 };
  hslArray[3] = { h: hsl.h, s: hsl.s, l: hsl.l + 40 };
  hslArray[4] = { h: hsl.h, s: hsl.s, l: hsl.l - 40 };

  return hslArray;
}

function getColorArray(hslArray) {
  // all hsl values are taken from colorArray to convert them to an object
  let colorArray = hslArray.map((hsl) => {
    let rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
    let hex = rgbToHex(rgb);
    return { hsl, hex, rgb };
  });
  return colorArray;
}

function hslToRgb(h, s, l) {
  h = h;
  s = s / 100;
  l = l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

function rgbToHex(rgb) {
  let hexToRed = rgb.r.toString(16).padStart(2, "0");
  let hexToGreen = rgb.g.toString(16).padStart(2, "0");
  let hexToBlue = rgb.b.toString(16).padStart(2, "0");

  return "#" + hexToRed + hexToGreen + hexToBlue;
}

function viewController(colorArray) {
  let colors = document.querySelectorAll(".colorwrapper");
  for (let i = 0; i < colors.length; i++) {
    colors[i].classList.remove("hide");
    if (colorArray[i]) {
      showColorBox(colorArray[i].hex, colors[i]);
    } else {
      hideColor(colors[i]);
    }
  }
}

function hideColor(e) {
  e.classList.add("hide");
}

function showColorBox(color, e) {
  e.querySelector(".colorbox").style.backgroundColor = color;
}
