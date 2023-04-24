<template lang="">
    <div class='blog-list__wrapper' :class="{'Night':!isDay}">
        <page-header v-model:isDay='isDay'></page-header>
        <div class='blog-list__main'>
          <ul class='blog-list__list'>
            <li 
            v-for='(item) of listRes.data._rawValue.data' 
            :key='item.id' 
            class='blog-list__item'
            :class="{'NightItem':!isDay}"> 
              <div class='blog-list__item-title' @click='toDetail(item.id)'>
                <h3>
                  {{item.attributes.title}}
                </h3>
              </div>
              <div class='blog-list__item-body'>
                <p class='blog-list__item-content'>
                  {{item.attributes.description}}
                </p>
                <button class='blog-list__item-view' @click='toDetail(item.id)'>
                  <el-icon size='18'><View /></el-icon>
                  <p>阅读</p>
                </button>
              </div>
              <div class='blog-list__item-tags'>

              </div>
            </li>
          </ul>
        </div>
        <div class='blog-list__footer'>
          <button 
          class='blog-list__footer-prev' 
          :disabled='pageNum===1'
          :class="{'NightBtn':!isDay}"
          @click='toPrev'>
            <el-icon>
              <ArrowLeftBold />
            </el-icon>
              Prev
            </button>
          <div class='blog-list__footer-page'>
            <span>{{pageNum}}/{{pageCount}}</span>
          </div>
          <button 
          class='blog-list__footer-next' 
          :disabled='pageNum===pageCount'
          :class="{'NightBtn':!isDay}"
          @click='toNext'>
            Next
            <el-icon>
              <ArrowRightBold />
            </el-icon>
            </button>
        </div>
        <el-backtop class='backtopBtn'></el-backtop>
    </div>
    <page-footer></page-footer>
</template>

