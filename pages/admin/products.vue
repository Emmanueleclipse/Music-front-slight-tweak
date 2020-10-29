<template>
<div>

    <div class="py-5">
        <h2 class="text-lg md:text-2xl font-semibold text-gray-600 pb-3 pt-10">List of Added Products by Users</h2>

        <div class="table--area shadow rounded-lg  bg-white " v-if="!loader">
            <table class="lg:w-full table-auto  overflow-y-scroll">
                <thead>
                    <tr class="text-left">
                        <th class="w-32"></th>
                        <th class="color-blue-500 py-4 px-2 w-48">Name</th>
                        <th class="color-blue-500 py-4 px-2 w-56">Genre</th>
                        <th class="color-blue-500 py-4 px-2 w-56">Release Date</th>
                        <th class="color-blue-500 py-4 px-2">BPM</th>
                        <th class="color-blue-500 py-4 px-2">Basic License</th>
                        <th class="color-blue-500 py-4 px-2">Premium License</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-if="datas.length > 0">
                    <tr class="" v-for="alltrack in datas" :key="alltrack.id">
                        <td class="text-gray-600 px-2 py-3">
                            <img v-if="alltrack.image != null" :src="imgurl + 'storage/'+ alltrack.image" width="100" class="rounded-lg" height="100" alt="">
                        </td>
                        <td data-column="Name" class="text-gray-600 px-2 py-2">{{ alltrack.title }}</td>
                        <td data-column="Genre" class="text-gray-600 px-2 py-2">{{ alltrack.genre_id }}</td>
                        <td data-column="Release Date" class="text-gray-600 px-2 py-2">{{ alltrack.date }}</td>
                        <td data-column="BPM" class="text-gray-600 px-2 py-2">{{ alltrack.bpm }}</td>
                        <td data-column="Basic License" class="text-gray-600 px-2 py-2">{{ alltrack.basic_price }}</td>
                        <td data-column="Premium License" class="text-gray-600 px-2 py-2">{{ alltrack.premium_price }}</td>
                        <td class="text-gray-600 px-2 py-2">
                            <div class="relative p-2">
                                <img src="/images/admin/img-path-35.svg" v-if="show != alltrack.id" @click="showManage(alltrack.id)" class="cursor-pointer" width="6" height="21" alt="">
                                <img src="/images/admin/img-path-35.svg" v-if="show == alltrack.id" @click="hideManage()" class="cursor-pointer" width="6" height="21" alt="">
                                <div v-if="show == alltrack.id" class="bg-white shadow rounded-lg absolute top-0 right-0 mt-8">
                                    <button class="py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-lg" @click="deleteItem(alltrack.id)">Delete</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2 v-if="datas.length == 0" class="text-center p-5 text-red-600 text-lg">Data Not found!</h2>
        </div>
        <div v-else class="loader-parent">
            <div class="loader"></div>
        </div>
        <Paginator @NextData="NextData" :datas.sync="allTracks" />
    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";
import Paginator from '@/components/paginator'
export default {
    middleware: ['auth', 'admin'],
    layout: 'admin',
    components: {
        Paginator
    },
    data() {
        return {
            imgurl: process.env.imgUrl,
            show: '',
            loader: false,
            datas: []
        }
    },
    watch: {
        'tracks'() {
            if (this.tracks) {
                this.datas = this.tracks
            }
        },
    },
    methods: {
        ...mapActions({
            fetchAllTracks: 'admin/tracks/fetchAllTracks',
            fetchAllTracksPage: 'admin/tracks/fetchAllTracksPage',
            deleteTrack: 'admin/tracks/deleteTrack'
        }),

        showManage(id) {
            this.show = id
        },
        hideManage(id) {
            this.show = ''
        },
        deleteItem(id) {
            this.$swal({
                title: 'Do you want to delete?',
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteTrack(id);
                }
            })
        },
        async NextData(pageNum) {
            this.$router.push('?page=' + pageNum)
            this.fetchAllTracksPage(pageNum)
        },
        async loaded() {
            this.loader = true;
            await this.fetchAllTracks();
            this.loader = false;
        },
        async loadedwithparam(param) {
            this.loader = true;
            await this.fetchAllTracksPage(param);
            this.loader = false;
        }
    },
    computed: mapGetters({
        allTracks: 'admin/tracks/allTracks',
        tracks: 'seller/tracks/tracks'
    }),
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
