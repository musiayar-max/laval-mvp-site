{
  "name": "laval-mvp-site",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "python3 -m http.server 8765",
    "check": "node --check configurator/app.js && node --check configurator/data/options.js"
  }
}