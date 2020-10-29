<template>
<client-only v-if="playerShowing">
    <transition name="slide">
        <div class="fixed bottom-0 w-full">
            <div class="custom-background mx-5 my-1 p-2 rounded-lg  ">
                <div class="w-full flex items-center justify-between">
                    <div class="pr-4 flex w-64 items-center">
                        <img :src="url + 'storage/'+ data.image" class="rounded-lg shadow border border-gray-700 object-cover w-16 h-16" alt="tracks">
                        <div class="ml-2 w-full hidden md:block">
                            <h1 class="text-sm font-semibold pb-2 text-white">{{ data.title }}</h1>
                            <div class="flex items-center justify-between">
                                <p class="text-white text-sm" v-if="data.genre">{{ data.genre.name }}</p>
                                <span v-if="liked">
                                    <font-awesome-icon class="text-sm text-white" :icon="['fas', 'heart']" />
                                </span>
                                <span v-else>
                                    <font-awesome-icon class="text-sm text-white" :icon="['far', 'heart']" />
                                </span>

                            </div>
                        </div>
                        <audio ref="player" :src="url + 'storage/'+data.audio_file"></audio>
                    </div>
                    <div class="pr-4 flex items-center xl:mx-5 flex-1">
                        <div>
                            <font-awesome-icon class="text-2xl text-white mr-2  cursor-pointer" :icon="['fas', 'step-backward']" />
                        </div>
                        <div>
                            <font-awesome-icon v-if="isPlaying" @click="pause" class="text-4xl text-white mr-2 cursor-pointer" :icon="['far', 'pause-circle']" />
                            <font-awesome-icon v-else @click="playing" class="text-4xl text-white mr-2  cursor-pointer" :icon="['far', 'play-circle']" />
                        </div>
                        <div>
                            <font-awesome-icon class="text-2xl text-white  cursor-pointer" :icon="['fas', 'step-forward']" />
                        </div>
                    </div>
                    <div class="pr-4 flex items-center">
                        <div class="text-white pr-2 hidden xl:block">{{currentPlayedTime}} </div>
                        <av-waveform class="hidden xl:block" ref-link="player" :canv-width="800" playtime-slider-color="#fafafa" playtime-font-color="white" :canv-height="50" noplayed-line-color="#DBDBDB" playtime-line-color="#DBDBDB" />
                        <div class="text-white pl-2 hidden xl:block">{{duration}}</div>
                    </div>
                    <div class="flex items-center px-2">
                        <div class="md:px-4  xl:px-2">
                            <font-awesome-icon v-if="muted" @click="mute" class="text-2xl text-white cursor-pointer" :icon="['fas', 'volume-down']" />
                            <font-awesome-icon v-else @click="mute" class="text-2xl text-white cursor-pointer" :icon="['fas', 'volume-up']" />
                        </div>
                        <div class="md:px-4 xl:px-2">
                            <cartCounter />
                        </div>
                        <div class="px-4 xl:px-2 hidden md:block">
                            <font-awesome-icon class="text-2xl text-white cursor-not-allowed" :icon="['fas', 'stream']" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </transition>
</client-only>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";
import cartCounter from './cartCounter';
export default {
    components: {
        cartCounter,
    },
    data() {
        return {
            url: process.env.imgUrl,
            audioPlayer: undefined,
            playerShowing: false,
            isPlaying: false,
            data: '',
            durationSeconds: 0,
            currentSeconds: 0,
            muted: false
        }
    },

    watch: {
        'getdata'() {
            this.data = this.getdata;
            if (this.getdata) {
                this.playerShowing = true
                this.isPlaying = true
            }
            setTimeout(() => {
                this.audioPlayer = this.$el.querySelectorAll("audio")[0];
                this.audioPlayer.play();
                this.durationSeconds = parseInt(this.audioPlayer.duration);
                this.audioPlayer.addEventListener("timeupdate", this.updateTimer);
            }, 500)
            if (this.authenticated) {
                this.$store.dispatch('get_liked', {
                    id: this.data.id,
                    user_id: this.user.id
                })
            }

        },
        'getPause'() {
            if (this.getPause) {
                this.audioPlayer.pause();
                this.isPlaying = false
            }
        },
        'getPlay'() {
            if (this.getPlay) {
                setTimeout(() => {
                    this.audioPlayer.play();
                    this.isPlaying = true
                }, 500)
            }
        }
    },
    computed: {
        ...mapGetters({
            getdata: 'audio/getData',
            getPause: 'audio/getPause',
            getPlay: 'audio/getPlay',
            liked: 'liked',
        }),
        currentPlayedTime() {
            return this.formatTime(this.currentSeconds);
        },
        duration() {
            return this.formatTime(this.durationSeconds);
        },
    },
    methods: {
        ...mapActions({
            setPause: 'audio/setPause',
            setPlay: 'audio/setPlay',
        }),
        playing() {
            this.setPlay();
        },
        pause() {
            this.setPause();
        },
        formatTime(secs) {
            var minutes = Math.floor(secs / 60) || 0;
            var seconds = Math.floor(secs - minutes * 60) || 0;
            return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        },
        updateTimer() {
            this.currentSeconds = parseInt(this.audioPlayer.currentTime);
        },
        mute() {
            this.audioPlayer.muted = !this.audioPlayer.muted
            this.muted = !this.muted
        }

    },
}
</script>
