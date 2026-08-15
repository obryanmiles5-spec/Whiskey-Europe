export interface TastingNotes {
  nose: string;
  palate: string;
  finish: string;
}

export interface FlavorProfile {
  peatedSmoky: number; // 1-10
  sherrySweet: number; // 1-10
  fruityFloral: number; // 1-10
  oakSpicy: number; // 1-10
  vanillaCaramel: number; // 1-10
}

export type CategoryType = 
  | 'Japanese'
  | 'Balvenie'
  | 'Hennessy'
  | 'Macallan'
  | 'Old and Rare'
  | 'Port Ellen'
  | 'Bourbon'
  | 'Ballantines'
  | "Ballantine's"
  | 'Scottish Whiskey';

export interface Whiskey {
  id: string;
  slug: string;
  name: string;
  distillery: string;
  region: string;
  country: string;
  category: CategoryType;
  age: number; // in years
  abv: number; // percentage
  volumeMl: number;
  type: string;
  price: number; // EUR (€)
  originalPrice?: number;
  rating: number; // e.g. 4.9
  reviewsCount: number;
  stockCount: number;
  isRare: boolean;
  isFeatured: boolean;
  badge?: string;
  image: string;
  description: string;
  tastingNotes: TastingNotes;
  caskType: string;
  flavorProfile: FlavorProfile;
  distilleryCoords: {
    lat: number;
    lng: number;
  };
  servingSuggestion: string;
  bottleNumber?: string;
  awards?: string[];
}

