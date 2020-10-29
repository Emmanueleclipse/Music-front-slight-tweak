<template>
<div class="container mx-auto   py-16">
    <div class="border  shadow-lg bg-white">
        <div class="p-5 border-b">
            <div class="flex justify-between">
                <h1 class="color-primary text-xl font-bold">Profile</h1>
                <div class="flex md:pl-5 items-center cursor-pointer relative" @click="menuClick" v-click-outside="hide">
                    <font-awesome-icon class="text-lg text-gray-600 mx-1 cursor-pointer" :icon="['fas', 'ellipsis-h']" />
                    <div class="absolute top-0 right-0 mt-12  bg-white shadow rounded-lg" v-if="dropdown">
                        <nuxt-link :to="`/seller/${loaduser.id}/edit`" class="flex items-center hover:bg-gray-200 w-40 py-4 px-5">
                            <font-awesome-icon class="text-xl text-gray-700 pr-1" :icon="['fas', 'edit']" /> <span class="text-gray-700">Edit Profile</span>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="md:flex p-5" v-if="!loading">
            <div class="w-full md:w-3/12">
                <div class="flex w-full justify-center">
                    <img v-if="loaduser.images != null" :src="imgurl + loaduser.images" width="100" class="mx-5 w-64 md:w-48 h-64 md:h-48 rounded-full mb-2 shadow border border-gray-700  object-cover" height="100" alt="">
                </div>
            </div>
            <div class="w-full md:w-9/12">
                <div class="py-5 px-5">
                    <ul class="list-unstyled">
                        <li class="py-2 flex">
                            <p class="md:w-4/12 lg:w-3/12 xl:w-2/12">Name: </p><span class="md:w-8/12 lg:w-9/12 xl:w-10/12 font-bold pl-5">{{ loaduser.name }}</span>
                        </li>
                        <li class="py-2 flex">
                            <p class="md:w-4/12 lg:w-3/12 xl:w-2/12">Email: </p><span class="md:w-8/12 lg:w-9/12 xl:w-10/12 font-bold pl-5">{{ loaduser.email }}</span>
                        </li>
                        <li class="py-2 flex">
                            <p class="md:w-4/12 lg:w-3/12 xl:w-2/12">Producer Name: </p><span class="md:w-8/12 lg:w-9/12 xl:w-10/12 font-bold pl-5">{{ loaduser.producer_name }}</span>
                        </li>
                        <li class="py-2 flex">
                            <p class="md:w-4/12 lg:w-3/12 xl:w-2/12">Invite code: </p><span class="md:w-8/12 lg:w-9/12 xl:w-10/12 font-bold pl-5">{{ loaduser.invite_code }}</span>
                        </li>
                        <li class="py-2 flex">
                            <p class="md:w-4/12 lg:w-3/12 xl:w-2/12">Location: </p><span class="md:w-8/12 lg:w-9/12 xl:w-10/12 font-bold pl-5">{{ loaduser.location }}</span>
                        </li>
                        <li class="py-2 md:flex">
                            <p class="md:w-4/12 lg:w-3/12 xl:w-2/12">Bio: </p><span class="md:w-8/12 lg:w-9/12 xl:w-10/12 pl-5" v-html="loaduser.bio"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else class="loader-parent">
            <div class="loader"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    middleware: ['auth', 'seller'],
    layout: 'seller',
    data() {
        return {
            imgurl: process.env.imgUrl,
            dropdown: false,
            loaduser: {},
            loading: false,
        }
    },
    methods: {
        menuClick() {
            this.dropdown = !this.dropdown
        },
        hide() {
            this.dropdown = false
        },
        async loadUser() {
            this.loading = true;
            let {
                data
            } = await this.$axios.get(`/seller/${this.user.id}/profile`);

            if (data.success == true) {
                this.loaduser = data.data
                this.loading = false
            } else {
                this.$swal({
                    title: data.errors,
                })
            }
        }
    },
    created() {
        this.loadUser();
    }
}
</script>
