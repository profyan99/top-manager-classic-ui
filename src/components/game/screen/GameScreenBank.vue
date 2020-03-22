<template>
  <div class="">
    <div v-for="companyItem in Object.keys(company)" :key="companyItem">
      <span>{{ companyItem }}:</span>
    </div>
    <div v-for="companyItem in Object.keys(company)" :key="companyItem">
      <span>{{ company[companyItem] }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GameScreenBank',
    data() {
      return {

      };
    },
    props: {
      company: {
        required: true,
      },
    },
  };
</script>

<style scoped lang="sass">
  @import "~/styles/styleguide.sass"

</style>
