<template>
<header class="header-area py-6 px-4 rounded-md bg-white">
    <div class="flex justify-between items-center">
        <h1 class="text-gray-700 text-base flex items-center">
            <span class="block md:hidden p-1 bars--click">
                <font-awesome-icon @click="toggle" class="text-xl text-gray-700 cursor-pointer bars--click" :icon="['fas', 'bars']" />
            </span>
            <span class="block ml-3 leading-none text-lg">Seller Account</span>
        </h1>
        <div class="right-area w-36 flex items-center">
            <nuxt-link to="/upgrade-account" v-if="!isPremium" class="btn-bg py-1 px-5 text-white rounded-full mx-3">Upgrade now</nuxt-link>
            <button v-else class="btn-bg py-1 px-5 text-white rounded-full">Your account upgraded</button>
            <div class="admin-profie flex md:pl-5 items-center cursor-pointer relative" @click="menuClick" v-click-outside="hide">
                <authImg />
                <div class="absolute top-0 left-0 mt-12  bg-white shadow rounded-lg" v-if="dropdown">
                    <nuxt-link :to="`/seller/${user.id}/profile`" class="flex items-center hover:bg-gray-200 w-32 py-4 px-5">
                        <font-awesome-icon @click="toggle" class="text-xl text-gray-700 pr-1" :icon="['fas', 'user-alt']" /> <span class="text-gray-700">Profile</span>
                    </nuxt-link>
                    <a href="#" @click.prevent="signOut" class="flex items-center hover:bg-gray-200 w-32 py-4 px-5">
                        <font-awesome-icon @click="toggle" class="text-xl text-gray-700 pr-1" :icon="['fas', 'sign-out-alt']" /> <span class="text-gray-700">Logout</span>
                    </a>

                </div>
            </div>
        </div>
    </div>
</header>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";
import authImg from '@/components/auth/authImg';
export default {
    components: {
        authImg
    },
    data() {
        return {
            dropdown: false,
            isPremium: false,
        }
    },
    watch: {
        'get_is_premium'() {
            if (this.get_is_premium == 'false') {
                this.isPremium = true
            }
        },

    },
    computed: {
        ...mapGetters({
            get_is_premium: 'get_is_premium',
        }),

    },
    methods: {
        ...mapActions({
            fetch_is_premium: 'fetch_is_premium',
        }),
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
        },
        async check() {
            if (this.authenticated) {
                await this.fetch_is_premium();
                if (this.get_is_premium == true) {
                    this.isPremium = true
                }
            }
        },
    },
    created() {
        this.check()
    }
}
</script>

<style lang="scss">
.header-area {
    box-shadow: 0pt 0pt 25pt #0000001A;
}
</style>
