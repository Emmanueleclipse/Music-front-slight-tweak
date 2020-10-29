<template>
<client-only>
    <paginate ref="paginate" :class="paging ? 'paging': ''" :page-count="total" :click-handler="NextData" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'">
    </paginate>
</client-only>
</template>

<script>
export default {
    middleware: ['auth', 'admin'],
    layout: 'admin',
    props: ['datas'],
    data() {
        return {
            total: 0,
            paging: false
        }
    },
    watch: {
        'datas'() {
            if (this.datas) {
                this.paging = true
                this.total = this.datas ? this.datas.last_page : 0
                this.$refs.paginate ? this.$refs.paginate.selected = this.datas.current_page : ''
            }
        },
    },
    methods: {
        async NextData(pageNum) {
            this.$router.push('?page=' + pageNum)
            this.$emit('NextData', pageNum)
        },
    }
}
</script>

<style>
.paging {
    display: inline-flex;
}
</style>
