<template>
  <div class="chat">
    <div class="title">
      <span class="main">Чат</span>
      <div class="description">
        <slot name="chat-header-description"></slot>
      </div>
    </div>
    <div class="content" ref="content">
      <message v-for="message in messages"
               :key="message.id"
               :data="message">
      </message>
    </div>
    <div class="chat-input">
      <app-input v-model="newMessage"
                 class="col-sm-7 col-md-8 col-lg-8 col-xl-8"
                 @submit="send"
                 color="#555555"
                 placeholder="Напишите сообщение"/>
      <div class="button col-sm-4 col-md-3 col-lg-3 col-xl-3"
           @click="send">
        Отправить
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Message from '~/components/rooms/Message';
  import AppInput from '~/components/AppInput';

  export default {
    name: 'chat',
    components: { Message, AppInput },
    data() {
      return {
        newMessage: '',
      };
    },
    computed: {
      ...mapState('chat', ['messages']),
    },
    methods: {
      ...mapActions('chat', ['sendMessage']),
      scrollToEnd() {
        const { content } = this.$refs;
        content.scrollTop = content.scrollHeight * 2;
      },
      send() {
        const { sendMessage, newMessage } = this;

        if (!newMessage) {
          return;
        }

        sendMessage(newMessage)
          .then(() => {
            this.newMessage = '';
          })
          .catch((err) => {
            // TODO notify
          });
      },
    },
    mounted() {
      setTimeout(() => this.scrollToEnd(), 500);
    },
    watch: {
      messages() {
        this.$nextTick(() => this.scrollToEnd());
      },
    },
  };
</script>


<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

  .chat
    display: flex
    flex-direction: column

    .title
      display: flex
      align-items: baseline
      justify-content: space-between
      flex: 0 0 auto
      min-height: base-unit(40)

      .main
        +title

      .description
        font-size: base-unit(14)
        font-weight: normal
        font-style: normal
        color: $light-grey

    .content
      display: flex
      flex-direction: column
      box-sizing: border-box
      margin-top: base-unit(15)
      max-height: base-unit(550)
      height: base-unit(550)
      overflow-y: auto
      scrollbar-width: none
      -ms-overflow-style: none

      &::-webkit-scrollbar
        width: 0
        background: transparent


    .chat-input
      display: flex
      flex: 0 0 auto
      justify-content: space-between
      margin-top: base-unit(40)
      width: 100%
      margin-bottom: base-unit(40)

      .button
        margin-left: base-unit(10)
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
