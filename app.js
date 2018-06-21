//app.js
// var dataObj=require("data/data.js");
//var dataObj;
//var commentsObj = require("data/comment.js");
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //获取菜单数据
    wx.request({
      url: 'https://wx.elecye.com/start/orderApi',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        wx.setStorage({
          key: 'postData',
          data: res.data
        })
      },
      fail: function (res) {console.log('获取菜单数据失败')},
    })
    //获取评论数据
    wx.request({
      url: 'https://wx.elecye.com/start/commentApi',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        wx.setStorage({
          key: 'comments',
          data: res.data
        })
      },
      fail: function (res) { console.log('获取评论数据失败') },
    })
    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    allOrderFoods:[],
    payStatus:[],
  }
})