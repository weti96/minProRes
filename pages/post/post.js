// pages/post/post.js
import { DBPost } from "../../db/DBPost.js"
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //每个饭堂对应一个postId,postId对应多个menus
  onTapToDetail:function(event){
    var initFoods = {
      totalNums: 0,
      totalCrash: 0,
      totalFoods: []
    }
    var postId=event.currentTarget.dataset.postId;
    var resOrderId = 'orderFoods' + postId.toString();
    var orderFoods = wx.getStorageSync(resOrderId)||[];
    if(orderFoods==''){
      wx.setStorage({
        key: resOrderId,
        data: initFoods,
      })
    }
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dbPost = new DBPost();
    this.setData({ 
      postData: dbPost.getAllPostData()
      });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //更新首页
    var dbPost = new DBPost();
    var postData = dbPost.getAllPostData();
    var subFoodsList=[];
    var temp=[];
    for (var i = 0; i < postData.length;i++){
      var resName='orderFoods'+(i+1).toString();
      var item = wx.getStorageSync(resName);
      temp={
        resName: resName,
        totalNums: item.totalNums
      }
      subFoodsList.push(temp);
    }
    // ???VM24862: 2 Do not set same key {[object Object] } in wx:key.
    this.setData({ subFoodsList: subFoodsList});
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})