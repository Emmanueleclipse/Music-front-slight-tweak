<template>
<header class="bg-white custom__shadow">
    <nav class="container mx-auto flex items-center justify-between flex-wrap px-4 lg:px-0 py-6 ">
        <div class="flex items-center flex-shrink-0 text-dark mr-6">
            <nuxt-link to="/" class="logo"> <span class="font-semibold text-xl tracking-tight uppercase">LOGO</span></nuxt-link>

        </div>

        <label class="block lg:hidden cursor-pointer flex items-center px-3 py-2 border rounded  color-secondary border-teal-400 hover:text-gray-900 hover:border-white" for="menu-toggle"><svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg></label>
        <input class="hidden" type="checkbox" id="menu-toggle" />

        <div class="hidden w-full flex-grow lg:flex lg:items-center lg:w-auto" id="menu">
            <div class="text-sm lg:flex-grow">
                <nuxt-link to="/tracks" class="block mt-4 pr-4   font-normal lg:inline-block lg:mt-0  color-secondary hover:text-gray-900">
                    Explore
                </nuxt-link>
                <nuxt-link to="/subscription" class="block mt-4 font-normal lg:inline-block lg:mt-0  color-secondary hover:text-gray-900">
                    Subscription plan
                </nuxt-link>
            </div>
            <div class="flex items-center py-4 md:py-0">
                <template v-if="authenticated">
                    <div class="right-area w-36 flex">
                        <cartCounter />
                        <div class="admin-profie md:pl-2 cursor-pointer relative" @click="menuClick" v-click-outside="hide">
                            <authImg />
                            <div class="absolute top-0 left-0 mt-12  bg-white shadow rounded-lg" v-if="dropdown">
                                <nuxt-link v-if="user.is_admin == 0 &&  user.type === 0" to="/seller/dashboard" class="flex items-center hover:bg-gray-200 w-32 py-4 px-5"> <span class="text-gray-700">Dashboard</span></nuxt-link>
                                <nuxt-link v-if="user.is_admin == 0 &&  user.type === 1" to="/buyer/dashboard" class="flex items-center hover:bg-gray-200 w-32 py-4 px-5"> <span class="text-gray-700">Dashboard</span></nuxt-link>
                                <nuxt-link v-if="user.is_admin == 1" to="/admin/dashboard" class="flex items-center hover:bg-gray-200 w-32 py-4 px-5"> <span class="text-gray-700">Dashboard</span></nuxt-link>

                                <a href="#" @click.prevent="signOut" class="flex items-center hover:bg-gray-200 w-32 py-4 px-5">
                                    <font-awesome-icon @click="toggle" class="text-xl text-gray-700 pr-1" :icon="['fas', 'sign-out-alt']" /> <span class="text-gray-700">Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <nuxt-link to="/register" class="block mt-4 font-normal lg:inline-block lg:mt-0 px-3  color-secondary hover:text-gray-900"> Become a seller</nuxt-link>
                    <nuxt-link to="/register" class="block mt-4 font-normal lg:inline-block lg:mt-0  px-3  color-secondary hover:text-gray-900"> Sign up</nuxt-link>
                    <nuxt-link to="/login" class="block mt-4 font-normal lg:inline-block lg:mt-0 pr-3 color-secondary hover:text-gray-900"> Login</nuxt-link>
                    <div class="right-area w-36 flex">
                        <cartCounter />
                    </div>
                </template>
            </div>
        </div>
    </nav>
</header>
</template>

<script>
import cartCounter from '@/components/cartCounter';
import authImg from '@/components/auth/authImg';
export default {

    components: {
        cartCounter,
        authImg
    },
    data() {
        return {
            dropdown: false
        }
    },
    methods: {
        toggle() {
            this.$emit('clicked')
        },
        menuClick() {
            this.dropdown = !this.dropdown
        },
        hide() {
            this.dropdown = false
        },
        signOut() {
            this.$auth.logout();
        }
    }
}
</script>

<style lang="scss">
#menu-toggle:checked+#menu {
    display: block;
}

.custom__shadow {
    box-shadow: 0px 3px 6px #00000029;
}
</style>
