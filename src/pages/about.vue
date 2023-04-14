<template>
  <div class="about__container" :class="{ Night: !isDay }">
    <page-header v-model:isDay="isDay"></page-header>
    <div class="about__content">
      <div class="about__intro">
        <h2>‍‍‍👨‍💻 A junior student from Guangzhou University</h2>
        <h2>✨ Dream is to be a good front-end Engineer</h2>
      </div>
      <div class="about__project-intro">
        <h2>💪 This blog site uses the following techniques</h2>
        <h3
          class="about__project-intro-item"
          v-for="(item, index) of techList"
          :key="index"
        >
          {{ item }}
        </h3>
      </div>
    </div>
    <div class="about__thx">
      <h1>THANKS!</h1>
    </div>
  </div>
</template>

<script setup lang="ts" name='About'>
import PageHeader from "../component/pageheader/pageheader.vue";
defineComponent({ PageHeader });
const techList = ["Nuxt3", "Vue3", "Scss", "Element Plus"];
const isDay: Ref<boolean> = ref(true);
</script>

<style lang='scss' scoped>
.about__container {
  width: 100%;
  height: 50rem;
  .about__content {
    width: 80%;
    display: flex;
    margin: 2rem auto;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    * {
      margin-left: 5rem;
    }
    .about__intro {
      border-radius: 1rem;
    }
    .about__project-intro {
      .about__project-intro-item {
        margin-left: 8rem;
        margin-top: 1rem;
      }
    }
  }
  .about__thx {
    margin: 2rem auto;
    width: 5rem;
  }
}
.Night {
  background-color: rgb(42, 48, 60);
  color: rgb(166, 173, 186);
}
</style>    