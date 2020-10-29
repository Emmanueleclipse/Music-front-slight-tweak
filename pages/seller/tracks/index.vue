<template>
<div>

    <div class="py-5">
        <h2 class="text-lg md:text-2xl font-semibold text-gray-600 pb-3 pt-10">List of Trasks</h2>

        <div class="table--areas shadow rounded-lg  bg-white " v-if="!loader">
            <table class="lg:w-full table-auto  overflow-y-scroll" v-if="datas.length > 0">
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
                        <th></th>
                    </tr>
                </thead>
                <tbody v-for="alltrack in datas" :key="alltrack.id">
                    <tr class="">
                        <td class="text-gray-600 px-2 py-3">
                            <img v-if="alltrack.image != null" :src="imgurl + 'storage/'+ alltrack.image" width="100" class="rounded-lg w-24 h-24" height="100" alt="">
                        </td>
                        <td data-column="Name" class="text-gray-600 px-2 py-2">{{ alltrack.title }}</td>
                        <td data-column="Genre" class="text-gray-600 px-2 py-2" v-if="alltrack.genre">{{ alltrack.genre.name }}</td>
                        <td data-column="Release Date" class="text-gray-600 px-2 py-2">{{ alltrack.date }}</td>
                        <td data-column="BPM" class="text-gray-600 px-2 py-2">{{ alltrack.bpm }}</td>
                        <td data-column="Basic License" class="text-gray-600 px-2 py-2">{{ alltrack.basic_price }}</td>
                        <td data-column="Premium License" class="text-gray-600 px-2 py-2">{{ alltrack.premium_price }}</td>
                        <td class="text-gray-600 px-2 py-2">
                            <div class="relative p-2">
                                <img src="/images/admin/img-path-35.svg" v-if="show != alltrack.id" @click="showManage(alltrack.id)" class="cursor-pointer" width="6" height="21" alt="">
                                <img src="/images/admin/img-path-35.svg" v-if="show == alltrack.id" @click="hideManage()" class="cursor-pointer" width="6" height="21" alt="">
                                <div v-if="show == alltrack.id" class="bg-white shadow rounded-lg absolute top-0 right-0 mt-8 w-24">
                                    <button class="py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-lg w-full" @click="EditItem(alltrack.id)">Edit</button>
                                    <button class="py-2 px-4 text-gray-800 hover:bg-gray-100 rounded-lg w-full" @click="deleteItem(alltrack.id)">Delete</button>
                                </div>
                            </div>
                        </td>
                        <td class="text-gray-600 px-2 py-2">
                            <div @click="showChartData(alltrack.id)" class="relative p-2 border border-gray-500 cursor-pointer bg-white w-10 h-10 rounded-full flex justify-center items-center">
                                <img v-if="chartShow == alltrack.id" src="/images/seller/path-img-25.svg" class="w-4  transform rotate-180" />
                                <img v-else src="/images/seller/path-img-25.svg" class="w-4" />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="9">
                            <div class="w-full px-5 py-2" v-if="chartShow == alltrack.id">
                                <div class="flex justify-between items-center">
                                    <h2>Track Stats</h2>
                                    <select @change="selectChange" name="genre" id="genre" v-model="report" class="custom--select px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-32 appearance-none" required>
                                        <option value="year">1 year</option>
                                        <option value="day">30 Days</option>
                                        <option value="week">7 Days</option>
                                    </select>
                                </div>
                                <div v-if="!chartLoader">
                                    <Chart :data.sync="chartData" :labels="labels" />
                                </div>
                                <div v-else class="loader-parent">
                                    <div class="loader"></div>
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
import Paginator from '@/components/paginator'
import Chart from '@/components/seller/Chart'
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    middleware: ['auth', 'seller'],
    layout: 'seller',
    components: {
        Paginator,
        Chart
    },
    data() {
        return {
            imgurl: process.env.imgUrl,
            show: '',
            loader: false,
            datas: [],
            chartShow: '',
            report: 'day',
            chartData: [100, 500],
            labels: ['january', 'february'],
            chartLoader: false,
            track_id: null
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
            fetchAllTracks: 'seller/tracks/fetchAllTracks',
            fetchAllTracksPage: 'seller/tracks/fetchAllTracksPage',
            deleteTrack: 'seller/tracks/deleteTrack'
        }),
        selectChange(e) {
            if (e.target.value == 'year') {
                this.loadYear();
            } else if (e.target.value == 'day') {
                this.loadDays();
            } else {
                this.loadWeek();
            }
        },
        loadYear() {
            this.chartLoader = true
            this.$axios.get(
                `seller/tracks/stats/${this.track_id}/${this.report}`,
            ).then(({
                data
            }) => {
                if (data.success == true) {
                    this.chartData = data.datas.datas
                    this.labels = data.datas.labels
                }
                this.chartLoader = false
            })
        },
        loadDays() {
            this.chartLoader = true
            this.$axios.get(
                `seller/tracks/stats/${this.track_id}/${this.report}`,
            ).then(({
                data
            }) => {
                if (data.success == true) {
                    this.chartData = data.datas.datas
                    this.labels = data.datas.labels
                }
                this.chartLoader = false
            })
        },
        loadWeek() {
            this.chartLoader = true
            this.$axios.get(
                `seller/tracks/stats/${this.track_id}/${this.report}`,
            ).then(({
                data
            }) => {
                if (data.success == true) {
                    this.chartData = data.datas.datas
                    this.labels = data.datas.labels
                }
                this.chartLoader = false
            })
        },
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
        EditItem(id) {
            this.$router.push(`/seller/tracks/${id}/edit`)
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
        },
        showChartData(id) {
            if (this.chartShow != id) {
                this.chartLoader = true
                this.chartShow = id
                this.track_id = id
                this.$axios.get(
                    `seller/tracks/stats/${id}/${this.report}`,
                ).then(({
                    data
                }) => {
                    if (data.success == true) {
                        this.chartData = data.datas.datas
                        this.labels = data.datas.labels
                    }
                    this.chartLoader = false
                })
            } else {
                this.chartShow = ''
            }

        }
    },
    computed: mapGetters({
        allTracks: 'seller/tracks/allTracks',
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
