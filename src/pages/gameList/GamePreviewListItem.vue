<template>
  <div
    class="game-preview"
    @click="$emit('selected')"
    :class="{ playing: data.state !== 'PREPARE' }"
  >
    <div class="name col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
      {{ data.name }}
    </div>
    <div class="players col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
      {{ `${data.currentPlayers} / ${data.maxPlayers}` }}
    </div>
    <div class="round col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
      {{ `${data.currentPeriod} / ${data.maxPeriods}` }}
    </div>
    <div class="mode hidden-md-down col-md-3 col-lg-3 col-xl-3">
      <icon v-for="icon in icons" :key="icon" :icon="icon" class="mode-icon">
      </icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'game-preview-list-item',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    icons() {
      const icons = [];
      if (this.data.locked) {
        icons.push('lock');
      }
      if (this.data.tournament) {
        icons.push('trophy');
      }
      if (this.data.scenario) {
        icons.push('file');
      }
      return icons;
    },
  },
};
</script>

<style scoped lang="sass">
@import "~/styles/styleguide.sass"

.game-preview
  width: 100%
  display: flex
  align-items: center
  font-size: base-unit(14)
  font-weight: normal
  box-sizing: border-box
  padding: base-unit(15)
  cursor: pointer
  border-radius: $base-border-radius

  &:hover
    background-color: $red

.players, .round
  text-align: center

.name
  box-sizing: border-box
  padding: 0 base-unit(10)

.mode
  display: flex
  align-items: center
  box-sizing: border-box
  padding: 0 base-unit(40)

  &-icon
    margin: 0 base-unit(5)

.playing
  color: $light-grey

  &:hover
    color: $fg-main
</style>
