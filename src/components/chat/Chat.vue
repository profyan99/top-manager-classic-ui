<template>
  <div class="chat">
    <div class="title">
      <span class="main">Чат</span>
      <div class="description">
        <slot name="chat-header-description"/>
      </div>
    </div>
    <div class="content" ref="content">
      <message v-for="message in formattedMessages"
               :key="message.id"
               :data="message">
      </message>
    </div>
    <div class="chat-input">
      <app-input v-model="newMessage"
                 class="chat-input-field"
                 @submit="send"
                 color="#555555"
                 placeholder="Напишите сообщение"/>
      <app-button label="Отправить" @click="send" />
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import AppButton from '~/components/AppButton';
  import Message from './Message';
  import AppInput from '~/components/AppInput';

  export default {
    name: 'chat',
    components: { AppButton, Message, AppInput },
    data() {
      return {
        newMessage: '',
      };
    },
    props: {
      roomId: {
        type: Number,
        default: null,
      },
    },
    computed: {
      ...mapState('chat', ['messages']),
      formattedMessages() {
        return this.messages.slice(-50);
      },
    },
    methods: {
      ...mapActions('chat', ['sendMessage']),
      scrollToEnd() {
        const { content } = this.$refs;
        content.scrollTop = content.scrollHeight * 2;
      },
      send() {
        const { sendMessage, newMessage, roomId } = this;

        if (!newMessage) {
          return;
        }

        sendMessage({
          message: newMessage,
          roomId,
        })
          .then(() => {
            this.newMessage = '';
          })
          .catch((_error) => {
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
      flex: 1
      overflow-y: auto
      scrollbar-width: none
      -ms-overflow-style: none

      &::-webkit-scrollbar
        width: 0
        background: transparent


    .chat-input
      display: flex
      flex: 0 0 auto
      flex-wrap: wrap
      justify-content: space-between
      margin-top: base-unit(40)
      width: 100%

      &-field
        flex: 1
        min-width: base-unit(100)
        margin-right: base-unit(10)


</style>
