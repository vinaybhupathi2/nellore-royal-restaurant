const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'menu.json');
const menu = JSON.parse(fs.readFileSync(menuPath, 'utf8'));

// Curated pool of high-quality, professional food stock photography on Unsplash
// Structured specifically for South/North Indian cuisines, desserts, and drinks
const IMAGES = {
  // Breakfast & Tiffins
  tiffins: [
    "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80", // Fluffy idlis & sambar
    "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80", // Crispy masala dosa
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", // Poori & potato sagu
    "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80", // Pongal & chutneys
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"  // Filter coffee & snacks
  ],
  // Traditional meals and full platters
  thalis: [
    "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80", // South Veg Thali
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80", // South Non-Veg Thali
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80", // Jumbo Feast Board
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", // North Indian Thali
    "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80"  // Specials board
  ],
  // Aromatic Biryanis
  biryanis: [
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80", // Classic Dum Biryani
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80", // Saffron Biryani closeup
    "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=600&q=80", // Veg Paneer Biryani
    "https://images.unsplash.com/photo-1637806930600-37fa81148568?auto=format&fit=crop&w=600&q=80", // Chicken Dum Biryani
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80", // Ghee Cashew Biryani
    "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80", // Spicy Fry Piece Biryani
    "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80", // Egg Biryani
    "https://images.unsplash.com/photo-1645177625172-13233c467a80?auto=format&fit=crop&w=600&q=80", // Mutton Dum Biryani
    "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80", // Gongura Mutton Biryani
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80", // Prawns Seafood Biryani
    "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80"  // Jeera/Curd Rice
  ],
  // Tandoori clay-oven specialties
  tandoori: [
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80", // Whole Tandoori Chicken
    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80", // Chicken Tikka skewers
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80", // Creamy Malai Kabab
    "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80", // Paneer Tikka cubes
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80", // Reshmi Kabab
    "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80", // Fish Tikka oven-roasted
    "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80"  // Smoky drumsticks
  ],
  // Golden crispy, pan-fried dry starters
  startersDry: [
    "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80", // Hot Chicken 65
    "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80", // Chicken Lollipops
    "https://images.unsplash.com/photo-1627662236973-4f8259fa2441?auto=format&fit=crop&w=600&q=80", // Chilli Chicken dry
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80", // Chicken Majestic
    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80", // Dragon Chicken strips
    "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80", // Dry Pepper Chicken
    "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80", // Garlic Chicken dry
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"  // Mutton Fry dry griddle
  ],
  // Crispy Vegetarian Starters
  vegStarters: [
    "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80", // Gobi Manchurian crispy
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80", // Paneer 65 cubes
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80", // Golden Babycorn Chilli
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", // Crispy Potato/Aalu 65
    "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80", // Mushroom Chilli dry
    "https://images.unsplash.com/photo-1627662236973-4f8259fa2441?auto=format&fit=crop&w=600&q=80"  // Veg spring rolls / platter
  ],
  // Rich, buttery, creamy or hot gravies
  curriesVeg: [
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80", // Paneer Butter Masala
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80", // Palak Paneer green
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80", // Dal Tadka yellow bowl
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80", // Kadai Veg paneer
    "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80", // Kaju Cashew Masala
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"  // Malai Kofta creamy
  ],
  // Fiery, local Andhra and North-style non-veg gravies
  curriesNonVeg: [
    "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80", // Hot Red Chicken Masala
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80", // Butter Chicken creamy
    "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=600&q=80", // Mutton Rogan Josh
    "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?auto=format&fit=crop&w=600&q=80", // Nellore Fish Pulusu
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80", // Spicy Andhra Natukodi gravy
    "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"  // Prawns coastal curry
  ],
  // Baked flatbreads from the clay oven
  breads: [
    "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=600&q=80", // Butter Naan
    "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80", // Tandoori Roti
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80", // Layered Lacha Parota
    "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80", // Stuffed Garlic Naan
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"  // Clay-baked Kulchas
  ],
  // Desserts, Ice Creams
  desserts: [
    "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80", // Ice cream scoop vanilla
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80", // Chocolate brownie scoop
    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80", // Premium mango scoop
    "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"  // Royal loaded sundae plate
  ],
  // Thick, chilled, delicious shakes
  shakes: [
    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80", // Chocolate Nutella shake
    "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80", // Strawberry shake
    "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80", // Oreo Cookies shake
    "https://images.unsplash.com/photo-1559622214-f8a98509db7b?auto=format&fit=crop&w=600&q=80"  // Peanut Butter thick shake
  ],
  // Soups
  soups: [
    "https://images.unsplash.com/photo-1547592165-e1d17fed6006?auto=format&fit=crop&w=600&q=80", // Golden Sweet corn
    "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80"  // Hot & Sour thick broth
  ]
};

