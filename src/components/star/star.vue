<template>
  <div class="star">
    <div class="star-item" :class="starType">
      <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const STAR_ON = 'on';
  const STAR_HALF = 'half';
  const STAR_OFF = 'off';

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClass() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(STAR_ON);
        }
        while (result.length < LENGTH) {
          result.push(STAR_OFF);
        }
        if (hasDecimal) {
          result.push(STAR_HALF);
        }
        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/utils.styl"

  .star
    font-size 0px
    .star-item
      display inline-block
      background-repeat no-repeat
      &.star-48
        .star-item
          width 20px
          height 20px
          margin-right 22px
          background-size 20px 20px
          &:last-child
            margin-right 0px
          &.on
              bg-image('star48_on')
          &.off
              bg-image('star48_off')
          &.half
              bg-image('star48_half')
      &.star-36
        .star-item
          width 15px
          height 15px
          margin-right 3px
          background-size 15px 15px
          &:last-child
            margin-right 0px
          &.on
              bg-image('star36_on')
          &.off
              bg-image('star36_off')
          &.half
              bg-image('star36_half')
      &.star-24
        .star-item
          width 10px
          height 10px
          margin-right 3px
          background-size 10px 10px
          &:last-child
            margin-right 0px
          &.on
            bg-image('star24_on')
          &.off
            bg-image('star24_off')
          &.half
            bg-image('star24_half')
</style>
