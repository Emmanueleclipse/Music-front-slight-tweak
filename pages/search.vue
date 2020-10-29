<template>
<div class="w-full py-10 px-5 md:px-0 container mx-auto">
    <h3 class="color-primary text-3xl pb-12 text-center md:text-left font-medium">Search Results</h3>
    <div v-if="isLoaded">
        <div v-if="datas.length > 0">
            <div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
                    <div class="py-4 mx-5 hover__area" v-for="alltrack in datas" :key="alltrack.id">
                        <Track :track="alltrack" />
                    </div>
                </div>

            </div>

            <AddToCart />
            <div class="flex justify-center">
                <Paginator @NextData="NextData" :datas.sync="searchTrack" />
            </div>
        </div>
        <h1 class="py-8 px-5 text-center text-2xl color-primary" v-else>Search item not found!</h1>
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
            term: '',
            datas: []
        }
    },
    methods: {
        ...mapActions({
            fetchSearchTracks: 'tracks/fetchSearchTracks',
            fetchSearchTracksPage: 'tracks/fetchSearchTracksPage',
        }),
        async NextData(pageNum) {
            this.$router.push('?q=' + this.term + '&page=' + pageNum)
            this.fetchSearchTracksPage({
                term: this.term,
                pageNum
            })
        },
        async loaded() {
            await this.fetchSearchTracks(this.term)
        },
        async loadedwithparam(param) {
            await this.fetchSearchTracksPage({
                term: this.term,
                param
            });
        }
    },
    watch: {
        'searchTrack'() {
            if (this.searchTrack) {
                this.datas = this.searchTrack.data
            }
        },
    },
    computed: {
        ...mapGetters({
            searchTrack: 'tracks/searchTrack',
            isLoaded: 'tracks/isLoaded',
        }),

    },
    asyncData({
        route,
        context
    }) {
        return {
            term: route.query.q
        }
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
