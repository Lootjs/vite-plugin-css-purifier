# CSS Purifier

## Vite Plugin for CSS Size Reduction

### Installation

```
npm i css-purifier --save-dev
```

### Usage

In your Vite configuration, import the plugin:
```javascript
import { cssPurifier } from 'css-purifier';
```

Then invoke the plugin:
```javascript
plugins: [
  cssPurifier(pureCssConfig),
]

```

### Plugin Configuration
The plugin accepts a JavaScript object of the following format:

- input - `string`. The name of the file you want to purify.
- output - `string`. The name of the file that will be created from the input.
- selectors - `(string|RegExp)[]`. Selectors that need to be retained from input to output. For example, ['.btn']. To indicate that a selector can be in any part of the selector, you can use this approach: selectors: ['.some-class', /popup/]. This will work on any classes that contain the word popup.
- shouldPrintOutput - `boolean`. Whether to display the final content in debug mode.
- shouldPrintSelectors - `boolean`. Whether to display selectors in debug mode.

### Example
```javascript
cssPurifier({
    input: 'node_modules/bootstrap/min-style.css',
    output: 'assets/styles/cleaned-bootstrap.css',
    selectors: [
        /popup/, '.heading',
    ],
    shouldPrintOutput: false,
    shouldPrintSelectors: true,
})
```