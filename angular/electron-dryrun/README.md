# Angular-Electron Compatibility

## Details

This directory checks for cross-compatibility between **Electron** and **Angular** on three fronts:

1. CSS Grid
2. Service Workers
3. HTTP2 *Push*

## How to run the tests?

1. Install Electron globally using npm:

    `npm install -g electron`

2. Modify *line 7*  within `main.js` to use the dist (either '*dist:css*', '*dist:sw*' or '*dist:push*') appropriate for the test you want to run, for example:

    `const dist_to_be_used = 'dist:css' //Tests CSS Grid compatibility`

3. Nagivate to the *electron-dryun* folder and run:

    `npm run electron`
