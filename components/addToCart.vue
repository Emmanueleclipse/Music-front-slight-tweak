<template>
<modal name="dialog" class="relative" :clickToClose="false" :scrollable="true" height="auto">
    <div @click="hidemodal" class="absolute cursor-pointer right-0 top-0 mr-2 mt-1 w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center">
        <font-awesome-icon class="text-base text-gray-600" :icon="['fas', 'times']" />
    </div>
    <div class="w-full flex p-5">
        <div class="w-4/12">
            <div class="relative hover__area">
                <img v-if="sigleCartShow.image != null" :src="imgurl + 'storage/'+ sigleCartShow.image" class="w-64 h-48 rounded-lg mb-2 shadow border border-gray-700 object-cover" alt="">
                <div class="overlay absolute left-0 top-0 w-full h-full bg-black bg-opacity-50 rounded-lg transition-all duration-200 ease-in-out">
                    <div class="flex justify-center items-center h-full">
                        <button v-if="isPlaying && (data.id === sigleCartShow.id )" @click="pause" class="shadow-lg bg-white rounded-full flex items-center justify-center ml-3 w-12 h-12 hover:bg-blue-800  text-gray-700 hover:text-white transition-all duration-200 ease-in-out">
                            <font-awesome-icon class="text-2xl " :icon="['fas', 'pause']" />
                        </button>
                        <button v-else @click="playing(sigleCartShow)" class="shadow-lg bg-white rounded-full flex items-center justify-center ml-3 w-12 h-12 hover:bg-blue-800  text-gray-700 hover:text-white transition-all duration-200 ease-in-out">
                            <font-awesome-icon class="text-2xl " :icon="['fas', 'play']" />
                        </button>
                    </div>
                </div>
            </div>
            <h2 class="text-lg font-bold color-primary">{{ sigleCartShow.title }}</h2>
            <p class="text-base color-muted" v-if="sigleCartShow.user">By {{ sigleCartShow.user.name }} </p>
        </div>
        <div class="w-8/12">
            <div class="w-full p-4">
                <div class="flex pb-2 color-primary" v-if="sigleCartShow.user">
                    <p class="font-bold">Genre: </p>
                    <p class="pl-3" v-if="sigleCartShow.genre">{{ sigleCartShow.genre.name }}</p>
                </div>
                <div class="flex pb-2 color-primary" v-if="sigleCartShow.bpm">
                    <p class="font-bold">BPM: </p>
                    <p class="pl-3">{{ sigleCartShow.bpm }}</p>
                </div>
                <div class="flex pb-2 color-primary" v-if="sigleCartShow.basic_price">
                    <p class="font-bold">Basic License: </p>
                    <p class="pl-3">${{ sigleCartShow.basic_price }}</p>
                </div>
                <div class="flex pb-2 color-primary" v-if="sigleCartShow.premium_price">
                    <p class="font-bold">Premium License: </p>
                    <p class="pl-3">${{ sigleCartShow.premium_price }}</p>
                </div>

                <div class="pt-3">
                    <p class="text-lg font-semibold color-primary">Continue as </p>
                    <div class="grid md:grid-cols-2  md:gap-2 pt-4">
                        <div class="flex justify-center">
                            <input type="radio" v-model="type" value="0" id="basic" name="license">
                            <label for="basic" class="py-1"><span class="color-blue-500 font-bold ml-2">Basic License</span></label>
                        </div>
                        <div class="flex justify-center">
                            <input type="radio" v-model="type" id="premium" value="1" name="license">
                            <label for="premium" class="py-1"><span class="color-blue-500 font-bold ml-2">Premium License</span></label>
                        </div>
                    </div>
                    <div class="flex justify-end pt-5">
                        <button type="button" @click="addToCart" :disabled="type? false : true" class="button border-none w-56 rounded-full py-2 px-3 text-white">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</modal>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    props: ['modal'],
    data() {
        return {
            imgurl: process.env.imgUrl,
            isPlaying: false,
            type: ''
        }
    },
    watch: {
        'showCartModal'() {
            if (this.showCartModal) {
                this.$modal.show('dialog');
                this.type = ''
            } else {
                this.$modal.hide('dialog');
                this.type = ''
            }

        },
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
    methods: {
        ...mapActions({
            setModalHide: 'cart/setModalHide',
            setDataAudio: 'audio/setaudioData',
            setPause: 'audio/setPause',
            setCartDatas: 'cart/setCartDatas',
            fetchData: 'cart/fetchData',
        }),
        hidemodal() {
            this.setModalHide()
        },
        playing(data) {
            this.setDataAudio(data);
        },
        pause() {
            this.setPause();
        },
        addToCart() {

            let newData = {
                id: this.sigleCartShow.id,
                title: this.sigleCartShow.title,
                producer_name: this.sigleCartShow.user ? this.sigleCartShow.user.producer_name : '',
                total: this.type == 0 ? this.sigleCartShow.basic_price : this.sigleCartShow.premium_price,
                subtotal: this.type == 0 ? this.sigleCartShow.basic_price : this.sigleCartShow.premium_price,
                image: this.sigleCartShow.image,
                deliverable_audio: this.sigleCartShow.deliverable_audio,
                user: this.sigleCartShow.user
            }

            this.setCartDatas(newData);
            this.setModalHide()
        }
    },
    computed: {
        ...mapGetters({
            showCartModal: 'cart/showCartModal',
            sigleCartShow: 'cart/sigleCartShow',
            getPause: 'audio/getPause',
            getPlay: 'audio/getPlay',
            getdata: 'audio/getData',
        })
    },
    mounted() {
        this.fetchData();
    }
}
</script>

<style lang="scss" scoped>
.button {
    background: transparent linear-gradient(180deg, #4285C2 0%, #0E3D67 100%) 0% 0% no-repeat padding-box;
}

.button:disabled,
.button[disabled] {
    background: #4285C2;
    color: #ffffff;
    cursor: not-allowed;
}
</style>
