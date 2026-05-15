// client/src/data/productMockData.js
// Mock ingredient + nutrition data by category. Looked up at render-time from a product's
// `category` field. Real schema migration can replace this later (spec §9).

const MOCKS_BY_CATEGORY = {
  greens: {
    subtitle: 'Six ingredients. No shortcuts.',
    volume: '16 oz',
    ingredients: [
      { name: 'Kale',        percentage: 32, swatch: 'linear-gradient(180deg,#a3b58a,#3f5d2c)' },
      { name: 'Green Apple', percentage: 26, swatch: 'linear-gradient(180deg,#bbf7d0,#16a34a)' },
      { name: 'Cucumber',    percentage: 22, swatch: 'linear-gradient(180deg,#d9f99d,#65a30d)' },
      { name: 'Ginger',      percentage: 10, swatch: 'linear-gradient(180deg,#fde68a,#b45309)' },
      { name: 'Lemon',       percentage:  7, swatch: 'linear-gradient(180deg,#fef08a,#eab308)' },
      { name: 'Mint',        percentage:  3, swatch: 'linear-gradient(180deg,#86efac,#16a34a)' },
    ],
    nutrition: {
      calories:    { label: 'Calories',    value: 220,   max: 800, unit: '' },
      sugar:       { label: 'Sugar',       value: 24,    max: 40,  unit: 'g' },
      vitaminC:    { label: 'Vitamin C',   value: 182,   max: 200, unit: '%' },
      vitaminA:    { label: 'Vitamin A',   value: 120,   max: 200, unit: '%' },
      iron:        { label: 'Iron',        value: 8,     max: 100, unit: '%' },
      potassium:   { label: 'Potassium',   value: 920,   max: 2000, unit: 'mg' },
    },
    panel: [
      ['Total fat',     '0g'],
      ['Sodium',        '45mg'],
      ['Total carbs',   '52g'],
      ['Dietary fiber', '4g'],
      ['Protein',       '3g'],
    ],
    story: '"Most green juices taste like someone lost a bet. This one tastes like a Tuesday afternoon."',
  },
  reds: {
    subtitle: 'Earthy, root-forward, gently sweet.',
    volume: '16 oz',
    ingredients: [
      { name: 'Beet',        percentage: 34, swatch: 'linear-gradient(180deg,#fda4af,#9f1239)' },
      { name: 'Carrot',      percentage: 24, swatch: 'linear-gradient(180deg,#fdba74,#c2410c)' },
      { name: 'Apple',       percentage: 20, swatch: 'linear-gradient(180deg,#fecaca,#dc2626)' },
      { name: 'Lemon',       percentage: 12, swatch: 'linear-gradient(180deg,#fef08a,#eab308)' },
      { name: 'Ginger',      percentage:  8, swatch: 'linear-gradient(180deg,#fde68a,#b45309)' },
      { name: 'Pomegranate', percentage:  2, swatch: 'linear-gradient(180deg,#fca5a5,#991b1b)' },
    ],
    nutrition: {
      calories:    { label: 'Calories',    value: 240,   max: 800, unit: '' },
      sugar:       { label: 'Sugar',       value: 30,    max: 40,  unit: 'g' },
      vitaminC:    { label: 'Vitamin C',   value: 90,    max: 200, unit: '%' },
      vitaminA:    { label: 'Vitamin A',   value: 180,   max: 200, unit: '%' },
      iron:        { label: 'Iron',        value: 14,    max: 100, unit: '%' },
      potassium:   { label: 'Potassium',   value: 850,   max: 2000, unit: 'mg' },
    },
    panel: [
      ['Total fat',     '0.5g'],
      ['Sodium',        '85mg'],
      ['Total carbs',   '56g'],
      ['Dietary fiber', '5g'],
      ['Protein',       '3g'],
    ],
    story: '"Beets are an acquired taste. We acquired it for you."',
  },
  citrus: {
    subtitle: 'Bright, sharp, made for mornings.',
    volume: '16 oz',
    ingredients: [
      { name: 'Orange',     percentage: 42, swatch: 'linear-gradient(180deg,#fdba74,#ea580c)' },
      { name: 'Grapefruit', percentage: 24, swatch: 'linear-gradient(180deg,#fda4af,#e11d48)' },
      { name: 'Lemon',      percentage: 16, swatch: 'linear-gradient(180deg,#fef08a,#eab308)' },
      { name: 'Apple',      percentage: 12, swatch: 'linear-gradient(180deg,#fecaca,#dc2626)' },
      { name: 'Ginger',     percentage:  4, swatch: 'linear-gradient(180deg,#fde68a,#b45309)' },
      { name: 'Turmeric',   percentage:  2, swatch: 'linear-gradient(180deg,#fde047,#a16207)' },
    ],
    nutrition: {
      calories:    { label: 'Calories',    value: 200,   max: 800, unit: '' },
      sugar:       { label: 'Sugar',       value: 28,    max: 40,  unit: 'g' },
      vitaminC:    { label: 'Vitamin C',   value: 220,   max: 200, unit: '%' },
      vitaminA:    { label: 'Vitamin A',   value: 60,    max: 200, unit: '%' },
      iron:        { label: 'Iron',        value: 4,     max: 100, unit: '%' },
      potassium:   { label: 'Potassium',   value: 580,   max: 2000, unit: 'mg' },
    },
    panel: [
      ['Total fat',     '0g'],
      ['Sodium',        '20mg'],
      ['Total carbs',   '48g'],
      ['Dietary fiber', '2g'],
      ['Protein',       '2g'],
    ],
    story: '"A glass of sunrise, pressed into 16 ounces."',
  },
  berries: {
    subtitle: 'Wild, deep, almost wine-like.',
    volume: '16 oz',
    ingredients: [
      { name: 'Blueberry',   percentage: 32, swatch: 'linear-gradient(180deg,#c4b5fd,#5b21b6)' },
      { name: 'Blackberry',  percentage: 22, swatch: 'linear-gradient(180deg,#a5b4fc,#3730a3)' },
      { name: 'Raspberry',   percentage: 18, swatch: 'linear-gradient(180deg,#fda4af,#9f1239)' },
      { name: 'Apple',       percentage: 16, swatch: 'linear-gradient(180deg,#fecaca,#dc2626)' },
      { name: 'Pomegranate', percentage:  8, swatch: 'linear-gradient(180deg,#fca5a5,#991b1b)' },
      { name: 'Lemon',       percentage:  4, swatch: 'linear-gradient(180deg,#fef08a,#eab308)' },
    ],
    nutrition: {
      calories:    { label: 'Calories',    value: 210,   max: 800, unit: '' },
      sugar:       { label: 'Sugar',       value: 26,    max: 40,  unit: 'g' },
      vitaminC:    { label: 'Vitamin C',   value: 140,   max: 200, unit: '%' },
      vitaminA:    { label: 'Vitamin A',   value: 30,    max: 200, unit: '%' },
      iron:        { label: 'Iron',        value: 10,    max: 100, unit: '%' },
      potassium:   { label: 'Potassium',   value: 620,   max: 2000, unit: 'mg' },
    },
    panel: [
      ['Total fat',     '0.5g'],
      ['Sodium',        '15mg'],
      ['Total carbs',   '50g'],
      ['Dietary fiber', '6g'],
      ['Protein',       '2g'],
    ],
    story: '"Picked at the wild edge of the orchard. Pressed the same morning."',
  },
};

const DEFAULT_MOCK = MOCKS_BY_CATEGORY.greens;

// Normalize the product's category — DB values may be capitalized or contain extra words.
const normalizeCategory = (cat = '') => {
  const lower = cat.toLowerCase();
  if (lower.includes('green')) return 'greens';
  if (lower.includes('red') || lower.includes('beet')) return 'reds';
  if (lower.includes('citrus') || lower.includes('orange')) return 'citrus';
  if (lower.includes('berry') || lower.includes('berries')) return 'berries';
  return 'greens';
};

export const getMockData = (product) => {
  if (!product) return DEFAULT_MOCK;
  const key = normalizeCategory(product.category);
  return MOCKS_BY_CATEGORY[key] || DEFAULT_MOCK;
};

export const CATEGORIES = [
  { key: 'all',     label: 'All' },
  { key: 'greens',  label: 'Greens' },
  { key: 'reds',    label: 'Reds' },
  { key: 'citrus',  label: 'Citrus' },
  { key: 'berries', label: 'Berries' },
];

export default MOCKS_BY_CATEGORY;
