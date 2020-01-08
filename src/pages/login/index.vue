<template>
  <div class="content">
    <div class="logo">
      <span class="main">Top Manager</span>
      <span class="sub">oil tycoon</span>
    </div>
    <div class="modal">
      <div class="toggle">
        <div class="toggle-cell"
             @click="toggleType('signIn')"
             :class="{ 'toggle-active': type === 'signIn' }">
          <span>Вход</span>
        </div>
        <div class="toggle-cell"
             @click="toggleType('signUp')"
             :class="{ 'toggle-active': type === 'signUp' }">
          <span>Регистрация</span>
        </div>
      </div>
      <div class="form">
        <span class="title">{{ title }}</span>
        <div class="social">
          <div class="social-ring google">
            <a href="/api/auth/google">G</a>
          </div>
          <div class="social-ring vk">
            <a href="/api/auth/vkontakte">Vk</a>
          </div>
        </div>
        <span class="or">или</span>
        <div class="input"
             v-for="input in inputs"
             :key="input.label">
          <span class="label">{{ input.label }}</span>
          <label>
            <input :type="input.type"
                   :placeholder="input.placeholder"
                   @blur="$v.form[type][input.field].$touch()"
                   v-model="form[type][input.field]">
          </label>
          <span class="error" v-if="$v.form[type][input.field].$error">
            {{ input.errorMessage }}
          </span>
        </div>
        <div class="button"
             @click="action.method()">
          {{ action.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import {
    email,
    minLength,
    required,
    sameAs,
  } from 'vuelidate/lib/validators';

  export default {
    name: 'login',
    data() {
      return {
        type: 'signIn',
        form: {
          signIn: {
            userName: '',
            password: '',
          },
          signUp: {
            userName: '',
            email: '',
            password: '',
            repeatedPassword: '',
          },
        },
      };
    },
    computed: {
      inputs() {
        if (this.type === 'signUp') {
          return [
            {
              label: 'Никнейм',
              placeholder: 'Никнейм',
              type: 'text',
              field: 'userName',
              errorMessage: 'Никнейм должен быть длиннее 5-ти символов',
            },
            {
              label: 'Почта',
              placeholder: 'Электронная почта',
              type: 'text',
              field: 'email',
              errorMessage: 'Почтовый адрес должен быть действительным',
            },
            {
              label: 'Пароль',
              placeholder: 'Пароль',
              type: 'password',
              field: 'password',
              errorMessage: 'Пароль должен быть длиннее 5-ти символов',
            },
            {
              label: 'Повтор пароля',
              placeholder: 'Пароль',
              type: 'password',
              field: 'repeatedPassword',
              errorMessage: 'Пароли должены совпадать',
            },
          ];
        }
        return [
          {
            label: 'Логин',
            placeholder: 'Логин',
            type: 'text',
            field: 'userName',
            errorMessage: 'Логин должен быть длиннее 5-ти символов',
          },
          {
            label: 'Пароль',
            placeholder: 'Пароль',
            type: 'password',
            field: 'password',
            errorMessage: 'Пароль должен быть длиннее 5-ти символов',
          },
        ];
      },
      title() {
        if (this.type === 'signUp') {
          return 'Регистрация';
        }
        return 'Авторизация';
      },
      action() {
        if (this.type === 'signUp') {
          return {
            name: 'Зарегистрироваться',
            method: this.performSignUp,
          };
        }
        return {
          name: 'Войти',
          method: this.performSignIn,
        };
      },
    },
    methods: {
      ...mapActions('user', {
        signInAction: 'signIn',
        signUpAction: 'signUp',
        getCurrentUser: 'getCurrentUser',
      }),
      toggleType(type) {
        this.type = type;
      },
      performSignIn() {
        const {
          form: { signIn }, signInAction, $v, type, getCurrentUser,
        } = this;

        if ($v.form[type].$invalid) {
          return;
        }

        signInAction(signIn)
          .then(() => getCurrentUser())
          .catch((_error) => {
            // TODO notify
          });
      },
      performSignUp() {
        const {
          form: { signUp }, signUpAction, toggleType, $v, type,
        } = this;

        if ($v.form[type].$invalid) {
          return;
        }

        signUpAction(signUp)
          .then(() => {
            // TODO notify
            toggleType('signIn');
          })
          .catch((_error) => {
            // TODO notify
          });
      },
    },
    validations: {
      form: {
        signIn: {
          userName: {
            required,
            minLength: minLength(6),
          },
          password: {
            required,
            minLength: minLength(6),
          },
        },
        signUp: {
          userName: {
            required,
            minLength: minLength(6),
          },
          email: {
            required,
            email,
          },
          password: {
            required,
            minLength: minLength(6),
          },
          repeatedPassword: {
            required,
            sameAs: sameAs('password'),
          },
        },
      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .content
    display: flex
    flex-direction: column
    width: 100%
    height: 100%
    margin: auto 0
    align-items: center

  .logo
    margin-bottom: base-unit(60)
    display: flex
    flex-direction: column

    .main
      font-size: base-unit(36)
      font-style: normal
      font-weight: 900
      color: $fg-main
      text-transform: uppercase

    .sub
      font-size: base-unit(18)
      font-style: normal
      font-weight: 300
      letter-spacing: 0.93em
      color: $fg-main
      text-transform: uppercase

  .modal
    width: base-unit(340)
    min-height: base-unit(420)
    border-radius: $base-border-radius
    background-color: $grey
    display: flex
    flex-direction: column

    .toggle
      height: base-unit(40)
      width: 100%
      display: flex
      flex-direction: row

      .toggle-cell
        display: flex
        flex: 1
        justify-content: center
        align-items: center
        background-color: #202021
        cursor: pointer

        &:first-child
          border-radius: base-unit(5) 0 0 0

        &:last-child
          border-radius: 0 base-unit(5) 0 0

        &:hover
          span
            color: #8f8f8f

        span
          font-weight: 500
          font-size: base-unit(16)
          color: $light-grey
          text-transform: uppercase

      .toggle-active
        background-color: $red

        span
          color: $fg-main

    .form
      padding: base-unit(40)
      display: flex
      flex-direction: column

      .title
        font-style: normal
        font-weight: 500
        font-size: base-unit(24)
        text-align: center
        text-transform: uppercase
        color: $fg-main

      .social
        margin-top: base-unit(15)
        display: flex
        justify-content: center

        .social-ring
          border-radius: 100%
          border: base-unit(2) solid $light-grey
          height: base-unit(45)
          width: base-unit(45)
          display: flex
          align-items: center
          justify-content: center
          font-size: base-unit(20)
          text-transform: uppercase
          font-weight: 700
          cursor: pointer
          margin: 0 base-unit(25)

          &:hover
            color: $light-grey
            border: base-unit(2) solid $red

      .or
        display: flex
        color: $light-grey
        font-size: base-unit(12)
        font-weight: normal
        justify-content: center
        margin-top: base-unit(10)

      .input
        margin-top: base-unit(20)
        display: flex
        flex-direction: column

        .label
          color: $fg-main
          font-weight: 500
          font-size: base-unit(12)
          text-transform: uppercase

        .error
          color: $red
          font-size: base-unit(12)
          font-weight: 300
          margin-top: base-unit(2)

        input
          background-color: transparent
          border: 0
          border-bottom: base-unit(2) solid $light-grey
          outline: 0
          +main-font
          color: $fg-main
          font-size: base-unit(16)
          font-weight: normal
          padding: base-unit(10) 0
          width: 100%

          &:focus
            border-bottom: base-unit(2) solid $red


      .button
        margin-top: base-unit(34)
        width: 100%
        background-color: $red
        cursor: pointer
        text-align: center
        color: $fg-main
        font-size: base-unit(18)
        border-radius: base-unit(5)
        padding: base-unit(10) 0

        &:hover
          opacity: 0.8
</style>
