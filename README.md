# IndexedDB Shopping Cart Starter

West-MEC Coding Year 2. Your first real database: **IndexedDB**, the database built into every browser.

Over 3 days you build the cart for a merch shop. Add something, close the browser, come back tomorrow: it's still in the cart. No server, no account, no install.

## Setup

1. Open the terminal: **PowerShell**, **Git Bash**, or **Command Prompt** (any one works).
2. Move into your code folder on the Desktop (use your folder's real name):

   ```
   cd Desktop
   cd code
   ```

   Desktop not found? It may be inside OneDrive: `cd OneDrive`, then `cd Desktop`.

3. Clone the shop:

   ```
   git clone https://github.com/Xerrath/indexeddb-cart-starter.git
   ```

4. Open **VS Code** > **File > Open Folder** > Desktop > your code folder > `indexeddb-cart-starter` > **Select Folder**.
5. Install the **Live Server** extension if you don't have it, then right-click `index.html` > **Open with Live Server**. Use **Chrome**.

You should see the shop and a gray line that says `openDB() is not built yet (Day 1)`. That's right: you build it.

## The files

| File | What it is | Do you change it? |
| --- | --- | --- |
| `index.html` | The page (styled with Tailwind CSS classes). | No |
| `global.css` | A little plain CSS for the whole site. | No |
| `products.js` | The six products, as an array of objects. | No |
| `db.js` | **Every** IndexedDB function. | **Yes: this is your file** |
| `images/` | West-MEC logo and shapes. | No |
| `cart.js` | Draws the page and calls the functions in `db.js`. | No (read it!) |

## See your database

Chrome DevTools (F12) > **Application** tab > **Storage** > **IndexedDB** > `shopDB`.
Click the refresh icon above the table after you change data.

## Start over

DevTools > **Application** > **Storage** > **Clear site data**, then refresh the page.

## Stuck?

- **Nothing changes after I edit db.js**: save the file (Ctrl+S). Live Server reloads by itself.
- **The page hangs after I change DB_VERSION**: close every other tab that has the shop open, then refresh.
- **Styles are missing**: Tailwind loads from the internet. Check your connection and refresh.
