<template>
<div>

    <div class="py-5">
        <h2 class="text-lg md:text-2xl font-semibold text-gray-600 pb-3 pt-10">Transaction Logs of Sellers</h2>

        <div class="table--area shadow rounded-lg  bg-white " v-if="!loader">
            <table class="lg:w-full table-auto  overflow-y-scroll">
                <thead>
                    <tr class="text-left">
                        <th class="md:w-24 xl:w-10"></th>
                        <th class="color-blue-500 py-3 px-4 w-48">Full Name</th>
                        <th class="color-blue-500 py-3 px-4 w-56">Email</th>
                        <th class="color-blue-500 py-3 px-4 w-56">Producer Name</th>
                        <th class="color-blue-500 py-3 px-4 w-56">Total Earnings </th>
                    </tr>
                </thead>
                <tbody v-if="transactions.length > 0">
                    <tr class="" v-for="transaction in transactions" :key="transaction.id">
                        <td class="text-gray-600 px-2 py-3">
                            <img v-if="transaction.user.images != null" :src="imgurl + transaction.user.images" width="40" class="rounded-full" height="100" alt="">
                        </td>
                        <td data-column="Full Name" class="text-gray-600 px-4 py-2">{{ transaction.user.name }}</td>
                        <td data-column="Email" class="text-gray-600 px-4 py-2">{{ transaction.user.email }}</td>
                        <td data-column="Producer Name" class="text-gray-600 px-4 py-2">{{ transaction.user.producer_name }}</td>
                        <td data-column="Invite Code" class="text-gray-600 px-4 py-2"><span class="font-bold">${{ transaction.amount }}</span></td>
                    </tr>

                </tbody>
            </table>
            <h2 v-if="transactions.length == 0" class="text-center p-5 text-red-600 text-lg">Data Not found!</h2>
        </div>
        <div v-else class="loader-parent">
            <div class="loader"></div>
        </div>
        <Paginator @NextData="NextData" :datas.sync="transaction_logs" />
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
            loader: false,
            transactions: []
        }
    },
    watch: {
        'transaction_logs'() {
            if (this.transaction_logs) {
                this.transactions = this.transaction_logs.data
            }
        },
    },
    methods: {
        ...mapActions({
            fetchTransationLogs: 'admin/transaction/fetchTransationLogs',
            setTransationPage: 'admin/transaction/setTransationPage',
        }),
        async NextData(pageNum) {
            this.$router.push('?page=' + pageNum)
            this.setTransationPage(pageNum)
        },
        async loaded() {
            this.loader = true;
            await this.fetchTransationLogs();
            this.loader = false;
        },
        async loadedwithparam(param) {
            this.loader = true;
            await this.setTransationPage(param);
            this.loader = false;
        }
    },
    computed: mapGetters({
        transaction_logs: 'admin/transaction/transaction_logs',
    }),
    mounted() {
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
.paging {
    display: inline-flex;
}
</style>
