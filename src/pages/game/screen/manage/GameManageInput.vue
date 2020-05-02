<template>
  <div class="game-manage-input">
    <span class="label">{{ label }}</span>
    <app-input v-model="inputModel"
               color="#555555"
               type="number"
               :caption="`Было: ${additional}`"
               @blur="$emit('blur')"
               error-message="Значение должно быть больше 0"
               :error="error"
    />
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
      error: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      inputModel: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', parseFloat(value));
        },
      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .game-manage-input
    display: flex
    align-items: baseline

    .label
      color: $dark-fg-main
      font-size: base-unit(14)
      font-weight: normal
      width: base-unit(100)
      margin-right: base-unit(10)

</style>
