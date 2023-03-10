const client = require('./client');
const {
  getUserByToken,
  createUser,
  authenticate
} = require('./User');
const { createProduct } = require('./Products');
const { createCart } = require('./Cart')
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
    is_active BOOLEAN DEFAULT true,
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
  await createInitialUsersAndCarts();
  await createInitialProducts();

};

const createInitialUsersAndCarts = async () => {
  try {
    console.log('Starting Create Users')
    const [ethan, prof, adam, daniel, ithndr, sid] =
      await Promise.all([
        createUser({
          username: 'Ethan',
          password: 'Deadbattery1',
          isAdam: true,
        }),
        createUser({
          username: 'Prof',
          password: 'Pradaroundmyneck420',
          isAdam: false,
        }),
        createUser({
          username: 'Adam',
          password: 'IsAdam8',
          isAdam: false,
        }),
        createUser({
          username: 'Daniel',
          password: 'Theboywholived5',
          isAdam: false,
        }),
        createUser({
          username: 'Ithndr',
          password: 'password',
          isAdam: true,
        }),
        createUser({
          username: 'Sid',
          password: 'asdf1234',
          isAdam: true,
        }),
      ]);
    console.log('Finished Creating Users');
    const [ethanCart, profCart, adamCart, danielCart, ithndrCart, sidCart] = await Promise.all([
      createCart(ethan.id),
      createCart(prof.id),
      createCart(adam.id),
      createCart(daniel.id),
      createCart(ithndr.id),
      createCart(sid.id),
    ]);


  } catch (err) {
    throw err;
  }
}

// const createInitialCart = () => {
//   try {
//     console.log('Creating Carts for Users');
//     const cartsToCreate = [

//     ]
//   } catch (err) {
//     throw err;
//   }
// }

