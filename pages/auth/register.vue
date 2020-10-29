<template>
<div class="w-full py-10 px-5 container mx-auto">
    <h3 class="color-primary text-3xl pb-12 text-center font-medium">Register</h3>
    <div class="registration-wrapper w-full sm:w-2/3 md:w-4/6 lg:w-5/12 mx-auto p-12">
        <SocialLogin />

        <form @submit.prevent="register">
            <div class="registration-wrapper__main pt-5">
                <div class="registration-wrapper__input pb-5">
                    <label for="email" class="block ml-3 color-primary font-bold mb-1">Email <span class="text-red-600">*</span></label>
                    <input type="email" required v-model="form.email" :class="{ 'border-red-500': errors.email }" name="email" id="email" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                    <div class="text-red-500 pl-3" v-if="errors.email">
                        {{errors.email[0]}}
                    </div>
                </div>
                <div class="registration-wrapper__input pb-5">
                    <label for="name" class="block ml-3 color-primary font-bold mb-1">Full Name <span class="text-red-600">*</span></label>
                    <input type="text" required id="name" v-model="form.name" :class="{ 'border-red-500': errors.name }" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                    <div class="text-red-500 pl-3" v-if="errors.name">
                        {{errors.name[0]}}
                    </div>
                </div>
                <div class="registration-wrapper__input pb-5">
                    <label for="producer_name" required class="block ml-3 color-primary font-bold mb-1">Producer Name <span class="text-red-600">*</span></label>
                    <input type="text" id="producer_name" v-model="form.producer_name" :class="{ 'border-red-500': errors.producer_name }" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                    <div class="text-red-500 pl-3" v-if="errors.producer_name">
                        {{errors.producer_name[0]}}
                    </div>
                </div>
                <div class="registration-wrapper__input pb-5">
                    <label for="invite_code" class="block ml-3 color-primary font-bold mb-1">Invite Code <span class="text-red-600">*</span></label>
                    <input type="text" id="invite_code" v-model="form.invite_code" :class="{ 'border-red-500': errors.invite_code }" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                    <div class="text-red-500 pl-3" v-if="errors.invite_code">
                        {{errors.invite_code[0]}}
                    </div>
                </div>

                <div class="registration-wrapper__input pb-5">
                    <div class="flex justify-between">
                        <div class="py-2">
                            <p for="location" class="block ml-3 color-primary font-bold mb-1">Profile Image </p>
                            <label for="choose" class="block ml-3 no-underline label-link">Choose Photo</label>
                            <input type="file" class="hidden" id="choose" @change="selectFile" accept="image/*">
                        </div>
                        <div class="py-2">
                            <img v-if="!photo" src="/images/avater.svg" alt="profile photo" class="registration__images">
                            <img v-if="photo" :src="photo" alt="profile photo" class="registration__images">
                        </div>
                    </div>
                </div>

                <div class="registration-wrapper__input pb-5">
                    <label for="location" class="block ml-3 color-primary font-bold mb-1">Location </label>
                    <input type="text" id="location" v-model="form.location" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                </div>
                <div class="registration-wrapper__input pb-5">
                    <label for="bio" class="block ml-3 color-primary font-bold mb-1">Bio </label>
                    <textarea name="bio" id="bio" v-model="form.bio" cols="10" rows="4" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 w-full register__textarea resize-none"></textarea>
                </div>
                <div class="registration-wrapper__input pb-5">
                    <label for="paypal" class="block ml-3 color-primary font-bold mb-1">Connect PayPal account </label>
                    <input type="text" id="paypal" v-model="form.paypal" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                </div>
                <div class="registration-wrapper__input pb-5">
                    <label for="password" class="block ml-3 color-primary font-bold mb-1"> Password <span class="text-red-600">*</span></label>
                    <input type="password" required v-model="form.password" :class="{ 'border-red-500': errors.password }" id="password" name="password" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                    <div class="text-red-500 pl-3" v-if="errors.password">
                        {{errors.password[0]}}
                    </div>
                </div>
                <div class="registration-wrapper__input pb-5">
                    <label for="confirmed" class="block ml-3 color-primary font-bold mb-1">Confirm Password <span class="text-red-600">*</span></label>
                    <input type="password" required v-model="form.confirmed" :class="{ 'border-red-500': errors.confirmed }" id="confirmed" name="confirmed" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                    <div class="text-red-500 pl-3" v-if="errors.confirmed">
                        {{errors.confirmed[0]}}
                    </div>
                </div>
            </div>
            <div class="registration-wrapper__button-area flex justify-center w-full py-10">
                <button type="submit" class="border-none w-56 rounded-full py-2 px-3 text-white">Sign up</button>
            </div>
            <modal name="dialog" class="relative" width="400px" height="200px">
                <div @click="hidemodal" class="absolute cursor-pointer right-0 top-0 mr-2 mt-1 w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center">
                    <font-awesome-icon class="text-base text-gray-600" :icon="['fas', 'times']" />
                </div>

                <div class="grid md:grid-cols-2  md:gap-10 px-8 pt-12">
                    <div class="flex justify-center">
                        <input type="radio" v-model="type" value="0" id="seller" name="user-type" checked>
                        <label for="seller" class="py-1"> <span class="color-blue-500 font-bold ml-2">As a seller</span></label>
                    </div>
                    <div class="flex justify-center">
                        <input type="radio" v-model="type" id="buyer" value="1" name="user-type">
                        <label for="buyer" class=" py-1 "> <span class="color-blue-500 font-bold ml-2">As a buyer</span></label>
                    </div>
                </div>
                <div class="registration-wrapper__button-area flex justify-center w-full py-10">
                    <button type="button" @click="done" class="border-none w-56 rounded-full py-2 px-3 text-white">Done</button>
                </div>
            </modal>
        </form>
        <div class="loing-wrapper flex justify-center">
            <nuxt-link to="/login" class="register-link">Already have a account? Login</nuxt-link>
        </div>
    </div>

