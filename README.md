# Lemara OS
## v0.0.1


2017/10/19

This is a hobby project where I am creating a terminal that can be placed inside webpages like a plugin.
The goal was to create a plug and play type app that can be added to any site as simply as possible.

Note: requires ES6+ to work, uses modules so you need a server/localhost.

## Using

Using the app requires three steps:
1. Link to the css stylesheet `lemara.css`
2. Enter the following javascript in your `main.js` file or inside `script` tags
Note: Path may vary, and variables can be anything, in this case `yourOS` and `yourDisplay`

```javascript
import OS from "./OS.js";
window.yourOS = new OS();
let yourDisplay = document.getElementById('yourDisplay');
yourOS.boot(yourDisplay);
```