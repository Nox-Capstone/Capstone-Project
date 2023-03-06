const client = require('./client');
const {
  getUserByToken,
  createUser,
  authenticate
} = require('./User');
const { createProduct } = require('./Products');
const dropTables = async () => {
  const SQL = `
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS build_products;
  DROP TABLE IF EXISTS build;
  DROP TABLE IF EXISTS cart_products;
  DROP TABLE IF EXISTS cart;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS users;
`
  await client.query(SQL);
}

const syncTables = async () => {
  const SQL = `
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    "isAdam" BOOLEAN default FALSE,
    image VARCHAR(255)
  );
  CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price INTEGER,
    quantity INTEGER,
    brand TEXT,
    tag TEXT,
    image VARCHAR(255)
  );
  CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    current BOOLEAN DEFAULT TRUE,
    "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE
);
  CREATE TABLE cart_products(
    id SERIAL PRIMARY KEY,
    "cartId" INTEGER REFERENCES cart(id),
    "productsId" INTEGER REFERENCES products(id),
    quantity INTEGER,
    UNIQUE("cartId","productsId")
  );
  CREATE TABLE build(
    id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id),
    "productsId" INTEGER REFERENCES products(id),
    image VARCHAR(255)
  );
  CREATE TABLE build_products(
    id SERIAL PRIMARY KEY,
    "buildId" INTEGER REFERENCES build(id),
    "userId" INTEGER REFERENCES users(id)
  );
  CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id),
    "productsId" INTEGER REFERENCES products(id)
  );
  `;
  await client.query(SQL);
};

const syncAndSeed = async () => {
  await dropTables();
  await syncTables();
  await createInitialUsers();
  await createInitialProducts();

};

const createInitialUsers = async () => {
  try {
    console.log('Starting Create Users')
    const usersToCreate = [
      { username: "Walter", password: "Waltersux69", isAdam: "true" },
      { username: "Ethan", password: "Deadbattery1", isAdam: "true" },
      { username: "Michael", password: "GBAshouldntbelockedbehindapaywall", isAdam: "true" },
      { username: "Eric", password: "Pokemonboi1", isAdam: "false" },
      { username: "Jacob", password: "Hoodielover1", isAdam: "false" },
      { username: "Nabeel", password: "Thegoat9", isAdam: "false" },
      { username: "Anthony", password: "Nintendofan9", isAdam: "false" },
      { username: "Prof", password: "Pradaroundmyneck420", isAdam: "false" },
      { username: "Adam", password: "IsAdam8", isAdam: "false" },
      { username: "Daniel", password: "Theboywholived5", isAdam: "false" },
      { username: "Ithndr", password: "password", isAdam: "true" },
      { username: "Sid", password: "asdf1234", isAdam: "true" }
    ]
    const users = await Promise.all(usersToCreate.map(createUser))
    console.log('Finished Creating Users')
  } catch (err) {
    throw err;
  }
}

