<template>
<div class="container mx-auto   py-16">
    <div class="border  shadow-lg bg-white">
        <div class="p-5 border-b">
            <div class="flex justify-between">
                <h1 class="color-primary text-xl font-bold">Profile</h1>
                <div class="flex md:pl-5 items-center cursor-pointer relative">
                    <nuxt-link :to="`/seller/${user.id}/profile`" class="py-2 px-8 bg-primary text-white">
                        Back
                    </nuxt-link>
                </div>
            </div>
        </div>

        <form @submit.prevent="updateProfile" v-if="!loading">
            <div class="md:flex p-5">
                <div class="w-full md:w-3/12">
                    <div class="flex w-full justify-center flex-col items-center">
                        <div class="flex justify-center" v-if="!photo">
                            <img v-if="loaduser != null" :src="imgurl + loaduser" width="100" class="mx-5 w-64 md:w-48 h-64 md:h-48 rounded-full mb-2 shadow border border-gray-700  object-cover" height="100" alt="">

                        </div>
                        <div class="flex justify-center" v-else>
                            <img v-if="photo" :src="photo" alt="profile photo" class="mx-5 w-64 md:w-48 h-64 md:h-48 rounded-full mb-2 shadow border border-gray-700  object-cover">
                        </div>
                        <div class="flex justify-center">
                            <label for="choose" class="block ml-3 no-underline label-link cursor-pointer hover:text-blue-400">Choose Photo</label>
                            <input type="file" class="hidden" id="choose" @change="selectFile" accept="image/*">
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-9/12">
                    <div class="py-5 px-5">
                        <ul class="list-unstyled">
                            <li class="py-2 flex">
                                <p class="md:w-4/12 lg:w-3/12 xl:w-2/12">Name: </p><span class="md:w-8/12 lg:w-9/12 xl:w-10/12 font-bold pl-5">
                                    <input type="text" required id="name" v-model="form.name" :class="{ 'border-red-500': errors.name }" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                                    <div class="text-red-500 pl-3" v-if="errors.name">
                                        {{errors.name[0]}}
                                    </div>
                                </span>
                            </li>
                            <li class="py-2 flex">
                                <p class="md:w-4/12 lg:w-3/12 xl:w-2/12">Producer Name: </p><span class="md:w-8/12 lg:w-9/12 xl:w-10/12 font-bold pl-5">
                                    <input type="text" id="producer_name" v-model="form.producer_name" :class="{ 'border-red-500': errors.producer_name }" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                                    <div class="text-red-500 pl-3" v-if="errors.producer_name">
                                        {{errors.producer_name[0]}}
                                    </div>
                                </span>
                            </li>
                            <li class="py-2 flex">
                                <p class="md:w-4/12 lg:w-3/12 xl:w-2/12">Invite code: </p><span class="md:w-8/12 lg:w-9/12 xl:w-10/12 font-bold pl-5">
                                    <input type="text" id="invite_code" v-model="form.invite_code" :class="{ 'border-red-500': errors.invite_code }" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                                    <div class="text-red-500 pl-3" v-if="errors.invite_code">
                                        {{errors.invite_code[0]}}
                                    </div>
                                </span>
                            </li>
                            <li class="py-2 flex">
                                <p class="md:w-4/12 lg:w-3/12 xl:w-2/12">Location: </p><span class="md:w-8/12 lg:w-9/12 xl:w-10/12 font-bold pl-5">
                                    <input type="text" id="location" v-model="form.location" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                                </span>
                            </li>
                            <li class="py-2 md:flex">
                                <p class="md:w-4/12 lg:w-3/12 xl:w-2/12">Bio: </p><span class="md:w-8/12 lg:w-9/12 xl:w-10/12 font-bold pl-5">
                                    <ckeditor type="classic" v-model="form.bio"></ckeditor>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="flex py-4 justify-center">
                <button type='submit' class="py-2 px-8 bg text-white rounded-lg">Update</button>
            </div>
        </form>
        <div v-else class="loader-parent">
            <div class="loader"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    middleware: ['auth', 'seller'],
    layout: 'seller',
    data() {
        return {
            imgurl: process.env.imgUrl,
            dropdown: false,
            form: {
                name: '',
                producer_name: '',
                invite_code: '',
                location: '',
                bio: '',
            },
            file: null,
            photo: null,
            loaduser: '',
            loading: false,
        }
    },
    methods: {
        async loadUser() {
            this.loading = true;
            let {
                data
            } = await this.$axios.get(`/seller/${this.user.id}/profile`);

            if (data.success == true) {
                this.loaduser = data.data.images
                this.form.name = data.data.name
                this.form.producer_name = data.data.producer_name
                this.form.invite_code = data.data.invite_code
                this.form.bio = data.data.bio
                this.form.location = data.data.location
                this.loading = false
            } else {
                this.$swal({
                    title: data.errors,
                })
            }
        },
        menuClick() {
            this.dropdown = !this.dropdown
        },
        hide() {
            this.dropdown = false
        },
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
        async updateProfile() {
            const datas = new FormData();
            datas.append('photo', this.file);
            const json = JSON.stringify(this.form);
            datas.append('data', json);
            try {
                let {
                    data
                } = await this.$axios.post(`/seller/${this.user.id}/update`, datas);
                if (data.success === true) {
                    this.$router.push(`/seller/${this.user.id}/profile`)

                    this.$swal({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                        title: 'Profile has been Updated',
                    })

                }
            } catch (e) {
                console.log(e.message)
            }

        },
    },
    created() {
        this.loadUser();

    }
}
</script>
