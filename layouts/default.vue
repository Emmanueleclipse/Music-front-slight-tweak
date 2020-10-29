<template>
<div>
    <Header />
    <main>
        <Nuxt />
    </main>
    <Footer />
</div>
</template>

<script>
import Header from './default/header';
import Footer from './default/footer';
import {
    mapActions
} from "vuex";
export default {
    components: {
        Header,
        Footer,
    },
    methods: {
        ...mapActions({
            fetchData: 'cart/fetchData',
        }),
    },
    mounted() {
        this.fetchData();
    }
}
</script>
