<template>
<div class="w-full py-10 px-5 md:px-0 container mx-auto">
    <h3 class="color-primary text-3xl pb-12 text-center font-medium">Upgrade account</h3>
    <p v-if="error" class="text-center pb-10 text-lg text-red-600 ">{{ error }}</p>
    <div class="flex w-full md:w-6/12 mx-auto">

        <form action="" @submit.prevent="paynow" class="w-full">
            <div class="wrapper w-full px-8 py-8">
                <div v-if="!premiumloading">
                    <div v-if="!isPremium">
                        <div class="pb-5">
                            <input type="radio" id="payment-1" name="payment-type" v-model="type" value="stripe">
                            <label for="payment-1" class=" py-1 "> <span class="color-blue-500 font-bold ml-2">Credit card</span></label>
                        </div>
                        <div v-if="!cardloading">
                            <div class="py-5" v-if="!iscard">
                                <div class="wrapper__input pb-8">
                                    <the-mask required mask="#### #### #### ####" :class="{ 'border-red-500': errors.card_number }" placeholder="Cart Number" v-model="card.card_number" name="card_number" id="card_number" class="number__appearance px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full"></the-mask>
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
                            <div class="w-full   p-5" v-else>
                                <div class="py-5 flex flex-col justify-center items-center">
                                    <h2 class="text-lg">Are you Sure to proceed pay by existing card</h2>
                                    <p>Or</p>
                                    <button @click="update" class="text-blue-700 hover:text-blue-500 pb-8" type="button">Update card to procced</button>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-center w-full loader-parent">
                            <div class="loader"></div>
                        </div>
                        <div class="py-3">
                            <input type="radio" id="payment-2" name="payment-type" v-model="type" value="paypal">
                            <label for="payment-2" class=" py-1"> <span class="paypal ml-2"></span></label>

                        </div>

                        <div class="py-3 flex justify-center" v-if="type != 'paypal' ">
                            <button type="submit" class="subscription__btn_one text-white rounded-full w-48 py-2 " v-if="!loading"> Pay </button>
                            <button type="button" class="subscription__btn_one text-white rounded-full w-48 py-2" v-else>
                                <div class="loadersm loader-sm"></div>
                            </button>
                        </div>
                        <div class="py-3 flex justify-center" v-else>
                            <button type="button" @click="paypal" class="subscription__btn_one text-white rounded-full w-48 py-2 "> Go </button>
                        </div>
                    </div>
                    <div class="w-full px-8 py-8" v-else>
                        <h2 class="text-center text-lg">Your are a premium user! </h2>
                    </div>
                </div>
                <div v-else class="text-center w-full loader-parent">
                    <div class="loader"></div>
                </div>
            </div>

        </form>

    </div>
    <modal name="dialog" class="relative" :clickToClose="false" :scrollable="true" height="auto">
        <div @click="hidemodal" class="absolute cursor-pointer right-0 top-0 mr-2 mt-1 w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center">
            <font-awesome-icon class="text-base text-gray-600" :icon="['fas', 'times']" />
        </div>
        <div class="w-full flex p-5">
            <div class="mx-auto w-50" ref="paypal"></div>
        </div>
    </modal>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    middleware: ['auth', 'seller'],
    data() {
        return {
            loading: false,
            type: 'stripe',
            card: {
                card_number: '',
                card_name: '',
                mmyy: '',
                cvc: ''
            },
            error: '',
            iscard: false,
            isPremium: false,
            cardloading: false,
            premiumloading: false,
        }
    },
    watch: {
        'get_is_save_card'() {
            if (this.get_is_save_card == 'false') {
                this.iscard = true
            }
        },
        'get_is_premium'() {
            if (this.get_is_premium == 'false') {
                this.isPremium = true
            }
        },

    },
    computed: {
        ...mapGetters({
            get_is_save_card: 'get_is_save_card',
            get_is_premium: 'get_is_premium',
        }),

    },
    methods: {
        ...mapActions({
            fetch_is_save_card: 'fetch_is_save_card',
            fetch_is_premium: 'fetch_is_premium',
        }),
        update() {
            this.iscard = false;
        },
        paynow() {
            if (this.type == 'stripe') {
                let vm = this;
                this.loading = true;
                if (this.iscard != true) {
                    this.$axios.post(
                        'upgrade-account', {
                            card: this.card
                        }
                    ).then(({
                        data
                    }) => {
                        if (data.success === true) {
                            this.$router.push('/seller/dashboard')
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
                    this.$axios.post(
                            'upgrade-account-without-card')
                        .then(({
                            data
                        }) => {
                            if (data.success === true) {
                                this.$router.push('/seller/dashboard')
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
                }
            }
        },
        async check() {
            if (this.authenticated) {
                this.premiumloading = true;
                await this.fetch_is_premium();
                if (this.get_is_premium == true) {
                    this.isPremium = true
                }
                this.premiumloading = false;
                this.cardloading = true;
                await this.fetch_is_save_card();
                if (this.get_is_save_card == true) {
                    this.iscard = true

                }
                this.cardloading = false;
            }
        },
        hidemodal() {
            this.$modal.hide('dialog');
        },
        paypal() {
            const script = document.createElement("script");
            script.src = process.env.paypal_client;
            script.addEventListener("load", this.setLoaded);
            document.body.appendChild(script);
            this.$modal.show('dialog');
        },
        setLoaded: function (resp) {
            window.paypal
                .Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                description: 'subscriptions',
                                amount: {
                                    currency_code: "USD",
                                    value: 89.99
                                }
                            }]
                        });
                    },
                    onApprove: async (data, actions, resp) => {
                        const order = await actions.order.capture();
                        this.data;
                        this.$axios.post(
                                'paypal-pay')
                            .then(({
                                data
                            }) => {
                                if (data.success === true) {
                                    this.$router.push('/seller/dashboard')
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
                    },
                    onError: err => {
                        console.log(err);
                    }
                })
                .render(this.$refs.paypal);
        },
    },
    created() {
        this.check()
    }
}
</script>

<style>
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

.paypal {
    background: transparent url('/images/paypal.png') 0% 0% no-repeat;
    width: 148px;
    display: block;
    height: 28px;
    background-size: 100px;
    background-position: left;
}
</style>
