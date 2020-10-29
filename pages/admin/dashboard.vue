<template>
<div>
    <div class="grid lg:grid-cols-3 gap-5 lg:gap-10 py-10">
        <div class="flex items-center justify-between bg-white shadow px-3 py-5 rounded-lg">
            <div class="flex items-center">
                <div class="w-10 h-10 flex  justify-center items-center">
                    <img src="/images/admin/dashboard-img-4.svg" width="71" height="71" alt="">
                </div>
                <div class="px-4">
                    <h2 class="text-3xl font-bold color-blue-500 leading-tight tracking-tighter">{{ countUsers ? countUsers: '0' }}</h2>
                    <p class="text-base text-gray-600">Users</p>
                </div>
            </div>
            <div class="pr-5">
                <nuxt-link to="/admin/users">
                    <img src="/images/admin/dashboard-img-2.svg" width="31" height="31" alt="">
                </nuxt-link>
            </div>
        </div>
        <div class="flex items-center justify-between bg-white shadow px-3 py-5 rounded-lg">
            <div class="flex items-center">
                <div class="w-10 h-10 flex  justify-center items-center ">
                    <img src="/images/admin/dashboard-img-3.svg" width="71" height="71" alt="">
                </div>
                <div class="px-4">
                    <h2 class="text-3xl font-bold color-blue-500 leading-tight tracking-tighter">{{ addedProduct ? addedProduct : "0" }}</h2>
                    <p class="text-base text-gray-600">Added Product</p>
                </div>
            </div>
            <div class="pr-5">
                <nuxt-link to="/admin/products">
                    <img src="/images/admin/dashboard-img-2.svg" width="31" height="31" alt="">
                </nuxt-link>
            </div>
        </div>
        <div class="flex items-center justify-between bg-white shadow px-3 py-5 rounded-lg">
            <div class="flex items-center">
                <div class="w-10 h-10 flex  justify-center items-center">
                    <img src="/images/admin/dashboard-img-5.svg" width="71" height="71" alt="">
                </div>
                <div class="px-4">
                    <h2 class="text-3xl font-bold color-blue-500 leading-tight tracking-tighter">${{ totalTransaction ? totalTransaction: '0' }}</h2>
                    <p class="text-base text-gray-600">Transaction</p>
                </div>
            </div>
            <div class="pr-5">
                <nuxt-link to="/admin/transactions">
                    <img src="/images/admin/dashboard-img-2.svg" width="31" height="31" alt="">
                </nuxt-link>
            </div>
        </div>
    </div>
    <div class="py-5">
        <h2 class="text-lg font-semibold text-gray-600 pb-3">Latest Users</h2>

        <div class="table--area shadow rounded-lg  bg-white ">
            <table class="lg:w-full table-auto  overflow-y-scroll">
                <thead>
                    <tr class="text-left">
                        <th class="md:w-24 xl:w-10"></th>
                        <th class="color-blue-500 py-3 px-2 w-48">Full Name</th>
                        <th class="color-blue-500 py-3 px-2 w-56">Email</th>
                        <th class="color-blue-500 py-3 px-2 w-56">Producer Name</th>
                        <th class="color-blue-500 py-3 px-2">Invite Code</th>
                        <th class="color-blue-500 py-3 px-2">Location</th>
                        <th class="color-blue-500 py-3 px-2">Paypal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody v-if="latestUsers.length > 0">
                    <tr class="" v-for="user in latestUsers" :key="user.id">
                        <td class="text-gray-600 px-2 py-3">
                            <img v-if="user.images != null" :src="imgurl + user.images" width="40" class="rounded-full" height="100" alt="">
                        </td>
                        <td data-column="Full Name" class="text-gray-600 px-2 py-2">{{ user.name }}</td>
                        <td data-column="Email" class="text-gray-600 px-2 py-2">{{ user.email }}</td>
                        <td data-column="Producer Name" class="text-gray-600 px-2 py-2">{{ user.producer_name }}</td>
                        <td data-column="Invite Code" class="text-gray-600 px-2 py-2">{{ user.invite_code }}</td>
                        <td data-column="Location" class="text-gray-600 px-2 py-2">{{ user.location }}</td>
                        <td data-column="Paypal" class="text-gray-600 px-2 py-2">{{ user.paypal }}</td>
                        <td class="text-gray-600 px-2 py-2">
                            <div class="relative">
                                <img src="/images/admin/img-path-35.svg" v-if="show != user.id" @click="showManage(user.id)" class="cursor-pointer" width="6" height="21" alt="">
                                <img src="/images/admin/img-path-35.svg" v-if="show == user.id" @click="hideManage()" class="cursor-pointer" width="6" height="21" alt="">
                                <div v-if="show == user.id" class="bg-white shadow rounded-lg absolute top-0 right-0 mt-8 z-20 ">
                                    <button class="py-2 px-8 text-gray-800 w-full hover:bg-blue-100 rounded-lg" @click="deleteItem(user.id)">Delete</button>
                                    <button class="py-2 px-8 text-gray-800  w-full hover:bg-blue-100 rounded-lg" @click="StatusUsers(user.id, user.status)">{{user.status == 1 ? 'Deactivated' :  'Active'}}</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h2 v-if="latestUsers.length == 0" class="text-center p-5 text-red-600 text-lg">Data Not found!</h2>
        </div>

    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    middleware: ['auth', 'admin'],
    layout: 'admin',
    data() {
        return {
            imgurl: process.env.imgUrl,
            show: '',
        }
    },
    methods: {
        ...mapActions({
            fetchAllLatestUsers: 'admin/dashboard/fetchAllLatestUsers',
            deleteUser: 'admin/dashboard/deleteUser',
            activeDeactive: 'admin/dashboard/activeDeactive',
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
                    this.deleteUser(id);
                }
            })
        },
        StatusUsers(id, status) {
            if (status === 1) {
                this.$swal({
                    title: 'Are you sure Deactivated this user?',
                    showCancelButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.activeDeactive(id);
                    }
                })
            } else {
                this.$swal({
                    title: 'Are you sure Activated this user?',
                    showCancelButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.activeDeactive(id);
                    }
                })
            }
        }
    },

    computed: mapGetters({
        latestUsers: 'admin/dashboard/allLatestUsers',
        countUsers: 'admin/dashboard/allUsersCount',
        addedProduct: 'admin/dashboard/addedProduct',
        totalTransaction: 'admin/dashboard/totalTransaction',
    }),

    created() {
        this.fetchAllLatestUsers();
    }
}
</script>
