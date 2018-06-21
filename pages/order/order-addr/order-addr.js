// pages/order/order-addr/order-addr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderAddr: {
      name:"",
      phone:"",
      addr:"",
      room:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //input输入采集
  bindKeyInput:function(event){
    var dataId=event.currentTarget.dataset.itemId;
    var data=event.detail.value;
    this.data.orderAddr[dataId] = data;
  },
  //保存地址
  saveAddr:function(){
    var addrData = this.data.orderAddr;
    wx.setStorage({
      key: 'orderAddr',
      data: addrData,
    })
    this.saveAddrSuccessToast();
  },
  saveAddrSuccessToast:function(){
    wx.showToast({
      title: '保存成功',
      duration: 1000,
      icon: "success"
    });
    wx.navigateBack({
      delta:1
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