<template>
<div class="login-wrapper__social pb-8 border-b">
    <a @click="socialLogin('google')" href="#" class="flex items-center custom__google__btn px-5 py-2 mb-3">
        <img src="/images/google.png" alt="google login"> <span class="color-primary  pl-3">Sign in with Google</span>
    </a>
    <a @click="socialLogin('facebook')" href="#" class="custom__facebook__btn px-5 py-2 ">
        <font-awesome-icon class="text-xl text-white ml-1" :icon="['fab', 'facebook-f']" /> <span class="text-white  pl-3">Sign in with Facebook</span>
    </a>
</div>
</template>

<script>
export default {
    methods: {
        socialLogin(service) {
            window.location.href = `${process.env.baseUrl}auth/login/${service}`;
        }
    }
}
</script>
