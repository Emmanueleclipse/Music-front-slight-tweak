<template>
<nuxt-link to="/cart" class="cart relative px-5 cursor-pointer inline-block">
    <img src="/images/admin/dashboard-img-7.svg" width="25" height="25" alt="cart images">
    <div v-if="count" class="flex justify-center items-center rounded-full p-1 w-5 h-5 bg-red-600 absolute top-0 right-0 text-xs text-white leading-none -mt-2 mr-3">{{ count }}</div>
</nuxt-link>
</template>

<script>
import {
    mapGetters
} from "vuex";
export default {
    computed: {
        ...mapGetters({
            count: 'cart/cartDataCount',
        })
    },
}
</script>

<style lang="scss">
.cart {
    img {
        max-width: 25px !important;
    }
}
</style>
