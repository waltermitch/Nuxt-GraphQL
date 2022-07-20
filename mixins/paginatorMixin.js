export const paginatorMixin = {
    methods: {
        // pagination
        async fetchData() {
            const queryData = await this.$apollo.query({
            query: this.query,
            fetchPolicy: 'network-only',
            variables: {
                page: this.currentPage,
            },
            });
            this.queryData = queryData.data[this.queryName];
        },
        async firstPage() {
            await this.goToPage(1);
        },
        async lastPage() {
            await this.goToPage(this.queryData.paginatorInfo.lastPage);
        },
        async nextPage() {
            if ( this.currentPage < this.queryData.paginatorInfo.lastPage ) {
            await this.goToPage(this.currentPage + 1);
            }
        },
        async prevPage() {
            if ( this.currentPage > 1 ) {
            await this.goToPage(this.currentPage - 1);
            }
        },
        async goToPage(page = null) {
            this.currentPage = (page !== null ? page : this.currentPage);
            console.log('gotoPage', this.currentPage);
            await this.fetchData();
        },
    },
}
