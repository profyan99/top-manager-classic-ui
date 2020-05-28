<template>
  <div class="chat">
    <div class="title">
      <span class="main">Чат</span>
      <div class="description">
        <slot name="chat-header-description" />
      </div>
    </div>
    <div class="content" ref="content">
      <message
        v-for="message in formattedMessages"
        :key="message.id"
        :data="message"
      >
      </message>
    </div>
    <div class="chat-input">
      <app-text-area
        v-model="newMessage"
        class="chat-input-field"
        color="grey"
        @submit="send"
        placeholder="Напишите сообщение"
      />
      <app-button label="Отправить" @click="send" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppButton from '~/components/AppButton';
import AppTextArea from '~/components/AppTextArea';
import Message from './Message';

export default {
  name: 'chat',
  components: {
    AppTextArea,
    AppButton,
    Message,
  },
  data() {
    return {
      newMessage: '',
    };
  },
  props: {
    gameId: {
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
      const { sendMessage, newMessage, gameId } = this;

      if (!newMessage || !newMessage.length || !newMessage.trim().length) {
        this.newMessage = '';
        return;
      }

      const formattedMessage = newMessage.trim();

      sendMessage({
        message: formattedMessage,
        gameId,
      })
        .then(() => {
          this.newMessage = '';
        })
        .catch(this.$notification.error);
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
  height: 100%

  .title
    display: flex
    justify-content: space-between
    flex: 0 0 auto
    height: base-unit(32)
    align-items: flex-end

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
    margin-top: base-unit(10)
    flex: 1
    overflow-y: auto

    &::-webkit-scrollbar
      background: transparent
      width: base-unit(20)

    &::-webkit-scrollbar-thumb
      border: base-unit(7.5) solid rgba(0, 0, 0, 0)
      background-clip: padding-box
      width: base-unit(5)
      border-radius: $base-border-radius
      background-color: $light-grey


  .chat-input
    display: flex
    flex: 0 0 auto
    flex-wrap: wrap
    justify-content: space-between
    align-items: flex-end
    margin-top: base-unit(40)
    width: 100%

    &-field
      flex: 1
      min-width: base-unit(100)
      margin-right: base-unit(10)
</style>
