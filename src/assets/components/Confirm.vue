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
                    ref="first"
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
            p.alternate-text Вернуться к &nbsp;
                span.back-to-reg(@click="$emit('handler-select', 'modal-reg')") регистрации.
</template>

<script>

import axios from 'axios'

function generateSecret() {
    return Math.floor(Math.random() * 9000 + 1000)
}


export default {
    data: () => ({
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
        this.startCheckStatus()
        console.log('Код подтверждения: ', window.SECRET_CODE)
    },
    computed: {
        statusText() {
            if (this.statusCode === 1) return 'Введите код подтверждения';
            else if (this.statusCode !== 6) return 'Сообщение отправлено на указанный номер';
            else return 'Ошибка при отправке сообщения, попробуйте снова';
        }
    },
    methods: {
        startCheckStatus() {
            let startRequest = setInterval(() => {
                    axios('/test.php', {
                        params: {
                            api: 'status',
                            id: window.ID_CODE
                        }
                    })
                    .then(response => this.statusCode = response.data.data.status);

                    if (this.statusCode === 1) clearInterval(startRequest)
            }, 1000)
        },
        validCode() {
            if (Number(this.code.join('')) === window.SECRET_CODE) {
                this.isSuccess = true;
                this.textError = 'Регистрация прошла успешно!';
            }
            else {
                window.SECRET_CODE = generateSecret();
                this.isSuccess = false;
                this.statusCode = 0;
                this.textError = 'Введен неверный код. Повторый код будет отправлен через 10 минут.'
                this.code = this.code.map(val => val = null);
                this.$refs.first.focus()

                setTimeout(() => {
                    axios('/test.php', {
                        params: {
                            api: 'send',
                            phone: `${window.PHONE.replace(/[\s+\(\)]/g, '')}`,
                            secret: window.SECRET_CODE
                        }
                    }).then(response => {
                        this.startCheckStatus()
                        window.ID_CODE = response.data.data.id;
                    })
                }, 600000)
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