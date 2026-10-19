// db.js: everything that talks to IndexedDB lives in this file.
// cart.js calls these functions. YOU write them, one day at a time.
// Each one throws "not built yet" until you replace that line with your code.

const DB_NAME = "shopDB";
let DB_VERSION = 2;

// ALREADY DONE: IndexedDB answers with events (onsuccess / onerror), not promises.
// promisify() wraps a request in a promise so you can use await, like you did with fetch.
function promisify(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ---------- Day 1: Open the database ----------
// Opens shopDB. Makes the "cart" store the first time.
// Gives back (a promise for) the open database.
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("cart")) {
        db.createObjectStore("cart", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("wishlist")) {
        db.createObjectStore("wishlist", { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("cart") || !db.objectStoreNames.contains("wishlist")) {
        db.close();

        const deleteRequest = indexedDB.deleteDatabase(DB_NAME);
        deleteRequest.onsuccess = () => resolve(openDB());
        deleteRequest.onerror = () => reject(deleteRequest.error);
        deleteRequest.onblocked = () => {
          reject(new Error("The old database is still open in another tab. Close it and try again."));
        };
        return;
      }

      resolve(db);
    };

    request.onerror = () => reject(request.error);
  });
}

// ---------- Day 2: CREATE ----------
// product: one object from PRODUCTS.
// Puts it in the cart with qty 1, or adds 1 to qty if it's already there.
async function addToCart(product) {
  const db = await openDB();
  const cartStore = db.transaction("cart", "readwrite").objectStore("cart");

  const item = await promisify(cartStore.get(product.id));

  if (item) {
    item.qty += 1;
    await promisify(cartStore.put(item));
  } else {
    await promisify(cartStore.add({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      qty: 1
    }));
  }
}

// ---------- Day 2: READ ----------
// Gives back an array of every item in the cart.
async function getCart() {
  //read only, getall(product.id)
  const db = await openDB();
  const cartStore = db.transaction("cart", "readonly").objectStore("cart");
  const items = await promisify(cartStore.getAll());
  console.log(items);
  return items;

}

// ---------- Day 2: UPDATE ----------
// id: which item. amount: 1 or -1.
// Changes that item's qty by amount.
async function changeQuantity(id, amount) {
    const db = await openDB() 
    const store = db.transaction("cart", "readwrite").objectStore("cart")

    const item = await promisify(store.get(id))
    item.qty = item.qty + amount

    if (item.qty < 1) removeFromCart(id);
    await promisify(store.put(item))
  }

// ---------- Day 3: DELETE ----------
// id: which item. Takes it out of the cart.
async function removeFromCart(id) {
  
  const db = await openDB() 
  const store = db.transaction("cart", "readwrite").objectStore("cart")
  await promisify(store.delete(id))


}

// Empties the whole cart.
async function clearCart() {

  const db = await openDB() 
  const store = db.transaction("cart", "readwrite").objectStore("cart")
  await promisify(store.clear())

}

// ---------- Day 3: Saved for later ----------
async function addToWishlist(product) {
  const db = await openDB();
  const wishlistStore = db.transaction("wishlist", "readwrite").objectStore("wishlist");

  const item = await promisify(wishlistStore.get(product.id));

  if (!item) {
    await promisify(wishlistStore.add({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
    }));
  }
}

async function getWishlist() {
  const db = await openDB();
  const wishlistStore = db.transaction("wishlist", "readonly").objectStore("wishlist");
  return await promisify(wishlistStore.getAll());
}

async function removeFromWishlist(id) {
  const db = await openDB();
  const wishlistStore = db.transaction("wishlist", "readwrite").objectStore("wishlist");
  await promisify(wishlistStore.delete(id));
}

// ---------- Challenge (optional) ----------
async function moveToCart(id) {
  throw new Error("moveToCart() is the optional challenge");
}
