<template>
<div class="w-full py-10 px-5 md:px-0 container mx-auto">
    <h3 class="color-primary text-3xl pb-12 text-center font-medium">Checkout</h3>
    <p v-if="error" class="text-center pb-10 text-lg text-red-600 ">{{ error }}</p>
    <div class="flex w-6/12 mx-auto">

        <form v-if="iscard" action="" @submit.prevent="paynow">
            <div class="wrapper w-full px-8 py-8">
                <div class="py-5">
                    <div class="wrapper__input pb-8">
                        <the-mask required mask="#### #### #### ####" :class="{ 'border-red-500':  errors.card_number }" placeholder="Cart Number" v-model="card.card_number" name="card_number" id="card_number" class="number__appearance px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full"></the-mask>
                        <div class="text-red-500 pl-3" v-if="errors.card_number">
                            {{errors.card_number[0]}}
                        </div>
                    </div>
                    <div class="grid lg:grid-cols-3 gap-5">
                        <div class="wrapper__input pb-8">
                            <input required type="text" placeholder="Name of cart" v-model="card.card_name" :class="{ 'border-red-500': errors.card_name }" name="card_name" id="card_name" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                            <div class="text-red-500 pl-3" v-if="errors.card_name">
                                {{errors.card_name[0]}}
                            </div>
                        </div>
                        <div class="wrapper__input pb-8">
                            <input required v-cleave="{date: true,datePattern: ['m','y']}" v-model="card.mmyy" placeholder="MM / YY" :class="{ 'border-red-500': errors.mmyy }" name="mmyy" id="mmyy" class=" px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                            <div class="text-red-500 pl-3" v-if="errors.mmyy">
                                {{errors.mmyy[0]}}
                            </div>
                        </div>
                        <div class="wrapper__input pb-8">
                            <the-mask required v-model="card.cvc" mask="###" placeholder="CVC" name="cvc" id="cvc" :class="{ 'border-red-500': errors.cvc }" class=" px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full"></the-mask>
                            <div class="text-red-500 pl-3" v-if="errors.cvc">
                                {{errors.cvc[0]}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="py-3 flex justify-center">
                    <button type="submit" class="subscription__btn_one text-white rounded-full w-48 py-2 " v-if="!loading"> Pay </button>
                    <button type="button" class="subscription__btn_one text-white rounded-full w-48 py-2" v-else>
                        <div class="loadersm loader-sm"></div>
                    </button>
                </div>
            </div>
        </form>
        <div class="w-full   p-5" v-else>
            <div class="py-5 flex flex-col justify-center items-center">
                <h2 class="text-lg">Are you Sure to proceed pay by existing card</h2>
                <p>Or</p>
                <button @click="update" class="text-blue-700 hover:text-blue-500 pb-8">Update card to payment</button>
                <button class="px-10 py-2 btn-bg rounded-full text-white" v-if="!loading" @click="paynowwithoutcard">Proceed to pay</button>
                <button type="button" class="px-10 py-2 btn-bg rounded-full text-white w-48" v-else>
                    <div class="loadersm loader-sm"></div>
                </button>
            </div>

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
    middleware: ['auth'],
    data() {
        return {
            loading: false,
            card: {
                card_number: '',
                card_name: '',
                mmyy: '',
                cvc: ''
            },
            error: '',
            iscard: false
        }
    },
    computed: {
        ...mapGetters({
            getCartDatas: 'cart/getCartDatas',
            getTotal: 'cart/getTotal',
            cartDataCount: 'cart/cartDataCount',
        })
    },
    methods: {
        update() {
            this.iscard = true;
        },
        paynow() {
            if (this.cartDataCount !== 0) {
                let vm = this;
                this.loading = true;
                this.$axios.post(
                    'checkout', {
                        card: this.card,
                        cart_info: this.getCartDatas,
                    }
                ).then(({
                    data
                }) => {
                    if (data.success === true) {
                        localStorage.removeItem('tracks');
                        this.$router.push('/buyer/dashboard')
                        this.loading = false;
                    }
                }).catch(error => {
                    let {
                        data
                    } = error.response;
                    if (data.success == false) {
                        vm.error = data.error
                        this.loading = false;
                    }
                });
            } else {
                this.$swal({
                    title: "Car is empty!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push('/tracks')
                    }
                })
            }

        },
        paynowwithoutcard() {
            if (this.cartDataCount !== 0) {
                let vm = this;
                this.loading = true;
                this.$axios.post(
                    'checkout-without-card', {
                        cart_info: this.getCartDatas,
                    }
                ).then(({
                    data
                }) => {
                    if (data.success === true) {
                        localStorage.removeItem('tracks');
                        this.$router.push('/buyer/dashboard')
                        this.loading = false;
                    }
                }).catch(error => {
                    let {
                        data
                    } = error.response;
                    if (data.success == false) {
                        vm.error = data.error
                        this.loading = false;
                    }
                });
            } else {
                this.$swal({
                    title: "Car is empty!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push('/tracks')
                    }
                })
            }

        }

    },
    created() {
        if (!this.authenticated) {
            this.$router.push('login?redirect=checkout');

        } else {
            if (this.user.stripe_customer_id === null) {
                this.iscard = true
            }
        }

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

    &:hover {
        background: transparent linear-gradient(90deg, #105b9d 0%, #378bda 100%) 0% 0% no-repeat padding-box;
    }
}
</style>
