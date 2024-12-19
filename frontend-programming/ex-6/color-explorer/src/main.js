function hexToHSL(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function HSLToHex(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c/2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
}

function generateVariations(baseColor) {
  const hsl = hexToHSL(baseColor);
  const variations = [];

  // Generate lighter variations
  for (let i = 1; i <= 3; i++) {
    variations.push(HSLToHex(
      hsl.h,
      hsl.s,
      Math.min(hsl.l + (i * 10), 100)
    ));
  }

  // Generate darker variations
  for (let i = 1; i <= 3; i++) {
    variations.push(HSLToHex(
      hsl.h,
      hsl.s,
      Math.max(hsl.l - (i * 10), 0)
    ));
  }

  return variations;
}

function updateColors(color, opacity) {
  document.documentElement.style.setProperty('--primary-color', color);
  
  const variations = generateVariations(color);
  document.documentElement.style.setProperty('--primary-light', variations[0]);
  document.documentElement.style.setProperty('--primary-dark', variations[5]);

  const variationsContainer = document.getElementById('variations-container');
  variationsContainer.innerHTML = '';

  variations.forEach((variation, index) => {
    const swatch = document.createElement('div');
    swatch.className = 'variation-swatch';
    swatch.style.backgroundColor = variation;
    swatch.style.opacity = opacity / 100;
    swatch.title = variation;
    variationsContainer.appendChild(swatch);
  });
}

// Event Listeners
document.getElementById('mainColor').addEventListener('input', (e) => {
  updateColors(e.target.value, document.getElementById('opacity').value);
});

document.getElementById('opacity').addEventListener('input', (e) => {
  const opacity = e.target.value;
  document.getElementById('opacity-value').textContent = `${opacity}%`;
  updateColors(document.getElementById('mainColor').value, opacity);
});

// Initial color update
updateColors('#4a90e2', 100);