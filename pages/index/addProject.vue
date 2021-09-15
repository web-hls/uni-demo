<template>
  <view class="add_project_content">
      <view class="project_name">
        <view class="title">项目名称:</view>
        <input class="uni-input" v-model="project_name" maxlength="18" placeholder="请输入待办事项" />
      </view>
      <view class="uni-list">
          <view class="uni-list-cell">
              <view class="title">当前选择:</view>
              <view class="uni-list-cell-db">
                  <picker @change="bindPickerChange" :value="index" :range="array">
                      <view class="uni-input-picker">{{array[index]}}</view>
                  </picker>
              </view>
          </view>
      </view>
      <view class="button">
        <button
          @click="submit"
          class="button-inner"
          type="warning"
          >确认
        </button>
      </view>
  </view>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    data() {
      return {
        project_name:'',
        project_plan:'每天半小时',
        index: 0,
        array: ['每天半小时', '每天一小时', '每天两小时', '每周一次','每周两次','每周三次','其他']
      }
    },
    computed: mapState(["user"]), // 拿值
    methods: {
      bindPickerChange(e) {
        this.project_plan  = this.array[e.target.value]
        console.log("this.array[e.target.value]",this.array[e.target.value])
      },
      submit(){
        let data = {
          user_id : this.user.id,
          project_name: this.project_name,
          project_plan: this.project_plan
        }
        if(!this.project_name){
          return 	uni.showToast({
            title: '项目名称不能为空',
            icon: 'none',
            duration: 5000
          });
        }
        uni.request({
          url:'saveProject',
          method:'POST',
          data,
        }).then(res=>{
          console.log(res)
          uni.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 5000
          });
          uni.switchTab({
            url: "/pages/index/index",
          });
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
.add_project_content {
  height: 100%;
  position: fixed;
  overflow-y: scroll;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f7e8d5;
  margin-top: 44px;
  .title {
    margin: 24rpx
  }
  .uni-input {
    border-top: 1rpx solid slategrey;
    border-bottom: 1rpx solid slategrey;
    width: 80%;
    margin-left: 24rpx;
    padding: 10rpx 20rpx;
    text-align: 20rpx;
  }
  .uni-input-picker {
    border-top: 1rpx solid slategrey;
    border-bottom: 1rpx solid slategrey;
    width: 80%;
    margin-left: 24rpx;
    padding: 10rpx 20rpx;
    text-align: 20rpx;
  }
  .button {
    text-align: center;
    margin-top: 100rpx;
    width: 100%;
   
    .button-inner {
      background: rgba(230,162,60,0.8);
      color: white;
      width: 80%;
      font-size: 36rpx
    }
  }
}

</style>
