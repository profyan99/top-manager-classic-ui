<template>
  <modal :closable="false"
         @submit="onSetCompanyName">
    <template v-slot:header>
      <span>Создание компании</span>
    </template>
    <template v-slot:content>
      <div class="form">
        <span>Введите название компании</span>
        <app-input v-model="companyName"
                   color="grey"
                   placeholder="Введите название"
                   @blur="$v.companyName.$touch()"
                   error-message="Поле должно быть заполнено"
                   :error="$v.companyName.$error"/>
      </div>
    </template>
    <template v-slot:actions>
      <app-button
          label="Присоединиться"
          @click="onSetCompanyName"
          :disabled="$v.error"/>
    </template>
  </modal>
</template>

<script>
  import { minLength, required } from 'vuelidate/lib/validators';
  import { mapActions } from 'vuex';
  import AppButton from '~/components/AppButton';
  import Modal from '~/components/Modal';
  import AppInput from '~/components/AppInput';

  export default {
    name: 'GameCompanyNameModal',
    components: {
      AppButton,
      Modal,
      AppInput,
    },
    data() {
      return {
        companyName: '',
      };
    },
    validations: {
      companyName: {
        required,
        minLength: minLength(6),
      },
    },
    methods: {
      ...mapActions('game', ['setCompanyName']),
      onSetCompanyName() {
        this.$v.companyName.$touch();
        if (this.$v.$error) {
          return;
        }

        this.setCompanyName(this.companyName)
          .then(() => this.$emit('close'))
          .catch((_error) => {
            // TODO notify
          });
      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .form
    display: flex
    flex-direction: column

    span
      color: $fg-main
      font-size: base-unit(14)
      font-weight: normal
      margin-bottom: base-unit(15)
</style>
