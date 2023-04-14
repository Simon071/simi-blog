<template>
  <nav class="page-header__container">
    <div class="header-left">
      <button
        class="page-header__toHome"
        @click="router.push('/#')"
        :class="{ NightBtn: !isDay }"
      >
        <el-icon size="large">
          <HomeFilled />
        </el-icon>
        <p>Home</p>
      </button>
    </div>
    <div class="header-right">
      <button
        class="page-header__toList"
        :class="{ NightBtn: !isDay }"
        @click="toList"
      >
        <el-icon size="large">
          <List />
        </el-icon>
        <p>Blogs</p>
      </button>
      <button
        class="page-header__toAbout"
        :class="{ NightBtn: !isDay }"
        @click="toAbout"
      >
        <el-icon size="large">
          <InfoFilled />
        </el-icon>
        <p>About</p>
      </button>
      <button
        class="page-header__switchMode"
        @click="switchMode"
        :class="{ NightBtn: !isDay }"
      >
        <div>
          <el-icon size="24" v-if="isDay"><Sunny /></el-icon>
          <el-icon size="24" v-else><Moon /></el-icon>
        </div>
      </button>
    </div>
  </nav>
</template>
<script lang='ts'>
export default {
  name: "PageHeader",
};
</script>
<script setup lang="ts">
import {
  HomeFilled,
  List,
  InfoFilled,
  Sunny,
  Moon,
} from "@element-plus/icons-vue";

const props = defineProps({
  isDay: {
    type: Boolean,
    default: true,
  },
});
const isDay: Ref<boolean> = ref(props.isDay);
const emits = defineEmits(["update:isDay"]);
const switchMode = () => {
  isDay.value = !isDay.value;
  emits("update:isDay", isDay.value);
};
const router = useRouter();
const toHome = () => {
  router.push("/#");
};
const toList = () => {
  router.push(`/moreblogs?page=${1}`);
};
const toAbout = () => {
  router.push(`/about`);
};
</script>

<style lang='scss' scoped>
.page-header__container {
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
    .page-header__switchMode {
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