const createInitialProducts = async () => {
  try {
    console.log('Starting Create Products')
    const productsToCreate = [
      //graphics cards
      { name: "RTX4090 ti", description: "big", price: "2300", quantity: "4", brand: "NVidia", tag: "graphics card" },
      { name: "RTX4080", description: "big", price: "1500", quantity: "31", brand: "NVidia", tag: "graphics card" },
      { name: "RTX4070 ti", description: "big", price: "800", quantity: "52", brand: "NVidia", tag: "graphics card" },
      { name: "RTX4060 ti", description: "big", price: "500", quantity: "58", brand: "NVidia", tag: "graphics card" },
      { name: "RTX3090 ti", description: "big", price: "1700", quantity: "7", brand: "NVidia", tag: "graphics card" },
      { name: "RTX3080", description: "big", price: "1200", quantity: "12", brand: "NVidia", tag: "graphics card" },
      { name: "RTX3070 ti", description: "big", price: "700", quantity: "30", brand: "NVidia", tag: "graphics card" },
      { name: "RTX3060 ti", description: "big", price: "400", quantity: "11", brand: "NVidia", tag: "graphics card" },
      //motherboards
      { name: "TUF GAMING X570-PLUS", description: "silicon", price: "200", quantity: "150", brand: "Asus", tag: "motherboard" },
      { name: "ROG Corsair VIII Extreme", description: "silicon", price: "1300", quantity: "64", brand: "Asus", tag: "motherboard" },
      { name: "MAXIMUS VIII FORMULA", description: "silicon", price: "2600", quantity: "30", brand: "Asus", tag: "motherboard" },
      { name: "Z390 Extreme4", description: "silicon", price: "800", quantity: "50", brand: "ASRock", tag: "motherboard" },
      { name: "B550M Pro4", description: "silicon", price: "105", quantity: "202", brand: "ASRock", tag: "motherboard" },
      { name: "X670 GAMING X AX", description: "silicon", price: "337", quantity: "64", brand: "Gigabyte", tag: "motherboard" },
      { name: "MAG Z390 TOMAHAWK", description: "silicon", price: "311", quantity: "78", brand: "MSI", tag: "motherboard" },
      //processors

      { name: "Ryzen 7 5800X", description: "Dont bend my pins", price: "208", quantity: "64", brand: "AMD", tag: "processor" },
      { name: "Ryzen 5 5600X", description: "Dont bend my pins", price: "158", quantity: "124", brand: "AMD", tag: "processor" },
      { name: "Core i9-13900K", description: "Dont bend my pins", price: "559", quantity: "92", brand: "Intel", tag: "processor" },
      { name: "Core i5-13600K", description: "Dont bend my pins", price: "309", quantity: "144", brand: "Intel", tag: "processor" },
      { name: "Xeon E5-4650", description: "Dont bend my pins", price: "4229", quantity: "3", brand: "Intel", tag: "processor" },
      //cases
      //full
      { name: "Montech X3", description: "It's a Case", price: "69", quantity: "23", brand: "Montech", tag: "full case" },
      { name: "Phanteks Eclipse", description: "It's a Case", price: "69", quantity: "23", brand: "Phanteks", tag: "full case" },
      { name: "Rosewill PRISM S500", description: "It's a Case", price: "54", quantity: "16", brand: "Rosewill", tag: "full case" },
      { name: "Cougar CONQUER 2 ATX", description: "It's a Case", price: "349", quantity: "20", brand: "Cougar", tag: "full case" },
      { name: "LIAN LI O11 Dynamic EVO", description: "It's a Case", price: "189", quantity: "34", brand: "LIAN LI", tag: "full case" },
      { name: "Fractal Design Torrent RGB", description: "It's a Case", price: "229", quantity: "15", brand: "Fractal", tag: "full case" },
      { name: "Corsair 4000D", description: "It's a Case", price: "104", quantity: "24", brand: "Corsair", tag: "full case" },
      { name: "KEDIERS Innovative", description: "It's a Case", price: "179", quantity: "12", brand: "KEDIERS", tag: "full case" },
      //micro
      { name: "JONSBO D30", description: "It's a smaller Case", price: "96", quantity: "45", brand: "JONSBO", tag: "micro case" },
      { name: "Thermaltake Versa H17", description: "It's a smaller Case", price: "45", quantity: "12", brand: "Thermaltake", tag: "micro case" },
      { name: "Deepcool MACUBE 110", description: "It's a smaller Case", price: "59", quantity: "18", brand: "Deepcool", tag: "micro case" },
      { name: "Fractal Design Pop Mini Air", description: "It's a smaller Case", price: "89", quantity: "34", brand: "Fractal", tag: "micro case" },
      //ram
      { name: "TEAM XTREEM ARGB 16GB DDR4 - 3600 C14", description: "The best DDR4 RAM for gaming", price: "80", quantity: "69", brand: "TEAMGROUP T - FORCE", tag: "memory" },
      { name: "G.Skill Ripjaws V 16GB DDR4 - 3600", description: "The best budget DDR4 RAM for gaming", price: "57", quantity: "23", brand: "G.Skill", tag: "memory" },
      { name: "G.Skill Trident Z5 RGB 2x16GB DDR5 - 7200MHz CL34", description: "The best DDR5 RAM for gaming", price: "260", quantity: "23", brand: "G.Skill", tag: "memory" },
      { name: "Corsair Vengeance 32GB DDR5 - 4800MHz", description: "The best DDR5 for a budget system", price: "115", quantity: "23", brand: "Corsair", tag: "memory" },
      //storage
      { name: "970 Evo Plus", description: "M.2 1TB", price: "79", quantity: "204", brand: "Samsung", tag: "storage" },
      { name: "980 Plus", description: "M.2 2TB", price: "159", quantity: "124", brand: "Samsung", tag: "storage" },
      { name: "Barracuda", description: "7200 RPM", price: "50", quantity: "350", brand: "Seagate", tag: "storage" },
      { name: "NV2", description: "M.2 1TB", price: "50", quantity: "302", brand: "Kingston", tag: "storage" },
      { name: "Caviar Blue", description: "7200 RPM", price: "33", quantity: "360", brand: "Western Digital", tag: "storage" },
      //power sup
      { name: "RM850x", description: "850W", price: "150", quantity: "204", brand: "Corsair", tag: "power supply" },
      { name: "RM1000x", description: "1000W", price: "189", quantity: "187", brand: "Corsair", tag: "power supply" },
      { name: "Toughpower GX2", description: "600W", price: "50", quantity: "202", brand: "Thermaltake", tag: "power supply" },
      { name: "SuperNOVA 750 GT", description: "750W", price: "109", quantity: "304", brand: "EVGA", tag: "power supply" },
      { name: "HELA", description: "2050W", price: "686", quantity: "50", brand: "Silverstone", tag: "power supply" },
      //cpu cooling
      { name: "Corsair iCUE H100i RGB Pro XT, 240mm Radiator", description: "240mm Liquid CPU cooler", price: "130", quantity: "69", brand: "Corsair", tag: "cpu cooling" },
      { name: "NZXT Kraken Z63 280mm - RL - KRZ63 - 01 - AIO RGB CPU Liquid Cooler", description: "280mm CPU Liquid Cooler with Customizable LCD Display", price: "260", quantity: "23", brand: "NZXT", tag: "cpu cooling" },
      { name: "EVGA CLCx 280mm 2X 140mm PWM ARGB Fans, Intel, AMD, 5 YR Warranty, 400 - HY - CX28 - V1", description: "280mm All-in-One LCD CPU Liquid Cooler", price: "270", quantity: "23", brand: "EVGA", tag: "cpu cooling" },
      { name: "Vetroo V240 Liquid CPU Cooler", description: "Liquid cool", price: "89", quantity: "13", brand: "Vetroo", tag: "cpu cooling" },
      //fans
      { name: "iCUE QL120 RGB 3-pack", description: "120mm", price: "107", quantity: "320", brand: "Corsair", tag: "case fan" },
      { name: "iCUE SP120 RGB ELITE 3-pack", description: "120mm", price: "72", quantity: "69", brand: "Corsair", tag: "case fan" },
      { name: "AF120 3-pack", description: "120mm", price: "35", quantity: "410", brand: "Corsair", tag: "case fan" },
      { name: "UNI SL120 3-pack", description: "120mm", price: "80", quantity: "23", brand: "Lian Li", tag: "case fan" },
      { name: "Ax25 chromax", description: "120mm", price: "32", quantity: "150", brand: "Noctua", tag: "case fan" },
      { name: "P12", description: "120mm", price: "15", quantity: "354", brand: "ARCTIC", tag: "case fan" },

    ]

    //name,description,price,quantity,brand,tag
    const products = await Promise.all(productsToCreate.map(createProduct))
    console.log('Finished Creating Products')
  } catch (err) {
    throw err;
  }
}

module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  client
};
