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
  router.push("/moreblogs?page=1");
};
</script>


<style lang="scss" scoped>
.blog-container {
  width: 80%;
  line-height: 3rem;
  margin: 1rem auto 0 auto;
  display: flex;
  position: relative;
  flex-direction: column;
  .blog-container__header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    height: 3rem;
    .blog-container__header__title {
      // position: absolute;
      // top: 0rem;
      color: #000;
      font-weight: bold;
      // left: 1rem;
      line-height: 100%;
      p {
        margin: 0;
        height: 100%;
        line-height: 100%;
        font-size: 18px;
      }
    }
    .blog-container__header__button {
      button {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 5rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: 1rem;
        white-space: nowrap;
        cursor: pointer;
        background: #570df8;
        border: 1px solid #570df8;
        color: #fff;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        transition: 0.3s;
      }
      button:hover {
        background: #4b0cd3;
        border: 1px solid #4b0cd3;
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