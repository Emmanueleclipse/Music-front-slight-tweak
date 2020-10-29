<template>
<div>
    <div v-if="track ">
        <section class="py-12 bg">
            <div class="container mx-auto px-5 md:px-0">
                <div class="md:flex">
                    <div class="w-full md:w-8/12 pr-5">
                        <div class="md:flex flex-col justify-between h-full py-5">
                            <div class="flex py-10 md:py-0">
                                <div class="">
                                    <button v-if="isPlaying" @click="pause" class="text-white">
                                        <font-awesome-icon class="text-4xl " :icon="['far', 'pause-circle']" />
                                    </button>
                                    <button v-else class="text-white" @click="playing(track)">
                                        <font-awesome-icon class="text-4xl " :icon="['far', 'play-circle']" />
                                    </button>
                                    <audio ref="player" :src="imgurl + 'storage/'+track.audio_file"></audio>
                                </div>
                                <div class="px-2">
                                    <h1 class="text-xl leading-5 text-white uppercase">{{track.title}}</h1>
                                    <p class="text-base text-white" v-if="track.user">{{ track.user.name }}</p>
                                </div>
                            </div>
                            <div class="md:flex items-center justify-between  pt-16">
                                <div class="button-area flex" v-click-outside="hide">
                                    <button class="text-white py-2 px-5 bg-gray-500 rounded-full custom-color  w-32" @click="likeTrack(track.id)">
                                        <span v-if="!likes">
                                            <font-awesome-icon class="text-lg text-white mr-2" :icon="['far', 'heart']" /> Like
                                        </span>
                                        <span v-else>
                                            <font-awesome-icon class="text-lg text-white mr-2" :icon="['fas', 'heart']" /> Liked
                                        </span>

                                    </button>
                                    <div class="relative">
                                        <ul v-if="is_social" class="list-none flex absolute top-0 -ml-4 -mt-16 bg-gray-200 px-5 py-2 rounded-full">
                                            <li class="pr-3">
                                                <ShareNetwork class="facebook cursor-pointer  transition ease-linear duration-300 rounded-full w-10 h-10 d-block flex justify-center items-center" network="facebook" :url="main_url" :title="track.title" :quote="'price: $ '+track.basic_price" hashtags="audio,beats">
                                                    <font-awesome-icon class="facebook-icon transition ease-linear duration-300 " :icon="['fab', 'facebook-f']" />
                                                </ShareNetwork>
                                            </li>
                                            <li class="pr-3">
                                                <ShareNetwork class="twitter cursor-pointer  transition ease-linear duration-300 rounded-full w-10 h-10 d-block flex justify-center items-center" network="twitter" :url="main_url" :title="track.title" :quote="'price: $ '+track.basic_price" hashtags="audio,beats">
                                                    <font-awesome-icon class="twitter-icon transition ease-linear duration-300 " :icon="['fab', 'twitter']" />
                                                </ShareNetwork>
                                            </li>
                                            <li>
                                                <ShareNetwork class="linkedin cursor-pointer  transition ease-linear duration-300 rounded-full w-10 h-10 d-block flex justify-center items-center" network="linkedin" :url="main_url" :title="track.title" :quote="'price: $ '+track.basic_price" hashtags="audio,beats">
                                                    <font-awesome-icon class="linkedin-icon transition ease-linear duration-300 " :icon="['fab', 'linkedin']" />
                                                </ShareNetwork>
                                            </li>

                                        </ul>
                                        <button @click="socialShowing" class="mx-2 text-white py-2 px-5 bg-gray-500 rounded-full custom-color  w-32">
                                            <font-awesome-icon class="text-lg text-white mr-2" :icon="['far', 'share-square']" /> Share
                                        </button>
                                    </div>
                                </div>
                                <div class="count-area flex py-5 md:py-0">
                                    <p class="px-2 text-white">
                                        <font-awesome-icon class="text-lg text-white mx-1" :icon="['fas', 'play']" /> <span>{{ count | numberFormat  }}</span>
                                    </p>
                                    <p class="px-2 text-white">
                                        <font-awesome-icon class="text-lg text-white mx-1" :icon="['far', 'heart']" /> <span>{{ track.track_likes_count | numberFormat  }}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="pr-4 py-5">

                                <av-waveform class="hidden xl:block" ref-link="player" :canv-width="800" playtime-slider-color="#fafafa" playtime-font-color="white" :canv-height="50" noplayed-line-color="#DBDBDB" playtime-line-color="#DBDBDB" />
                                <div class="flex justify-between">
                                    <div class="text-white pr-2 hidden xl:block">{{currentPlayedTime}} </div>
                                    <div class="text-white pl-2 hidden xl:block">{{duration}}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-4/12 md:pl-16">
                        <img v-if="track.image != null" :src="imgurl + 'storage/'+ track.image" width="100" class="w-full h-64 rounded-lg mb-2 shadow border border-gray-700  object-cover" height="100" alt="">
                    </div>
                </div>
            </div>
        </section>

        <div class="container mx-auto px-5 md:px-0">
            <div class="md:flex py-16" v-if="track.user">
                <div class="flex justify-center md:block md:w-2/12 md:pr-5">
                    <img v-if="track.user.images != null" :src="imgurl + track.user.images" width="100" class="mx-5 w-64 md:w-48 h-64 md:h-48 rounded-full mb-2 shadow border border-gray-700  object-cover" height="100" alt="">
                </div>
                <div class="md:w-10/12 px-10">
                    <div class="pt-5 md:py-12 flex justify-center md:block">
                        <div class="pb-12">
                            <h2 class="text-4xl font-bold capitalize color-primary text-center md:text-left">{{ track.user.name }}</h2>
                            <p class="text-lg color-blue-500 text-center md:text-left"> <span class="font-bold">{{ track_count }} </span> Tracks</p>
                        </div>
                    </div>
                    <p class="text-base" v-html="track.user.bio"></p>
                </div>
            </div>

            <div class="pt-12 pb-16">
                <div class="container mx-auto flex justify-between py-4">
                    <h2 class="text-base md:text-2xl font-bold uppercase color-primary">Related Track</h2>
                    <div class="pl-1 flex items-center justify-end">
                        <button type="button" @click="showPrev" class="border-none bg-transparent px-1">
                            <font-awesome-icon class="text-3xl color-primary" :icon="['fas', 'arrow-alt-circle-left']" />
                        </button>
                        <button type="button" @click="showNext" class="border-none bg-transparent px-1">
                            <font-awesome-icon class="text-3xl color-primary" :icon="['fas', 'arrow-alt-circle-right']" />
                        </button>
                        <nuxt-link to="tracks" class="button__gradient text-white py-1 ml-1 md:ml-3 px-3 md:px-5 rounded-full">View All</nuxt-link>
                    </div>
                </div>
                <div class="-mx-5">
                    <VueSlickCarousel v-bind="slickOptions" ref="carousel" v-if="related_track.length > 0">
                        <div class="slide" v-for="track in related_track" :key="track.id">
                            <Track :track="track" classlist="mx-5 custom__carousel" />
                        </div>
                    </VueSlickCarousel>
                    <div v-else class="text-center text-lg"> Data not found</div>
                </div>
            </div>

        </div>
    </div>
    <div class="flex justify-center items-center flex-col py-16" v-else>
        <h1 class="text-center text-6xl font-bold">404</h1>
        <p class="text-center text-lg">Not found</p>
    </div>
