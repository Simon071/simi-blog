<template>
  <div
    class="detail-container"
    :class="{ Night: isNight }"
    :style="{ height: height }"
  >
    <div class="detail-header__container">
      <div
        class="detail-header__home"
        :class="isNight ? 'NightBtn' : ''"
        @click="toHome"
      >
        <button class="homeBtn">Simi-Blog</button>
      </div>
      <div class="detail-header__switch">
        <div class="switchBtn">
          <el-switch
            v-model="isNight"
            :active-icon="Moon"
            :inactive-icon="Sunny"
            size="large"
          />
        </div>
      </div>
    </div>
    <div class="detail-content__container">
      <div class="detail-content__title">
        <h1>
          {{ detailRes.data._rawValue.data[0].attributes.title }}
        </h1>
      </div>
      <div class="detail-content__content">
        <p>
          {{ detailRes.data._rawValue.data[0].attributes.content }}
        </p>
      </div>
      <div class="detail-content__date">
        <p>
          {{ detailRes.data._rawValue.data[0].attributes.publishDate.trim() }}
        </p>
      </div>
    </div>
    <div class="detail-footer__container">
      <div class="detail-footer__money" :class="{ Night: isNight }">
        <p>支持一下菜鸟simon</p>
      </div>
      <div class="detail-footer__btns">
        <div class="toPrev" @click="toPrev">
          <h3>上一篇</h3>
          <p>{{ blogList[prevId].attributes.title }}</p>
        </div>
        <div class="toNext" @click="toNext">
          <h3>下一篇</h3>
          <p>{{ blogList[nextId].attributes.title }}</p>
        </div>
      </div>
    </div>
    <!-- <div class="detail-backtop" v-show="btnVisible"> -->
    <!-- <div class="backtopBtn">top</div> -->
    <el-backtop :class="isNight ? 'NightBtn' : 'backtopBtn'"></el-backtop>
    <!-- </div> -->
  </div>
</template>

<script lang='ts'>
import { Sunny, Moon } from "@element-plus/icons-vue";
export default {
  name: "BlogDetail",
};
</script>
<script setup lang='ts'>
import { componentNames } from "~~/.nuxt/components";
const route = useRoute();
const router = useRouter();
const isNight = ref(false);
// 获取文章id

const bid: Ref<string> = ref(route.query.bid);
const detailRes = await useAsyncData("getDetail", () =>
  $fetch(
    `http://localhost:1337/api/blog-contents?filters[bid][$eq]=${bid.value}`
  )
);
// export interface detailType {
//   title: string;
//   content: string;
//   bid: number;
//   publishDate?: Date;
//   createdAt?: Date;
//   publishedAt?: Date;
//   updatedAt?: Date;
// }
// 获取文章内容
// const detail: detailType = reactive(detailRes.data._rawValue.data[0]);

const blogsRes = await $fetch(
  `http://localhost:1337/api/blog-contents?fields=title`
);

const blogList = blogsRes.data;

const prevId = computed(() => (bid.value - 1) % blogList.length.toString());
const nextId = computed(() => (bid.value + 1) % blogList.length.toString());

const height = computed(() =>
  detailRes.data._rawValue.data[0].attributes.content.length > 500
    ? "auto"
    : "70rem"
);
const timer = null;
// onMounted(){
//   setInterval(()=>{
//     refreshAllData()
//   },3000)
// }
// onBeforeMount(){
//   clearInterval(timer)
//   timer = null
// }
const refreshAllData = async () => {
  try {
    await refreshNuxtData();
  } catch (e) {
    console.error(e);
  } finally {
  }
};
const toHome = () => {
  router.push("/#");
};

// 逻辑有问题 变成后一页的

const toPrev = async () => {
  bid.value--;
  await refreshAllData();
  router.push(`blogdetail?bid=${bid.value}`);
};

const toNext = async () => {
  bid.value++;
  await refreshAllData();
  router.push(`blogdetail?bid=${bid.value}`);
};
</script>

