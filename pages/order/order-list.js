// pages/order/order-list.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
  },

  //获取所有已选菜单
  getAllOrder: function () {
    var len = wx.getStorageSync('postData').length;
    var temp = [];
    for (var i = 0; i < len; i++) {
      var order = wx.getStorageSync('orderFoods' + (i + 1).toString());
      if (order == '') {
        order = {};
      }
      temp.push(order);
    }
    this.setData({
      allOrderFoods: temp
    });
  },
  //与food-detail.js类似，图标清除
  clearOrder: function (event) {
    var clearId = event.currentTarget.dataset.clearId;
    this.setClearOrder(clearId);
  },
  //获取订单收货地址
  getOrderAddr:function(){
    var data=wx.getStorageSync('orderAddr');
    this.setData({
      orderAddr:data
    });
  },
  selectAddr:function(){
    wx.navigateTo({
      url: 'order-addr/order-addr',
    })
  },
  //支付完毕变成已付款订单
  payOrder:function(event){
    var date=new Date();
    var resName=event.currentTarget.dataset.payId;
    var orderedFoods=this.data.allOrderFoods;
    //获取当前时间戳，单位S
    var orderDate = date.getTime()/1000;
    //单号生成，时间加随机数
    var orderNumber = orderDate+Math.random()*1000;
    //转换格式
    var orderDateStr=new Date(parseFloat(orderDate)*1000);
    // console.log(orderDateStr.format("yyyy-MM-dd hh:mm"));
    // console.log(Math.round(orderNumber));

    orderedFoods[resName].pay = true;//已经完成支付
    orderedFoods[resName].orderAddr=this.data.orderAddr;//订单地址
    orderedFoods[resName].orderTime = orderDateStr.format("yyyy-MM-dd hh:mm");
    orderedFoods[resName].orderNumber = Math.round(orderNumber);

    this.setClearOrder(resName);
    var temp=wx.getStorageSync('orderedFoods');
    if(temp==''){
      temp=[];
    }
    temp.push(orderedFoods[resName]);
    wx.setStorage({
      key: 'orderedFoods',
      data: temp ,
    })
    wx.redirectTo({
      url: 'order-pay/order-pay',
    });
  },
  //通用重置订单
  setClearOrder:function(postId){
    var data = this.data.allOrderFoods;
    var resName;
    for (var i = 0; i < data.length; i++) {
      if (postId == i) {
        //往对象添加元素
        switch (i) {
          case 0:
            resName = "饭堂一";
            break;
          case 1:
            resName = "饭堂二";
            break;
          case 2:
            resName = "饭堂三";
            break;
        }
        var temp = {
          resName: resName,
          totalNums: 0,
          totalCrash: 0,
          pay: false,
          totalFoods: []
        }
        wx.setStorage({
          key: 'orderFoods' + (i + 1).toString(),
          data: temp,
        })
        this.getAllOrder();
        break;
      }
    }
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
    this.getOrderAddr();
    this.getAllOrder();
    
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