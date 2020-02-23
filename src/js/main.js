import Vue from 'vue'
import MaskedInput from 'vue-text-mask'

// Components
import Reg from '~/assets/components/Reg.vue'
import Confirm from '~/assets/components/Confirm.vue'

Vue.mixin({
    filters: {
        styleImageBgr(url) {
            return `background-image: url(${url});`
        }
    }
})

Vue.component('masked-input', MaskedInput);


new Vue({
    data: () => ({
        currentModal: 'modal-reg',
        isModalOpen: true
    }),
    components: {
        'modal-reg': Reg,
        'modal-conf': Confirm
    },
    computed: {
        directSlide() {
            if (this.currentModal === 'modal-conf') return 'right'
            else return 'left'
        }
    },
    methods: {
        changeModal(value) {
            this.currentModal = value
        },
        saveSecret(value_code, value_id) {
            window.SECRET_CODE = value_code;
            window.ID_CODE = value_id;
        },
        closeModal() {
            document.querySelector('.modal-reg').style.display = 'none';
            document.querySelector('.bgr-layout').style.display = 'none';
            this.isModalOpen = false
        },
        startReg() {
            document.querySelector('.modal-reg').style.display = 'block';
            document.querySelector('.bgr-layout').style.display = 'block';
            this.isModalOpen = true
        }
    }
}).$mount('#app')