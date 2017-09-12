<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img height="64px" width="64px" :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text"> {{seller.supports[0].description}} </span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon iconFont icon-leftAndRight"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon iconFont icon-leftAndRight"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" height="100%" width="100%">
    </div>
    <!-- <transition> 元素作为单个元素/组件的过渡效果。
    <transition> 不会渲染额外的 DOM 元素，也不会出现在检测过的组件层级中。
    它只是将内容包裹在其中，简单的运用过渡行为 -->
    <transition name="fade">
      <div v-show="detailShow" class="detail" @click="hideDetail" transition="fade">
        <div class="detail-wrapper clearFix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="iconfont icon-cha"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';

  export default {
    props: {
      seller: {
        type: object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      hideDetail() {
        this.detailShow = false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/utils.styl"

  .header
    position relative
    color: #fff
    overflow hideen
    background: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      font-size: 0
      .avatar
      //规定元素应该生成的框的类型  	行内块元素
        display: inline-block
      //把元素的顶端与行中最高元素的顶端对齐
        vertical-align top
        img
        //向 div 元素添加圆角边框
          border-radius 2px
      .content
        display: inline-block
        font-size 14px
        margin-left 16px
        .title
          margin 2px 0px 8px 0px
          .brand
            display: inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image('brand')
            background-size 30px 10px
          //	背景图像将仅显示一次
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold

        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .support
          .icon
            display inline-block
            width 12px
            height 12px
            vertical-align top
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('sepcial_1')
          .text
            line-height 12px
            font-size 12px
      .support-count
        position absolute
        right 12px
        bottom 14px
        padding 0 8px
        height 24px
        line-height 24px
        border-radius 12px
        background rgba(0, 0, 0, 0.2)
        text-align content
        .count
          font-size 10px
          vertical-align top
        .icon
          margin-left 2px
          line-height 24px
          font-size 10px
    .bulletin-wrapper
      position relative
      background rgba(7, 17, 27, 0.2)
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space noormal
      overflow hidden
    //属性规定当文本溢出包含元素时发生的事情 显示省略符号来代表被修剪的文本
      text-overflow ellipsis
      .bulletin-title
        display inline-block
        vertical-align top
        margin-top 8px
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        vertical-align top
        margin 0 4px
        font-size 10px
      .icon
        position absolute
        font-size 20px
        right 12px
        top: 0
    .background
      position absolute
      top: 0
      left: 0
      width 100%
      height 100%
    //设置元素的堆叠顺序
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      z-index 100
      top 0
      right 0
      width 100%
      height 100%
      overflow auto
      background rgb(7, 7, 17, 0.8)
      -webkit-backdrop-filter blur(10px)
    //进入动画
      &.fade-enter-active
        animation: bounce-in .5s;
    //离开动画
      &.fade-leave-active
        animation: bounce-out .5s;
    //规定进入动画的方式
      @keyframes bounce-in {
        0% {
        //	通过设置 X 轴的值来定义动画缩放转换
          transform: scale(0);
        }
        50% {
          transform: scale(1.5);
        }
        100% {
          transform: scale(1);
        }
      }
      @keyframes bounce-out {
        0% {
        //	通过设置 X 轴的值来定义动画缩放转换
          transform: scale(1);
        }
        50% {
          transform: scale(1.5);
        }
        100% {
          transform: scale(0);
        }
      }
  .detail-wrapper
    width 100%
    min-height 100%
    .detail-main
      margin-top 64px
      padding-bottom 64px
      .name
        line-height 16px
        text-align center
        font-size 16px
        font-weight 700px
      .star-wrapper
        margin-top 18px
        padding 2px 0
        text-align center
      .title
        width 80%
        display flex
        margin 28px auto 0 auto
        .line
          flex : 1
          position relative
          top -6px
          border-bottom 1px solid rgba(255,255,255,0.2)
        .text
          padding 0px 12px
          font-size 16px
          font-weight 700px
      .supports
        width 80%
        margin 22px auto
        .support-item
          padding 0 12px
          font-size 0px
          margin-bottom  12px
          &:last-child
            margin-bottom 0px
          .icon
            display inline-block
            width 16px
            height 16px
            vertical-align top
            margin-right 6px
            background-size 16px 16px
            background-repeat no-repeat
            &.decrease
              bg-image("decrease_2")
            &.discount
              bg-image("discount_2")
            &.guarantee
              bg-image("guarantee_2")
            &.invoice
              bg-image("invoice_2")
            &.special
              bg-image("special_2")
          .text
            line-height 12px
            font-size 12px
            color #fff
      .bulletin
        width 80%
        height 200px
        margin 22px auto
        .content
          padding 0 12px
          line-height 24px
          font-size 12px
  .detail-close
    position relative
    width 32px
    height 32px
    margin -64px auto 0 auto
    clear both
    font-size 32px
</style>
