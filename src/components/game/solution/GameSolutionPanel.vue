<template>
    <div class="game-solution">
        <div class="game-solution-header">
            <span class="subtitle">Управление</span>
        </div>
        <div class="game-solution-content">
            <game-solution-input v-for="solutionInput in solutionInputs"
                                 :key="solutionInput.label"
                                 v-model="solutionForm[solutionInput.model]"
                                 v-bind="solutionInput">
            </game-solution-input>
        </div>
    </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import GameSolutionInput from './GameSolutionInput';

  export default {
    name: 'GameSolutionPanel',
    components: {
      GameSolutionInput,
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
          price: this.solutionsPrice,
          production: this.solutionsProduction,
          marketing: this.solutionsMarketing,
          investments: this.solutionsInvestments,
          nir: this.solutionsNir,
        },
      };
    },
    computed: {
      ...mapGetters('game', ['oldSolutions']),
      ...mapGetters('game', ['currentSolutions']),
      solutionInputs() {
        return this.solutionOptions.map((solution) => ({
          ...solution,
          additional: this.oldSolutions[solution.model],
        }));
      },
      solutionsPrice: {
        get() {
          return this.currentSolutions.price;
        },
        set(value) {
          this.updateSolutionsPrice(value);
        },
      },
      solutionsProduction: {
        get() {
          return this.currentSolutions.production;
        },
        set(value) {
          this.updateSolutionsProduction(value);
        },
      },
      solutionsMarketing: {
        get() {
          return this.currentSolutions.marketing;
        },
        set(value) {
          this.updateSolutionsMarketing(value);
        },
      },
      solutionsInvestments: {
        get() {
          return this.currentSolutions.investments;
        },
        set(value) {
          this.updateSolutionsInvestments(value);
        },
      },
      solutionsNir: {
        get() {
          return this.currentSolutions.nir;
        },
        set(value) {
          this.updateSolutionsNir(value);
        },
      },
    },
    methods: {
      ...mapActions('game', [
        'updateSolutionsPrice',
        'updateSolutionsProduction',
        'updateSolutionsMarketing',
        'updateSolutionsInvestments',
        'updateSolutionsNir',
      ]),
    },
  };
</script>

<style scoped lang="sass">
    @import "~/styles/styleguide.sass"

    .game-solution
        display: flex
        flex-direction: column

        &-header
            display: flex
            align-items: center
            background-color: $red
            border-radius: $base-border-radius
            color: $bg-main
            min-height: base-unit(40)
            padding: 0 base-unit(20)
            margin-top: base-unit(15)
            margin-bottom: base-unit(20)

            &.subtitle
                font-size: base-unit(16)
                font-weight: bold
                font-style: normal
                color: $bg-main

        &-content
            display: flex
            align-items: center
            justify-content: space-between

</style>
