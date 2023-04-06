<template lang="">
    <div class='blog-container'>
      <div class='blog-container__header'>
        <div class='blog-container__header__title'>
          <p>
            Recently blogs
          </p>
        </div>
        <div class='blog-container__header__button' @click='toMore'>

          <button>More <simi-icon name='gengduo1'/></button>
        </div>
      </div>
      <div class='blog-container__content' @click='handle'>
        <slot></slot> 
      </div>
    </div>
     
</template>
<script lang='ts'>
import SimiIcon from "../icon/icon.vue";
export default {
  name: "BlogContainer",
  components: {
    SimiIcon,
  },
};
</script>
<script setup lang='ts'>
const state = reactive({
  blogNum: 5,
});
const router = useRouter();
const toMore = () => {
  router.push("/moreblogs");
};
</script>


<style lang="scss" scoped>
.blog-container {
  width: 80%;
  line-height: 3rem;
  margin: 1rem auto;
  display: flex;
  position: relative;
  flex-direction: column;
  .blog-container__header {
    position: relative;
    .blog-container__header__title {
      position: absolute;
      top: 0;
      color: #808080;
      left: 1rem;
      p {
        height: 100%;
        line-height: 100%;
      }
    }
    .blog-container__header__button {
      position: absolute;
      right: 1rem;
      top: 0;
      button {
        display: inline-block;
        width: 5rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: 1rem;
        white-space: nowrap;
        cursor: pointer;
        background: #201f31;
        border: 1px solid #201f31;
        color: #9c9ea3;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        transition: 0.3s;
        font-weight: 500;
      }
      button:hover {
        color: #201f31;
        background: #808080;
        border: 1px solid #808080;
      }
    }
  }
  .blog-container__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 3rem;
  }
}
</style>