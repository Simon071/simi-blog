<template lang="">
    <div 
    class='detail-header__container'
    >
        <!--  
            page-header 
        -->
        <div class='detail-header__home' @click='toHome'>
            <button class='homeBtn'>
                    Simi-Blog {{DetailHeader}}
            </button>
        </div>
        <div class='detail-header__switch'>
            <div class='switchBtn'>
                <el-switch 
                    v-model='isNight'
                    :active-icon="Moon" 
                    :inactive-icon="Sunny" 
                    size='large'
                    @click='switchState'
                    />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts' name='DetailHeader'>
import { ref, watchEffect } from "vue";
import { Sunny, Moon } from "@element-plus/icons-vue";

// interface detailHeaderProps {
//   isDay?: boolean;
// }
// const props = withDefaults(defineProps<detailHeaderProps>(), {
//   isDay: false,
// });
const emit = defineEmits(["update:value"]);
const router = useRouter();
const toHome = () => {
  router.push("/#");
};
const isNight = ref(false);
const switchState = () => {
  emit("update:value", props.isDay);
};
</script>
<style lang="scss" scoped>
.detail-header__container {
  width: 100%;
  height: 100%;
  line-height: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgba($color: #909090, $alpha: 0.1);
  .detail-header__home {
    width: 20%;
    height: 100%;
    line-height: 100%;
    .homeBtn {
      width: 100%;
      height: 100%;
      line-height: 100%;
      border: 0px;
      font-weight: bold;
    }
  }
  .detail-header__switch {
    width: 10%;
    height: 100%;
    line-height: 100%;
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
    justify-content: center;
  }
}
</style>