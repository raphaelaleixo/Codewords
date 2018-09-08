<template>
    
    <div class="welcome-screen wrapper">
        <div class="ludoratory header">
            <img class="ludoratory__logo" src="../assets/ludoratory.svg"/>
        </div>
        <div class="welcome-screen__header main">
            <h1 class="welcome-screen__title">Code&#8203;words</h1>
            <h2 class="welcome-screen__subtitle">{{t('A web-based version of Vlaada Chvátil’s party game')}}</h2>
            <div class="welcome-screen__actions">
                <button class="welcome-screen__button button" @click="join()">{{t('join game')}}</button>
                <button class="welcome-screen__button button" @click="createGame()">{{t('new game')}}</button>
            </div>
        </div>
    </div>
</template>

<script>


import Words from '../data/Words';
import Words_ptbr from '../data/Words_ptbr';
import {getRandom} from '../utils/utils';
import {database} from '../utils/utils';

export default {
    data () {
        return {
            codemasterAllegiance:'blue',
            words: {
                default: getRandom(Words,25),
                pt_br: getRandom(Words_ptbr,25)
            },
            devices: 1
        }
    },
    computed: {
        firstTurn() {
            return parseInt(Math.random() * 2) === 0 ? "red" : "blue";
        },
        translatedWords() {
            if (this.$translate.lang==='pt_br') 
                return this.words.pt_br
            else 
                return this.words.default    
        },
        map() {
            const colorMap = [];
            for (let i = 0; i < this.translatedWords.length - 2; i++) {
            if (i % 3 === 0) colorMap.push("red");
                else if (i % 3 === 1) colorMap.push("blue");
                else colorMap.push("neutral");
            }
            colorMap.push("assassin");
            colorMap.push(this.firstTurn);
            return [...getRandom(colorMap,25)];
        },
        room() {
            return Math.random().toString(36).substr(2, 5);
        },
        cards() {
            const self = this;
            return this.translatedWords.map((word, index) => ({
                id: index,
                word: word,
                allegiance: self.map[index],
                visibility: "hidden",
                isSelected: false
            }));
        }
    },
    methods: {
        join() {
            this.$router.push('/join');
        },
        getWords() {
           this.words = getRandom(Words,25);
        },
        createGame() {
            const self = this;
            database.ref('games').push().set(
                {
                    room: this.room,
                    devices: this.devices,
                    cards: this.cards,
                    firstTurn: this.firstTurn,
                    turn:0,
                    code: {
                        select: 'word',
                        word: '',
                        count: 1,
                    }
                }, function(err) {
                    if (err) {
                        return
                    } else {
                        self.$router.push('/game/'+self.room+'/codebreaker')
                    }
                }
            );
        }
    },
    locales: {
        pt_br: {
            'A web-based version of Vlaada Chvátil’s party game' : 'Uma versão web do party game de Vlaada Chvátil',
            'join game' : 'entrar num jogo',
            'new game' : 'novo jogo' 
        }
    },
    mounted() {
        if (this.$route.query.lang==='pt_br') {
            this.$translate.setLang('pt_br');
        }
    }
}
</script>