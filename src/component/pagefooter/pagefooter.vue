<template>
  <div class="page-footer__container">
    <div class="page-footer__content">
      <h4>Made by <nuxt-link to="/about">Simon071</nuxt-link></h4>
    </div>
  </div>
</template>

<script setup lang="ts" name='PageFooter'>
</script>

<style lang='scss' scoped>
.page-footer__container {
  height: 5rem;
  width: 100%;
  background-color: rgb(249, 249, 249);
  color: rgb(146, 146, 146);
  display: flex;
  justify-content: center;
}
</style>