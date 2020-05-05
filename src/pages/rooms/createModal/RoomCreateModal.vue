<template>
  <modal @close="$emit('close')"
         @submit="create">
    <template v-slot:header>
      <span>Создание игры</span>
    </template>
    <template v-slot:content>
      <div class="inputs">
        <div class="">
          <span class="label">Название</span>
          <app-input v-model="form.name"
                     class="input"
                     color="grey"
                     @blur="$v.form.name.$touch()"
                     error-message="Поле должно быть заполнено"
                     :error="$v.form.name.$error"/>
        </div>

        <div class="inputs-margin">
          <span class="label">Количество игроков</span>
          <app-input v-model="form.maxPlayers"
                     color="grey"
                     type="number"
                     @blur="$v.form.maxPlayers.$touch()"
                     error-message="Значение должно быть от 2 до 8"
                     :error="$v.form.maxPlayers.$error"/>
        </div>

        <div class="inputs-margin">
          <span class="label">Количество раундов</span>
          <app-input v-model="form.maxPeriods"
                     color="grey"
                     type="number"
                     @blur="$v.form.maxPeriods.$touch()"
                     error-message="Значение должно быть от 2 до 16"
                     :error="$v.form.maxPeriods.$error"/>
        </div>

        <div class="inputs-margin">
          <span class="label">Время раунда</span>
          <app-input v-model="form.periodDuration"
                     color="grey"
                     type="number"
                     @blur="$v.form.periodDuration.$touch()"
                     error-message="Значение должно быть от 1 до 10"
                     :error="$v.form.periodDuration.$error"/>
        </div>

        <toggle v-model="isLocked"
                class="inputs-margin"
                label="Закрытая игра"/>

        <div class="inputs-margin inner" v-if="isLocked">
          <span class="label">Пароль</span>
          <app-input v-model="form.password"
                     color="grey"
                     type="password"
                     @blur="$v.form.password.$touch()"
                     error-message="Поле должно быть заполнено"
                     :error="$v.form.password.$error"/>
        </div>

        <toggle v-model="isScenario"
                class="inputs-margin"
                label="Сценарий"/>

        <div class="inputs-margin inner" v-if="isScenario">
          <scenario-select
              :options="scenariosOptions"
              v-model="selectedScenario"
          />
        </div>

        <toggle v-model="form.tournament"
                class="inputs-margin"
                label="Турнир"/>

      </div>
    </template>
    <template v-slot:actions>
      <app-button label="Создать" @click="create"/>
    </template>
  </modal>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import {
    maxValue,
    minLength,
    minValue,
    numeric,
    required,
  } from 'vuelidate/lib/validators';
  import AppButton from '~/components/AppButton';
  import Modal from '~/components/Modal';
  import AppInput from '~/components/AppInput';
  import Toggle from '~/components/Toggle';
  import ScenarioSelect from './ScenarioSelect';

  export default {
    name: 'RoomCreateModal',
    components: {
      ScenarioSelect,
      AppButton,
      Toggle,
      Modal,
      AppInput,
    },
    data() {
      return {
        selectedScenario: {},
        isLocked: false,
        isScenario: false,
        form: {
          name: '',
          maxPlayers: null,
          maxPeriods: null,
          tournament: false,
          scenario: '',
          password: '',
          periodDuration: null,
        },
      };
    },
    computed: {
      ...mapState('rooms', ['scenarios']),
      scenariosOptions() {
        return this.scenarios.map((scenario) => ({
          name: scenario.name,
        }));
      },
    },
    methods: {
      ...mapActions('rooms', ['createRoom', 'getScenarios']),
      create() {
        this.$v.form.$touch();
        if (this.$v.$error) {
          return;
        }
        this.form.scenario = this.selectedScenario.name || '';
        this.createRoom(this.form)
          .then((_data) => {
            // TODO auto connecting to the new room
            this.$emit('close');
          })
          .catch((_error) => {
            // TODO notify
          });
      },
    },
    mounted() {
      this.getScenarios()
        .catch((_error) => {

        });
    },
    validations: {
      form: {
        name: {
          required,
          minLength: minLength(6),
        },
        maxPlayers: {
          required,
          numeric,
          minValue: minValue(2),
          maxValue: maxValue(8),
        },
        maxPeriods: {
          required,
          numeric,
          minValue: minValue(2),
          maxValue: maxValue(16),
        },
        tournament: {},
        scenario: {},
        password: {},
        periodDuration: {
          required,
          numeric,
          minValue: minValue(1),
          maxValue: maxValue(10),
        },
      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .inputs
    display: flex
    flex-direction: column

    .label
      color: $light-grey
      font-weight: bold
      font-size: base-unit(12)
      text-transform: uppercase

    &-margin
      margin-top: base-unit(10)

  .input
    padding-top: 0

</style>
