<template>
<div>

    <div class="py-5">
        <h2 class="text-lg md:text-2xl font-semibold text-gray-600 pb-3 pt-10">All Users</h2>

        <div class="table--area shadow rounded-lg  bg-white " v-if="!loader">
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
                <tbody v-if="datas.length > 0">
                    <tr class="" v-for="user in datas" :key="user.id">
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
            <h2 v-if="datas.length == 0" class="text-center p-5 text-red-600 text-lg">Data Not found!</h2>
        </div>
        <div v-else class="loader-parent">
            <div class="loader"></div>
        </div>
        <Paginator @NextData="NextData" :datas.sync="latestUsers" />
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
        'users'() {
            if (this.users) {
                this.datas = this.users
            }
        },
    },
    methods: {
        ...mapActions({
            fetchAllLatestUsers: 'admin/users/fetchAllLatestUsers',
            fetchAllLatestUsersPage: 'admin/users/fetchAllLatestUsersPage',
            deleteUser: 'admin/users/deleteUser',
            activeDeactive: 'admin/users/activeDeactive',
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
        },
        async NextData(pageNum) {
            this.$router.push('?page=' + pageNum)
            this.fetchAllLatestUsersPage(pageNum)
        },
        async loaded() {
            this.loader = true;
            await this.fetchAllLatestUsers();
            this.loader = false;
        },
        async loadedwithparam(param) {
            this.loader = true;
            await this.fetchAllLatestUsersPage(param);
            this.loader = false;
        }
    },

    computed: mapGetters({
        latestUsers: 'admin/users/allLatestUsers',
        users: 'admin/users/users',
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
