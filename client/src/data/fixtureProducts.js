// client/src/data/fixtureProducts.js
// Static product catalog for portfolio / offline mode — replaces the /api/products
// endpoint so the site renders without a running Mongo + Express backend.
// Shape matches the existing Product schema fields the UI reads.

const FIXTURE_PRODUCTS = [
  {
    _id: 'p-g1',
    name: 'Sundown Green',
    image: '/images/G1.jpg',
    brand: 'Just Juice',
    category: 'greens',
    description:
      'A balanced green built to taste like nothing else on your shelf. Kale and cucumber for the body, green apple for the lift, ginger and lemon to wake it up.',
    rating: 4.8,
    numberOfReviews: 124,
    price: '9.00',
    stock: 18,
    productIsNew: true,
    reviews: [
      { name: 'Mara P.', rating: 5, comment: 'Honestly the only green juice I look forward to drinking. Worth the price.' },
      { name: 'Jonas K.', rating: 5, comment: 'Bright, balanced, not too sweet. I get it every Tuesday now.' },
      { name: 'Riya T.',  rating: 4, comment: 'Lovely, though I wish the ginger were a touch stronger.' },
    ],
  },
  {
    _id: 'p-g2',
    name: 'Garden No. 7',
    image: '/images/G2.jpg',
    brand: 'Just Juice',
    category: 'greens',
    description:
      'Greener than green. Heavier on the leafy notes, almost herbal. Best with breakfast, especially on the mornings you owe yourself a do-over.',
    rating: 4.6,
    numberOfReviews: 81,
    price: '10.00',
    stock: 12,
    productIsNew: false,
    reviews: [
      { name: 'Andre L.', rating: 5, comment: 'Tastes like a salad in the best way possible.' },
      { name: 'Hana O.',  rating: 4, comment: 'Earthier than I expected — grew on me by the second bottle.' },
    ],
  },
  {
    _id: 'p-r1',
    name: 'Beet Forward',
    image: '/images/R1.jpg',
    brand: 'Just Juice',
    category: 'reds',
    description:
      'Earthy, root-forward, gently sweet. Beet and carrot do most of the talking, with apple and pomegranate keeping things grounded.',
    rating: 4.7,
    numberOfReviews: 96,
    price: '9.00',
    stock: 14,
    productIsNew: false,
    reviews: [
      { name: 'Diego R.', rating: 5, comment: 'I never thought I liked beet juice. I do now.' },
      { name: 'Sasha B.', rating: 5, comment: 'Deep, sweet, satisfying. Pairs surprisingly well with eggs.' },
    ],
  },
  {
    _id: 'p-r2',
    name: 'Rooted Beet',
    image: '/images/R2.jpg',
    brand: 'Just Juice',
    category: 'reds',
    description:
      'The deeper cut. More beet, less apple, a whisper of ginger. For people who like things that taste like they came out of the ground that morning.',
    rating: 4.5,
    numberOfReviews: 47,
    price: '9.00',
    stock: 0,
    productIsNew: false,
    reviews: [
      { name: 'Theo M.', rating: 5, comment: 'Intense and gorgeous. Not a sipping juice — drink it like an espresso.' },
    ],
  },
  {
    _id: 'p-c1',
    name: 'Citrus No. 3',
    image: '/images/C1.jpg',
    brand: 'Just Juice',
    category: 'citrus',
    description:
      'A glass of sunrise, pressed into 16 ounces. Orange and grapefruit do the heavy lifting; ginger and turmeric finish bright.',
    rating: 4.9,
    numberOfReviews: 203,
    price: '9.00',
    stock: 22,
    productIsNew: true,
    reviews: [
      { name: 'Priya N.', rating: 5, comment: 'I drink this on cold mornings and pretend I am somewhere warmer.' },
      { name: 'Ben H.',   rating: 5, comment: 'The best citrus juice I have had outside of someone’s nonna’s house in Sicily.' },
      { name: 'Wren A.',  rating: 5, comment: 'Bright. Sharp. Awake.' },
    ],
  },
  {
    _id: 'p-c2',
    name: 'Grove Sun',
    image: '/images/C2.jpg',
    brand: 'Just Juice',
    category: 'citrus',
    description:
      'Quieter than No. 3 — more orange, less bite. The one to start someone on if they say they "don’t really like juice."',
    rating: 4.7,
    numberOfReviews: 64,
    price: '9.00',
    stock: 9,
    productIsNew: false,
    reviews: [
      { name: 'Cara F.', rating: 5, comment: 'Smooth, mild, perfect for a hangover.' },
    ],
  },
  {
    _id: 'p-b1',
    name: 'Wild Berry',
    image: '/images/B1.jpg',
    brand: 'Just Juice',
    category: 'berries',
    description:
      'Picked at the wild edge of the orchard, pressed the same morning. Deep, dark, almost wine-like.',
    rating: 4.8,
    numberOfReviews: 138,
    price: '9.00',
    stock: 16,
    productIsNew: false,
    reviews: [
      { name: 'Lena V.', rating: 5, comment: 'Tastes like the best smoothie I never made.' },
      { name: 'Omar S.', rating: 5, comment: 'Rich and very berry-forward. Worth every penny.' },
    ],
  },
  {
    _id: 'p-b2',
    name: 'Bramble',
    image: '/images/B2.jpg',
    brand: 'Just Juice',
    category: 'berries',
    description:
      'Blackberry-led, a little tart, a little wild. Lower sugar than Wild Berry — for the afternoon, not the morning.',
    rating: 4.6,
    numberOfReviews: 52,
    price: '9.00',
    stock: 11,
    productIsNew: true,
    reviews: [
      { name: 'Iris D.',  rating: 5, comment: 'Tart in exactly the right way.' },
      { name: 'Pablo T.', rating: 4, comment: 'A solid afternoon pick-me-up.' },
    ],
  },
];

export default FIXTURE_PRODUCTS;