export const WHISKEY_COLLECTION: Whiskey[] = [
  {
    id: 'balvenie-17-sherry-oak',
    slug: 'balvenie-17-year-old-sherry-oak-70cl',
    name: 'Balvenie 17 Year Old Sherry Oak 70cl Whisky',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 17,
    abv: 43.0,
    volumeMl: 700,
    type: 'Single Malt Scotch Whisky',
    price: 1500.0,
    originalPrice: 1800.0,
    rating: 4.95,
    reviewsCount: 42,
    stockCount: 3,
    isRare: true,
    isFeatured: true,
    badge: 'Sherry Oak Edition',
    image: 'https://lh3.googleusercontent.com/d/1RMcI7Zq2kb-MVo4DpMIb9_6YmxoqXme7',
    description: 'Matured for 17 years exclusively in Oloroso sherry oak casks. Deep notes of dried fruit, nutmeg, cinnamon, and rich honeyed malt.',
    tastingNotes: {
      nose: 'Rich dried fruits, oak spice, heather honey, and dark cocoa.',
      palate: 'Nutmeg, cinnamon, toasted almond, and sweet raisin.',
      finish: 'Long, warm, and spicy with lingering sherry richness.'
    },
    caskType: 'Oloroso Sherry Oak Casks',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 9, fruityFloral: 7, oakSpicy: 8, vanillaCaramel: 8 },
    distilleryCoords: { lat: 57.456, lng: -3.128 },
    servingSuggestion: 'Served neat in a Glencairn glass.',
    awards: ['Gold Medal - International Spirits Challenge']
  },
  {
    id: 'balvenie-25-single-barrel-traditional-oak',
    slug: 'balvenie-25-year-old-single-barrel-traditional-oak-70cl',
    name: 'Balvenie 25 Year Old Single Barrel Traditional Oak 70cl Whisky',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 25,
    abv: 47.8,
    volumeMl: 700,
    type: 'Single Barrel Single Malt',
    price: 1100.0,
    originalPrice: 1400.0,
    rating: 4.92,
    reviewsCount: 28,
    stockCount: 2,
    isRare: true,
    isFeatured: true,
    badge: 'Single Barrel Cask',
    image: 'https://lh3.googleusercontent.com/d/1P0TyrIsK1krn38NdsIyB-ZwzdOzfB4Br',
    description: 'A hand-selected single barrel bottling drawn from a single traditional oak cask after 25 years of quiet maturation.',
    tastingNotes: {
      nose: 'Honeyed cereal, red apple, vanilla bean, and toasted oak.',
      palate: 'Silky caramel, candied citrus, clove, and sweet malt.',
      finish: 'Elegantly long with soft oak spice and honeycomb.'
    },
    caskType: 'Traditional Refill Oak Cask',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 6, fruityFloral: 8, oakSpicy: 7, vanillaCaramel: 9 },
    distilleryCoords: { lat: 57.456, lng: -3.128 },
    servingSuggestion: 'Neat at room temperature.'
  },
  {
    id: 'balvenie-25-triple-cask',
    slug: 'balvenie-25-year-old-triple-cask-70cl',
    name: 'Balvenie 25 Year Old Triple Cask 70cl Whisky',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 25,
    abv: 40.0,
    volumeMl: 700,
    type: 'Single Malt Scotch Whisky',
    price: 950.0,
    originalPrice: 1300.0,
    rating: 4.90,
    reviewsCount: 35,
    stockCount: 4,
    isRare: true,
    isFeatured: false,
    badge: 'Triple Cask Marriage',
    image: 'https://lh3.googleusercontent.com/d/19DtYB1v_eCm59CrKdT8O5hmSyVNqT6UH',
    description: 'Married from three distinct cask types: First-fill Bourbon, Refill Bourbon, and First-fill Oloroso Sherry casks.',
    tastingNotes: {
      nose: 'Runny honey, warm spice, dried apricots, and toasted marshmallow.',
      palate: 'Rich spice, dried fruit, dark caramel, and warming oak.',
      finish: 'Smooth, complex, and lingering.'
    },
    caskType: 'First-Fill Bourbon, Refill Bourbon & Oloroso Sherry Casks',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 8, fruityFloral: 8, oakSpicy: 7, vanillaCaramel: 9 },
    distilleryCoords: { lat: 57.456, lng: -3.128 },
    servingSuggestion: 'Neat or with a drop of spring water.'
  },
  {
    id: 'balvenie-30-pre-2021',
    slug: 'balvenie-30-year-old-pre-2021-70cl',
    name: 'Balvenie 30 Year Old - Pre 2021 70cl Whisky',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 30,
    abv: 47.3,
    volumeMl: 700,
    type: 'Single Malt Scotch Whisky',
    price: 3800.0,
    originalPrice: 4500.0,
    rating: 4.98,
    reviewsCount: 22,
    stockCount: 2,
    isRare: true,
    isFeatured: true,
    badge: 'Pre-2021 Original',
    image: 'https://lh3.googleusercontent.com/d/1x2lfYT7xv2dITD7qkqW0nCtQcgbcRryH',
    description: 'A classic vintage bottling of the iconic 30 Year Old, married from select traditional oak and sherry casks before the 2021 packaging update.',
    tastingNotes: {
      nose: 'Silky honey, dark chocolate, orange peel, and ancient oak.',
      palate: 'Plum jam, dark cocoa, honeyed malt, and delicate peat whisper.',
      finish: 'Extremely long, warm, and sophisticated.'
    },
    caskType: 'Traditional Oak & Oloroso Sherry Casks',
    flavorProfile: { peatedSmoky: 1, sherrySweet: 9, fruityFloral: 7, oakSpicy: 8, vanillaCaramel: 9 },
    distilleryCoords: { lat: 57.456, lng: -3.128 },
    servingSuggestion: 'Neat in a tulip tasting glass.'
  },
  {
    id: 'balvenie-33-1972-cask-14811',
    slug: 'balvenie-33-year-old-1972-cask-14811-70cl',
    name: 'Balvenie 33 Year Old 1972 (cask 14811) 70cl Whisky',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 33,
    abv: 44.2,
    volumeMl: 700,
    type: 'Vintage Single Cask Malt',
    price: 4200.0,
    originalPrice: 5500.0,
    rating: 4.99,
    reviewsCount: 14,
    stockCount: 1,
    isRare: true,
    isFeatured: true,
    badge: 'Vintage 1972 Single Cask',
    image: 'https://lh3.googleusercontent.com/d/1G6gszjRnGVOacrN2ArvFt7t5YNZJxr8-',
    description: 'Distilled in 1972 and bottled after 33 years from single cask #14811. A true collector holy grail expressing legendary 1970s Speyside depth.',
    tastingNotes: {
      nose: 'Rich honeycomb, dried fig, antique beeswax, and citrus peel.',
      palate: 'Candied ginger, dark cherry, toasted hazelnut, and deep oak.',
      finish: 'Interminable finish with lingering sweet wood spice.'
    },
    caskType: 'Single Refill Sherry Cask #14811',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 9, fruityFloral: 8, oakSpicy: 9, vanillaCaramel: 8 },
    distilleryCoords: { lat: 57.456, lng: -3.128 },
    servingSuggestion: 'Savor neat.'
  },
  {
    id: 'balvenie-38-1961-cask-4194',
    slug: 'balvenie-38-year-old-1961-cask-4194-vintage-cask-70cl',
    name: 'Balvenie 38 Year Old 1961 (cask 4194) - Vintage Cask 70cl Whisky',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 38,
    abv: 42.1,
    volumeMl: 700,
    type: 'Vintage Cask Malt',
    price: 5200.0,
    originalPrice: 9500.0,
    rating: 5.0,
    reviewsCount: 9,
    stockCount: 1,
    isRare: true,
    isFeatured: true,
    badge: '1961 Vintage Reserve',
    image: 'https://lh3.googleusercontent.com/d/1VhdYiX4lieLztQ31Zo-50KQBle8eq2rM',
    description: 'Distilled in 1961 and matured for 38 years in single cask #4194. An extraordinarily rare historic Speyside single malt from the David Stewart vaults.',
    tastingNotes: {
      nose: 'Antique mahogany, leather, dark marmalade, and wild honey.',
      palate: 'Dark chocolate, pipe tobacco, marzipan, and polished oak.',
      finish: 'Long, rich, resonant with ancient oak spice.'
    },
    caskType: 'Vintage Oak Cask #4194',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 9, fruityFloral: 6, oakSpicy: 10, vanillaCaramel: 7 },
    distilleryCoords: { lat: 57.456, lng: -3.128 },
    servingSuggestion: 'Neat.'
  },
  {
    id: 'balvenie-46-1968-cask-7293-dcs',
    slug: 'balvenie-46-year-old-1968-cask-7293-dcs-compendium-70cl',
    name: 'Balvenie 46 Year Old 1968 (cask 7293) - The Balvenie DCS Compendium Chapter One 70cl Whisky',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 46,
    abv: 45.9,
    volumeMl: 700,
    type: 'Ultra Rare Single Cask',
    price: 25000.0,
    originalPrice: 29000.0,
    rating: 5.0,
    reviewsCount: 6,
    stockCount: 1,
    isRare: true,
    isFeatured: true,
    badge: 'DCS Compendium Ch. 1',
    image: 'https://lh3.googleusercontent.com/d/1PzqLhvy4NRGGcreW5nI2rqVDNGOaCufx',
    description: 'Featured in Chapter One of David C. Stewart MBE’s DCS Compendium. Distilled in 1968 and aged for 46 years in single cask #7293.',
    tastingNotes: {
      nose: 'Brown sugar, toasted almonds, vanilla bean, and elegant floral notes.',
      palate: 'Rich honey sweetness, candied peel, cinnamon, and ancient oak.',
      finish: 'Warm, extraordinarily long and velvety.'
    },
    caskType: 'Refill American Oak Hogshead #7293',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 7, fruityFloral: 9, oakSpicy: 9, vanillaCaramel: 10 },
    distilleryCoords: { lat: 57.456, lng: -3.128 },
    servingSuggestion: 'Savor neat in a hand-blown crystal glass.'
  },
  {
    id: 'balvenie-50-marriage-0614',
    slug: 'balvenie-50-year-old-marriage-0614-70cl',
    name: 'Balvenie 50 Year Old - Marriage 0614 70cl Whisky',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 50,
    abv: 42.8,
    volumeMl: 700,
    type: 'Half-Century Masterpiece',
    price: 45000.0,
    originalPrice: 60000.0,
    rating: 5.0,
    reviewsCount: 4,
    stockCount: 1,
    isRare: true,
    isFeatured: true,
    badge: '50 Year Half-Century',
    image: 'https://lh3.googleusercontent.com/d/1YGhqw6xVWty9O6JpZeJ1WDGPyVa13XBl',
    description: 'Hand-selected by Malt Master David C. Stewart MBE from seven rare casks maturing for over 50 years. Presented in a bespoke handcrafted wooden casing.',
    tastingNotes: {
      nose: 'Rich dark fruits, sweet spice, cedarwood, and delicate vanilla.',
      palate: 'Velvety dark chocolate, candied ginger, honeyed malt, and old oak.',
      finish: 'Endless, transcendent finish with sweet spice and oak.'
    },
    caskType: 'Seven Aged American & European Oak Casks',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 9, fruityFloral: 8, oakSpicy: 10, vanillaCaramel: 9 },
    distilleryCoords: { lat: 57.456, lng: -3.128 },
    servingSuggestion: 'Poured neat for a pinnacle occasion.'
  },
  {
    id: 'balvenie-classic-75cl',
    slug: 'balvenie-classic-75cl-whisky',
    name: 'Balvenie Classic 75cl Whisky',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 12,
    abv: 43.0,
    volumeMl: 750,
    type: 'Vintage Classic Single Malt',
    price: 500.0,
    originalPrice: 650.0,
    rating: 4.88,
    reviewsCount: 31,
    stockCount: 4,
    isRare: true,
    isFeatured: false,
    badge: '1980s Original Classic',
    image: 'https://lh3.googleusercontent.com/d/1fal7VdvjvMSY9i8zhFb3scZoM7BprhEe',
    description: 'The original "Balvenie Classic" bottling from the 1980s, predecessor to the famed DoubleWood series. A prized vintage collector piece.',
    tastingNotes: {
      nose: 'Heather honey, malted barley, orange marmalade, and soft oak.',
      palate: 'Sweet butterscotch, red apple, gentle cinnamon, and almond.',
      finish: 'Smooth and warm with sweet honeyed oak.'
    },
    caskType: 'Cognac & Sherry Cask Finishes',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 8, fruityFloral: 7, oakSpicy: 6, vanillaCaramel: 8 },
    distilleryCoords: { lat: 57.456, lng: -3.128 },
    servingSuggestion: 'Neat.'
  },
  {
    id: 'balvenie-tun-1401-batch-2',
    slug: 'balvenie-tun-1401-batch-2-whisky-70cl',
    name: 'Balvenie Tun 1401 Batch 2 Whisky 70cl',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 21,
    abv: 50.6,
    volumeMl: 700,
    type: 'Batched Single Malt',
    price: 2000.0,
    originalPrice: 3000.0,
    rating: 4.97,
    reviewsCount: 26,
    stockCount: 2,
    isRare: true,
    isFeatured: true,
    badge: 'Tun 1401 Batch 2',
    image: 'https://lh3.googleusercontent.com/d/19hKChxoxn4isrTId5oXSy2PKEpwq2dSr',
    description: 'Composed of 10 sherry butts and American oak casks married in historic Tun 1401. One of the most legendary batched releases in Scotch history.',
    tastingNotes: {
      nose: 'Rich Oloroso sherry, dark citrus, cinnamon, and honeycomb.',
      palate: 'Dark fruits, cocoa, spiced oak, and honeyed malt.',
      finish: 'Long, warming, and rich with sherry spice.'
    },
    caskType: '10 Hand-Selected Sherry Butts & American Oak Casks',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 10, fruityFloral: 6, oakSpicy: 8, vanillaCaramel: 8 },
    distilleryCoords: { lat: 57.456, lng: -3.128 },
    servingSuggestion: 'Neat with time in the glass.'
  },
  {
    id: 'balvenie-tun-1858-batch-7',
    slug: 'balvenie-tun-1858-batch-7-70cl',
    name: 'Balvenie Tun 1858 - Batch 7 70cl Whisky',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 21,
    abv: 48.9,
    volumeMl: 700,
    type: 'Prestige Batched Malt',
    price: 1250.0,
    originalPrice: 1600.0,
    rating: 4.93,
    reviewsCount: 19,
    stockCount: 3,
    isRare: true,
    isFeatured: false,
    badge: 'Tun 1858 Batch 7',
    image: 'https://lh3.googleusercontent.com/d/1IVSXF6H0q8U5XiUzDy6tWD5luaYWP8NT',
    description: 'Selected by Malt Master David C. Stewart MBE from 3 European oak sherry butts and 6 American oak casks, married in Tun 1858.',
    tastingNotes: {
      nose: 'Rich dried fruit, vanilla bean, toasted nut, and sweet oak.',
      palate: 'Cinnamon toast, dark raisins, honeycomb, and ginger.',
      finish: 'Smooth, elegant, and persistent.'
    },
    caskType: 'European Sherry Butts & American Oak Casks',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 9, fruityFloral: 7, oakSpicy: 7, vanillaCaramel: 9 },
    distilleryCoords: { lat: 57.456, lng: -3.128 },
    servingSuggestion: 'Neat.'
  },
  {
    id: 'balvenie-tun-1858-70cl',
    slug: 'balvenie-tun-1858-70cl-whisky',
    name: 'Balvenie Tun 1858 70cl Whisky',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 21,
    abv: 50.4,
    volumeMl: 700,
    type: 'Prestige Batched Malt',
    price: 2800.0,
    originalPrice: 3300.0,
    rating: 4.96,
    reviewsCount: 17,
    stockCount: 1,
    isRare: true,
    isFeatured: true,
    badge: 'Tun 1858 Original',
    image: 'https://lh3.googleusercontent.com/d/1DVKW_1WldSrZJWh0fSEexFJqid9Uclz7',
    description: 'The inaugural batch married in Tun 1858 at The Balvenie distillery, bringing together decades of sherry and bourbon wood character.',
    tastingNotes: {
      nose: 'Deep Oloroso notes, candied orange, dark chocolate, and heather.',
      palate: 'Plum pudding, nutmeg, vanilla cream, and toasted oak.',
      finish: 'Rich, warming, long finish.'
    },
    caskType: 'Sherry Butts & Refill Bourbon Barrels',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 10, fruityFloral: 6, oakSpicy: 8, vanillaCaramel: 8 },
    distilleryCoords: { lat: 57.456, lng: -3.128 },
    servingSuggestion: 'Neat.'
  },
  {
    id: 'the-balvenie-40-year-old',
    slug: 'the-balvenie-40-year-old-70cl',
    name: 'The Balvenie 40 Year Old 70cl Whisky',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 40,
    abv: 48.5,
    volumeMl: 700,
    type: 'Prestige Single Malt',
    price: 7500.0,
    originalPrice: 9000.0,
    rating: 4.99,
    reviewsCount: 18,
    stockCount: 1,
    isRare: true,
    isFeatured: true,
    badge: '40 Year Allocation',
    image: 'https://lh3.googleusercontent.com/d/1eFDaS9dSR_G_euJUXZdxI_y0Vvd7WrK-',
    description: 'Matured for four decades in small-batch traditional oak and European sherry casks. A masterpiece of balance and depth.',
    tastingNotes: {
      nose: 'Rich oak, honey, orange peel, leather, and dark fruits.',
      palate: 'Intense ginger spice, dark cocoa, honeyed oats, and marmalade.',
      finish: 'Exceptionally long, rich, and warming.'
    },
    caskType: 'Traditional Oak & European Sherry Casks',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 9, fruityFloral: 7, oakSpicy: 9, vanillaCaramel: 9 },
    distilleryCoords: { lat: 57.456, lng: -3.128 },
    servingSuggestion: 'Neat.'
  },
  {
    id: 'the-balvenie-fifty-collection-release-1',
    slug: 'the-balvenie-fifty-collection-release-1-70cl',
    name: 'The Balvenie Fifty Collection (Release 1) 70cl Whisky',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 50,
    abv: 42.3,
    volumeMl: 700,
    type: '50 Year Collector Edition',
    price: 53000.0,
    originalPrice: 60000.0,
    rating: 5.0,
    reviewsCount: 3,
    stockCount: 1,
    isRare: true,
    isFeatured: true,
    badge: 'Fifty Collection Rel. 1',
    image: 'https://lh3.googleusercontent.com/d/1zDKXZyFGO_GPN8KuEuJ-mDAdouquOK-b',
    description: 'Release 1 of the magnificent Balvenie Fifty Collection. Drawn from cask filled in 1973 by Malt Master David C. Stewart MBE. Housed in bespoke gold and oak helix presentation.',
    tastingNotes: {
      nose: 'Deep caramelized fruits, ancient oak, candied orange, and honeyed spice.',
      palate: 'Rich velvet cocoa, nutmeg, dark raisins, and subtle peat smoke.',
      finish: 'Endless elegance and profound depth.'
    },
    caskType: 'European Oak Refill Butt Filled 1973',
    flavorProfile: { peatedSmoky: 1, sherrySweet: 9, fruityFloral: 8, oakSpicy: 10, vanillaCaramel: 8 },
    distilleryCoords: { lat: 57.456, lng: -3.128 },
    servingSuggestion: 'Neat.'
  },
  {
    id: 'balvenie-30-year-old',
    slug: 'balvenie-30-year-old-70cl',
    name: 'Balvenie 30 Year Old 70cl Whisky',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 30,
    abv: 47.3,
    volumeMl: 700,
    type: 'Single Malt Scotch Whisky',
    price: 3800.0,
    originalPrice: 4200.0,
    rating: 4.97,
    reviewsCount: 29,
    stockCount: 2,
    isRare: true,
    isFeatured: true,
    badge: '30 Year Old Release',
    image: 'https://lh3.googleusercontent.com/d/1zcZ-lKSsSgVc-dHguYySo3IH63PCQeAB',
    description: 'A rare and especially fine single malt for which Malt Master David C. Stewart MBE selects only exceptional casks matured for at least 30 years.',
    tastingNotes: {
      nose: 'Silky smooth and honeyed on the nose with mellow oaky tones and hints of candied orange peel.',
      palate: 'Great depth with rich dark chocolate, hints of plum, marzipan, and caramelized pear.',
      finish: 'Exceptionally long and warming with lingering sweetness and gentle spice.'
    },
    caskType: 'Traditional Oak & European Oloroso Sherry Casks',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 9, fruityFloral: 8, oakSpicy: 8, vanillaCaramel: 9 },
    distilleryCoords: { lat: 57.456, lng: -3.128 },
    servingSuggestion: 'Neat in a Glencairn tasting glass.'
  },
  {
    id: 'hennessy-paradis-70cl',
    slug: 'hennessy-paradis-70cl',
    name: 'Hennessy Paradis 70cl Cognac',
    distillery: 'Maison Hennessy',
    region: 'Cognac',
    country: 'France',
    category: 'Hennessy',
    age: 30,
    abv: 40.0,
    volumeMl: 700,
    type: 'Prestige Rare Cognac',
    price: 1150.0,
    originalPrice: 1300.0,
    rating: 4.98,
    reviewsCount: 38,
    stockCount: 4,
    isRare: true,
    isFeatured: true,
    badge: 'Paradis Reserve',
    image: 'https://lh3.googleusercontent.com/d/1zrKwlkJYzhAybtl6mr99gP2y4fr1r5fk',
    description: 'Created in 1979 by Maurice Fillioux, Hennessy Paradis is blended from hundreds of rare and supple eaux-de-vie aged in ancient oak casks within the Founder’s Cellar.',
    tastingNotes: {
      nose: 'Rich floral aromas of dried rose petal, honeysuckle, warm truffle, and subtle cinnamon.',
      palate: 'Silky and harmonious with candied fruits, crystallized orange peel, dried apricot, and refined rancio.',
      finish: 'Exceptionally delicate, persistent, and lingering with honeyed floral warmth.'
    },
    caskType: 'French Limousin Oak Casks (Founder’s Cellar)',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 8, fruityFloral: 10, oakSpicy: 7, vanillaCaramel: 9 },
    distilleryCoords: { lat: 45.696, lng: -0.329 },
    servingSuggestion: 'Neat at room temperature in a tulip snifter glass.'
  },
  {
    id: 'hennessy-paradis-magnum-150cl',
    slug: 'hennessy-paradis-magnum-150cl',
    name: 'Hennessy Paradis Magnum 150cl Cognac',
    distillery: 'Maison Hennessy',
    region: 'Cognac',
    country: 'France',
    category: 'Hennessy',
    age: 30,
    abv: 40.0,
    volumeMl: 1500,
    type: 'Prestige Rare Cognac Magnum',
    price: 3100.0,
    originalPrice: 3500.0,
    rating: 4.99,
    reviewsCount: 16,
    stockCount: 2,
    isRare: true,
    isFeatured: true,
    badge: '1.5L Collector Magnum',
    image: 'https://lh3.googleusercontent.com/d/1cGw8SMUz5K6ObZmBXfk3GVLcZnnBmiUV',
    description: 'The iconic Hennessy Paradis presented in an imposing 1.5-litre collector magnum decanter. A masterpiece blend of historical eaux-de-vie selected across generations of master blenders.',
    tastingNotes: {
      nose: 'Layered nuances of candied orange, sweet spice, dried blossoms, and antique cedar.',
      palate: 'Voluptuous, velvety texture revealing cardamom, dark honey, dried plum, and toasted brioche.',
      finish: 'Endless silky finish with soft wood tannins and sublime aromatic resonance.'
    },
    caskType: 'Centenary Limousin Oak Casks',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 9, fruityFloral: 10, oakSpicy: 7, vanillaCaramel: 9 },
    distilleryCoords: { lat: 45.696, lng: -0.329 },
    servingSuggestion: 'Neat in a crystal tulip glass.'
  },
  {
    id: 'hennessy-xo-magnum-150cl',
    slug: 'hennessy-xo-magnum-150cl',
    name: 'Hennessy XO Magnum 150cl Cognac',
    distillery: 'Maison Hennessy',
    region: 'Cognac',
    country: 'France',
    category: 'Hennessy',
    age: 12,
    abv: 40.0,
    volumeMl: 1500,
    type: 'Extra Old Cognac Magnum',
    price: 510.0,
    originalPrice: 550.0,
    rating: 4.92,
    reviewsCount: 45,
    stockCount: 6,
    isRare: false,
    isFeatured: true,
    badge: '1.5L XO Magnum',
    image: 'https://lh3.googleusercontent.com/d/1RLiehcy9r15fF1t7WQOUJFlcQnGxhKv1',
    description: 'Created by Maurice Hennessy in 1870 for his inner circle of friends, Hennessy X.O is the original Extra Old cognac, presented here in an impressive 150cl magnum.',
    tastingNotes: {
      nose: 'Candied fruit, wild cocoa, cracked black pepper, and toasted oak.',
      palate: 'Robust and multi-dimensional with dried fig, dark chocolate, cinnamon, and warm clove.',
      finish: 'Long, structured finish with spicy warmth and dark caramel accents.'
    },
    caskType: 'Young & Mature French Oak Casks',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 7, fruityFloral: 7, oakSpicy: 9, vanillaCaramel: 8 },
    distilleryCoords: { lat: 45.696, lng: -0.329 },
    servingSuggestion: 'Neat, with a drop of spring water, or over a large crystal ice sphere.'
  },
  {
    id: 'hennessy-xxo-1l-100cl',
    slug: 'hennessy-xxo-1l-100cl',
    name: 'Hennessy XXO (1L) 100cl Cognac',
    distillery: 'Maison Hennessy',
    region: 'Cognac',
    country: 'France',
    category: 'Hennessy',
    age: 14,
    abv: 43.0,
    volumeMl: 1000,
    type: 'Hors d’Âge / XXO Cognac',
    price: 590.0,
    originalPrice: 650.0,
    rating: 4.95,
    reviewsCount: 22,
    stockCount: 3,
    isRare: true,
    isFeatured: true,
    badge: 'XXO 1-Litre Edition',
    image: 'https://lh3.googleusercontent.com/d/14zfzUqoGJiVIKDBdx7SdI6fjC8awUphf',
    description: 'First crafted in 1872 and reintroduced with modern mastery, Hennessy XXO (Hors d’Âge) offers an extraordinarily complex profile crafted from eaux-de-vie with immense aging potential.',
    tastingNotes: {
      nose: 'Intense bitter orange peel, grated nutmeg, dried peppermint leaf, and licorice.',
      palate: 'Richly textured with dried apricot, dark clove, sweet cedar, and roasted nuts.',
      finish: 'Remarkably persistent and aerial, leaving a lingering trail of delicate spices.'
    },
    caskType: 'Select Seasoned French Oak Casks',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 8, fruityFloral: 8, oakSpicy: 9, vanillaCaramel: 8 },
    distilleryCoords: { lat: 45.696, lng: -0.329 },
    servingSuggestion: 'Served neat in a stemmed cognac glass.'
  }
];

