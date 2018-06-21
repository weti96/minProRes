// pages/order/order-show/order-show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allOrderFoods:[]
  },
  //获取订单的详细信息
  listDetail: function (event) {
    var listItem = event.currentTarget.dataset.itemId;
    if(!listItem.pay){
      wx.showToast({
        title: '未结算~~请先结算',
        duration:2000,
        mask:true,
        icon:'none'
      });
    }else{
      wx.setStorageSync('orderedDetail', listItem);
      wx.navigateTo({
        url: '../order-detail/order-detail',
      });
    }
  
  },
  //获取所有已选菜单
  getAllOrder: function () {
    var len = wx.getStorageSync('postData').length;
    var temp=[];
    //未结算
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
  //获取已经结算订单
  getOrderedFoods:function(){
    var order = this.data.allOrderFoods;
    var ordered = wx.getStorageSync('orderedFoods');
    var len = ordered.length;
    for (var i = 0; i < len; i++) {
      if (ordered[i] == '') {
        ordered[i] = {};
      }
      order.push(ordered[i]);
    }
    this.setData({
      allOrderFoods: order
    });
  },
  //与food-detail.js类似
  clearOrder: function (event) {
    var clearId = event.currentTarget.dataset.clearId;
    var data = this.data.allOrderFoods;
    //删除未结算订单
    for (var i = 0; i < data.length; i++) {
      if (clearId == i && clearId<3 ) {
        var temp = wx.getStorageSync('orderFoods' + (i + 1).toString());
        temp.totalNums=0;
        temp.totalCrash=0;
        temp.totalFoods=[];
        wx.setStorage({
          key: 'orderFoods' + (i + 1).toString(),
          data: temp,
        })
        this.getAllOrder();
        this.getOrderedFoods();
        break;
      }
      //删除已结算订单
      else if (clearId == i && clearId >= 3 ){
        var temp = wx.getStorageSync('orderedFoods');
        temp.pop(clearId-3);
        wx.setStorage({
          key: 'orderedFoods',
          data: temp,
        });
        this.getAllOrder();
        this.getOrderedFoods();
        break;
      }
    }
  },
  payOrder: function () {
    this.setData({
      payStatus: true
    });
    wx.navigateTo({
      url: '../order-list',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getAllOrder();
    this.getOrderedFoods();
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