<template>
  <modal :closable="false" @submit="onConfirm">
    <template v-slot:header>
      Новая игра
    </template>
    <template v-slot:content>
      <span class="text">
        Владелец комнаты {{ gameData.owner.userName }} хочет начать новую игру.
        Вы согласны?
      </span>
    </template>
    <template v-slot:actions>
      <app-button class="confirm-button" label="Принять" @click="onConfirm" />
      <app-button label="Отмена" @click="onReject" />
    </template>
  </modal>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import Modal from '~/components/Modal';
import AppButton from '~/components/AppButton';

export default {
  name: 'AskRestartGameModal',
  components: {
    Modal,
    AppButton,
  },
  props: {
    newGameId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState('game', ['gameData']),
  },
  methods: {
    ...mapActions('game', ['rejectRestartGame', 'clearGame']),
    onConfirm() {
      this.$router.push({
        name: 'game',
        params: { gameId: this.newGameId },
      });
      this.close();
    },
    async onReject() {
      await this.rejectRestartGame();
      this.close();
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="sass">
@import "~/styles/styleguide.sass"
</style>
