<template>
<footer>
    <div class="py-10  px-5 md:px-0 bg-indigo-100">
        <div class="container mx-auto grid md:grid-cols-4 gap-4">
            <div class="p-1 text-center md:text-left">
                <p class="font-bold pb-3 color-primary"> Music</p>
                <ul class="list-none">
                    <li class="pb-2"><a href="#" class="color-primary ">About us</a></li>
                    <li class="pb-2"><a href="#" class="color-primary ">Jobs</a></li>
                    <li class="pb-2"><a href="#" class="color-primary ">Blog</a></li>
                    <li class="pb-2">
                        <nuxt-link to="login" class="color-primary ">Sign in</nuxt-link>
                    </li>
                    <li class="pb-2">
                        <nuxt-link to="register" class="color-primary ">Sign UP</nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="p-1 text-center md:text-left">
                <p class="font-bold pb-3 color-primary"> Buying</p>
                <ul class="list-none">
                    <li class="pb-2"><a href="#" class="color-primary ">Browse Beats</a></li>
                    <li class="pb-2"><a href="#" class="color-primary ">Top Selling Beats</a></li>
                    <li class="pb-2"><a href="#" class="color-primary ">Recent Beats</a></li>
                    <li class="pb-2"><a href="#" class="color-primary ">Free Beats</a></li>
                </ul>
            </div>
            <div class="p-1 text-center md:text-left">
                <p class="font-bold pb-3 color-primary"> Selling</p>
                <ul class="list-none">
                    <li class="pb-2"><a href="#" class="color-primary ">Price</a></li>
                    <li class="pb-2"><a href="#" class="color-primary ">Why Airbit</a></li>
                    <li class="pb-2"><a href="#" class="color-primary ">Selling Tools</a></li>
                    <li class="pb-2"><a href="#" class="color-primary ">Infinity Store</a></li>
                    <li class="pb-2"><a href="#" class="color-primary ">YouTube Monitaization</a></li>
                </ul>
            </div>
            <div class="p-1 text-center md:text-left">
                <p class="font-bold pb-2 color-primary"> Follow Us</p>
                <ul class="list-none flex justify-center md:justify-start">
                    <li class="pr-3"><a href="#" class="text-blue-500">
                            <font-awesome-icon class="text-xl" :icon="['fab', 'youtube']" />
                        </a></li>
                    <li class="pr-3"><a href="#" class="text-blue-500">
                            <font-awesome-icon class="text-xl" :icon="['fab', 'instagram']" />
                        </a></li>
                    <li class="pr-3"><a href="#" class="text-blue-500">
                            <font-awesome-icon class="text-xl" :icon="['fab', 'facebook-f']" />
                        </a></li>
                    <li class="pr-3"><a href="#" class="text-blue-500">
                            <font-awesome-icon class="text-xl" :icon="['fab', 'twitter']" />
                        </a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="py-10  px-5 md:px-0 bg-blue-800">
        <div class="container mx-auto">
            <p class="text-center md:text-left pb-10 text-white">&copy; 2020 Website name, Inc.</p>
        </div>
    </div>
    <audioPlayer />

</footer>
</template>

<script>
import cartCounter from '@/components/cartCounter';
import audioPlayer from '@/components/audioPlayer';
export default {
    components: {
        cartCounter,
        audioPlayer
    },
}
</script>

<style lang="scss">
.custom-background {
    background: #999696ba;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16078);
    opacity: 1;
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
}

canvas {
    width: 100%;
}
</style>
