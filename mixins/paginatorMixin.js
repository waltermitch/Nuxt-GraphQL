export const paginatorMixin = {
    data() {
        return {
            fetchingData: false
        }
    },
    computed: {
        page: {
            get() {
                return this.currentPage;
            },
            set(value) {
                this.currentPage = parseInt(Math.max(1, Math.min(value, this.queryData.paginatorInfo.lastPage)));
                console.log('set page input value', this.currentPage);
            },
        },
    },
    methods: {
        async fetchData() {
            this.fetchingData = true

            console.log('loading, ', this.fetchingData)

            const variables = {
                page: this.currentPage,
            }
            if (  this.hasQueryVariable === true ) {
                for ( const x in this.queryVariable ) {
                    variables[x] = this.queryVariable[x]
                }
            }         
            console.log(
                this.queryName
            );
            const queryData = await this.$apollo.query({
                query: this.query,
                fetchPolicy: 'network-only',
                variables,
            });
            this.fetchingData = false

            console.log('loading, ', this.fetchingData)
            
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
