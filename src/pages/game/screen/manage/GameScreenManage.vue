<template>
  <div class="game-manage">
    <span class="game-manage-title">Управление</span>
    <div class="game-manage-content">
      <game-manage-input
          class="game-manage-content-input"
          v-for="solutionInput in solutionInputs"
          :key="solutionInput.label"
          v-model="solutionForm[solutionInput.model]"
          v-bind="solutionInput"
          @blur="$v.solutionForm[solutionInput.model].$touch()"
          :error="$v.solutionForm[solutionInput.model].$error"
      >
      </game-manage-input>
      <app-button
          label="Отправить"
          :disabled="this.$v.$error"
          class="game-manage-button-send"
          @click="send"
      />
    </div>
  </div>
</template>

<script>
  import {
    minValue,
    numeric,
    required,
  } from 'vuelidate/lib/validators';
  import { mapActions, mapGetters } from 'vuex';
  import AppButton from '~/components/AppButton';
  import GameManageInput from './GameManageInput';

  export default {
    name: 'GameScreenManage',
    components: {
      AppButton,
      GameManageInput,
    },
    data() {
      return {
        solutionOptions: [
          {
            label: 'Цена',
            model: 'price',
          },
          {
            label: 'Производство',
            model: 'production',
          },
          {
            label: 'Маркетинг',
            model: 'marketing',
          },
          {
            label: 'Инвестиции',
            model: 'investments',
          },
          {
            label: 'НИОКР',
            model: 'nir',
          },
        ],
        solutionForm: {
          price: 0,
          production: 0,
          marketing: 0,
          investments: 0,
          nir: 0,
        },
      };
    },
    computed: {
      ...mapGetters('game', ['oldSolutions']),
      solutionInputs() {
        return this.solutionOptions.map((solution) => ({
          ...solution,
          additional: this.oldSolutions[solution.model],
        }));
      },
    },
    methods: {
      ...mapActions('game', ['sendSolutions']),
      send() {
        this.$v.solutionForm.$touch();
        if (this.$v.$error) {
          return;
        }
        this.sendSolutions(this.solutionForm)
          .then((_data) => {
            // TODO notify
          })
          .catch((_error) => {
            // TODO notify
          });
      },
    },
    validations: {
      solutionForm: {
        price: {
          required,
          numeric,
          minValue: minValue(0),
        },
        production: {
          required,
          numeric,
          minValue: minValue(0),
        },
        marketing: {
          required,
          numeric,
          minValue: minValue(0),
        },
        investments: {
          required,
          numeric,
          minValue: minValue(0),
        },
        nir: {
          required,
          numeric,
          minValue: minValue(0),
        },
      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .game-manage
    display: flex
    flex-direction: column
    align-items: center

    &-title
      font-size: base-unit(16)
      font-weight: bold
      font-style: normal
      color: $fg-main
      text-transform: uppercase
      margin-bottom: base-unit(15)

    &-content
      display: flex
      justify-content: space-between
      height: 100%
      flex-direction: column

      &-input
        margin-bottom: base-unit(5)

    &-button-send
      margin-top: base-unit(10)
      width: fit-content
      margin-left: auto
</style>
