<template>
    <div class="codemaster-ui" :class="turn">
        <template v-if="select==='word'">
            <div class="codemaster-ui__keyboard keyboard"
            :class="{'keyboard_disabled':disabled}">
                <div class="keyboard__keyrow" v-for="(row,index) in keys" :key="index">
                    <a v-for="(key, index) in row.row"
                            class="keyboard__key"
                            :class="{'keyboard__key_delete':key==='delete'}"
                            :key="index"
                            @click="keystroke(key)">
                            <template v-if="key==='delete'">
                                <svg class="delete-key-icon" style="width:24px;height:24px" viewBox="0 0 24 24">
                                    <path d="M22,3H7C6.31,3 5.77,3.35 5.41,3.88L0,12L5.41,20.11C5.77,20.64 6.31,21 7,21H22A2,2 0 0,0 24,19V5A2,2 0 0,0 22,3M19,15.59L17.59,17L14,13.41L10.41,17L9,15.59L12.59,12L9,8.41L10.41,7L14,10.59L17.59,7L19,8.41L15.41,12" />
                                </svg>
                            </template>
                            <template v-else>{{key}}</template>
                    </a>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="codemaster-ui__count count">
                <div class="count__text">How many cards?</div>
                <div class="count__input">
                    <button class="count__button count__button_remove"
                        :disabled="count===1"
                     @click="decreaseCount">-</button>
                    <span class="count__number">{{count}}</span>
                    <button class="count__button count__button_add"
                    :disabled="count===max"
                     @click="increaseCount">+</button>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import {eventBus} from '../../main';
    export default {
        props: {
            disabled: Boolean,
            turn: String,
            word: String,
            select: String,
            count: Number,
            max: Number,
        },
        data() {
            return {
                keys: [{row: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]},{
                        row: ["a", "s", "d", "f", "g", "h", "j", "k", "l","ç"]}, {
                        row: ["z", "x", "c", "v", "b", "n", "m", "delete"]}]
            }
        },
        methods: {
            vibrate(milisseconds) {
                navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
                if (navigator.vibrate) {
                    navigator.vibrate(milisseconds);
                }
            },
            keystroke(whichKey) {
                const self = this;
                self.vibrate(20);
                if (whichKey === 'delete') {
                    eventBus.$emit('codeChanged',{
                        word: self.word.length > 0 ? self.word.substring(0, self.word.length - 1) : self.word,
                        select: self.select,
                        count: self.count
                    })
                } else {
                    if (self.word.length < 16) {
                        eventBus.$emit('codeChanged',{
                            word: self.word + whichKey,
                            select: self.select,
                            count: self.count
                        });
                    }
                }
            },
            decreaseCount() {
                this.vibrate(20);
                eventBus.$emit('codeChanged',{
                    word: this.word,
                    select: this.select,
                    count: this.count > 1 ? this.count - 1 : this.count
                });
            },
            increaseCount() {
                this.vibrate(20);
                eventBus.$emit('codeChanged',{
                    word: this.word,
                    select: this.select,
                    count: this.count < this.max ? this.count + 1 : this.count
                });
            }
        }
    }
</script>

<style lang="scss">
    .codemaster-ui {
        margin: 1em 0;
    }
    .code {
        font-size: 1.875em;
        font-weight: 900;
        letter-spacing: -1px;
        text-align: center;
    }
    .code__placeholder {
        color: #b8b89c;
    }
    
    .codemaster-ui__count {
        margin:1em 0;
    }

    .count__text {
        text-align: center;
        font-weight: 900;
        text-transform: uppercase;
    }

    .count__input {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

</style>
