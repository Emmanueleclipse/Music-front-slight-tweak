<template>
<div class="w-full py-10 px-5 md:px-0 container mx-auto">
    <h3 class="color-primary text-4xl pb-12 text-center font-normal" style="color:#0E3D67;">Subscription Plans</h3>
    <div class="grid md:grid-cols-2 gap-10 md:gap-20">
        <div class="wrapper w-full px-12 py-16">
            <h3 class="text-4xl  text-gray-700 text-center font-normal">Free</h3>
            <h1 class="text-5xl  font-bold text-center  leading-none py-1" style="color:#4285C2;">$0</h1>
            <p class="text-sm  text-center  pt-1" style="color:#0E3D67;">per year</p>
            <div class="flex justify-center pb-10 pt-6">
                <div class="w-48 py-2 px-5 rounded-full border-2 font-semibold  text-center text-sm " style="color:#4285C2;border-color: #4285C2">15 Tracks</div>
            </div>
            <div class="flex justify-center pt-10">
                <nuxt-link to="register" v-if="!authenticated" class="subscription__btn_one w-48 inline-block text-center py-2 px-5 text-white text-sm rounded-full ">Sign Up</nuxt-link>

            </div>
        </div>
        <div class="wrapper wrapper__gradient w-full px-12 py-16">
            <h3 class="text-4xl  text-white text-center font-normal">Gold</h3>
            <h1 class="text-5xl  font-bold text-center text-white leading-none py-1">$89</h1>
            <p class="text-sm text-blue-500 text-center pt-1">per year</p>
            <div class="flex justify-center pb-10 pt-6">
                <div class="w-48 py-2 px-5 rounded-full border-2 border-white text-white text-center font-semibold text-sm tracking-wide">Unlimited Tracks</div>
            </div>
            <div class="flex justify-center pt-10">
                <nuxt-link v-if="!authenticated" to="register" class="subscription__btn w-48 inline-block text-center py-2 px-5 text-white text-sm rounded-full ">Sign Up</nuxt-link>
                <div v-else>
                    <nuxt-link to="upgrade-account" v-if="user.type == 0 && user.is_admin == 0" class="subscription__btn w-48 inline-block text-center py-2 px-5 text-white text-sm rounded-full ">Upgrate now</nuxt-link>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {

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

.subscription__btn {
    background: #0E3D67;
}
</style>
