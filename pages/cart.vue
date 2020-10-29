<template>
<div class="w-full py-10 px-5 md:px-0 container mx-auto">
    <h3 class="color-primary text-xl pb-6 text-left font-normal">Shopping Cart</h3>
    <div class="w-full mx-auto" v-if="getCartDatas.length > 0">
        <div class="wrapper w-full">
            <div class="flex flex-col-reverse lg:flex-row">
                <div class="w-full lg:w-9/12 pr-5  ">
                    <table class="cart-table lg:w-full table-auto table--area">
                        <thead>
                            <tr class="text-left">
                                <th class="w-32"></th>
                                <th class="color-blue-500 py-4 px-1 md:px-4"> </th>
                                <th class="color-blue-500 py-4 px-1 md:px-4 w-48 text-center">Item Total</th>
                                <th class="color-blue-500 py-4 px-1 md:px-4 w-18 text-center">Subtotal</th>
                                <th class="color-blue-500 py-4 px-1 md:px-4"></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data in getCartDatas" :key="data.id">
                                <td class="text-gray-600 px-1 md:px-4 py-2">
                                    <img v-if="data.image !=null" :src="imgurl + 'storage/'+ data.image" class="w-24 rounded-lg    shadow border border-gray-700 h-24 object-cover">
                                </td>
                                <td class="text-gray-600 px-1 md:px-4 py-2">
                                    <h3 class="text-lg font-bold">{{ data.title }}</h3>
                                    <p class="text-base font-normal color-muted" v-if="data.user">By {{ data.user.name }}</p>
                                </td>
                                <td data-column="Item Total" class="text-gray-600 px-1 md:px-4 py-2  text-center">${{ data.total }}</td>
                                <td data-column="Subtotal" class="text-gray-600 px-1 md:px-4 py-2  text-center">${{ data.subtotal }}</td>
                                <td class="text-gray-600 px-1 md:px-4 py-2">
                                    <button class="px-1 custom__img-btn" @click="SingleCartRemove(data.id)"></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="w-full lg:w-3/12">
                    <div class="rounded-lg p-6 bg h-full ">
                        <h2 class="text-white py-3 text-lg pb-8">Cart Totals</h2>

                        <div class="flex justify-between">
                            <div class="px-2 text-white">Subtotal: </div>
                            <div class="px-1 text-white" v-if="getTotal">${{ getTotal }} </div>
                        </div>
                        <div class="flex justify-between pt-3">
                            <div class="px-2 text-white">Total: </div>
                            <div class="px-1 text-white" v-if="getTotal">${{ getTotal }} </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="py-8 flex  flex-col items-center md:flex-row md:items-start justify-between">
            <div class="pr-2 flex items-center pb-4 md:pb-0 ">
                <!--<div class="wrapper__input pr-5">
                    <input required type="text" placeholder="Coupon Code" name="card_number" id="card_number" class="number__appearance px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                </div>
                <button class="px-10 py-2 btn-bg rounded-full text-white">Apply Coupon</button>-->
            </div>
            <div class="px-3">
                <button class="px-10 py-2 btn-bg rounded-full text-white" @click="checkOut">Proceed to Checkout</button>
            </div>
        </div>
    </div>
    <div v-else class="text-center">
        <h1 class="text-center py-10 px-5 text-2xl color-primary">Cart is now empty</h1>
        <nuxt-link to="tracks" class="px-10 py-2 btn-bg rounded-full text-white">Let's Explore Beats</nuxt-link>
    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    data() {
        return {
            imgurl: process.env.imgUrl,
        }
    },
    methods: {
        ...mapActions({
            fetchData: 'cart/fetchData',
            removeCart: 'cart/removeCart',
        }),
        SingleCartRemove(id) {
            this.removeCart(id)
        },
        checkOut() {
            if (this.authenticated) {
                this.$router.push('/checkout')

            } else {
                this.$router.push('login?redirect=checkout');
            }
        },
        hidemodal() {
            this.$modal.hide('dialog');
        },

    },
    computed: {
        ...mapGetters({
            getCartDatas: 'cart/getCartDatas',
            getTotal: 'cart/getTotal',
        })
    },
    mounted() {
        this.fetchData();
    }
}
</script>

<style lang="scss">
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

@media only screen and (max-width: 760px) {
    table.cart-table {
        td {
            border: none;
            position: relative;
            padding-left: 15% !important;
        }

        td::before {
            position: absolute;
            top: 6px;
            left: 50px;
            width: 45%;
            padding-right: 10px;
            white-space: nowrap;
            content: attr(data-column);
            color: #000;
            font-weight: bold;
            text-align: left;
        }
    }
}
</style>