const createInitialProducts = async () => {
  try {
    console.log('Starting Create Products')
    const productsToCreate = [
      //graphics cards
      { name: "RTX 4090", description: "Might need a larger case", price: "2300", quantity: "4", brand: "NVidia", tag: "graphics card", image: "https://assets.nvidia.partners/images/png/GeForce-RTX4090-Back.png" },
      { name: "RTX 4080", description: "big", price: "1500", quantity: "31", brand: "NVidia", tag: "graphics card", image: "https://assets.nvidia.partners/images/png/GeForce-RTX4080-Back.png" },
      { name: "TUF Gaming RTX 4070 ti", description: "big", price: "800", quantity: "52", brand: "Asus", tag: "graphics card", image: "https://assets.nvidia.partners/images/png/TUF-RTX4070TI-12G-GAMING.png" },
      { name: "RTX 4060", description: "big", price: "500", quantity: "58", brand: "MSI", tag: "graphics card", image: "https://c1.neweggimages.com/ProductImage/14-137-778-04.jpg" },
      { name: "RTX 3090 ti", description: "big", price: "1700", quantity: "7", brand: "Zotac Gaming", tag: "graphics card", image: "https://assets.nvidia.partners/images/png/ZT-A30910B-10P.png" },
      { name: "TUF Gaming RTX 3080", description: "big", price: "1200", quantity: "12", brand: "NVidia", tag: "graphics card", image: "https://c1.neweggimages.com/ProductImageCompressAll1280/14-126-611-13.jpg" },
      { name: "RTX 3070 ti", description: "big", price: "700", quantity: "30", brand: "Zotac Gaming", tag: "graphics card", image: "https://assets.nvidia.partners/images/png/zt-a30710b-10p.png" },
      { name: "RTX 3060 ti", description: "big", price: "400", quantity: "11", brand: "Zotac Gaming", tag: "graphics card", image: "https://assets.nvidia.partners/images/png/zt-a30610h-10mlhr.png" },
      //motherboards
      { name: "TUF GAMING X570-PLUS", description: "silicon", price: "200", quantity: "150", brand: "Asus", tag: "motherboard", image: "https://m.media-amazon.com/images/I/710hyHWebnL._AC_SX679_.jpg" },
      { name: "ROG Corsair VIII Extreme", description: "silicon", price: "1300", quantity: "64", brand: "Asus", tag: "motherboard", image: "https://m.media-amazon.com/images/I/61vRh8Ef+dL._AC_SX466_.jpg" },
      { name: "MAXIMUS VIII FORMULA", description: "silicon", price: "2600", quantity: "30", brand: "Asus", tag: "motherboard", image: "https://dlcdnwebimgs.asus.com/gain/BD399B9E-1BE7-4B03-A95C-4CD91285D20F/w717/h525" },
      { name: "Z390 Extreme4", description: "silicon", price: "800", quantity: "50", brand: "ASRock", tag: "motherboard", image: "https://c1.neweggimages.com/ProductImageCompressAll1280/13-162-091-09.png" },
      { name: "B550M Pro4", description: "silicon", price: "105", quantity: "202", brand: "ASRock", tag: "motherboard", image: "https://c1.neweggimages.com/ProductImageCompressAll1280/13-119-580-V01.jpg" },
      { name: "X670 GAMING X AX", description: "silicon", price: "337", quantity: "64", brand: "Gigabyte", tag: "motherboard", image: "https://c1.neweggimages.com/ProductImageCompressAll1280/13-145-429-01.jpg" },
      { name: "MAG Z390 TOMAHAWK", description: "silicon", price: "311", quantity: "78", brand: "MSI", tag: "motherboard", image: "https://i5.walmartimages.com/asr/3edb3a33-265f-4ae6-bbaf-527d69e777e1_1.10c5d98579470fb000bd68c73b1799d2.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF" },
      //processors
      { name: "Ryzen 9 7900X3D", description: "Dont bend my pins", price: "600", quantity: "25", brand: "AMD", tag: "processor", image: "https://cdn11.bigcommerce.com/s-7g81zn9sor/images/stencil/640w/products/145/432/1890565-Ryzen-9-7900X-3d__27777.1677595912.png?c=1" },
      { name: "Ryzen 7 7700X", description: "Dont bend my pins", price: "350", quantity: "64", brand: "AMD", tag: "processor", image: "https://cdn11.bigcommerce.com/s-7g81zn9sor/images/stencil/640w/products/138/429/1890565-Ryzen-7-7000-series__52677.1676573320.png?c=1" },
      { name: "Ryzen 5 7600X", description: "Dont bend my pins", price: "250", quantity: "124", brand: "AMD", tag: "processor", image: "https://cdn11.bigcommerce.com/s-7g81zn9sor/images/stencil/640w/products/139/428/1890565-Ryzen-5-7000-series__75989.1676573298.png?c=1" },
      { name: "Core i9-13900K", description: "Dont bend my pins", price: "559", quantity: "92", brand: "Intel", tag: "processor", image: "https://m.media-amazon.com/images/I/61uI+orDOZL._AC_SX466_.jpg" },
      { name: "Core i5-13600K", description: "Dont bend my pins", price: "309", quantity: "144", brand: "Intel", tag: "processor", image: "https://m.media-amazon.com/images/I/61ObMmbxwgL._AC_SX466_.jpg" },
      { name: "Xeon E5-4650", description: "Dont bend my pins", price: "4229", quantity: "3", brand: "Intel", tag: "processor", image: "https://images-na.ssl-images-amazon.com/images/I/51RJN9DPC5L.jpg" },
      //cases
      //full
      { name: "X3", description: "It's a Case", price: "69", quantity: "23", brand: "Montech", tag: "full case", image: "https://www.montechpc.com/Upload/product/product_d_202105051125202.png" },
      { name: "Eclipse", description: "It's a Case", price: "69", quantity: "23", brand: "Phanteks", tag: "full case", image: "https://phanteks.com/images/product/Eclipse-G500A/D-RGB%20Black/1.jpg" },
      { name: "PRISM S500", description: "It's a Case", price: "54", quantity: "16", brand: "Rosewill", tag: "full case", image: "https://cdna.pcpartpicker.com/static/forever/images/product/06367b49bbcb91c3a57c64b0f0f09bf1.1600.jpg" },
      { name: "CONQUER 2 ATX", description: "It's a Case", price: "349", quantity: "20", brand: "Cougar", tag: "full case", image: "https://cougargaming.com/_cgrwdr_/wwdpp/wp-content/uploads/2019/11/product-section-01.png" },
      { name: "O11 Dynamic EVO", description: "It's a Case", price: "189", quantity: "34", brand: "LIAN LI", tag: "full case", image: "https://lian-li.com/wp-content/uploads/2021/12/evo-600-000.jpg" },
      { name: "Torrent RGB", description: "It's a Case", price: "229", quantity: "15", brand: "Fractal Design", tag: "full case", image: "https://www.fractal-design.com/app/uploads/2022/11/Torrent_White_RGB_TGC_1-Left-Front.jpg" },
      { name: "4000D", description: "It's a Case", price: "104", quantity: "24", brand: "Corsair", tag: "full case", image: "https://www.corsair.com/us/en/medias/sys_master/images/images/h55/h3e/9631023235102/base-4000d-airflow-config/Gallery/4000D_AF_BLACK_01/-base-4000d-airflow-config-Gallery-4000D-AF-BLACK-01.png_1200Wx1200H" },
      { name: "Innovative", description: "It's a Case", price: "179", quantity: "12", brand: "KEDIERS", tag: "full case", image: "https://c1.neweggimages.com/ProductImageCompressAll1280/B17TS2209150GANQ3A9.jpg" },
      //micro
      { name: "D30", description: "It's a smaller Case", price: "96", quantity: "45", brand: "JONSBO", tag: "micro case", image: "https://c1.neweggimages.com/ProductImageCompressAll1280/AY3SS22091508IMJA36.jpg" },
      { name: "Versa H17", description: "It's a smaller Case", price: "45", quantity: "12", brand: "Thermaltake", tag: "micro case", image: "https://thermaltake-usa.azureedge.net/media/catalog/product/cache/6d056a87c91b88ea869075bcdd058dec/db/imgs/pdt/angle/CA-1J1-00S1NN-00_962e6fa7aca4476cbd8b82c0ef45644f.jpg" },
      { name: "MACUBE 110", description: "It's a smaller Case", price: "59", quantity: "18", brand: "Deepcool", tag: "micro case", image: "https://cdn.deepcool.com/public/ProductFile/DEEPCOOL/Cases/MACUBE_110/Gallery/608X760/01.jpg?fm=webp&q=60" },
      { name: "Pop Mini Air", description: "It's a smaller Case", price: "89", quantity: "34", brand: "Fractal Design", tag: "micro case", image: "https://www.fractal-design.com/app/uploads/2022/06/Pop_Mini_Air_RGB_Black_TGC_1-Front-Left.jpg" },
      //ram
      { name: "TEAM XTREEM ARGB 16GB DDR4 - 3600 C14", description: "The best DDR4 RAM for gaming", price: "80", quantity: "69", brand: "TEAMGROUP T - FORCE", tag: "memory", image: "https://c1.neweggimages.com/ProductImageCompressAll1280/20-331-592-V01.jpg" },
      { name: "Ripjaws V 16GB DDR4 - 3600", description: "The best budget DDR4 RAM for gaming", price: "57", quantity: "23", brand: "G.Skill", tag: "memory", image: "https://c1.neweggimages.com/ProductImageCompressAll1280/20-231-941-03.jpg" },
      { name: "Trident Z5 RGB 2x16GB DDR5 - 7200MHz CL34", description: "The best DDR5 RAM for gaming", price: "260", quantity: "23", brand: "G.Skill", tag: "memory", image: "https://m.media-amazon.com/images/I/51c+p6RY+AL._AC_SX679_PIbundle-2,TopRight,0,0_SH20_.jpg" },
      { name: "Vengeance 32GB DDR5 - 4800MHz", description: "The best DDR5 for a budget system", price: "115", quantity: "23", brand: "Corsair", tag: "memory", image: "https://www.corsair.com/us/en/medias/sys_master/images/images/h08/h42/10243306029086/vengeance-ddr5-blk-config/Gallery/Vengeance-DDR5-2UP-16GB-BLACK_01/-vengeance-ddr5-blk-config-Gallery-Vengeance-DDR5-2UP-16GB-BLACK-01.png_1200Wx1200H" },
      //storage
      { name: "970 Evo Plus", description: "M.2 1TB", price: "79", quantity: "204", brand: "Samsung", tag: "storage", image: "https://image-us.samsung.com/SamsungUS/home/computing/memory-and-monitors/9-27-21/mz-v7s2t0b-am-gallery/MZ-V7S2T0BW_001.jpg?$product-details-jpg$" },
      { name: "980 Plus", description: "M.2 2TB", price: "159", quantity: "124", brand: "Samsung", tag: "storage", image: "https://image-us.samsung.com/SamsungUS/samsungbusiness/products/computing/ssd/client/980-pro/2tb/MZ-V8P2T0BW_001_Front_Black.jpg?$product-details-jpg$" },
      { name: "Barracuda", description: "7200 RPM 5TB", price: "50", quantity: "350", brand: "Seagate", tag: "storage", image: "https://www.seagate.com/content/dam/seagate/migrated-assets/www-content/products/hard-drives/barracuda-hard-drive/_shared/images/barracuda-2-5-5tb-hero-left-400x400.png" },
      { name: "NV2", description: "M.2 1TB", price: "50", quantity: "302", brand: "Kingston", tag: "storage", image: "https://m.media-amazon.com/images/I/71NfMZKkpQL._AC_SL1500_.jpg" },
      { name: "Caviar Blue 500GB", description: "7200 RPM", price: "33", quantity: "360", brand: "Western Digital", tag: "storage", image: "https://www.westerndigital.com/content/dam/store/en-us/assets/products/internal-storage/wd-blue-desktop-sata-hdd/gallery/wd-blue-pc-desktop-hard-drive-500gb.png.wdthumb.1280.1280.webp" },
      //power sup
      { name: "RM850x", description: "850W", price: "150", quantity: "204", brand: "Corsair", tag: "power supply", image: "https://www.corsair.com/medias/sys_master/images/images/h61/hc6/9112034574366/-CP-9020180-NA-Gallery-RM850x-PSU-01.png" },
      { name: "RM1000x", description: "1000W", price: "189", quantity: "187", brand: "Corsair", tag: "power supply", image: "https://www.corsair.com/medias/sys_master/images/images/haf/h5b/9110020456478/-CP-9020094-NA-Gallery-RMx-1000-01.png" },
      { name: "Toughpower GX2", description: "600W", price: "50", quantity: "202", brand: "Thermaltake", tag: "power supply", image: "https://thermaltake-usa.azureedge.net/media/catalog/product/cache/6d056a87c91b88ea869075bcdd058dec/t/o/toughpowergx2_01.jpg" },
      { name: "SuperNOVA 750 GT", description: "750W", price: "109", quantity: "304", brand: "EVGA", tag: "power supply", image: "https://images.evga.com/products/gallery/png/220-GT-0750-Y1_LG_1.png" },
      { name: "HELA", description: "2050W", price: "686", quantity: "50", brand: "Silverstone", tag: "power supply", image: "https://www.silverstonetek.com/upload/detail/pro_20220419044017_0.jpg" },
      //cpu cooling
      { name: "iCUE H100i RGB Pro XT, 240mm Radiator", description: "240mm Liquid CPU cooler", price: "130", quantity: "69", brand: "Corsair", tag: "cpu cooling", image: "https://www.corsair.com/medias/sys_master/images/images/hcf/h46/9440097304606/-CW-9060043-WW-Gallery-H100i-RGB-PRO-XT-01.png" },
      { name: "Kraken Z63 280mm AIO RGB CPU Liquid Cooler", description: "280mm CPU Liquid Cooler with Customizable LCD Display", price: "260", quantity: "23", brand: "NZXT", tag: "cpu cooling", image: "https://nzxt.com/assets/cms/34299/1631207832-kraken-z63-rgb-white-keyshot.png?auto=format&fit=crop&h=1000&w=1000" },
      { name: "CLCx 280mm", description: "280mm All-in-One LCD CPU Liquid Cooler", price: "270", quantity: "23", brand: "EVGA", tag: "cpu cooling", image: "https://images.evga.com/products/gallery/png/400-HY-CX28-V1_LG_1.png" },
      { name: "V240 Liquid CPU Cooler", description: "Liquid cool", price: "89", quantity: "13", brand: "Vetroo", tag: "cpu cooling", image: "https://cdn.shopify.com/s/files/1/0400/9266/3973/products/1500x1500-2_01_71b73202-f7ab-4af8-af3a-d8a176fba16d_1024x1024.jpg?v=1667528491" },
      //fans
      { name: "iCUE QL120 RGB 3-pack", description: "120mm", price: "107", quantity: "320", brand: "Corsair", tag: "case fan", image: "https://www.corsair.com/medias/sys_master/images/images/h48/h80/9452610355230/-CO-9050098-WW-Gallery-QL120-RGB-01.png" },
      { name: "iCUE SP120 RGB ELITE 3-pack", description: "120mm", price: "72", quantity: "69", brand: "Corsair", tag: "case fan", image: "https://www.corsair.com/us/en/medias/sys_master/images/images/h64/h3d/10167064297502/base-sp-elite-config/Gallery/MIC_SP120_RGB_ELITE_TRIPLE_01/-base-sp-elite-config-Gallery-MIC-SP120-RGB-ELITE-TRIPLE-01.png_1200Wx1200H" },
      { name: "AF120 3-pack", description: "120mm", price: "35", quantity: "410", brand: "Corsair", tag: "case fan", image: "https://www.corsair.com/medias/sys_master/images/images/h8a/h1f/9160260616222/-CO-9050082-WW-Gallery-AF120-01-WHITE.png" },
      { name: "UNI SL120 3-pack", description: "120mm", price: "80", quantity: "23", brand: "Lian Li", tag: "case fan", image: "https://lian-li.com/wp-content/uploads/2020/08/Cooling.index_.unifanSL.jpg" },
      { name: "Ax25 chromax", description: "120mm", price: "32", quantity: "150", brand: "Noctua", tag: "case fan", image: "https://noctua.at/pub/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/n/f/nf_a12_x_25_chromax_black_swap_1_1.jpg" },
      { name: "P12", description: "120mm", price: "15", quantity: "354", brand: "ARCTIC", tag: "case fan", image: "https://www.arctic.de/media/2a/94/3d/1583492057/P12_PWM_white_white_G00.png" },
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
