<template>
<div>
    <div class="grid lg:grid-cols-3 gap-5 lg:gap-10 py-10">
        <div class="flex items-center justify-between bg-white shadow px-5 py-5 rounded-lg">
            <h2 class="text-gray-700 text-lg">Total Earnings</h2>
            <h1 class="text-3xl font-bold color-blue-500">${{ total_earnings ? totol_earnings : 0 }}</h1>
        </div>
        <div class="flex items-center justify-between bg-white shadow px-5 py-5 rounded-lg">
            <h2 class="text-gray-700 text-lg">Total Items sold</h2>
            <h1 class="text-3xl font-bold color-blue-500">{{ items_sold ? items_sold : 0 }}</h1>
        </div>
        <div class="flex items-center justify-between bg-white shadow px-5 py-5 rounded-lg">
            <h2 class="text-gray-700 text-lg">Items per order</h2>
            <h1 class="text-3xl font-bold color-blue-500">{{ item_per_order ? item_per_order : 0 }}</h1>
        </div>
    </div>
    <div class="py-5">
        <h2 class="text-lg font-semibold text-gray-600 pb-3">Earnings</h2>

        <div class="table--area shadow rounded-lg  bg-white " v-if="!loader">
            <table class="lg:w-full table-auto  overflow-y-scroll">
                <thead>
                    <tr class="text-left">
                        <th class="color-blue-500 py-3 px-4 "></th>
                        <th class="color-blue-500 py-3 px-4 ">Title</th>
                        <th class="color-blue-500 py-3 px-4  ">Date</th>
                        <th class="color-blue-500 py-3 px-4 ">Total checkout</th>
                        <th class="color-blue-500 py-3 px-4">Buyer name</th>
                        <th class="color-blue-500 py-3  "></th>
                    </tr>
                </thead>
                <tbody v-if="datas.length > 0">
                    <tr class="" v-for="payment in datas" :key="payment.id">
                        <td></td>
                        <td data-column="Title" class="text-gray-600 px-4 py-2">{{ payment.track.title }}</td>
                        <td data-column="Date" class="text-gray-600 px-4 py-2">{{ payment.date }}</td>
                        <td data-column="Total checkout" class="text-gray-600 px-4 py-2">${{ payment.amount }}</td>
                        <td data-column="Buyer name" class="text-gray-600 px-4 py-2">{{ payment.buyer.name }}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <h2 v-if="datas.length == 0" class="text-center p-5 text-red-600 text-lg">Data Not found!</h2>
        </div>
        <div v-else class="loader-parent">
            <div class="loader"></div>
        </div>
        <Paginator @NextData="NextData" :datas.sync="getPayments" />

    </div>
</div>
</template>

<script>
import Paginator from '@/components/paginator';
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    middleware: ['auth', 'seller'],
    layout: 'seller',
    components: {
        Paginator
    },
    data() {
        return {
            loader: false,
            datas: []
        }
    },
    watch: {
        'getPayments'() {
            if (this.getPayments) {
                this.datas = this.getPayments.data
            }
        },
    },
    methods: {
        ...mapActions({
            fetchAllPayments: 'seller/dashboard/fetchAllPayments',
            fetchAllPaymentsPage: 'seller/dashboard/fetchAllPaymentsPage',
        }),
        async NextData(pageNum) {
            this.$router.push('?page=' + pageNum)
            this.fetchAllPaymentsPage(pageNum)
        },
        async loaded() {
            this.loader = true;
            await this.fetchAllPayments();
            this.loader = false;
        },
        async loadedwithparam(param) {
            this.loader = true;
            await this.fetchAllPaymentsPage(param);
            this.loader = false;
        }
    },
    computed: mapGetters({
        getPayments: 'seller/dashboard/getPayments',
        total_earnings: 'seller/dashboard/total_earnings',
        items_sold: 'seller/dashboard/items_sold',
        item_per_order: 'seller/dashboard/item_per_order',
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
