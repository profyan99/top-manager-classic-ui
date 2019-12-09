<template>
  <div class="modal">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal',
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .modal
    width: base-unit(340)
    height: base-unit(420)
    box-sizing: border-box
    padding: base-unit(40)
    background-color: $grey
    display: flex
    flex-direction: column
    position: absolute
    margin: auto auto
    left: 0
    right: 0
    top: 0
    bottom: 0

    .title
      display: flex
      align-items: center
      width: 100%
      height: base-unit(40)
      background-color: $red

    .content
      flex: 1
      display: flex
      flex-direction: column
      width: 100%
      padding: base-unit(20) 0

    .actions
      display: flex
      width: 100%

</style>
