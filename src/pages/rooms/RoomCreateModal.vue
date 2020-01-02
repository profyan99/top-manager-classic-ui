<template>
  <modal @close="$emit('close')">
    <template v-slot:header>
      <span>Создание игровой комнаты</span>
    </template>
    <template v-slot:content>
      <div class="inputs">
        <div class="">
          <span class="label">Название комнаты</span>
          <app-input v-model="form.name"
                     class="input"
                     color="#555555"
                     @blur="$v.form.name.$touch()"
                     error-message="Поле должно быть заполнено"
                     :error="$v.form.name.$error"/>
        </div>

        <div class="inputs-margin">
          <span class="label">Количество игроков</span>
          <app-input v-model="form.maxPlayers"
                     color="#555555"
                     type="number"
                     @blur="$v.form.maxPlayers.$touch()"
                     error-message="Значение должно быть от 2 до 8"
                     :error="$v.form.maxPlayers.$error"/>
        </div>

        <div class="inputs-margin">
          <span class="label">Количество раундов</span>
          <app-input v-model="form.maxRounds"
                     color="#555555"
                     type="number"
                     @blur="$v.form.maxRounds.$touch()"
                     error-message="Значение должно быть от 2 до 16"
                     :error="$v.form.maxRounds.$error"/>
        </div>

        <div class="inputs-margin">
          <span class="label">Время раунда</span>
          <app-input v-model="form.periodDelay"
                     color="#555555"
                     type="number"
                     @blur="$v.form.periodDelay.$touch()"
                     error-message="Значение должно быть от 1 до 10"
                     :error="$v.form.periodDelay.$error"/>
        </div>

        <toggle v-model="form.locked"
                class="inputs-margin"
                label="Закрытая комната"/>

        <div class="inputs-margin inner" v-if="form.locked">
          <span class="label">Пароль</span>
          <app-input v-model="form.password"
                     color="#555555"
                     type="password"
                     @blur="$v.form.password.$touch()"
                     error-message="Поле должно быть заполнено"
                     :error="$v.form.password.$error"/>
        </div>

        <toggle v-model="form.isScenario"
                class="inputs-margin"
                label="Сценарий"/>

        <div class="inputs-margin inner" v-if="form.isScenario">
          <span class="label">Сценарий</span>
          <app-input v-model="form.scenario"
                     color="#555555"
                     @blur="$v.form.scenario.$touch()"
                     error-message="Поле должно быть заполнено"
                     :error="$v.form.scenario.$error"/>
        </div>

        <toggle v-model="form.isTournament"
                class="inputs-margin"
                label="Турнир"/>

      </div>
    </template>
    <template v-slot:actions>
      <div class="confirm-button" @click="create()">
        Создать
      </div>
    </template>
  </modal>
</template>

<script>
  import { mapActions } from 'vuex';
  import {
    required, minLength, numeric, minValue, maxValue,
  } from 'vuelidate/lib/validators';
  import Modal from '~/components/Modal';
  import AppInput from '~/components/AppInput';
  import Toggle from '~/components/Toggle';

  export default {
    name: 'RoomCreateModal',
    components: {
      Toggle,
      Modal,
      AppInput,
    },
    data() {
      return {
        form: {
          name: '',
          maxPlayers: '',
          maxRounds: '',
          isTournament: false,
          locked: false,
          isScenario: false,
          scenario: '',
          password: '',
          periodDelay: '',
        },
      };
    },
    methods: {
      ...mapActions('rooms', ['createRoom']),
      create() {
        this.$v.form.$touch();
        if (this.$v.$error) {
          return;
        }
        this.createRoom(this.form)
          .then((data) => {
            // TODO auto connecting to the new room
            this.$emit('close');
          })
          .catch((error) => {
            // TODO notify
          });
      },
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
        maxRounds: {
          required,
          numeric,
          minValue: minValue(2),
          maxValue: maxValue(16),
        },
        isTournament: {},
        locked: {},
        isScenario: {},
        scenario: {},
        password: {},
        periodDelay: {
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
