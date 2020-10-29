<template>
<div class="w-full py-10 px-5 md:px-0 container mx-auto">
    <h3 class="color-primary text-xl pb-6 text-left font-bold">Buyer Dashboard</h3>
    <div class="w-full mx-auto">
        <div class="wrapper w-full" v-if="!loader">
            <table class="lg:w-full table-auto  overflow-y-scroll">
                <thead>
                    <tr class="text-left">
                        <th class="w-32"></th>
                        <th class="color-blue-500 py-4 px-5">Product title</th>
                        <th class="color-blue-500 py-4 px-5">Genre</th>
                        <th class="color-blue-500 py-4 px-5">Seller Name</th>
                        <th class="color-blue-500 py-4 px-5">Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-if="datas">
                    <tr class="" v-for="data in datas" :key="data.id">
                        <td class="text-gray-600 px-5 py-3">
                            <img v-if="data.track.image != null" :src="imgurl + 'storage/'+ data.track.image" width="100" class="rounded-lg w-24 h-24" height="100" alt="">
                        </td>
                        <td data-column="Product title" class="text-gray-600 px-5 py-2">{{ data.track ? data.track.title : '--'}}</td>
                        <td data-column="Genre" class="text-gray-600 px-5 py-2">{{data.track.genre? data.track.genre.name : '--' }}</td>
                        <td data-column="Seller Name" class="text-gray-600 px-5 py-2">{{ data.user.name }}</td>
                        <td data-column="Price" class="text-gray-600 px-5 py-2">${{ data.amount }}</td>
                        <td class="text-gray-600 px-5 py-2">
                            <a :href="imgurl + 'storage/'+ data.track.deliverable_audio" class="px-10 py-2 btn-bg rounded-full text-white" download>download</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2 v-if="!datas" class="text-center p-5 text-red-600 text-lg">Data Not found!</h2>
        </div>
        <div v-else class="loader-parent">
            <div class="loader"></div>
        </div>
        <Paginator @NextData="NextData" :datas.sync="getItems" />
    </div>
</div>
</template>

<script>
import Paginator from '@/components/paginator'
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    middleware: ['auth', 'buyer'],
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
        'getItems'() {
            if (this.getItems) {
                this.datas = this.getItems.data
            }
        },
    },
    methods: {
        ...mapActions({
            fetchAllItems: 'buyer/dashboard/fetchAllItems',
            fetchAllItemsPage: 'buyer/dashboard/fetchAllItemsPage',
        }),
        async NextData(pageNum) {
            this.$router.push('?page=' + pageNum)
            this.fetchAllItemsPage(pageNum)
        },
        async loaded() {
            this.loader = true;
            await this.fetchAllItems();
            this.loader = false;
        },
        async loadedwithparam(param) {
            this.loader = true;
            await this.fetchAllItemsPage(param);
            this.loader = false;
        }
    },
    computed: mapGetters({
        getItems: 'buyer/dashboard/getItems'
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

<style>
.wrapper {
    box-shadow: 0px 0px 49px #4285C24D;
    border-radius: 20px;
}

.wrapper__gradient {
    background: transparent linear-gradient(90deg, #0E3D67 0%, #4285C2 100%) 0% 0% no-repeat padding-box;
}

.subscription__btn_one {
    background: transparent linear-gradient(180deg, #4285C2 0%, #0E3D67 100%) 0% 0% no-repeat padding-box;
}

.custom__img-btn {
    background: transparent url('/images/path-img-41.svg') 0% 0% no-repeat;
    width: 50px;
    display: block;
    height: 50px;
    background-size: 25px;
    background-position: center;
}

.custom__img-btn:hover {
    background: transparent url('/images/path-img-40.svg') 0% 0% no-repeat;
    width: 50px;
    display: block;
    height: 50px;
    background-size: 25px;
    background-position: center;
}

.paypal {
    background: transparent url('/images/paypal.png') 0% 0% no-repeat;
    width: 148px;
    display: block;
    height: 28px;
    background-size: 100px;
    background-position: left;
}
</style>
