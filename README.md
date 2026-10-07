# DOM Store - Lab 5

This project extends the JavaScript Core Lab 4 `Store` class with a product-management page built using plain JavaScript and the browser DOM API.

## How to run

Open the project folder in VS Code and open `index.html`. Because the page uses JavaScript modules, run it through a local server instead of double-clicking the file: install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**. No build step is needed.

## Events

The form listens for the `submit` event so it can validate the fields and add a product without reloading the page. The product table has one `click` event listener on its `<tbody>`; this is event delegation, where a click bubbles from a button to its parent and the code uses `closest()` and `data-action` to find the requested action. The form submission prevents the browser's default page reload, then clears the form and displays any validation messages beside the matching fields. Delete and quantity buttons update the existing product in the `Store` (or remove it), then re-render the table and total immediately.

## Screenshot

![LAB 5 Screenshot](screenshots/lab5.png)

Take a screenshot after opening the page and save it as `screenshots/lab5.png`.

## AI Tools Used

AI assistance was used for development, but the final code was reviewed and tested.

## LAB 4 foundation

The page imports the existing `Store` class from `src/Store.js` and keeps each product in the LAB 4 shape: `{ id, name, price, qty }`. The existing Store API and its tests are unchanged. The LAB 4 utility functions, `SortedStore`, and the 22 Vitest tests remain part of this project.

Run the existing tests with:

```bash
npm test -- --run
```
