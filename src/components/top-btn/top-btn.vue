<template>
  <div class="go-top-btn"
       v-show="shouldShow"
       @click="goTop">
    <span>TOP</span>
    <slot></slot>
  </div>
</template>
<script>
/**
 * 获取元素第一个scroll parent
 * @param  {DOM} elm   元素
 * @return {DOM}        元素的第一个滚动节点
 */
function getScrollParent(elm) {
  if (elm.tagName === 'BODY') {
    return window;
  } else if (['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
    return elm;
  }
  return getScrollParent(elm.parentNode);
}

/**
 * 获取滚动距离
 * @param  {DOM} elm   元素
 * @return {DOM}        方向，便于后续扩展
 */
function getCurrentDistance(elm, dir) {
  let distance;
  const scrollTop = isNaN(elm.scrollTop) ? elm.pageYOffset : elm.scrollTop;
  if (dir === 'top') {
    distance = scrollTop;
  } else {
    const scrollElmHeight = elm === window ?
            window.innerHeight :
            elm.getBoundingClientRect().height;

    distance = this.$el.offsetTop - scrollTop - scrollElmHeight - (elm.offsetTop || 0);
  }
  return distance;
}
function animateFix () {
  $.fn.scrollTo = function (options) {
    var defaults = {
      toT: 0,    //滚动目标位置
      durTime: 400,  //过渡动画时间
      delay: 30,     //定时器时间
      callback: null   //回调函数
    };
    var opts = $.extend(defaults, options),
            timer = null,
            _this = this,
            curTop = _this.scrollTop(),//滚动条当前的位置
            subTop = opts.toT - curTop,    //滚动条目标位置和当前位置的差值
            index = 0,
            dur = Math.round(opts.durTime / opts.delay),
            smoothScroll = function (t) {
              index++;
              var per = Math.round(subTop / dur);
              if (index >= dur) {
                _this.scrollTop(t);
                window.clearInterval(timer);
                if (opts.callback && typeof opts.callback == 'function') {
                  opts.callback();
                }
                return;
              } else {
                _this.scrollTop(curTop + index * per);
              }
            };
    timer = window.setInterval(function () {
      smoothScroll(opts.toT);
    }, opts.delay);
    return _this;
  }
}
export default {
  name: 'top-btn',
  data () {
    return {
      direction: 'top',//便于后续扩展
      scrollTop: 0,
      scrollParent: null,
      scrollHandler: null
    }
  },
  props: {
    distance: {//滚动多少像素开始显示top按钮
      type: Number,
      default: 100
    },
    scrollContainer: {
      type: String,
      default: ''
    },
    withAnimation: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    shouldShow() {
      return this.scrollTop > this.distance
    }
  },
  mounted () {
    if(typeof $.fn.animate !== 'function') {
      animateFix()
    }
    if(this.scrollContainer.length > 0) {
      this.scrollParent = document.getElementById(`${this.scrollContainer}`)
      if(this.scrollParent === null) {
        window.alert(`请确认#${this.scrollContainer}节点是否存在`)
        return false
      }
    }else {
      this.scrollParent = getScrollParent(this.$el);
    }
    this.scrollHandler = function scrollHandlerOriginal() {
        this.attemptShowTopBtn();
    }.bind(this);

    setTimeout(this.scrollHandler, 1);
    this.scrollParent.addEventListener('scroll', this.scrollHandler);
  },
  methods: {
    attemptShowTopBtn() {
      this.scrollTop = getCurrentDistance.bind(this)(this.scrollParent, this.direction);
    },
    goTop() {
      let scrollContainer = this.scrollParent
      if(this.scrollParent === window) {//兼容firefox等
        scrollContainer = 'html,body'
      }

      if(!this.withAnimation){
        $(scrollContainer).scrollTop(0)
        return false
      }else {
        if(typeof $.fn.animate !== 'function') {//zepto（官方animate模块通过css，所以不支持scrollTop，单独写个scrollTo）
          $(scrollContainer).scrollTo({
              toT: 0,
              callback:function () {
              }
            })
        }else {
          $(scrollContainer).animate({
            'scrollTop': 0
          }, 400, "linear",()=> {
          });
        }
      }
    }
  },
  destroyed() {
     this.scrollParent.removeEventListener('scroll', this.scrollHandler);
  }
}
</script>


