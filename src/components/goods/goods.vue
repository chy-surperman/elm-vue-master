<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li v-for="(item,index) in goods" :key="item.id" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                        <span class="text border-1px">
                            <icon :TypeNum="item.type" class="icon-3"></icon>{{item.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodsWrapper">
                <ul>
                    <li v-for="item in goods" :key="item.id" class="food-list-hook">
                        <h1 class="title">{{item.name}}</h1>
                        <ul>
                            <li @click="selectFood(food,$event)" v-for="food in item.foods" :key="food.id" class="food-item">
                                <div class="icon">
                                    <img :src="food.icon" width="57" height="57">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span>月售{{food.sellCount}}份</span>
                                        <span>好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cartcontrol :food="food"></cartcontrol>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
        </div>
        <food :food="selectedFood" ref="food"></food>
    </div>
    
</template>

<script>
import icon from '../icon/icon';
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart';
import cartcontrol from '../cartcontrol/cartcontrol';
import food from '../food/food';
const code_OK = 200;
export default{
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedFood: {}
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        var _this = this;
        this.$axios.get('http://192.168.8.243:8080/smdc/buyer/product/list')
        .then(function(response){
            if( response.data.code == code_OK){
                _this.goods = response.data.data;
                _this.$nextTick(() => {
                    _this._initScroll();
                    _this._calculateHeight();
                });
            }
        })
        .catch(function(error){
            console.log(error)
        })
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i;
                }
            }
            return 0;
        },
        selectFoods() {
            let foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if(food.count){
                        foods.push(food);
                    }
                });
            });
            return foods;
        }
    },
    methods:{
        _initScroll() {
            this.meunScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            });
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3
            });
            this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        selectMenu(index, event) {
            if (!event._constructed) {
                return;
            }
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let ref = foodList[index];
            this.foodsScroll.scrollToElement(ref, 300);
        },
        _calculateHeight() {
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        selectFood(food,event) {
            if(!event._constructed){
                return;
            }
            this.selectedFood = food;
            this.$refs.food.show();
        }
    },
    components:{
        icon,
        shopcart,
        cartcontrol,
        food
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus"  rel="stylesheet/stylus" >
    @import '../../common/stylus/mixin'
    .goods
        display: flex
        position: absolute
        top: 174px
        bottom: 46px
        width: 100%
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background: #f3f5f7
            .menu-item
                display: table
                height: 54px 
                width: 56px
                padding: 0 12px
                line-height: 14px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    font-weight: 700
                    .text
                        border-none()
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    border-1px(rgba(7,17,27,0.1))
                    font-size: 12px
        .foods-wrapper
            flex: 1
            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #f3f5f7
            .food-item
                display: flex
                margin: 18px
                padding-bottom: 18px
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                    margin-bottom: 0
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    flex: 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .desc
                        line-height: 12px
                        margin-bottom: 8px
                    .extra
                    .count
                        margin-right: 12px
                    .price
                        font-weight: 700
                        line-height: 24px
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20, 20)
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 12px
</style>
