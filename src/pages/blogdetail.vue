<template>
  <div
    class="detail-container"
    :class="{ Night: !isDay }"
    :style="{ height: height }"
  >
    <div class="detail-header__container">
      <page-header v-model:isDay="isDay"></page-header>
    </div>
    <div class="detail-content__container">
      <div class="detail-content__title">
        <h1>
          {{
            detailRes.data._rawValue.data[0].attributes.title ||
            "can't get any response"
          }}
        </h1>
      </div>
      <div class="detail-content__content">
        <p>
          {{
            detailRes.data._rawValue.data[0].attributes.content ||
            "can't get any response"
          }}
        </p>
      </div>
      <div class="detail-content__date">
        <p>
          {{
            detailRes.data._rawValue.data[0].attributes.publishDate.trim() ||
            "can't get any response"
          }}
        </p>
      </div>
    </div>
    <div class="detail-footer__container">
      <div class="detail-footer__money" :class="{ Night: !isDay }">
        <p>支持一下菜鸟simon</p>
      </div>
      <div class="detail-footer__btns">
        <div class="toPrev" @click="toPrev">
          <h3 class="btn__name">上一篇</h3>
          <p class="btn__title">{{ blogList[prevId].attributes.title }}</p>
        </div>
        <div class="toNext" @click="toNext">
          <h3 class="btn__name">下一篇</h3>
          <p class="btn__title">{{ blogList[nextId].attributes.title }}</p>
        </div>
      </div>
    </div>
    <!-- <div class="detail-backtop" v-show="btnVisible"> -->
    <!-- <div class="backtopBtn">top</div> -->
    <el-backtop class="backtopBtn" :class="{ Night: !isDay }"></el-backtop>
    <!-- </div> -->
  </div>
  <page-footer />
</template>

<script setup lang='ts' name='BlogDetail'>
import { Sunny, Moon } from "@element-plus/icons-vue";
import PageFooter from "~/component/pagefooter/pagefooter.vue";
import { _AsyncData } from "nuxt/dist/app/composables/asyncData";
import PageHeader from "~/component/pageheader/pageheader.vue";
defineComponent({ PageHeader, PageFooter });
const route = useRoute();
const router = useRouter();
const isDay: Ref<boolean> = ref(false);
// 获取文章id

let id: Ref<number> = ref(Number(route.query.id));

const detailRes: _AsyncData<Object, any> = await useAsyncData("getDetail", () =>
  $fetch(`http://localhost:1337/api/blog-contents?filters[id][$eq]=${id.value}`)
);

interface resObject {
  data?: Array<Object>;
  meta?: Object;
}

const blogsRes: resObject = await $fetch(
  `http://localhost:1337/api/blog-contents?fields=title`
);

const blogList: any = blogsRes.data || [];

const prevId: ComputedRef<number> = computed(() => {
  if (id.value - 2 < 0) {
    return 8 + ((id.value - 2) % blogList.length);
  } else {
    return id.value - 2;
  }
}); // 0 7
const nextId: ComputedRef<number> = computed(() => id.value % blogList.length);

const height: ComputedRef<string> = computed(() =>
  detailRes.data._rawValue.data[0].attributes.content.length > 2000
    ? "auto"
    : "70rem"
);
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
  if (id.value - 1 < 1) {
    id.value = blogList.length;
  } else {
    id.value--;
  }
  await refreshAllData();
  router.push(`blogdetail?id=${id.value}`);
};

const toNext = async () => {
  if (id.value + 1 > blogList.length) {
    id.value = 1;
  } else {
    id.value++;
  }
  await refreshAllData();
  router.push(`blogdetail?id=${id.value}`);
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
  .detail-content__container {
    width: 80%;
    margin: 1rem auto;
    height: 70%;
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
    position: absolute;
    bottom: 5rem;
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
      color: white;
    }
    .detail-footer__money:hover::before {
      content: "❤";
      color: red;
    }
    .detail-footer__btns {
      display: flex;
      justify-content: space-between;
      box-sizing: content-box;
      div {
        width: 15%;
        margin: 0 2rem;
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
        justify-content: space-around;
        align-items: center;
        position: relative;
        .btn__name {
          width: 40%;
          margin-left: 1rem;
        }
        .btn__title {
          width: 50%;
          display: block;
          overflow: hidden;
          white-space: nowrap;
          font-size: 14px;
          text-overflow: ellipsis;
          margin: 0 0.5rem;
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
    border-color: #fcfcfc;
    background-color: #fcfcfc;
    color: #101010;
    border-radius: 50%;
    position: fixed;
    right: 3rem !important;
    bottom: 8rem !important;
    transition: 0.3s ease-in;
    text-align: center;

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