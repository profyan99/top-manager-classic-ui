<template>
  <modal @close="onReject"
         @submit="onConfirm">
    <template v-slot:header>
      Новая игра
    </template>
    <template v-slot:content>
      <span class="text">
          Вы действительно хотите начать новую игру с такой же конфигурацией?
          Всем игрокам прийдет уведомление о старте новой игры.
      </span>
    </template>
    <template v-slot:actions>
      <app-button
          class="confirm-button"
          label="Принять"
          @click="onConfirm"/>
      <app-button
          label="Отмена"
          @click="onReject"/>
    </template>
  </modal>
</template>

<script>
  import { mapActions } from 'vuex';

  import Modal from '~/components/Modal';
  import AppButton from '~/components/AppButton';

  export default {
    name: 'ConfirmRestartGameModal',
    components: {
      Modal,
      AppButton,
    },
    methods: {
      ...mapActions('game', ['restartGame']),
      onConfirm() {
        this.restartGame()
          .then((gameId) => {
            this.$router.push({
              name: 'game',
              params: { roomId: gameId },
            });
            this.onReject();
          })
          .catch((_error) => {
          // TODO notify
          });
      },
      onReject() {
        this.$emit('close');
      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

</style>
