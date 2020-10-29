<template>
<div class="py-10">
    <div class="p-12 shadow bg-white rounded-lg">
        <form @submit.prevent="onSubmit">
            <div class="grid lg:grid-cols-3 gap-4">
                <div class="py-4">
                    <p class="text-lg font-bold   text-gray-600 mb-3"> A file for Steaming <span class="text-red-600">*</span></p>
                    <dropzone id="foo" ref="audio" :options="optionsaudio" v-on:vdropzone-complete="audioComplete" v-on:vdropzone-sending="sendingAudio" v-on:vdropzone-removed-file="audioCanceled" :destroyDropzone="true" v-on:vdropzone-file-added="audiofileAdded">
                        <div class="flex flex-col items-center">
                            <img src="/images/seller/path-img-45.svg" width="60" height="50" alt="">
                            <p class="py-3 text-sm">Drag and drop to upload or <button type="button" class="text-blue-500">browse </button> to choose a file</p>
                        </div>
                    </dropzone>
                    <div class="text-red-500 pl-3" v-if="errors.audio_file">
                        {{errors.audio_file[0]}}
                    </div>
                </div>
                <div class="py-4">
                    <p class="text-lg font-bold  pb-3 text-gray-600">Deliverable Audio file <span class="text-red-600">*</span></p>
                    <dropzone id="foo" ref="zip" :options="optionszip" v-on:vdropzone-complete="ZipComplete" v-on:vdropzone-sending="sendingZip" v-on:vdropzone-removed-file="zipCanceled" :destroyDropzone="true" v-on:vdropzone-file-added="zipfileAdded">
                        <div class="flex flex-col items-center">
                            <img src="/images/seller/path-img-45.svg" width="60" height="50" alt="">
                            <p class="py-3 text-sm">Drag and drop to upload or <button type="button" class="text-blue-500">browse </button> to choose a file</p>
                        </div>
                    </dropzone>
                    <div class="text-red-500 pl-3" v-if="errors.zip_files">
                        {{errors.zip_files[0]}}
                    </div>
                </div>
                <div class="py-4">
                    <p class="text-lg font-bold  pb-3 text-gray-600">Feature Image <span class="text-red-600">*</span></p>
                    <dropzone id="foo" ref="image" :options="optionsimg" v-on:vdropzone-complete="ImgComplete" v-on:vdropzone-sending="sendingImg" v-on:vdropzone-removed-file="imageCanceled" :destroyDropzone="true" v-on:vdropzone-file-added="imagefileAdded">
                        <div class="flex flex-col items-center">
                            <img src="/images/seller/path-img-45.svg" width="60" height="50" alt="">
                            <p class="py-3 text-sm">Drag and drop to upload or <button type="button" class="text-blue-500">browse </button> to choose a file</p>
                        </div>
                    </dropzone>
                    <div class="text-red-500 pl-3" v-if="errors.feature_image">
                        {{errors.feature_image[0]}}
                    </div>
                </div>
            </div>
            <div class="grid lg:grid-cols-2 gap-5 lg:gap-10 ">
                <div class="px-2">
                    <div class="wrapper__input pb-8">
                        <label for="name" class="block ml-3 color-primary font-bold mb-1">Name <span class="text-red-600">*</span></label>
                        <input v-model="formdata.name" required :class="{ 'border-red-500': errors.name }" type="text" name="name" id="name" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                        <div class="text-red-500 pl-3" v-if="errors.name">
                            {{errors.name[0]}}
                        </div>
                    </div>
                    <div class="wrapper__input pb-8">
                        <label for="genre" class="block ml-3 color-primary font-bold mb-1">Genre <span class="text-red-600">*</span></label>
                        <select v-model="formdata.genre" name="genre" :class="{ 'border-red-500': errors.genre }" id="genre" class="custom--select px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full appearance-none" required>
                            <option value="">Select genre</option>
                            <option value="1">hip-hop</option>
                            <option value="2">pop</option>
                            <option value="3"> r&b</option>
                            <option value="4"> rock </option>
                            <option value="5"> electronic</option>
                            <option value="6">reggae</option>
                            <option value="7"> country </option>
                        </select>
                        <div class="text-red-500 pl-3" v-if="errors.genre">
                            {{errors.genre[0]}}
                        </div>
                    </div>
                    <div class="wrapper__input pb-8">
                        <label for="date" class="block ml-3 color-primary font-bold mb-1">Release Date </label>
                        <input type="date" v-model="formdata.date" required name="date" id="date" :class="{ 'border-red-500': errors.date }" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                        <div class="text-red-500 pl-3" v-if="errors.date">
                            {{errors.date[0]}}
                        </div>
                    </div>

                </div>
                <div class="px-2">

                    <div class="wrapper__input pb-8">
                        <label for="bpm" class="block ml-3 color-primary font-bold mb-1">Tempo (BPM) <span class="text-red-600">*</span></label>
                        <input type="text" v-model="formdata.bpm" required name="bpm" id="bpm" :class="{ 'border-red-500': errors.bpm }" class="px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                        <div class="text-red-500 pl-3" v-if="errors.bpm">
                            {{errors.bpm[0]}}
                        </div>
                    </div>
                    <div class="wrapper__input pb-8">
                        <label for="basic_price" class="block ml-3 color-primary font-bold mb-1">BASIC LICENSE (MP3) <span class="text-red-600">*</span></label>
                        <input type="number" min="1" v-model="formdata.basic_price" required placeholder="$" :class="{ 'border-red-500': errors.basic_price }" name="basic_price" id="basic_price" class="number__appearance  px-5 py-2 border border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">
                        <div class="text-red-500 pl-3" v-if="errors.basic_price">
                            {{errors.basic_price[0]}}
                        </div>
                    </div>
                    <div class="wrapper__input pb-8">
                        <label for="premium_price" class="block ml-3 color-primary font-bold mb-1">PREMIUM LICENSE (MP3 & WAV) </label>
                        <input type="number" min="1" placeholder="$" v-model="formdata.premium_price" :class="{ 'border-red-500': errors.premium_price }" name="premium_price" id="premium_price" class="px-5 py-2 border number__appearance  border-gray-400 focus:outline-none text-gray-600 rounded-full w-full">

                    </div>
                </div>
            </div>
            <div class="flex justify-center">
                <button type="submit" class="px-10 py-2 btn-bg rounded-full text-white" :disabled="btn">Submit</button>
            </div>
        </form>
    </div>
    <ConnectStripe :connected="connected" />
