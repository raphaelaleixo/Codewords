# Codewords: A real-time, multiplayer boardgame on the web.

![codewords](https://cdn-images-1.medium.com/max/2000/1*K75ZxWCscKV-k7xzYxhxpQ.jpeg)

I am a huge boardgame fan and collector. Also, I am an UX designer and game designer. I’d been thinking for a while now that I could mix these things into creating digital boardgames.

My idea was that I could make a big screen (as a computer monitor, or — even better — a living room TV) work as the common board, shared by all players, and use the players’ mobile phones as their pieces and method of interaction.

As I said, I love boardgames and I love the social interaction that they allow. I also love the physical component that they have. But I do understand that they take a huge space in any house. And many times they are hard to get, and they are troublesome to transport to places.

So I thought that these digital boardgames could be a fun alternative to a game someone could not yet buy, or as a game you could play anywhere with internet access.

## Creating the Ludoratory
Another passion that I have is coding. Since I was very little I was messing around with BASIC, and now as a designer I am always trying to understand more about coding for the web.

Over the last months I’ve been studying some javascript frameworks — like Vue and React — and I decided I could try to make these games come to life.

For this, I am starting a series of games under the “Ludoratory” brand: They will be experiments with web development and game design. Every game is meant to be free to play, no ads or tracking, and with an open source code. I hope that I can learn with them while making something fun for other people.

## Codewords
Codenames, by Vlaada Chvátil, was my first target for my Ludoratory.

If you haven’t played it yet, I recommend you to try to get a copy as soon as you can, because it is an amazing game.

My take on it, Codewords, is a realtime multiplayer version of that boardgame, where the big screen holds all the words, and the mobile phones are used as the codemaster’s map. There are some little changes from the original game (I built the game using the house rules that we play), so I’ve written a short article explaining the rules here.

### Credits
I’ve made the design and coding for the game using some help from frameworks, libraries and resources:

- [Vue.js](https://vuejs.org/) for the front-end, using Vue-Cli, with PWA support.
- [Firebase](http://firebase.google.com) for managing the real-time updates.
- [Vue QRCode](https://github.com/xkeshi/vue-qrcode), by xkeshi, for creating QRCodes for each new game.
- [Vue Translate](https://github.com/javisperez/vuetranslate), by javisperez, to allow the game to be played both in English or Portuguese.
- [Shadow obscure male face photo](https://unsplash.com/photos/xgxzqRpK0UE), by Malik Earnest, for the background image.
- [CSS Glitch effect](https://tympanus.net/codrops/2017/12/21/css-glitch-effect/), by Mary Lou on Codrops, also for the background image.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


## That’s it!
You can play the game now at https://codewords.ludoratory.com. As I said, the code is on github. I am eager to hear any critiques, doubts, comments and suggestions you might have about the game, my code or the Ludoratory project.

Thank you, and I hope you enjoy the game.