</div>
</template>

<script>
import AddToCart from '@/components/addToCart'
import Paginator from '@/components/paginator';
import VueSlickCarousel from 'vue-slick-carousel';
import Track from '@/components/track'
import {
    mapActions,
    mapGetters,
    mapState
} from "vuex";
export default {
    head() {
        return {
            title: this.track ? this.track.title : '',
            meta: [{
                    property: 'og:url',
                    content: this.main_url,
                },
                {
                    property: 'og:type',
                    content: 'article',
                },
                {
                    property: 'og:title',
                    content: this.track ? this.track.title : '',
                },
                {
                    property: 'og:description',
                    content: 'audio and beats seals',
                },
                {
                    property: 'og:image',
                    content: this.track ? `${this.imgurl}storage/${this.track.image}` : '',
                },
                {
                    name: 'twitter:site',
                    content: this.main_url,
                },
                {
                    name: 'twitter:card',
                    content: 'summary_large_image',
                },
                {
                    name: 'twitter:title',
                    content: this.track ? this.track.title : '',
                },
                {
                    name: 'twitter:description',
                    content: 'audio and beats seals',
                },
                {
                    name: 'twitter:image',
                    content: this.track ? `${this.imgurl}storage/${this.track.image}` : '',
                },
            ],
        }
    },
    components: {
        AddToCart,
    },
    data() {
        return {
            imgurl: process.env.imgUrl,
            isPlaying: false,
            data: {},
            related_track: [],
            main_url: '',
            is_social: false,
            audioPlayer: undefined,
            durationSeconds: 0,
            currentSeconds: 0,
            count: 0,
            likes: false,
            slickOptions: {
                "slidesToShow": 4,
                "slidesToScroll": 4,
                "initialSlide": 0,
                "arrows": false,
                "responsive": [{
                        "breakpoint": 1024,
                        "settings": {
                            "slidesToShow": 3,
                            "slidesToScroll": 3,
                        }
                    },
                    {
                        "breakpoint": 600,
                        "settings": {
                            "slidesToShow": 2,
                            "slidesToScroll": 2,
                            "initialSlide": 2
                        }
                    },
                    {
                        "breakpoint": 480,
                        "settings": {
                            "slidesToShow": 1,
                            "slidesToScroll": 1
                        }
                    }
                ]
            }
        }
    },
    methods: {
        ...mapActions({
            setCartData: 'cart/setCartData',
            setPlaying: 'tracks/setPlaying',
        }),
        showPrev() {
            this.$refs.carousel.prev()
        },
        showNext() {
            this.$refs.carousel.next()
        },
        addToCart(data) {
            this.setCartData(data)
        },
        socialShowing() {
            this.is_social = !this.is_social;
        },
        async likeTrack(id) {
            let vm = this;
            const {
                data
            } = await this.$axios.post(
                `tracks/track-like`, {
                    track_id: id,
                    user_id: vm.authenticated == true ? vm.user.id : null,
                    liked: vm.likes
                }
            );
            if (data.success == true) {
                this.likes = data.like
            } else {
                this.$router.push(`/login?redirect=/tracks/${id}/view`);
            }
        },
        hide() {
            this.is_social = false
        },
        playing(data) {
            setTimeout(() => {
                this.audioPlayer.play();
                this.audioPlayer.addEventListener("timeupdate", this.updateTimer);
                this.isPlaying = true;
                this.audioPlayer.setAttribute('crossorigin', 'anonymous');
            }, 500);

            this.setPlaying(data.id)
        },
        pause() {
            this.audioPlayer.pause();
            this.isPlaying = false;
        },
        formatTime(secs) {
            var minutes = Math.floor(secs / 60) || 0;
            var seconds = Math.floor(secs - minutes * 60) || 0;
            return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        },
        updateTimer() {
            this.currentSeconds = parseInt(this.audioPlayer.currentTime);
        },
    },
    watch: {
        'play_count'() {
            this.count = this.play_count
        }
    },
    computed: {
        ...mapGetters({
            track: 'tracks/getTrack',
            track_count: 'tracks/track_count',
            isLoaded: 'tracks/isLoaded',
            play_count: 'tracks/play_count',
            liked: 'liked',
        }),
        currentPlayedTime() {
            return this.formatTime(this.currentSeconds);
        },
        duration() {
            return this.formatTime(this.durationSeconds);
        },
    },
    mounted() {
        this.main_url = window.location.href;
        this.audioPlayer = this.$el.querySelectorAll("audio")[0];
        setTimeout(() => {
            this.durationSeconds = parseInt(this.audioPlayer.duration);
        }, 1000)
        this.count = this.play_count;
        this.likes = this.liked
    },
    async asyncData({
        params,
        store,
        $axios
    }) {
        await store.dispatch('tracks/fetchTrackById', params.id)
        if (store.getters.authenticated) {
            await store.dispatch('get_liked', {
                id: params.id,
                user_id: store.getters.user.id
            })
        }

        let {
            data
        } = await $axios.get('/tracks/related-track');

        if (data.success == true) {
            return {
                related_track: data.datas
            }
        }

    }
}
</script>

<style lang="scss">
.facebook {
    border: 1px solid #3b5999;

    .facebook-icon {
        color: #3b5999;
    }
}

.facebook:hover {
    background: #3b5999;

    .facebook-icon {
        color: #fff;
    }
}

.twitter {
    border: 1px solid #55acee;

    .twitter-icon {
        color: #55acee;
    }
}

.twitter:hover {
    background: #55acee;

    .twitter-icon {
        color: #fff;
    }
}

.linkedin {
    border: 1px solid #0077B5;

    .linkedin-icon {
        color: #0077B5;
    }
}

.linkedin:hover {
    background: #0077B5;

    .linkedin-icon {
        color: #fff;
    }
}

.love {
    width: 50px !important;
    height: 50px !important;
    padding: 10px;
}

.custom-color {
    background: #4285C2;
    transition: 0.3s all ease;
}

.custom-color:hover {
    background: #367bbb;
}
</style>
