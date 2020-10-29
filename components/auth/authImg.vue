<template>
<div class="flex items-center">
    <h2 class="text-gray-700 text-base pr-2 hidden md:block">{{ user.name }}</h2>
    <img v-if="user.images === null " src="/images/admin/dashboard-img-1.svg" width="35" height="35" alt="admin image">
    <img v-if="user.images" :src="imgurl + user.images" class="rounded-full" width="35" height="35" alt="admin image">
</div>
</template>

<script>
export default {
    data() {
        return {
            imgurl: process.env.imgUrl
        }
    }
}
</script>
