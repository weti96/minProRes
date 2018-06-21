// pages/post/post-detail/post-detail.js
import { DBPost } from "../../../db/DBPost.js"
var app = getApp();
var onResId;//设置点击的res
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    menus: {},
    toView: {
      currentId: 1,
      currentName: 'order0'
    },
    showFoodsList: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    onResId = options.id;
    this.initFoods(onResId);
    var dbPost = new DBPost(onResId);
    var comments = dbPost.getCommentData();
    this.setData({
      comments: comments,
    })
  },
  //绑定评论数据
  bindCommentData: function () {
    var comments = this.data.dbPost.getCommentData();
    this.setData({
      comments: comments
    });
  },
  //初始化数据
  initFoods:function(resId){
    var menus = [];
    var resName;
    var dbPost = new DBPost();
    var postList = dbPost.getAllPostData();
    var resItemsData = dbPost.getAllPostData()[resId - 1];
    var postId = resItemsData.postId.toString();
    var orderFoods = wx.getStorageSync('orderFoods' + postId);
    // console.log(orderFoods);
    // var foods = this.getAllFoods(postList);
    //往对象添加元素
    switch (resId) {
      case '1':
        resName = "饭堂一";
        break;
      case '2':
        resName = "饭堂二";
        break;
      case '3':
        resName = "饭堂三";
        break;
    }
    this.setData({
      resName: resName,
      resItems: resItemsData.postId.toString(),
      menus: resItemsData.menu,
      orderFoods: orderFoods
    });
    //数据加载
    this.setOrderFoods();
    wx.setNavigationBarTitle({
      title: resItemsData.title,
    });
  },
  //tab点击
  tabChange: function (event) {
    var target = event.currentTarget.dataset.targetId;
    this.setData({
      status: target
    });
  },
  //滑动触发
  swiperChange:function(e){
    var target=e.detail.current;
    this.setData({
      status: target
    });
  },
  //menus
  getFoodsItem: function (event) {
    var menuId = event.currentTarget.dataset.menuId;//只能函数的页面data才能引用
    console.log(menuId);
    var temp = {
      currentId: menuId,
      currentName: 'order' + (menuId - 1).toString()
    }
    this.setData({
      toView: temp
    });
  },
  //添加食品
  onAddFoods: function (event) {
    var foodId = event.currentTarget.dataset.foodId;
    this.searchFoodId(foodId, "add");
    this.getOrderFoods();
  },
  //减少食物
  onDecFoods: function (event) {
    var foodId = event.currentTarget.dataset.foodId;
    this.searchFoodId(foodId, "dec");
    this.getOrderFoods();
    //解决bug
    if (this.data.orderFoods.totalNums == 0) {
      this.hideCart();
    }
  },
  //加载orderFoods,重新设置data
  setOrderFoods:function(){
    var foodId,foodNums;
    var temp=this.data.orderFoods.totalFoods;
    for (var i = 0; i < temp.length;i++){
      foodId=temp[i].dish;
      foodNums=temp[i].dishNums;
      this.searchFoodId(foodId, "set", foodNums);
    }
  },
  //menu寻找foodId
  searchFoodId: function (Id, flag,nums) {
    var menusData = this.data.menus;
    for (var i = 0; i < menusData.length; i++) {
      for (var j = 0; j < menusData[i].foods.length; j++) {
        if (menusData[i].foods[j].dish == Id) {
          if (flag == "add") {
            menusData[i].foods[j].dishNums++;
            break;
          }
          else if (flag == "dec") {
            menusData[i].foods[j].dishNums--;
            break;
          }
          else if (flag == "clear") {
            menusData[i].foods[j].dishNums = 0;
            break;
          }
          else if(flag=="set"){
            menusData[i].foods[j].dishNums = nums;
            break;
          }
        }
      }
    }
    this.setData({
      menus: menusData
    });
  },
  //遍历生成orderFoods and crash
  getOrderFoods: function (event) {
    // var resName;//定义饭堂号
    var totalNums = 0;
    var totalCrash = 0;
    var temp = [];
    var menu = this.data.menus;
    var resItems = this.data.resItems;
    for (var i = 0; i < menu.length; i++) {
      var foods = menu[i].foods;
      for (var j = 0; j < foods.length; j++) {
        if (foods[j].dishNums > 0) {
          temp.push(foods[j]);
          totalNums += foods[j].dishNums;
          totalCrash += parseInt(foods[j].dishPrices) * foods[j].dishNums;
        }
      }
    }
    var orderFoodsData = {
      resName: this.data.resName,
      totalNums: totalNums,
      totalCrash: totalCrash,
      pay:false,
      totalFoods: temp
    }
    this.setData({
      orderFoods: orderFoodsData
    });
    //设置缓存
    wx.setStorage({
      key: 'orderFoods' + resItems,
      data: orderFoodsData,
    });
  },
  //显示orderfoods列表
  showOrderFoods: function (event) {
    var showFoodsList = this.data.showFoodsList;
    this.setData({
      showFoodsList: !showFoodsList
    })
  },
  //点击背景关闭list
  hideCart: function () {
    this.setData({
      showFoodsList: false
    });
  },
  //清空购物车
  clearCart: function () {
    var resName;//定义饭堂号
    var resItems = this.data.resItems;
    var data = this.data.orderFoods.totalFoods;
    var foodId;
    for (var i = 0; i < data.length; i++) {
      foodId=data[i].dish;
      this.searchFoodId(foodId, "clear");
    }
    //往对象添加元素
    switch (resItems) {
      case '1':
        resName = "饭堂一";
        break;
      case '2':
        resName = "饭堂二";
        break;
      case '3':
        resName = "饭堂三";
        break;
    }
    var orderFoodsData = {
      resName: resName,
      totalNums: 0,
      totalCrash: 0,
      pay:false,
      totalFoods: []
    }
    this.setData({
      orderFoods: orderFoodsData
    });
    wx.setStorage({
      key: 'orderFoods' + resItems,
      data: orderFoodsData
    });
  },
  //选好了
  buildOrder:function(){
    wx.navigateTo({
      url: '../../order/order-list',
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
    this.initFoods(onResId);
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