</div>
</template>

<script>
import SocialLogin from '@/components/auth/SocialLogin';
export default {
    name: 'register',
    middleware: 'guest',
    components: {
        SocialLogin
    },
    data: () => ({
        form: {
            email: '',
            name: '',
            producer_name: '',
            invite_code: '',
            location: '',
            bio: '',
            paypal: '',
            password: '',
            confirmed: '',
        },
        file: null,
        photo: null,
        id: '',
        type: 0,
    }),
    methods: {
        selectFile(event) {
            this.file = event.target.files[0];
            if (event.target.files) {
                let blob = new Blob(event.target.files, {
                    type: event.target.files[0].type
                })
                if (event.target.files[0].size / 1024 / 1024 >= 1) return this.$swal('File size must be greater then 1 mb.');
                this.photo = URL.createObjectURL(blob);
            }

        },
        async register() {
            const datas = new FormData();
            datas.append('photo', this.file);
            const json = JSON.stringify(this.form);
            datas.append('data', json);
            try {
                let {
                    data
                } = await this.$axios.post('/auth/registers', datas);
                if (data.success === true) {
                    this.id = data.id
                    this.$modal.show('dialog');
                }
            } catch (e) {
                return;
            }

        },
        async done() {

            try {
                let datas = {
                    id: this.id,
                    type: this.type,
                    email: this.form.email,
                    password: this.form.password
                }
                let {
                    data
                } = await this.$axios.post('/auth/register/type', datas);
                if (data.success === true) {
                    this.$auth.login({
                        data: this.form
                    });

                    if (this.authenticated) {
                        if (this.user.is_admin === 1) {
                            this.$router.push(this.$route.query.redirect ? this.$route.query.redirect : '/admin/dashboard');
                        } else {
                            if (this.user.is_admin === 0 && this.user.type === 1) {
                                this.$router.push(this.$route.query.redirect ? this.$route.query.redirect : '/buyer/dashboard');
                            } else {
                                this.$router.push(this.$route.query.redirect ? this.$route.query.redirect : '/seller/dashboard');
                            }
                        }
                    }
                }
            } catch (e) {
                return;
            }

        },
        hidemodal() {
            this.$modal.hide('dialog');
        }
    },

}
</script>

<style>
.registration-wrapper {
    box-shadow: 0px 0px 49px #4285C24D;
    border-radius: 20px;
}

.custom__google__btn {
    background: transparent linear-gradient(180deg, #FFFFFF 0%, #DDDDDD 100%) 0% 0% no-repeat padding-box;
    border: 1px solid #BFBFBF;
    border-radius: 28px;
    width: 100%;
}

.custom__google__btn img {
    width: 20px;
    height: 20px;
}

.custom__facebook__btn {
    background: transparent linear-gradient(180deg, #497CEF 0%, #3A569B 100%) 0% 0% no-repeat padding-box;
    border-radius: 28px;
    width: 100%;
    display: inline-block;
}

.registration-wrapper__button-area button {
    background: transparent linear-gradient(180deg, #4285C2 0%, #0E3D67 100%) 0% 0% no-repeat padding-box;
}

.register-link {
    color: #4285C2;
    text-decoration: underline;
}

.register__textarea {
    border-radius: 23px;
}

.label-link {
    color: #4285C2;
    cursor: pointer;
}

.forget-link {
    color: #4285C2;
    text-decoration: underline;
}

.registration__images {
    width: 60px;
    height: 60px;
    border: 2px solid #ccc;
    padding: 5px;
    border-radius: 60px;
}
</style>
