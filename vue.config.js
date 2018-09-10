module.exports = {
  configureWebpack: {
    entry: ["babel-polyfill", "./src/main.js"]
  },
  pwa: {
    name: 'Codewords',
    themeColor: '#000000',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
  }
}
