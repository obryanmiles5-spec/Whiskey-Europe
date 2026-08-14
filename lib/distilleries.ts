export interface Distillery {
  id: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  founded: number;
  masterDistiller: string;
  waterSource: string;
  signatureBottle: string;
  description: string;
  image: string;
  featuredWhiskiesCount: number;
}

export const DISTILLERIES: Distillery[] = [
  {
    id: 'dist-bowmore',
    name: 'Bowmore Distillery',
    region: 'Islay',
    country: 'Scotland',
    lat: 55.757,
    lng: -6.288,
    founded: 1779,
    masterDistiller: 'David Turner',
    waterSource: 'Laggan River',
    signatureBottle: 'Bowmore 25 Year Old Oloroso Cask',
    description: 'The oldest distillery on Islay, famous for its No. 1 Vaults—the world’s oldest maturation warehouse below sea level.',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=600',
    featuredWhiskiesCount: 3
  },
  {
    id: 'dist-macallan',
    name: 'The Macallan Distillery',
    region: 'Speyside',
    country: 'Scotland',
    lat: 57.485,
    lng: -3.208,
    founded: 1824,
    masterDistiller: 'Kirsteen Campbell',
    waterSource: 'Ringorm Springs',
    signatureBottle: 'The Macallan 18 Sherry Oak',
    description: 'Set on a 485-acre estate overlooking the River Spey, renowned for its exceptionally small copper spirit stills and bespoke sherry casks.',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&q=80&w=600',
    featuredWhiskiesCount: 4
  },
  {
    id: 'dist-bushmills',
    name: 'Old Bushmills Distillery',
    region: 'County Antrim',
    country: 'Ireland',
    lat: 55.204,
    lng: -6.525,
    founded: 1608,
    masterDistiller: 'Alex Thomas',
    waterSource: 'Saint Columb’s Rill',
    signatureBottle: 'Bushmills 21 Madeira Finish',
    description: 'Granted a license to distil in 1608, holding the title of Ireland’s oldest official distillery along the Giant’s Causeway coast.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600',
    featuredWhiskiesCount: 2
  },
  {
    id: 'dist-midleton',
    name: 'Midleton Distillery (Redbreast)',
    region: 'County Cork',
    country: 'Ireland',
    lat: 51.916,
    lng: -8.174,
    founded: 1825,
    masterDistiller: 'Kevin O’Gorman',
    waterSource: 'Dungourney River',
    signatureBottle: 'Redbreast 21 Single Pot Still',
    description: 'The spiritual home of Irish single pot still whiskey, housing the world’s largest operational copper pot still.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=600',
    featuredWhiskiesCount: 2
  },
  {
    id: 'dist-mackmyra',
    name: 'Mackmyra Gravity Distillery',
    region: 'Gävleborg',
    country: 'Sweden',
    lat: 60.674,
    lng: 17.141,
    founded: 1999,
    masterDistiller: 'Angela D’Orazio',
    waterSource: 'Valbo Ridge Aquifer',
    signatureBottle: 'Mackmyra Svensk Rök',
    description: 'A futuristic 35-meter-tall gravity distillery producing innovative Nordic whiskies using Swedish oak, juniper peat, and local barley.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    featuredWhiskiesCount: 2
  },
  {
    id: 'dist-warenghem',
    name: 'Warenghem Distillery (Armorik)',
    region: 'Brittany',
    country: 'France',
    lat: 48.732,
    lng: -3.458,
    founded: 1900,
    masterDistiller: 'David Roussier',
    waterSource: 'Rest Avel Spring',
    signatureBottle: 'Armorik 15 Year Old Breton Single Malt',
    description: 'Pioneered French single malt production in Lannion, Brittany, taking advantage of Brittany’s temperate humid maritime climate.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=600',
    featuredWhiskiesCount: 1
  },
  {
    id: 'dist-slyrs',
    name: 'Slyrs Alpine Distillery',
    region: 'Bavaria',
    country: 'Germany',
    lat: 47.702,
    lng: 11.892,
    founded: 1999,
    masterDistiller: 'Hans Kemenater',
    waterSource: 'Bavarian Schliersee Springs',
    signatureBottle: 'Slyrs Bavarian Cask Strength 58.2%',
    description: 'Located high in the Bavarian Alps at Lake Schliersee, maturing whiskies in pure mountain air and extreme seasonal thermal shifts.',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&q=80&w=600',
    featuredWhiskiesCount: 1
  },
  {
    id: 'dist-lagavulin',
    name: 'Lagavulin Distillery',
    region: 'Islay',
    country: 'Scotland',
    lat: 55.635,
    lng: -6.126,
    founded: 1816,
    masterDistiller: 'Jordan Paisley',
    waterSource: 'Solan Lochs',
    signatureBottle: 'Lagavulin 16 Year Old',
    description: 'Perched in a picturesque bay on Islay’s south coast, famous for long distillation times and heavily peated spirit.',
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&q=80&w=600',
    featuredWhiskiesCount: 2
  }
];
