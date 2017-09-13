<template>
  <div>
    <div class="goods">
      <div class="" ref="">
        <ul>
          <li class="" ref="" v-for="(item,index) in goods" :class="{'current':currentIndex=== index}" @click="">
             <span class="text">
                <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                {{item.name}}
             </span>
          </li>
        </ul>
      </div>
      <div class="" ref="">
        <ul>
          <li v-for="item in goods" class="food-list" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="" v-for="food in item.foods" class="">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span class="">好评率{{food.rating}}%</span>
                  </div>
                  <div class="">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="">
                    <cart_control @add="addFood" :food="food"></cart_control>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- ref  如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素; 如果用在子组件上，引用就指向组件实例 -->
      <shop_cart ref="shop_cart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
                 :minPrice="seller.minPrice"></shop_cart>
    </div>
    <food @add="addFood" ref="food" :food="selectedFood"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shop_cart from '../../components/shopcart/shop_cart.vue';
  import cart_control from '../../components/cartcontrol/cart_control.vue';
  import food from '../../components/food/food.vue';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        //滚动栏数
        scroll: 0,
        selectedFood: {}
      }
    },
    computed: {
      //TODO 未添加商品的计算
      currentIndex() {
        for (let i = 0; i < this.listHeight; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          //如果height2或者 滚动栏数在1和 2 之间
          if (!height2 || (this.scroll >= height1 && this.scroll < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    methods:{
      _initScroll(){
        this.menuScroll = new BScroll(this.$refs.menuWrapper,{
          click:true
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper,{
          probeType:3,
          click:true
        });
      },
      _calculateHeight(){
      this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      }
    },
    components: {
      shop_cart,
      cart_control,
      food
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
