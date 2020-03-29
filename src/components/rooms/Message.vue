<template>
  <div class="message">
    <div class="avatar">
      <img v-if="data.player.avatar"
           class="avatar"
           :src="data.player.avatar"
           alt="avatar"
      >
    </div>
    <div class="right">
      <div class="header">
        <span class="author">{{ data.player.userName }}</span>
        <span>{{ time }}</span>
      </div>
      <span class="content">{{ data.message }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    computed: {
      time() {
        return new Date(this.data.time).toLocaleTimeString();
      },
    },
  };
</script>


<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .message
    display: flex
    background-color: $grey
    border-radius: base-unit(10)
    width: 100%
    box-sizing: border-box
    padding: base-unit(10)
    margin-bottom: base-unit(10)

    .avatar
      margin-right: base-unit(10)

    .right
      display: flex
      flex-direction: column
      width: 100%

      .header
        font-style: normal
        font-weight: 300
        font-size: base-unit(12)
        color: $light-grey
        display: flex
        justify-content: space-between
        align-items: center

        .author
          font-weight: 500
          font-size: base-unit(14)
          margin-right: base-unit(10)
          color: $fg-main

    .content
      font-style: normal
      font-weight: lighter
      font-size: base-unit(14)
      +sub-font
      color: #a5a5a5
      margin-top: base-unit(2)


</style>
