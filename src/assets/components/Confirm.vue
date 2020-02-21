<template lang="pug">
    .modal-reg
        .modal-reg__header
            .close-icon(
                :style="'/assets/images/icons/cancel_icon.svg' | styleImageBgr"
                @click="$emit('close')")
        .modal-reg__body
            .title Регистрация
            .phone.phone--code
                input(
                    type="text"
                    v-focus
                    v-model="code[0]"
                    maxlength="1"
                    @input="$refs.second.focus()")
                input(
                    type="text"
                    ref="second"
                    v-model="code[1]"
                    maxlength="1"
                    @input="$refs.third.focus()")
                input(
                    type="text"
                    ref="third"
                    v-model="code[2]"
                    maxlength="1"
                    @input="$refs.four.focus()")
                input(
                    type="text"
                    ref="four"
                    v-model="code[3]"
                    maxlength="1"
                    @input="validCode")
            p.descr(v-text="textError" :class="{ 'descr--error': !isSuccess, 'descr--success': isSuccess }")
            p.invite-text {{ statusText }}
        .modal-reg__footer
            p.alternate-text Или вернись к &nbsp;
                span.back-to-reg(@click="$emit('handler-select', 'modal-reg')") регистрации.
</template>

<script>

import axios from 'axios'

const API_KEY = 'g0nXohzRLFSwnz3TsKln44YaCuu';
const EMAIL = 'ivan_kalita90@mail.ru'
axios.defaults.baseURL = `https://${EMAIL}:${API_KEY}@gate.smsaero.ru/v2/sms`;


export default {
    data: () => ({
        valid: false,

        statusCode: 0,
        isSuccess: false,
        textError: '',
        code: []
    }),
    directives: {
        focus: {
            inserted: el => setTimeout(() => el.focus(), 500)
        }
    },
    mounted() {
        let this_ = this,
        startRequest = setInterval(() => {
                axios({
                    url: '/status',
                    methods: 'get',
                    params: {
                        id: window.ID_CODE
                    }
                })
                .then(response => this_.statusCode = response.data.status);

                if (this_.statusCode === 1) clearInterval(startRequest)
        }, 1000)
        console.log(window.SECRET_CODE, window.ID_CODE)
    },
    computed: {
        statusText() {
            if (this.statusCode === 1) return 'Введите код подтверждения';
            else if (this.statusCode !== 6) return 'Сообщение отправлено на указанный номер';
            else return 'Ошибка при отправке сообщения, попробуйте снова';
        }
    },
    methods: {
        validCode() {
            if (Number(this.code.join('')) === window.SECRET_CODE) {
                this.valid = true;
                this.isSuccess = true;
                this.textError = 'Регистрация прошла успешно!';
            }
            else {
                window.SECRET_CODE = null;
                this.textError = 'Введен неверный код. Повторый код будет отправлен через 10 минут.'
            }
        }
    }
}
</script>

<style lang="stylus" scoped>

$colorBgrLight = #EDEDED
$colorTextError = #FEA6A6
$colorCaption = #666666
$colorSuccess = #A1C64C

.modal-reg
    &__header
        height 45px
    &__body
        .phone--code
            display flex
            max-width 180px
            padding 0
            justify-content space-between
            input
                width 36px
                background $colorBgrLight
                border-radius 5px
                text-align center
            &:hover
                box-shadow none
        .descr--error
            min-height 38px
            color $colorTextError
        .descr--success
            min-height 38px
            color $colorSuccess
    &__footer
        margin-top 140px
        margin-bottom 100px
        .alternate-text
            text-align: center
            font-size: 16px
            color $colorCaption
        .back-to-reg
            text-decoration underline
            cursor pointer
                
</style>