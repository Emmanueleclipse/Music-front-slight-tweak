<template>
<div class="py-2  hover__area" :class="classlist">
    <div class="relative">
        <img v-if="track.image != null" :src="imgurl + 'storage/'+ track.image" width="100" class="w-full rounded-lg mb-2 shadow border border-gray-700 h-64 object-cover" height="100" alt="">
        <div class="overlay absolute left-0 top-0 w-full h-full bg-black bg-opacity-50 rounded-lg transition duration-300 ease-in-out">
            <div class="flex flex-col justify-center items-center h-full">
                <div class="flex justify-center items-center">
                    <button v-if="getDatas.includes(track.id)" class="px-5 shadow-lg bg-white py-2 inline-block rounded-full hover:bg-blue-800 hover:text-white transition duration-300 ease-in-out">Added to Cart</button>
                    <button @click="addToCart(track)" v-else class="px-5 shadow-lg bg-white py-2 inline-block rounded-full hover:bg-blue-800 hover:text-white transition duration-300 ease-in-out">Add to Cart</button>

                    <button v-if="isPlaying && (data.id === track.id )" @click="pause" class="shadow-lg bg-white rounded-full flex items-center justify-center ml-3 w-12 h-12 hover:bg-blue-800  text-gray-700 hover:text-white transition duration-300 ease-in-out">
                        <font-awesome-icon class="text-2xl " :icon="['fas', 'pause']" />
                    </button>
                    <button v-else @click="playing(track)" class="shadow-lg bg-white rounded-full flex items-center justify-center ml-3 w-12 h-12 hover:bg-blue-800  text-gray-700 hover:text-white transition duration-300 ease-in-out">
                        <font-awesome-icon class="text-2xl " :icon="['fas', 'play']" />
                    </button>
                </div>
            </div>
        </div>
    </div>

    <nuxt-link :to="`/tracks/${track.id}/view`" class="text-lg font-bold color-primary">{{ track.title }}</nuxt-link>
    <p class="text-base color-muted" v-if="track.user">By {{ track.user.name }}</p>

</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    props: {
        track: {
            type: Object,
            required: true
        },
        classlist: String
    },
    data() {
        return {
            imgurl: process.env.imgUrl,
            isPlaying: false,
            data: {},
        }
    },
    methods: {
        ...mapActions({
            setDataAudio: 'audio/setaudioData',
            setPause: 'audio/setPause',
            setCartData: 'cart/setCartData',
            setPlaying: 'tracks/setPlaying'
        }),
        playing(data) {
            this.setDataAudio(data);
            this.setPlaying(data.id)
        },
        pause() {
            this.setPause();
        },
        addToCart(data) {
            this.setCartData(data)
        }
    },
    computed: {
        ...mapGetters({
            getdata: 'audio/getData',
            getPause: 'audio/getPause',
            getPlay: 'audio/getPlay',
            getDatas: 'cart/getDatas',
        }),
    },
    watch: {
        'getdata'() {
            this.data = this.getdata
            if (this.getdata) {
                this.isPlaying = true
            }
        },
        'getPause'() {
            if (this.getPause) {
                this.isPlaying = false;
            }
        },
        'getPlay'() {
            if (this.getPlay) {
                this.isPlaying = true
            }
        },
    },

}
</script>
