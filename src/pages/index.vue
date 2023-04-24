<template lang="">
  <div class="main-content___wrapper">
    <div class='main-content__info'>
      <div class='main-content__owner'>
        <owner-info/>
      </div>
      <hr/>
      <div class='main-content__blogs'>
        <blog-container>
            <blog-info 
            v-for="item,index of blogList" 
            :key='item.id'
            :title='item.attributes.title'
            :content='item.attributes.content'
            @click='toDetail(item.id)'
            >
            </blog-info>
        </blog-container>
      </div>
    </div>
    
  </div>
  <div class='footer'>
  </div>
  <page-footer></page-footer>
</template>

<script setup lang="ts" name='Main'>
import OwnerInfo from "~/component/ownerInfo/ownerInfo.vue";
import BlogContainer from "~/component/blogcontainer/blogcontainer.vue";
import BlogInfo from "~/component/bloginfo/bloginfo.vue";
import PageFooter from "~/component/pagefooter/pagefooter.vue";
defineComponent({ OwnerInfo, BlogContainer, BlogInfo, PageFooter });
const state = reactive({});
const router = useRouter();
const res = await useAsyncData("getBlogList", () =>
  $fetch(
    "http://localhost:1337/api/blog-contents?sort[0]=publishDate:desc&pagination[pageSize]=5"
  )
);
// 获取整个blog的数组 形成一个个小卡片
const blogList: Array<object> = ref(res.data._rawValue.data);

// 切换至Detail
const toDetail = (id: Number) => {
  router.push(`/blogdetail?id=${id}`);
};
</script>


<style lang="scss" scoped>
.main-content___wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  .main-content__info {
    margin: 1rem auto;
    width: 80%;
    height: auto;
    line-height: 100%;
    .main-content__owner {
      height: 20rem;
      width: 100%;
    }
    .main-content__blogs {
      height: 60rem;
    }
  }
}
</style>