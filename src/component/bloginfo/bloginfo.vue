<template lang="">
    <div class='blog-info__container'>
        <div class='blog-info__header'>
          <h3>{{props.title}}</h3>
        </div>
        <div class='blog-info__content'>
          <p>{{props.content}}</p>
        </div>
        <div class='blog-info__footer'>
          <p>{{props.date}}</p>
        </div>
    </div>

</template>

<script lang='ts'>
import { reactive, toRefs } from "vue";
export default {
  name: "BlogInfo",
};
</script>
<script lang='ts' setup>
const state = reactive({});
const props = defineProps({
  title: {
    type: String,
    default: "title",
  },
  content: {
    type: String,
    default: "content",
  },
  date: {
    type: Date,
  },
});
// const { title, content, date, tag } = toRefs(state);
</script>

<style lang="scss" scoped>
h3 {
  color: #000;
}
p {
  color: #101010;
}
.blog-info__container {
  width: 90%;
  margin: 0 auto 1rem auto;
  border: 0;
  height: 10rem;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  box-shadow: 0px 10px 12px 0.1px #aaaaaa;
  cursor: pointer;
  .blog-info__header {
    height: 25%;
    line-height: 25%;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    // border-bottom: 1px solid #808080;
    h3 {
      margin-left: 1rem;
    }
  }
  .blog-info__content {
    height: 50%;
    overflow: hidden;
    p {
      margin-left: 1rem;
      margin-right: 1rem;
      white-space: pre-line;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .blog-info__footer {
    height: 15%;
    line-height: 15%;
  }
}
</style>