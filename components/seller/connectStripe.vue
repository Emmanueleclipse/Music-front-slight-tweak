<template>
<modal name="dialog" class="relative" width="370" :clickToClose="false" :scrollable="true" height="auto">
    <div @click="hidemodal" class="absolute cursor-pointer right-0 top-0 mr-2 mt-1 w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center">
        <font-awesome-icon class="text-base text-gray-600" :icon="['fas', 'times']" />
    </div>
    <div class="w-full flex flex-col justify-centeri items-center  px-5 py-10">
        <h2 class="text-gray-700 text-base pb-4"> Please connected <span class="color-primary font-semibold">Stripe</span> in order to start the process</h2>
        <button class="button rounded-full py-2 px-5 w-48 text-white" @click="connectStripe">Connect now</button>
    </div>
</modal>
</template>

<script>
export default {
    props: ['connected'],
    data() {
        return {
            type: ''
        }
    },
    methods: {
        hidemodal() {
            this.$router.push('/seller/tracks')
        },
        async connectStripe() {
            const {
                data
            } = await this.$axios.get(
                'seller/stripe'
            );
            window.location = data
        }
    },
    watch: {
        connected: function (newVal, oldVal) {
            if (this.connected == true) {
                this.$modal.show('dialog');
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.button {
    background: transparent linear-gradient(180deg, #4285C2 0%, #0E3D67 100%) 0% 0% no-repeat padding-box;
}

.button:disabled,
.button[disabled] {
    background: #4285C2;
    color: #ffffff;
    cursor: not-allowed;
}
</style>