export interface BlogArticle {
  slug: string;
  title: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
  thumbnail: string;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'guide-to-investing-in-rare-islay-malts-2026',
    title: 'Guide to Investing in Rare Islay Single Malts & Japanese Whiskies (2026 Edition)',
    date: 'August 2, 2026',
    author: 'Alistair Campbell, Senior Spirits Curator',
    readTime: '6 min read',
    category: 'Market & Collector Trends',
    excerpt: 'Why Hakushu 18, Port Ellen ghost distillery bottles, and old sherry-cask Macallans are outperforming traditional luxury assets across the European market.',
    thumbnail: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=800',
    content: [
      'Over the past decade, rare single malt scotch and Japanese whisky have evolved from a connoisseur passion into one of the most resilient alternative physical assets in Europe. Particular focus has shifted toward vintage Islay distilleries like Port Ellen and Macallan.',
      'Factors driving value include cask provenance, bottle scarcity, natural cask strength bottlings, and original presentation boxes with verified certificates of authenticity.',
      'When acquiring bottles for collection, ensure temperature-controlled storage and pristine label conditions. Every allocation offered on Whiskey Europe undergoes provenance verification before entering our cellars.'
    ]
  },
  {
    slug: 'uncorking-continental-europe-nordic-and-french-whiskies',
    title: 'Uncorking Japanese & European Craft: Hakushu, Hennessy & Beyond',
    date: 'July 24, 2026',
    author: 'Elena Rostova, Spirits Journalist',
    readTime: '5 min read',
    category: 'Distillery Spotlight',
    excerpt: 'From Japanese Mizunara oak maturation in Yamanashi to rare Hennessy Paradis and Balvenie PortWood finishes, explore the world’s most coveted spirits.',
    thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    content: [
      'While Scotland and Ireland boast centuries of whisky lineage, Japanese distilleries like Hakushu have set new global benchmarks for subtlety.',
      'In Japan, Mizunara oak gives unique sandalwood notes. In Cognac, France, Hennessy ages century-old eaux-de-vie in limousin oak.',
      'Discover why collectors across Berlin, Paris, London, and Tokyo are actively securing limited allocations.'
    ]
  },
  {
    slug: 'decoding-tasting-notes-peat-sherry-and-oak',
    title: 'Decoding Tasting Notes: Peat, Sherry Butts, and Wheated Bourbon',
    date: 'July 15, 2026',
    author: 'Markus Lindner, Master Blender & Judge',
    readTime: '4 min read',
    category: 'Tasting Masterclass',
    excerpt: 'Learn how to dissect nose, palate, and finish like a professional whisky judge using our 5-axis sensory flavor wheel.',
    thumbnail: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    content: [
      'Understanding a whiskey begins long before it touches your palate. The color, leg structure, and aroma (nose) reveal cask history.',
      'Oloroso sherry casks impart dark fruit, raisin, and nutmeg, while American ex-bourbon barrels deliver sweet vanilla, coconut, and butterscotch.',
      'In this masterclass guide, we demonstrate how to add 2 to 3 drops of pure spring water to unlock trapped aromatics in cask strength bottles.'
    ]
  },
  {
    slug: 'understanding-eu-alcohol-import-regulations-and-shipping',
    title: 'Understanding EU Alcohol Import Regulations & Tax Compliance',
    date: 'June 28, 2026',
    author: 'Jean-Luc Dubois, Logistics Director',
    readTime: '4 min read',
    category: 'Shipping & Compliance',
    excerpt: 'How Whiskey Europe guarantees seamless door-to-door insured delivery across all 27 EU member states with pre-paid excise duties and zero customs delays.',
    thumbnail: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800',
    content: [
      'Shipping high-value spirits across European borders requires strict adherence to EU excise duty directives and age verification protocols.',
      'At Whiskey Europe, all shipments are dispatched from our central bonded warehouse in Western Europe, pre-cleared for local VAT and excise duties.',
      'Every order is packaged in shock-absorbing climate-insulated timber or recycled pulp casing with live GPS tracking.'
    ]
  }
];
