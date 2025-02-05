/**
 * Generates a vibrant HSL color.
 * - Hue: Random between 0-360°
 * - Saturation: 70-90% (for vibrancy)
 * - Lightness: 50-65% (for balanced brightness)
 * @returns HSL color object
 */
const generateVibrantHSL = () => {
  const hue = Math.floor(Math.random() * 360); // Random hue
  const saturation = Math.floor(Math.random() * 20) + 70; // 70% - 90%
  const lightness = Math.floor(Math.random() * 15) + 50; // 50% - 65%
  return { hue, saturation, lightness };
};

/**
 * Generates the complementary color by shifting the hue by 180°.
 * @param hue The original hue
 * @returns Complementary hue
 */
const getComplementaryHue = (hue: number): number => (hue + 180) % 360;

/**
 * Converts HSL to HEX format.
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param l Lightness (0-100)
 * @returns HEX color code
 */
const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let [r, g, b] = [0, 0, 0];

  if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
  else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
  else if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
  else if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
  else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
  else if (h >= 300 && h < 360) [r, g, b] = [c, 0, x];

  // Convert RGB to HEX
  const toHex = (n: number) =>
    Math.round((n + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Generates vibrant complementary color pairs.
 * @returns An object containing the original and its complementary color in HEX
 */
export const generateComplementaryColors = () => {
  const { hue, saturation, lightness } = generateVibrantHSL();
  const complementaryHue = getComplementaryHue(hue);

  return hslToHex(complementaryHue, saturation, lightness);
};

// Example usage
