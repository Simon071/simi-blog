<template lang="">
  <div class="info__container">
    <div class="big-title">
      <p class="big-title__inner">
        Hi
      </p>
    </div>
    <div class="small-title">
      <p class="small-title__inner">
          i'm Simon071
      </p>
    </div>  
    
    <div class="info__footer">
      <button class="btn" @click="switchGithub">
        <simi-icon name='github'/>Github
      </button>
      <div class='info__footer__label'>
        <label>WeChat:Simon071_</label>
        <label>email:simon071@163.com</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SimiIcon from "../icon/icon.vue";
import { reactive, toRefs } from "vue";
export default {
  name: "OwnerInfo",
  components: {
    SimiIcon,
  },
};
</script>
<script setup lang="ts">
const state = reactive({
  avatarUrl: "../../assets/img/6a0876e9128e88a7523b6f625203be6.jpg",
});
const { avatarUrl } = toRefs(state);
const switchGithub = () => {
  console.log();
  document.location = "https://github.com/Simon071";
};
</script>
<style lang="scss" scoped>
.info__container {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  .big-title {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    .big-title__inner {
      color: #808080;
      font-size: 60px;
      width: 100%;
      height: 30%;
    }
  }
  .small-title {
    width: 100%;
    height: 30%;
    display: flex;
    // align-items: center;

    .small-title__inner {
      color: #808080;
      margin: 0;
      font-size: 50px;
      width: 100%;
      height: 100%;
    }
  }
  .info__footer {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    width: 80%;
    transform: translateX(-50%);
    height: 3rem;
    display: flex;
    justify-content: space-between;
    button {
      margin-right: 15px;
    }
    label {
      color: #808080;
      margin-right: 10px;
    }
    .btn {
      display: inline-block;
      width: 5rem;
      height: 100%;
      border-radius: 1rem;
      line-height: 2rem;
      white-space: nowrap;
      cursor: pointer;
      background: #201f31;
      border: 1px solid #201f31;
      color: #9c9ea3;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      transition: 0.1s;
      font-weight: 500;
    }
    .btn:hover {
      color: #201f31;
      background: #808080;
      border: 1px solid #808080;
    }
    .info__footer__label {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      * {
        margin-top: 0.5rem;
      }
    }
  }
}
</style>