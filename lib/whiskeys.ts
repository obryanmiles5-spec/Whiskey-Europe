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
  | 'Bourbon';

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
  // 1. JAPANESE
  {
    id: 'w-jap-1',
    slug: 'hibiki-21-year-old-japanese-harmony',
    name: 'Hibiki 21 Year Old Japanese Harmony Special Release',
    distillery: 'Suntory Yamazaki & Hakushu',
    region: 'Kyoto / Yamanashi',
    country: 'Japan',
    category: 'Japanese',
    age: 21,
    abv: 43.0,
    volumeMl: 700,
    type: 'Japanese Blended Malt',
    price: 480.0,
    originalPrice: 520.0,
    rating: 4.99,
    reviewsCount: 189,
    stockCount: 3,
    isRare: true,
    isFeatured: true,
    badge: 'Japanese Icon',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=800',
    description: 'A masterpiece of Japanese blending art. Aged rare malts and grain whiskies matured in Mizunara Japanese oak, sherry casks, and ex-bourbon barrels.',
    tastingNotes: {
      nose: 'Sweet dried fruits, caramelized orange peel, sandalwood, and fragrant Mizunara oak incense.',
      palate: 'Silky smooth with honeycomb, dark cherry, spiced plum, and subtle green tea notes.',
      finish: 'Extremely long, elegant finish with subtle incense, spice, and Japanese oak.'
    },
    caskType: 'Rare Mizunara Japanese Oak, Sherry Butts & American White Oak',
    flavorProfile: { peatedSmoky: 1, sherrySweet: 9, fruityFloral: 10, oakSpicy: 8, vanillaCaramel: 9 },
    distilleryCoords: { lat: 34.892, lng: 135.673 },
    servingSuggestion: 'Neat in a handcrafted Japanese crystal glass.',
    awards: ['World’s Best Blended Whisky - World Whiskies Awards']
  },
  {
    id: 'w-jap-2',
    slug: 'yamazaki-18-year-old-single-malt',
    name: 'Yamazaki 18 Year Old Single Malt',
    distillery: 'Yamazaki Distillery',
    region: 'Kyoto',
    country: 'Japan',
    category: 'Japanese',
    age: 18,
    abv: 43.0,
    volumeMl: 700,
    type: 'Japanese Single Malt',
    price: 490.0,
    rating: 4.97,
    reviewsCount: 210,
    stockCount: 2,
    isRare: true,
    isFeatured: true,
    badge: 'Mizunara Cask',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&q=80&w=800',
    description: 'Japan’s premier single malt. Deep amber colour from long maturation in Spanish sherry oak and rare Mizunara oak casks.',
    tastingNotes: {
      nose: 'Raisin, apricot, cafe au lait, and Mizunara oak spice.',
      palate: 'Blackberry, strawberry jam, dark chocolate, and cedar wood.',
      finish: 'Long, spicy, and sweet with lingering dried fruit.'
    },
    caskType: 'Sherry, Bourbon & Mizunara Casks',
    flavorProfile: { peatedSmoky: 1, sherrySweet: 10, fruityFloral: 8, oakSpicy: 9, vanillaCaramel: 8 },
    distilleryCoords: { lat: 34.892, lng: 135.673 },
    servingSuggestion: 'Neat or with a hand-carved ice sphere.'
  },
  {
    id: 'w-jap-3',
    slug: 'nikka-taketsuru-21-pure-malt',
    name: 'Nikka Taketsuru 21 Year Old Pure Malt',
    distillery: 'Yoichi & Miyagikyo',
    region: 'Hokkaido / Sendai',
    country: 'Japan',
    category: 'Japanese',
    age: 21,
    abv: 43.0,
    volumeMl: 700,
    type: 'Japanese Pure Malt',
    price: 360.0,
    rating: 4.92,
    reviewsCount: 114,
    stockCount: 5,
    isRare: true,
    isFeatured: false,
    badge: 'Master Blender Award',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    description: 'Named in honor of Masataka Taketsuru, the father of Japanese whisky. Combines bold peated Yoichi malt with elegant fruity Miyagikyo malt.',
    tastingNotes: {
      nose: 'Ripe peaches, bitter orange, peat smoke, and dark honey.',
      palate: 'Rich coffee, espresso, prunes, nutmeg, and polished oak.',
      finish: 'Complex and lingering with dark chocolate and peat ember smoke.'
    },
    caskType: 'Sherry Casks & Refill Oak',
    flavorProfile: { peatedSmoky: 4, sherrySweet: 8, fruityFloral: 9, oakSpicy: 7, vanillaCaramel: 7 },
    distilleryCoords: { lat: 43.187, lng: 140.793 },
    servingSuggestion: 'Serve neat or with two drops of spring water.'
  },

  // 2. BALVENIE
  {
    id: 'w-balv-1',
    slug: 'balvenie-21-year-old-portwood',
    name: 'The Balvenie 21 Year Old PortWood Single Malt',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 21,
    abv: 40.0,
    volumeMl: 700,
    type: 'Single Malt',
    price: 260.0,
    originalPrice: 285.0,
    rating: 4.96,
    reviewsCount: 178,
    stockCount: 6,
    isRare: true,
    isFeatured: true,
    badge: 'Port Cask Finish',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    description: 'Rare single malt transferred into vintage port pipes after 21 years of traditional oak aging. Refined, nutty, and fruit-forward with silky honey.',
    tastingNotes: {
      nose: 'Perfumed white peach, ripe raisin, honeyed malt, and nutty oak.',
      palate: 'Silky, coating mouthfeel. Creamy vanilla, red wine plums, toasted almonds, and cocoa.',
      finish: 'Long, gentle finish with lingering port sweetness and gentle oak.'
    },
    caskType: 'American Oak Finish in Vintage Port Pipes',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 9, fruityFloral: 10, oakSpicy: 6, vanillaCaramel: 9 },
    distilleryCoords: { lat: 57.457, lng: -3.128 },
    servingSuggestion: 'Neat in a classic tulip glass.',
    awards: ['Gold Medal - International Wine & Spirit Competition']
  },
  {
    id: 'w-balv-2',
    slug: 'balvenie-14-year-old-caribbean-cask',
    name: 'The Balvenie 14 Year Old Caribbean Cask',
    distillery: 'The Balvenie Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Balvenie',
    age: 14,
    abv: 43.0,
    volumeMl: 700,
    type: 'Single Malt',
    price: 115.0,
    rating: 4.89,
    reviewsCount: 230,
    stockCount: 14,
    isRare: false,
    isFeatured: false,
    badge: 'Rum Cask Finish',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800',
    description: 'Matured in traditional oak casks before finishing in barrels that previously held custom West Indian rum blends created by Master Blender David C. Stewart.',
    tastingNotes: {
      nose: 'Rich tropical fruits, passionfruit, sweet toffee, and warm vanilla.',
      palate: 'Sweet vanilla, mango, honeyed apples, and warm rum spices.',
      finish: 'Warm, smooth, and lingering with sweet caramel.'
    },
    caskType: 'Ex-Bourbon finished in West Indian Rum Casks',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 7, fruityFloral: 9, oakSpicy: 5, vanillaCaramel: 10 },
    distilleryCoords: { lat: 57.457, lng: -3.128 },
    servingSuggestion: 'Neat or over a large clear ice cube.'
  },

  // 3. HENNESSY
  {
    id: 'w-henn-1',
    slug: 'hennessy-xo-extra-old-cognac-rare-reserve',
    name: 'Hennessy XO Extra Old Cognac Reserve',
    distillery: 'Maison Hennessy',
    region: 'Cognac',
    country: 'France',
    category: 'Hennessy',
    age: 30,
    abv: 40.0,
    volumeMl: 700,
    type: 'French Fine Cognac',
    price: 240.0,
    originalPrice: 265.0,
    rating: 4.95,
    reviewsCount: 312,
    stockCount: 8,
    isRare: true,
    isFeatured: true,
    badge: 'Extra Old Original',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    description: 'Created by Maurice Hennessy in 1870. Blended from over 100 eaux-de-vie aged up to 30 years in French Limousin oak casks. Deep amber with intense spice and candied fruit.',
    tastingNotes: {
      nose: 'Candied orange, cinnamon, dark chocolate, and aged French oak.',
      palate: 'Full and intense. Dried figs, black pepper, cocoa, and warm rancio.',
      finish: 'Incredibly velvet and long with dark chocolate and wood spice.'
    },
    caskType: 'French Limousin Oak Casks',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 9, fruityFloral: 8, oakSpicy: 9, vanillaCaramel: 8 },
    distilleryCoords: { lat: 45.696, lng: -0.329 },
    servingSuggestion: 'Savor neat in a tulip cognac glass or over ice.'
  },
  {
    id: 'w-henn-2',
    slug: 'hennessy-paradis-rare-cognac-prestige',
    name: 'Hennessy Paradis Rare Cognac Prestige Edition',
    distillery: 'Maison Hennessy',
    region: 'Cognac',
    country: 'France',
    category: 'Hennessy',
    age: 50,
    abv: 40.0,
    volumeMl: 700,
    type: 'Prestige Fine Cognac',
    price: 495.0,
    rating: 4.99,
    reviewsCount: 88,
    stockCount: 2,
    isRare: true,
    isFeatured: true,
    badge: 'Ultra Rare Prestige',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=800',
    description: 'A legendary blend created in 1979 by Maurice Fillioux. Selected from the finest eaux-de-vie preserved in the Founder’s Cellar for up to half a century.',
    tastingNotes: {
      nose: 'Dried jasmine, honeysuckle, cinnamon, candied fruit, and delicate cardamom.',
      palate: 'Silk and velvet texture. Crystallized fruit, dark honey, truffles, and antique oak.',
      finish: 'Extremely persistent with noble spice and delicate floral undertones.'
    },
    caskType: 'Historic French Limousin Oak Tiercons',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 10, fruityFloral: 10, oakSpicy: 8, vanillaCaramel: 9 },
    distilleryCoords: { lat: 45.696, lng: -0.329 },
    servingSuggestion: 'Neat at 20°C in a lead-free crystal snifter.'
  },

  // 4. MACALLAN
  {
    id: 'w-mac-1',
    slug: 'macallan-18-sherry-oak-2026-edition',
    name: 'The Macallan 18 Year Old Sherry Oak',
    distillery: 'The Macallan Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Macallan',
    age: 18,
    abv: 43.0,
    volumeMl: 700,
    type: 'Single Malt',
    price: 380.0,
    rating: 4.95,
    reviewsCount: 310,
    stockCount: 8,
    isRare: true,
    isFeatured: true,
    badge: 'Speyside Icon',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&q=80&w=800',
    description: 'Matured exclusively in hand-picked sherry seasoned oak casks from Jerez, Spain. Unmistakable rich amber hue with luxurious notes of dried fruit, ginger, and oak spice.',
    tastingNotes: {
      nose: 'Dried fruit and ginger with hints of vanilla and cinnamon.',
      palate: 'Soft and rich, with spice, clove, orange, and mature toasted oak.',
      finish: 'Full and lingering, with dried fruit, ginger, and orange zest.'
    },
    caskType: '100% Hand-picked Sherry Seasoned Oak Casks from Jerez',
    flavorProfile: { peatedSmoky: 1, sherrySweet: 10, fruityFloral: 8, oakSpicy: 8, vanillaCaramel: 7 },
    distilleryCoords: { lat: 57.485, lng: -3.208 },
    servingSuggestion: 'Neat or with a single hand-carved ice sphere.',
    awards: ['Double Gold - World Whiskies Awards']
  },
  {
    id: 'w-mac-2',
    slug: 'macallan-rare-cask-release-2026',
    name: 'The Macallan Rare Cask 2026 Batch Release',
    distillery: 'The Macallan Distillery',
    region: 'Speyside',
    country: 'Scotland',
    category: 'Macallan',
    age: 20,
    abv: 43.0,
    volumeMl: 700,
    type: 'Single Malt',
    price: 320.0,
    rating: 4.93,
    reviewsCount: 145,
    stockCount: 5,
    isRare: true,
    isFeatured: false,
    badge: '1% Cask Selection',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=800',
    description: 'Crafted from first-fill sherry seasoned oak casks representing less than 1% of all casks maturing at The Macallan estate. Mahogany colour with rich complexity.',
    tastingNotes: {
      nose: 'Opulent vanilla and raisin, with apple, lemon, and orange citrus notes.',
      palate: 'Raisin, dark chocolate, oak, and sweet ginger spice.',
      finish: 'Long, velvety finish dominated by warm oak and sweet raisin.'
    },
    caskType: 'First-fill European & American Sherry Seasoned Oak',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 10, fruityFloral: 7, oakSpicy: 9, vanillaCaramel: 8 },
    distilleryCoords: { lat: 57.485, lng: -3.208 },
    servingSuggestion: 'Neat in a Glencairn tasting glass.'
  },

  // 5. OLD AND RARE
  {
    id: 'w-or-1',
    slug: 'bowmore-25-year-old-sherry-cask',
    name: 'Bowmore 25 Year Old Oloroso Cask Reserve',
    distillery: 'Bowmore Distillery',
    region: 'Islay',
    country: 'Scotland',
    category: 'Old and Rare',
    age: 25,
    abv: 43.0,
    volumeMl: 700,
    type: 'Rare Allocation',
    price: 495.0,
    originalPrice: 550.0,
    rating: 4.98,
    reviewsCount: 142,
    stockCount: 4,
    isRare: true,
    isFeatured: true,
    badge: 'Quarter-Century Islay',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=800',
    description: 'A legendary Islay single malt matured for a quarter of a century in Spanish Oloroso sherry butts and North American bourbon barrels.',
    tastingNotes: {
      nose: 'Intense dark chocolate, sun-dried raisins, heather honey, and gentle peat smoke.',
      palate: 'Silky and luxurious. Sweet treacle, roasted hazelnuts, dark cherries, orange peel.',
      finish: 'Exceptionally long and lingering with notes of peat ember smoke and mahogany.'
    },
    caskType: 'First-fill Oloroso Sherry Butts & Ex-Bourbon Barrels',
    flavorProfile: { peatedSmoky: 7, sherrySweet: 9, fruityFloral: 6, oakSpicy: 8, vanillaCaramel: 7 },
    distilleryCoords: { lat: 55.757, lng: -6.288 },
    servingSuggestion: 'Neat in a Glencairn glass.',
    bottleNumber: 'Cask #4812 / Bottle 124 of 450',
    awards: ['Gold Medal - San Francisco World Spirits Competition', '98 Points - IWSC']
  },
  {
    id: 'w-or-2',
    slug: 'brora-38-year-old-special-release-1977',
    name: 'Brora 38 Year Old Vintage 1977 Special Release',
    distillery: 'Brora Distillery (Highlands)',
    region: 'Highlands',
    country: 'Scotland',
    category: 'Old and Rare',
    age: 38,
    abv: 48.6,
    volumeMl: 700,
    type: 'Rare Allocation',
    price: 490.0,
    rating: 4.99,
    reviewsCount: 62,
    stockCount: 1,
    isRare: true,
    isFeatured: true,
    badge: 'Ghost Distillery 1977',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&q=80&w=800',
    description: 'Distilled in 1977 before Brora closed its doors in 1983. Matured for 38 years in refill American oak hogsheads. One of the most sought-after vintage malts in the world.',
    tastingNotes: {
      nose: 'Aromatic beeswax, polished antique leather, seaside peat smoke, and dried lemon.',
      palate: 'Waxed apples, dark cocoa, subtle brine, white truffle, and delicate oak smoke.',
      finish: 'Endless, elegant finish with lingering sweet wax and gentle peat smoke.'
    },
    caskType: 'Refill American Oak Hogsheads',
    flavorProfile: { peatedSmoky: 6, sherrySweet: 6, fruityFloral: 8, oakSpicy: 9, vanillaCaramel: 7 },
    distilleryCoords: { lat: 58.012, lng: -3.856 },
    servingSuggestion: 'Neat. Let it sit for 20 minutes to breathe.'
  },

  // 6. PORT ELLEN
  {
    id: 'w-pe-1',
    slug: 'port-ellen-39-year-old-untold-stories-1979',
    name: 'Port Ellen 39 Year Old Untold Stories 1979',
    distillery: 'Port Ellen Lost Distillery',
    region: 'Islay',
    country: 'Scotland',
    category: 'Port Ellen',
    age: 39,
    abv: 50.9,
    volumeMl: 700,
    type: 'Lost Distillery Single Cask',
    price: 495.0,
    rating: 4.99,
    reviewsCount: 41,
    stockCount: 1,
    isRare: true,
    isFeatured: true,
    badge: 'Lost Distillery 1979',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-rare single cask from the legendary closed Port Ellen distillery on Islay. Distilled in 1979, aged 39 years. Individually numbered bottle presented in an etched wood casing.',
    tastingNotes: {
      nose: 'Maritime salt spray, tar, dried candied lemon, damp peat ember, and aged leather.',
      palate: 'Thick oily texture with coastal smoke, salted butter, roasted pecans, and pink peppercorns.',
      finish: 'Extremely long and complex finish with maritime salinity and soft peat.'
    },
    caskType: 'European Oak Sherry Butt & Refill Bourbon Casks',
    flavorProfile: { peatedSmoky: 8, sherrySweet: 7, fruityFloral: 6, oakSpicy: 9, vanillaCaramel: 7 },
    distilleryCoords: { lat: 55.629, lng: -6.186 },
    servingSuggestion: 'Neat in a lead crystal Glencairn glass.',
    bottleNumber: 'Cask #2910 / Bottle 34 of 1,500'
  },
  {
    id: 'w-pe-2',
    slug: 'port-ellen-40-year-old-9th-special-release',
    name: 'Port Ellen 40 Year Old 9th Special Release',
    distillery: 'Port Ellen Lost Distillery',
    region: 'Islay',
    country: 'Scotland',
    category: 'Port Ellen',
    age: 40,
    abv: 50.9,
    volumeMl: 700,
    type: 'Lost Distillery Single Cask',
    price: 490.0,
    rating: 5.0,
    reviewsCount: 29,
    stockCount: 1,
    isRare: true,
    isFeatured: false,
    badge: '40 Years Aged',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    description: 'Four decades of silent maturation in Islay warehouses. Bottled at natural cask strength. The apex of collector whiskies.',
    tastingNotes: {
      nose: 'Waxed cedar, delicate peat embers, dried apricot, and sea moss.',
      palate: 'Silky and oily. Salted caramel, orange peel, dark cocoa, and lingering peat smoke.',
      finish: 'Unmatched length with sweet oak and gentle bonfire embers.'
    },
    caskType: '9 Refill American & European Oak Casks',
    flavorProfile: { peatedSmoky: 7, sherrySweet: 8, fruityFloral: 7, oakSpicy: 9, vanillaCaramel: 8 },
    distilleryCoords: { lat: 55.629, lng: -6.186 },
    servingSuggestion: 'Neat.'
  },

  // 7. BOURBON
  {
    id: 'w-bourb-1',
    slug: 'pappy-van-winkle-15-year-old-family-reserve',
    name: 'Pappy Van Winkle 15 Year Old Family Reserve',
    distillery: 'Buffalo Trace Distillery',
    region: 'Kentucky',
    country: 'United States',
    category: 'Bourbon',
    age: 15,
    abv: 53.5,
    volumeMl: 750,
    type: 'Kentucky Straight Bourbon',
    price: 490.0,
    rating: 4.98,
    reviewsCount: 175,
    stockCount: 2,
    isRare: true,
    isFeatured: true,
    badge: 'Wheated Bourbon Icon',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    description: 'The world’s most coveted wheated bourbon. Aged for 15 years in heavily charred new American oak barrels deep inside Kentucky brick warehouses.',
    tastingNotes: {
      nose: 'Rich caramel, dried cherries, toasted oak, and sweet maple syrup.',
      palate: 'Dense, sweet, and chewy. Dark chocolate, toasted pecans, cinnamon, and vanilla bean.',
      finish: 'Incredibly long with warm wood spice, leather, and sweet tobacco.'
    },
    caskType: 'New Charred American White Oak Barrels',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 5, fruityFloral: 7, oakSpicy: 9, vanillaCaramel: 10 },
    distilleryCoords: { lat: 38.217, lng: -84.871 },
    servingSuggestion: 'Neat or with a single drop of limestone water.',
    awards: ['99 Points - Beverage Tasting Institute']
  },
  {
    id: 'w-bourb-2',
    slug: 'blantons-gold-edition-single-barrel',
    name: "Blanton's Gold Edition Single Barrel Bourbon",
    distillery: 'Buffalo Trace Distillery',
    region: 'Kentucky',
    country: 'United States',
    category: 'Bourbon',
    age: 8,
    abv: 51.5,
    volumeMl: 700,
    type: 'Single Barrel Bourbon',
    price: 185.0,
    rating: 4.92,
    reviewsCount: 280,
    stockCount: 9,
    isRare: true,
    isFeatured: false,
    badge: 'Gold Single Barrel',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&q=80&w=800',
    description: 'Created for discerning bourbon aficionados. Dumped from Warehouse H, the famous metal-clad warehouse built by Colonel Albert B. Blanton.',
    tastingNotes: {
      nose: 'Citrus, dried fruits, heavy vanilla, and spicy oak.',
      palate: 'Complex and bold. Dark chocolate, dried plum, honeyed corn, and rye spice.',
      finish: 'Warm finish of pecan, toasted vanilla, and charred oak.'
    },
    caskType: 'Charred New White Oak Cask',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 4, fruityFloral: 8, oakSpicy: 8, vanillaCaramel: 10 },
    distilleryCoords: { lat: 38.217, lng: -84.871 },
    servingSuggestion: 'Neat in a heavy rock glass.'
  },
  {
    id: 'w-bourb-3',
    slug: 'whistlepig-15-year-old-estate-oak-rye',
    name: 'WhistlePig 15 Year Old Vermont Estate Oak Rye',
    distillery: 'WhistlePig Farm Distillery',
    region: 'Vermont',
    country: 'United States',
    category: 'Bourbon',
    age: 15,
    abv: 46.0,
    volumeMl: 700,
    type: 'Straight Rye Whiskey',
    price: 225.0,
    rating: 4.90,
    reviewsCount: 92,
    stockCount: 7,
    isRare: true,
    isFeatured: false,
    badge: 'Vermont Estate Oak',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800',
    description: 'Finished in custom Vermont Estate Oak barrels harvested right on the WhistlePig farm. Rich in wood tannins and bold rye spices.',
    tastingNotes: {
      nose: 'Caramel, vanilla, butterscotch, plus mint, clove, and nutmeg.',
      palate: 'Warm allspice, orange peel, dark chocolate, and toasted oak.',
      finish: 'Long and spicy with sweet butterscotch and oak tannin.'
    },
    caskType: 'Finished in Harvested Vermont Estate Oak',
    flavorProfile: { peatedSmoky: 0, sherrySweet: 3, fruityFloral: 6, oakSpicy: 10, vanillaCaramel: 9 },
    distilleryCoords: { lat: 43.912, lng: -73.238 },
    servingSuggestion: 'Neat or in an Old Fashioned with angostura bitters.'
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
    excerpt: 'Why Yamazaki 18, Port Ellen ghost distillery bottles, and old sherry-cask Macallans are outperforming traditional luxury assets across the European market.',
    thumbnail: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=800',
    content: [
      'Over the past decade, rare single malt scotch and Japanese whisky have evolved from a connoisseur passion into one of the most resilient alternative physical assets in Europe. Particular focus has shifted toward vintage Islay distilleries like Port Ellen and Macallan.',
      'Factors driving value include cask provenance, bottle scarcity, natural cask strength bottlings, and original presentation boxes with verified certificates of authenticity.',
      'When acquiring bottles for collection, ensure temperature-controlled storage and pristine label conditions. Every allocation offered on Whiskey Europe undergoes provenance verification before entering our cellars.'
    ]
  },
  {
    slug: 'uncorking-continental-europe-nordic-and-french-whiskies',
    title: 'Uncorking Japanese & European Craft: Yamazaki, Hibiki & Beyond',
    date: 'July 24, 2026',
    author: 'Elena Rostova, Spirits Journalist',
    readTime: '5 min read',
    category: 'Distillery Spotlight',
    excerpt: 'From Japanese Mizunara oak maturation in Kyoto to rare Hennessy Paradis and Balvenie PortWood finishes, explore the world’s most coveted spirits.',
    thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    content: [
      'While Scotland and Ireland boast centuries of whisky lineage, Japanese distilleries like Yamazaki and Hakushu have set new global benchmarks for subtlety.',
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
