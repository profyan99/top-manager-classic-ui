<template>
  <div class="wrapper">
    <div class="bg" @click="close"></div>
    <div class="modal">
      <div class="header">
        <div class="title">
          <slot name="header"></slot>
        </div>
        <div class="exit" @click="close">
          <icon icon="times"></icon>
        </div>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .wrapper
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0

  .bg
    width: 100%
    height: 100%
    background-color: black
    opacity: 0.4

  .modal
    max-width: base-unit(500)
    min-width: base-unit(300)
    width: fit-content
    max-height: base-unit(700)
    min-height: base-unit(200)
    height: fit-content
    box-sizing: border-box
    border-radius: $base-border-radius
    background-color: $grey
    display: flex
    flex-direction: column
    position: absolute
    margin: auto auto
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 10

    .header
      display: flex
      align-items: center
      justify-content: space-between
      height: base-unit(40)
      background-color: $red
      padding: 0 base-unit(16)
      border-radius: $base-border-radius $base-border-radius 0 0

      .exit
        cursor: pointer
        padding: base-unit(5)

        &:hover
          opacity: 0.7

    .content
      flex: 1
      display: flex
      flex-direction: column
      width: 100%
      padding: base-unit(16)
      box-sizing: border-box

    .actions
      display: flex
      padding: base-unit(16)
      justify-content: flex-end

      .confirm-button
        background-color: $red
        cursor: pointer
        text-align: center
        color: $fg-main
        font-size: base-unit(14)
        border-radius: $base-border-radius
        padding: base-unit(10)
        box-sizing: border-box
        display: flex
        align-items: center
        justify-content: center

        &:hover
          opacity: 0.8

</style>