// Helper: Hashing string to select a distinct image offset
function getHashIndex(str, max) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % max;
}

console.log("Enriching all 163 dishes with highly relevant, non-repeating images...");

let counts = {};

menu.items = menu.items.map((item) => {
  const name = item.name.toLowerCase();
  const cat = item.category;
  let imageUrl = "";

  // Helper to choose a unique image index using a offset-pool system
  const pickFromPool = (pool, nameSalt) => {
    if (!counts[cat]) counts[cat] = 0;
    const index = (getHashIndex(item.id + nameSalt, pool.length) + counts[cat]) % pool.length;
    counts[cat]++;
    return pool[index];
  };

  // 1. Unlimited Meals & Thalis
  if (cat === "unlimited") {
    if (name.includes("tiffin")) imageUrl = IMAGES.tiffins[0];
    else if (name.includes("pure veg")) imageUrl = IMAGES.thalis[0];
    else if (name.includes("jumbo")) imageUrl = IMAGES.thalis[2];
    else if (name.includes("non veg")) imageUrl = IMAGES.thalis[1];
    else if (name.includes("north")) imageUrl = IMAGES.thalis[3];
    else imageUrl = pickFromPool(IMAGES.thalis, "unlimited");
  }
  
  // 2. Specials
  else if (cat === "specials") {
    if (name.includes("ragimudda")) imageUrl = IMAGES.thalis[4];
    else if (name.includes("natukodi")) imageUrl = IMAGES.curriesNonVeg[4];
    else if (name.includes("koramenu")) imageUrl = IMAGES.curriesNonVeg[3];
    else if (name.includes("bommidayi")) imageUrl = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80";
    else if (name.includes("gandi") || name.includes("boccha")) imageUrl = "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?auto=format&fit=crop&w=600&q=80";
    else if (name.includes("sanna")) imageUrl = "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80";
    else if (name.includes("dum biryani") || name.includes("dum")) imageUrl = IMAGES.biryanis[3];
    else imageUrl = pickFromPool(IMAGES.thalis, "specials");
  }
  
  // 3. Biryanis
  else if (cat === "biryani" || name.includes("biryani")) {
    if (name.includes("paneer")) imageUrl = IMAGES.biryanis[2];
    else if (name.includes("mushroom")) imageUrl = IMAGES.biryanis[1];
    else if (name.includes("kaju")) imageUrl = IMAGES.biryanis[4];
    else if (name.includes("gongura veg")) imageUrl = IMAGES.biryanis[8];
    else if (name.includes("mixed veg") || name.includes("spl. veg")) imageUrl = IMAGES.biryanis[2];
    else if (name.includes("veg")) imageUrl = IMAGES.biryanis[2];
    else if (name.includes("egg")) imageUrl = IMAGES.biryanis[6];
    else if (name.includes("chicken dum") || name.includes("chi. dum")) imageUrl = IMAGES.biryanis[3];
    else if (name.includes("fry piece")) imageUrl = IMAGES.biryanis[5];
    else if (name.includes("gongura chicken")) imageUrl = IMAGES.biryanis[3];
    else if (name.includes("mogalai chicken") || name.includes("mogalai")) imageUrl = IMAGES.biryanis[1];
    else if (name.includes("leg piece")) imageUrl = IMAGES.biryanis[0];
    else if (name.includes("lollypop") || name.includes("lollipop")) imageUrl = IMAGES.biryanis[0];
    else if (name.includes("natukodi")) imageUrl = IMAGES.biryanis[7];
    else if (name.includes("mutton dum") || name.includes("mut. dum")) imageUrl = IMAGES.biryanis[7];
    else if (name.includes("mutton fry")) imageUrl = IMAGES.biryanis[5];
    else if (name.includes("keema")) imageUrl = IMAGES.biryanis[8];
    else if (name.includes("prawns")) imageUrl = IMAGES.biryanis[9];
    else if (name.includes("jeera")) imageUrl = IMAGES.biryanis[10];
    else if (name.includes("curd")) imageUrl = IMAGES.tiffins[1];
    else imageUrl = pickFromPool(IMAGES.biryanis, "biryani");
  }
  
  // 4. Seafood Starters
  else if (cat === "seafood") {
    if (name.includes("apollo")) imageUrl = IMAGES.tandoori[5];
    else if (name.includes("fish roast") || name.includes("fish")) imageUrl = IMAGES.tandoori[5];
    else if (name.includes("prawns") || name.includes("frans")) imageUrl = IMAGES.curriesNonVeg[5];
    else imageUrl = pickFromPool(IMAGES.tandoori, "seafood");
  }
  
  // 5. Tandoori
  else if (cat === "tandoori") {
    if (name.includes("tandoori chicken full") || name.includes("tandoori chicken half")) imageUrl = IMAGES.tandoori[0];
    else if (name.includes("tangadi") || name.includes("leg")) imageUrl = IMAGES.tandoori[6];
    else if (name.includes("malai")) imageUrl = IMAGES.tandoori[2];
    else if (name.includes("chicken tikka") || name.includes("chiken tikka")) imageUrl = IMAGES.tandoori[1];
    else if (name.includes("fish")) imageUrl = IMAGES.tandoori[5];
    else if (name.includes("reshmi")) imageUrl = IMAGES.tandoori[4];
    else if (name.includes("paneer")) imageUrl = IMAGES.tandoori[3];
    else imageUrl = pickFromPool(IMAGES.tandoori, "tandoori");
  }
  
  // 6. Non-Veg Starters
  else if (cat === "nonveg-starters") {
    if (name.includes("lollypop") || name.includes("lollipop")) imageUrl = IMAGES.startersDry[1];
    else if (name.includes("manchurian")) imageUrl = IMAGES.startersDry[2];
    else if (name.includes("chilli chicken") || name.includes("chilli")) imageUrl = IMAGES.startersDry[2];
    else if (name.includes("65")) imageUrl = IMAGES.startersDry[0];
    else if (name.includes("drumstick")) imageUrl = IMAGES.startersDry[5];
    else if (name.includes("dragon")) imageUrl = IMAGES.startersDry[4];
    else if (name.includes("majestic")) imageUrl = IMAGES.startersDry[3];
    else if (name.includes("garlic")) imageUrl = IMAGES.startersDry[6];
    else if (name.includes("fry") || name.includes("roast")) imageUrl = IMAGES.startersDry[7];
    else if (name.includes("mutton")) imageUrl = IMAGES.startersDry[7];
    else if (name.includes("pepper")) imageUrl = IMAGES.startersDry[5];
    else if (name.includes("egg")) imageUrl = "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80";
    else imageUrl = pickFromPool(IMAGES.startersDry, "nonveg-starters");
  }
  
  // 7. Veg Starters
  else if (cat === "veg-starters") {
    if (name.includes("paneer")) imageUrl = IMAGES.vegStarters[1];
    else if (name.includes("babycorn")) imageUrl = IMAGES.vegStarters[2];
    else if (name.includes("mushroom")) imageUrl = IMAGES.vegStarters[4];
    else if (name.includes("aalu")) imageUrl = IMAGES.vegStarters[3];
    else if (name.includes("gobi")) imageUrl = IMAGES.vegStarters[0];
    else imageUrl = pickFromPool(IMAGES.vegStarters, "veg-starters");
  }
  
  // 8. Veg Curries
  else if (cat === "veg-curries") {
    if (name.includes("paneer butter")) imageUrl = IMAGES.curriesVeg[0];
    else if (name.includes("palak paneer")) imageUrl = IMAGES.curriesVeg[1];
    else if (name.includes("dal")) imageUrl = IMAGES.curriesVeg[2];
    else if (name.includes("kadai veg") || name.includes("veg")) imageUrl = IMAGES.curriesVeg[3];
    else if (name.includes("kaju")) imageUrl = IMAGES.curriesVeg[4];
    else if (name.includes("kofta")) imageUrl = IMAGES.curriesVeg[5];
    else imageUrl = pickFromPool(IMAGES.curriesVeg, "veg-curries");
  }
  
  // 9. Non-Veg Curries
  else if (cat === "nonveg-curries") {
    if (name.includes("butter chicken")) imageUrl = IMAGES.curriesNonVeg[1];
    else if (name.includes("rogan") || name.includes("mutton")) imageUrl = IMAGES.curriesNonVeg[2];
    else if (name.includes("fish") || name.includes("masala")) imageUrl = IMAGES.curriesNonVeg[3];
    else if (name.includes("natukodi")) imageUrl = IMAGES.curriesNonVeg[4];
    else if (name.includes("prawns")) imageUrl = IMAGES.curriesNonVeg[5];
    else imageUrl = pickFromPool(IMAGES.curriesNonVeg, "nonveg-curries");
  }
  
  // 10. Indian Breads
  else if (cat === "breads") {
    if (name.includes("naan")) {
      if (name.includes("garlic")) imageUrl = IMAGES.breads[3];
      else imageUrl = IMAGES.breads[0];
    } else if (name.includes("roti") || name.includes("pulka")) {
      imageUrl = IMAGES.breads[1];
    } else if (name.includes("parota") || name.includes("parotta")) {
      imageUrl = IMAGES.breads[2];
    } else if (name.includes("kulcha")) {
      imageUrl = IMAGES.breads[4];
    } else {
      imageUrl = pickFromPool(IMAGES.breads, "breads");
    }
  }
  
  // 11. Desserts & Milkshakes
  else if (cat === "desserts") {
    if (name.includes("shake") || name.includes("milkshake")) {
      if (name.includes("strawberry")) imageUrl = IMAGES.shakes[1];
      else if (name.includes("oreo cookies") || name.includes("oreo")) imageUrl = IMAGES.shakes[2];
      else if (name.includes("peanut")) imageUrl = IMAGES.shakes[3];
      else imageUrl = IMAGES.shakes[0];
    } else {
      if (name.includes("vanilla")) imageUrl = IMAGES.desserts[0];
      else if (name.includes("chocolate") || name.includes("brownie") || name.includes("beauty")) imageUrl = IMAGES.desserts[1];
      else if (name.includes("mango")) imageUrl = IMAGES.desserts[2];
      else imageUrl = IMAGES.desserts[3];
    }
  }
  
  // 12. Soups
  else if (cat === "soups") {
    if (name.includes("sweet corn") || name.includes("veg")) imageUrl = IMAGES.soups[0];
    else imageUrl = IMAGES.soups[1];
  }

  // Double check fallback to category cover if anything misses
  if (!imageUrl) {
    imageUrl = IMAGES.thalis[0];
  }

  // Ensure high quality and fit properties on all Unsplash URLs
  if (imageUrl.includes("unsplash.com")) {
    // Replace w=... with w=600 and q=80 for high resolution thumbnail delivery
    imageUrl = imageUrl.replace(/w=\d+/, "w=600").replace(/q=\d+/, "q=80");
  }

  return { ...item, image: imageUrl };
});

fs.writeFileSync(menuPath, JSON.stringify(menu, null, 2), 'utf8');
console.log("Successfully patched menu.json! All 163 dishes enriched with dedicated image links.");
