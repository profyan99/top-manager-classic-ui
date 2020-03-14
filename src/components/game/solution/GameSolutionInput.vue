<template>
  <div class="game-solution-input">
    <span class="label">{{ label }}</span>
    <span class="additional">Было: {{ additional }}</span>
    <app-input v-model="inputModel"
               color="#555555"
               class="input"
               type="number"
               :placeholder="label"/>
  </div>
</template>

<script>
  import AppInput from '~/components/AppInput';

  export default {
    name: 'GameSolutionInput',
    components: { AppInput },
    props: {
      value: {
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      additional: {
        required: true,
      },
    },
    computed: {
      inputModel: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        },
      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .game-solution-input
    display: flex
    flex-direction: column

    .label
      color: $fg-main
      font-size: base-unit(16)
      font-weight: bold

    .additional
      color: $light-grey
      font-size: base-unit(14)
      font-weight: normal

    .input
      margin-top: base-unit(5)

</style>