<script setup name='MoreBlogs' lang='ts'>
import PageFooter from "~/component/pagefooter/pagefooter.vue";
import {
  HomeFilled,
  List,
  InfoFilled,
  Sunny,
  Moon,
  View,
  ArrowLeftBold,
  ArrowRightBold,
} from "@element-plus/icons-vue";
import { _AsyncData } from "nuxt/dist/app/composables/asyncData";
import PageHeader from "~/component/pageheader/pageheader.vue";
defineComponent({ PageHeader, PageFooter });
const route = useRoute();
//当前页面号码
const pageNum: Ref<number> = ref(Number(route.query.page));
interface listType {
  data?: Array<Object>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const listRes: _AsyncData<object, any> = await useAsyncData("getList", () =>
  $fetch(
    `http://localhost:1337/api/blog-contents?pagination[pageSize]=5&pagination[page]=${pageNum.value}`
  )
);
const list: listType = reactive(listRes.data._rawValue);
const itemLength: number = list.data?.length || 0;
//总共多少页
const pageCount: number = list.meta?.pagination.pageCount || 1;
onMounted(() => {
  // console.log(list);
  // console.log(itemLength);
});
const isDay: Ref<boolean> = ref(true);
const switchMode = () => {
  isDay.value = !isDay.value;
};
const router = useRouter();
const toHome = () => {
  router.push("/#");
};
const toList = async () => {
  pageNum.value = 1;
  await refreshAllData();
  router.push(`/moreblogs?page=${pageNum.value}`);
};
const toAbout = () => {
  router.push("/about");
};
const refreshAllData = async () => {
  try {
    await refreshNuxtData();
    console.log(listRes);
  } catch (e) {
    console.error(e);
  } finally {
  }
};
const toNext = async () => {
  if (pageNum.value + 1 > pageCount) {
    pageNum.value = 1;
  } else {
    pageNum.value++;
  }
  await refreshAllData();
  router.push(`/moreblogs?page=${pageNum.value}`);
};
const toPrev = async () => {
  if (pageNum.value - 1 < 1) {
    pageNum.value = 1;
  } else {
    pageNum.value--;
  }
  await refreshAllData();
  router.push(`/moreblogs?page=${pageNum.value}`);
};
const toDetail = (id: number) => {
  router.push(`/blogdetail?id=${id}`);
};
</script>

<style lang="scss" scoped>
.blog-list__wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .blog-list__header {
    display: flex;
    justify-content: space-between;
    height: 3rem;
    top: 0rem;
    position: sticky;
    align-items: center;
    line-height: 3rem;
    background-color: transparent;
    backdrop-filter: blur(1rem);
    z-index: 999;
    div {
      height: 100%;
    }
    .header-left {
      margin: 0 2rem;
    }
    .header-right {
      margin: 0 3rem;
      padding: 0;
      display: flex;
      width: 30%;
      justify-content: space-around;
      .blog-list__switchMode {
        text-align: center;
        margin: 0;
        div {
          height: 100%;
          width: 100%;
          position: relative;
          * {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        div:active {
          animation-name: switch;
          animation-duration: 0.5s;
          animation-timing-function: ease-in-out;
        }
      }
    }
    .header-right:last-child {
      margin: 0 1rem;
    }
    button {
      height: 100%;
      width: 5rem;
      margin: 0 0.3rem;
      display: block;
      border-radius: 0.5rem;
      background-color: inherit;
      transition: 0.3s all linear;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 18px;
      border: 1px transparent;
    }
    button:hover {
      animation-name: btnHover;
      animation-duration: 0.3s;
      animation-timing-function: linear;
      animation-iteration-count: 1;
      background-color: rgba($color: #888888, $alpha: 0.3);
    }
    button:active {
      animation-name: click;
      animation-duration: 0.3s;
      animation-timing-function: linear;
    }
  }
  .blog-list__main {
    width: 80%;
    // background-color: #808080;
    margin: 1rem auto;
    .blog-list__list {
      margin: 0;
      padding: 0;
      .blog-list__item {
        width: 90%;
        height: 12rem;
        // background-color: #fdfdfd;
        list-style: none;
        margin: 1rem auto;
        border-radius: 1rem;
        // display: flex;
        flex-direction: column;
        box-shadow: 0px 10px 12px 0.1px #aaaaaa;
        // align-items: flex-start;
        .blog-list__item-title {
          height: 20%;
          overflow: hidden;
          white-space: nowrap;
          margin: auto;
          cursor: pointer;
          h3 {
            height: 100%;
            // margin: 0.2rem;
            margin: 0;
            margin-left: 2rem;
            margin-top: 0.8rem;
          }
        }
        .blog-list__item-body {
          height: 60%;
          width: 100%;
          position: relative;
          margin: 1rem auto;
          .blog-list__item-content {
            margin: 0 2rem;
            height: 30%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .blog-list__item-view {
            position: absolute;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            right: 2rem;
            bottom: 0.5rem;
            width: 4.5rem;
            border-radius: 0.5rem;
            border: 0;
            background-color: #570df8;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            box-sizing: content-box;
            cursor: pointer;
          }
          .blog-list__item-view:hover {
            background-color: #4b0cd3;
          }
        }
        .blog-list__item-tags {
          height: 15%;
        }
      }
    }
  }
  .blog-list__footer {
    display: flex;
    width: 80%;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
    margin-bottom: 1rem;
    button {
      width: 5rem;
      border: 0;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: space-around;
      border-radius: 0.5rem;
      cursor: pointer;
      background-color: transparent;
      font-size: 18px;
    }
  }
  .backtopBtn {
    position: absolute;
    bottom: 5rem !important;
  }
}

@keyframes btnHover {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes switch {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: rotateZ(360deg);
  }
  100% {
    opacity: 1;
  }
}
@keyframes click {
  0% {
    transform: scale(1, 1);
  }

  33% {
    transform: scale(0.9, 1.1);
  }

  66% {
    transform: scale(1.1, 0.9);
  }

  100% {
    transform: scale(1, 1);
  }
}
.Night {
  background-color: rgb(42, 48, 60);
  color: rgb(166, 173, 186);
}
.NightItem {
  box-shadow: 0px 10px 12px 0.1px #101010 !important;
}
.NightBtn {
  color: rgb(166, 173, 186);
}
</style>