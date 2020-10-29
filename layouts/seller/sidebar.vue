<template>
<div class="sidebar py-5 px-5 w-64 -ml-64 md:ml-0 fixed top-0 bottom-0 left-0 sidebar--click" :class="isshowing ? 'showing': ''">
    <div class="logo__area pb-3 flex items-center justify-between">
        <nuxt-link to="/" class="logo">
            <h1 class="text-gray-800 text-3xl uppercase font-semibold">Logo</h1>
        </nuxt-link>
        <div class="nav__hidebtn block sm:hidden">
            <font-awesome-icon @click="hide" class="text-xl text-gray-700 cursor-pointer bars--click" :icon="['fas', 'bars']" />
        </div>
    </div>
    <div class="main__link">
        <ul class="list-none">
            <li>
                <nuxt-link to="/seller/dashboard" class="py-3 px-3 flex items-center  rounded">
                    <span class="dashboard"></span>
                    <span class="text-gray-700 text-base ml-2 ">Seller Account</span>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/seller/tracks" class="py-4 px-3 flex items-center  rounded">
                    <span class="tracks"></span>
                    <span class=" text-gray-700 text-base ml-2 ">Tracks</span>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/seller/add-new-tracks" class="py-4 px-3 flex items-center  rounded">
                    <span class="new_tracks"></span>
                    <span class=" text-gray-700 text-base ml-2 ">Add new tracks</span>
                </nuxt-link>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    props: ['isshowing'],
    data() {
        return {

        }
    },
    methods: {
        hide() {
            this.$emit('hidden')
        }
    },

}
</script>

<style lang="scss" scoped>
.sidebar {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    transition: .2s all ease-in;
    box-shadow: 0px 3px 6px #00000029;
}

.nuxt-link-active:not(.logo) {
    background-color: #4285C2;

    span {
        color: white;
    }
}

.sidebar--click.showing {
    margin-left: 0 !important;
    z-index: 999;
}

.dashboard {
    width: 35px;
    height: 29px;
    background: transparent url('/images/seller/path-img-black-home.svg') 0% 0% no-repeat padding-box;
    background-size: 26px;
    background-position: center center;
}

.nuxt-link-active .dashboard {
    background: transparent url('/images/admin/sidebar-img-1.svg') 0% 0% no-repeat padding-box;
    background-size: 26px;
    background-position: center center;
}

.tracks {
    width: 35px;
    height: 29px;
    background: transparent url('/images/seller/path-img-32.svg') 0% 0% no-repeat padding-box;
    background-size: 26px;
    background-position: center center;
}

.nuxt-link-active .tracks {
    background: transparent url('/images/seller/path-img-white-32.svg') 0% 0% no-repeat padding-box;
    background-size: 26px;
    background-position: center center;
}

.new_tracks {
    width: 35px;
    height: 29px;
    background: transparent url('/images/seller/path-img-37.svg') 0% 0% no-repeat padding-box;
    background-size: 26px;
    background-position: center center;
}

@media screen and (max-width: 650px) {
    .sidebar--click {
        top: 0;
        bottom: 0;
        left: 0;

        &::after {
            content: '';
            width: 100%;
            height: 100%;
            background: red;
        }
    }
}
</style>
