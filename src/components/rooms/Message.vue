<template>
  <div class="message">
    <div class="header">
      <span class="author">{{ data.user.userName }}</span>
      <span>{{ data.date.toLocaleTimeString() }}</span>
    </div>
    <span class="content">{{ data.content }}</span>
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
  };
</script>


<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .message
    display: flex
    flex-direction: column
    background-color: $grey
    border-radius: base-unit(10)
    width: 100%
    box-sizing: border-box
    padding: base-unit(10)
    margin: base-unit(5) 0

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
