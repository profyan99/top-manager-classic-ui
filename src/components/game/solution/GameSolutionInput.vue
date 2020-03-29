<template>
  <div class="game-solution-input">
    <span class="label">{{ label }}</span>
    <app-input v-model="inputModel"
               color="#555555"
               type="number"
               :caption="`Было: ${additional}`"
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
    align-items: center

    .label
      color: $fg-main
      font-size: base-unit(16)
      font-weight: bold
      margin-right: base-unit(15)

</style>
