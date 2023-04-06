<template>
  <i class="iconfont" :class="`simi-icon-${name}`"></i>
</template>

<script>
export default {
  name: "SimiIcon",
};
</script>
<script setup>
const props = defineProps({
  name: { type: String, default: "" },
});
</script>



<style lang="scss" scoped>
@font-face {
  font-family: "iconfont"; /* Project id 3998058 */
  src: url("./fonts/iconfont.woff2?t=1680701544776") format("woff2"),
    url("./fonts/iconfont.woff?t=1680701544776") format("woff"),
    url("./fonts/iconfont.ttf?t=1680701544776") format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.simi-icon-sousuo:before {
  content: "\e632";
}

.simi-icon-gengduo:before {
  content: "\e719";
}

.simi-icon-xieboke:before {
  content: "\e624";
}

.simi-icon-github:before {
  content: "\e6f6";
}

.simi-icon-gengduo1:before {
  content: "\e601";
}

.simi-icon-guanbi:before {
  content: "\e602";
}

.simi-icon-shanchu:before {
  content: "\e603";
}

.simi-icon-pinglun:before {
  content: "\e604";
}

.simi-icon-shouye:before {
  content: "\e605";
}

.simi-icon-shipin:before {
  content: "\e606";
}

.simi-icon-wode:before {
  content: "\e607";
}

.simi-icon-dianzan:before {
  content: "\e608";
}
</style>