<style lang="scss" scoped>
.detail-container {
  // height: 70rem;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  color: #000;
  background-color: rgba($color: #333, $alpha: 0.1);

  .detail-header__container {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    background-color: rgba($color: #909090, $alpha: 0.1);
    line-height: 3rem;
    .detail-header__home {
      width: 20%;
      height: 100%;
      line-height: 100%;
      transition: 0.3s linear;

      color: #101010;
      .homeBtn {
        width: 100%;
        height: 100%;
        line-height: 100%;
        border: 0px;
        font-weight: bold;
        cursor: pointer;
        background-color: rgba($color: #fff, $alpha: 0.3);
        border-color: rgba($color: #fff, $alpha: 0.3);
        transition: 0.3s linear;
      }
      .homeBtn:hover {
        background-color: #409eff;
        border-color: #409eff;
        color: white;
      }
    }
    .detail-header__switch {
      width: 20%;
      height: 100%;
      line-height: 100%;
      display: flex;
      align-items: center;
      background-color: rgba($color: #fff, $alpha: 0.3);
      justify-content: center;
    }
  }
  .detail-content__container {
    width: 80%;
    margin: 1rem auto;
    height: 70%;
    background-color: rgba($color: #808080, $alpha: 0.1);
    display: flex;
    position: relative;
    flex-direction: column;
    .detail-content__title {
      margin: 1rem auto;
      height: 15%;
    }
    .detail-content__content {
      width: 80%;
      height: 70%;
      justify-content: center;
      margin: 1rem auto;
    }
    .detail-content__content::before {
      content: "";
    }
    .detail-content__date {
      position: absolute;
      width: 30%;
      right: 0.1rem;
      bottom: 1rem;
    }
  }
  .detail-footer__container {
    display: flex;
    width: 100%;
    height: 10%;
    flex-direction: column;
    .detail-footer__money {
      width: 20%;
      margin: 1rem auto;
      // color: #909090;
      cursor: pointer;
      background-color: rgba($color: #fff, $alpha: 0.3);
      border-color: rgba($color: #fff, $alpha: 0.3);
      text-align: center;
      border-radius: 1rem;
      transition: 0.3s;
    }
    .detail-footer__money:hover {
      // background-color:;
      background-color: #409eff;
      border-color: #409eff;
      // color: white;
    }
    .detail-footer__btns {
      display: flex;
      justify-content: space-between;
      box-sizing: content-box;
      div {
        width: 20%;
        margin: 0 1rem;
        display: flex;
        white-space: nowrap;
        overflow: hidden;
        transition: 0.3s;
        cursor: pointer;
        height: 100%;
        line-height: 100%;
        border-radius: 0.5rem;
        background-color: rgba($color: #fff, $alpha: 0.3);
        border-color: rgba($color: #fff, $alpha: 0.3);
        justify-content: center;
        align-items: center;
        * {
          line-height: 100%;
          margin-left: 1rem;
          white-space: nowrap;
          // overflow: hidden;
        }
      }
      div:hover {
        background-color: #409eff;
        border-color: #409eff;
        color: white;
      }
    }
  }
  .backtopBtn {
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    background-color: rgba($color: #909090, $alpha: 0.2);
    color: rgba($color: #000, $alpha: 1);
    border-color: rgba($color: #909090, $alpha: 0.2);
    border-radius: 50%;
    position: fixed;
    right: 3rem;
    bottom: 10rem;
    transition: 0.3s ease-in;
    text-align: center;

    // box-shadow: 0rem 0rem 1em 0.001rem #000;
  }
  .backtopBtn:hover {
    background-color: rgba($color: #909090, $alpha: 0.3);
    color: rgba($color: #000, $alpha: 1);
    border-color: rgba($color: #909090, $alpha: 0.3);
    // box-shadow: 0rem 0rem 1em 0.001rem #000;
  }
}

.Night {
  background-color: rgba($color: #101010, $alpha: 1);
  color: rgb(200, 200, 200);
  border-color: rgba($color: #101010, $alpha: 1);
}

.NightBtn {
  background-color: rgba($color: #fcfcfc, $alpha: 0.5);
  border-color: rgba($color: #fcfcfc, $alpha: 0.5);
  color: #090909;
  transition: 0.3s;
}
</style>