</div>
</template>

<script>
import ConnectStripe from '@/components/seller/connectStripe'
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'
import {
    mapMutations
} from "vuex";
export default {
    middleware: ['auth', 'seller'],
    layout: 'seller',
    components: {
        Dropzone
    },
    data() {
        return {
            url: process.env.baseUrl,
            track_id: '',
            connected: false,
            btn: false,
            optionsaudio: {
                url: '',
                autoProcessQueue: false,
                duplicateCheck: true,
                addRemoveLinks: true,
                acceptedFiles: "audio/*",
                maxFiles: 1,
                init: function () {
                    this.on('maxfilesreached', function () {
                        document.querySelector('.dropzone').classList.remove('dz-clickable'); // remove cursor
                        document.querySelector('.dropzone').removeEventListener('click', this.listeners[1].events.click);
                    });
                    this.on('removedfile', function () {
                        document.querySelector('.dropzone').classList.add('dz-clickable'); // remove cursor
                        document.querySelector('.dropzone').addEventListener('click', this.listeners[1].events.click);
                    });
                }
            },
            optionszip: {
                url: '',
                autoProcessQueue: false,
                duplicateCheck: true,
                addRemoveLinks: true,
                acceptedFiles: ".zip",
                maxFiles: 1,
                init: function () {
                    this.on('maxfilesreached', function () {
                        document.querySelector('.dropzone').classList.remove('dz-clickable'); // remove cursor
                        document.querySelector('.dropzone').removeEventListener('click', this.listeners[1].events.click);
                    });
                    this.on('removedfile', function () {
                        document.querySelector('.dropzone').classList.add('dz-clickable'); // remove cursor
                        document.querySelector('.dropzone').addEventListener('click', this.listeners[1].events.click);
                    });
                }
            },
            optionsimg: {
                url: '',
                autoProcessQueue: false,
                duplicateCheck: true,
                addRemoveLinks: true,
                acceptedFiles: "image/*",
                maxFiles: 1,
                init: function () {
                    this.on('maxfilesreached', function () {
                        document.querySelector('.dropzone').classList.remove('dz-clickable'); // remove cursor
                        document.querySelector('.dropzone').removeEventListener('click', this.listeners[1].events.click);
                    });
                    this.on('removedfile', function () {
                        document.querySelector('.dropzone').classList.add('dz-clickable'); // remove cursor
                        document.querySelector('.dropzone').addEventListener('click', this.listeners[1].events.click);
                    });
                }
            },
            formdata: {
                audio_file: '',
                zip_files: '',
                feature_image: '',
                name: '',
                genre: '',
                date: '',
                bpm: '',
                basic_price: '',
                premium_price: '',
            },
            audiocomplete: false,
            zipcomplete: false,
            imgcomplete: false,
        }
    },
    watch: {
        $data: {
            handler: function (val, oldVal) {
                if (val.audiocomplete && val.zipcomplete && val.imgcomplete) {
                    this.$router.push('/seller/tracks');
                }
            },
            deep: true
        }
    },
    methods: {
        audiofileAdded() {
            this.formdata.audio_file = 'audio'
        },
        zipfileAdded() {
            this.formdata.zip_files = 'zip'
        },
        imagefileAdded() {
            this.formdata.feature_image = 'image'
        },
        audioCanceled() {
            this.formdata.audio_file = ''
        },
        zipCanceled() {
            this.formdata.zip_files = ''
        },
        imageCanceled() {
            this.formdata.feature_image = ''
        },
        sendingAudio(file, xhr, formData) {
            formData.append("id", this.track_id);
        },
        sendingZip(file, xhr, formData) {
            formData.append("id", this.track_id);
        },
        sendingImg(file, xhr, formData) {
            formData.append("id", this.track_id);
        },
        audioComplete(response) {
            if (response.status == "success") this.audiocomplete = true
        },
        ZipComplete(response) {
            if (response.status == "success") this.zipcomplete = true
        },
        ImgComplete(response) {
            if (response.status == "success") this.imgcomplete = true
        },
        onSubmit() {
            this.btn = true;
            let vm = this;
            this.$axios.post(
                'seller/tracks/add-tracks',
                vm.formdata
            ).then(({
                data
            }) => {
                this.track_id = data.id
                if (this.formdata.audio_file != '' && this.formdata.feature_image != '' && this.formdata.zip_files != '') {
                    this.$refs.audio.dropzone.processQueue()
                    this.$refs.zip.dropzone.processQueue()
                    this.$refs.image.dropzone.processQueue()
                }
            }).catch(error => {
                if (error.response) {
                    let {
                        data
                    } = error.response;
                    if (data.success == false) {
                        this.$swal({
                            title: data.error,
                            text: 'Please Upgrade account!',
                        })
                    }
                }
            });;

        },
        async checkStripe() {
            if (this.user.stripe_connect_id === null) {
                let code = '';
                if (Object.keys(this.$route.query).length !== 0) {
                    code = this.$route.query.code
                }
                const {
                    data
                } = await this.$axios.get(
                    'seller/stripe-check', {
                        params: {
                            code: code
                        }
                    }
                );
                if (data.success === false) {
                    if (data.error) {
                        this.$swal({
                            title: data.error,
                        })
                    }
                    this.connected = true
                    this.btn = true
                } else {
                    this.connected = false
                    this.btn = false
                }
            }
        }
    },
    mounted() {
        this.$refs.audio.dropzone;
        this.$refs.zip.dropzone;
        this.$refs.image.dropzone;
        this.checkStripe();
    },
    beforeMount() {
        this.optionsaudio.url = this.url + 'tracks/upload/audio/' + this.user.id;
        this.optionszip.url = this.url + 'tracks/upload/audio/zip/' + this.user.id;
        this.optionsimg.url = this.url + 'tracks/upload/audio/img/' + this.user.id;

    },
}
</script>

<style lang="scss">
.custom--select {
    background-image: url('/images/seller/path-img-25.svg');
    background-repeat: no-repeat;
    background-position: right .7em top 50%;
    background-size: .65em auto;
}

.vue-dropzone {
    background: #edf2f7 !important;
    padding: 5px 15px !important;
    border: none;
    border-radius: 20px;
    display: flex;
    justify-content: center;

    .dropzone .dz-message {
        text-align: center;
        margin: 1em 0;
    }

}

.vue-dropzone>.dz-preview .dz-remove {
    left: 19px;
    text-decoration: none !important;
}
</style>
