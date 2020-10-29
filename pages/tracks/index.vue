<template>
<div class="w-full py-10 px-5 md:px-0 container mx-auto">
    <h3 class="color-primary text-3xl pb-12 text-center md:text-left font-medium">Latest Tracks</h3>
    <div v-if="isLoaded">
        <div v-if="datas.length > 0">
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
                <div class="py-4 mx-5 hover__area" v-for="alltrack in datas" :key="alltrack.id">
                    <Track :track="alltrack" />
                </div>
            </div>
            <AddToCart />
            <div class="flex justify-center">
                <Paginator @NextData="NextData" :datas.sync="allTracks" />
            </div>
        </div>
        <div class="w-full" v-else>
            <h2 class="text-center text-lg">Data not found!</h2>
        </div>
    </div>
    <div v-else class="loader-parent">
        <div class="loader"></div>
    </div>
</div>
</template>

<script>
import AddToCart from '@/components/addToCart'
import Paginator from '@/components/paginator';
import Track from '@/components/track'
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    components: {
        AddToCart,
        Paginator,
        Track
    },
    data() {
        return {
            datas: []
        }
    },
    methods: {
        ...mapActions({
            fetchAllTracks: 'tracks/fetchAllTracks',
            fetchAllTracksPage: 'tracks/fetchAllTracksPage',
        }),

        async NextData(pageNum) {
            this.$router.push('?page=' + pageNum)
            this.fetchAllTracksPage(pageNum)
        },
        async loaded() {
            await this.fetchAllTracks();
        },
        async loadedwithparam(param) {
            await this.fetchAllTracksPage(param);
        }
    },
    watch: {
        'allTracks'() {
            if (this.allTracks) {
                this.datas = this.allTracks.data
            }
        },
    },
    computed: {
        ...mapGetters({
            allTracks: 'tracks/allTracks',
            isLoaded: 'tracks/isLoaded',
        }),

    },
    created() {
        let param = this.$router.history.current.query.page;
        if (typeof (param) !== 'undefined') {
            this.loadedwithparam(param)
        } else {
            this.loaded();
        }
    }
}
</script>
