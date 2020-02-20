import Vue from 'vue'

new Vue({
    data: () => ({
        name: 'Ivan'
    }),
    beforeMount() {
        console.log(this.name)
    }
}).$mount('#app')