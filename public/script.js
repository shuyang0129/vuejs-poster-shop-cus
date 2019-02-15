new Vue({
    el: "#app",
    data: {
        total: 0,
        products: [
            {
                title: 'Product 1',
                id: 1,
                price: 9.99
            },
            {
                title: 'Product 2',
                id: 2,
                price: 9.99
            },
            {
                title: 'Product 3',
                id: 3,
                price: 9.99
            }
        ],
        cart: [],
        searchTerm: ''
    },
    methods: {
        addToCart(product) {
            let isFound = false;
            this.total += product.price;
            this.cart.forEach(item => {
                if(item.id === product.id) {
                    item.qty++;
                    isFound = true;
                }
            })
            if(!isFound) {
                this.cart.push({
                    title: product.title,
                    id: product.id,
                    price: product.price,
                    qty: 1
                });
            }
        },
        inc(item) {
            item.qty++;
            this.total += item.price;
        },
        dec(item) {
            item.qty--;
            this.total -= item.price;
            if(item.qty <= 0) {
                var index = this.cart.indexOf(item);
                this.cart.splice(index, 1);
            }
        },
        onSubmit() {
            var path = 'search?q='.concat(this.searchTerm);
            this.$http.get(path)
                .then(response => {
                    console.log(response);
                })
        }
    },
    filters: {
        currency(value) {
            return ('$').concat(value.toFixed(2))
        }
    }
});