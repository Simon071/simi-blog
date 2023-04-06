<template>
  <div class="detail-container">
    <div class="detail-top">返回首页 切换日间和夜间模式的组件</div>
    <div class="detail-content">显示页面内容 用markdown的形式</div>
    <div class="detail-footer">文章打赏，上下一篇</div>
  </div>
</template>

<script >
export default {
  name: "BlogDetail",
};
</script>
<script setup>
const route = useRoute();
// 获取文章id
const bid = route.query.bid;
const res = await useAsyncData("getdetail", () =>
  $fetch(`http://localhost:1337/api/blog-contents?filters[bid][$eq]=${bid}`)
);
// 获取文章内容
const detail = ref(res.data._rawValue.data);
</script>

<style lang="scss" scoped>
</style>