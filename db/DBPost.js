var util = require("../utils/util.js");
class DBPost {
  //构造函数
  constructor(postId) {
    this.storageKeyName = "postData";
    this.commentKeyName = "comments";
    this.postId = postId;
  }
  //获取在storage中的数据
  getAllPostData() {
    var res = wx.getStorageSync(this.storageKeyName);
    var that = this;
    if (!res) {
      wx.request({
        url: 'http://localhost/index.php/start/orderApi',
        method: 'GET',
        dataType: 'json',
        success: function(e) {
          that.execSetStorageSync(res);
        },
        fail: function(e) {
          console.log('error');
        }
      });
      // res=require("../data/data.js");
      // this.execSetStorageSync(res);
    }
    this.execSetStorageSync(res);
    return res;
  }
  //获取评论信息
  getAllComments() {
    var res = wx.getStorageSync(this.commentKeyName);
    if (!res) {
      res = require("../data/comment.js");
      this.execSetStorageSync(res);
    }
    return res;
  }
  //重新设置数据
  execSetStorageSync(data) {
    var res = wx.setStorageSync(this.storageKeyName, data);
  }

  getPostItemById() {
    var postComment = this.getAllComments();
    return {
      index: this.postId - 1,
      data: postComment[this.postId - 1]
    }
  }
  //获取文章的评论数据
  getCommentData() {
    var itemData = this.getPostItemById().data;
    //  console.log(itemData);
    itemData.comments.sort(this.compareWriteTime);
    var len = itemData.comments.length,
      comment;
    for (var i = 0; i < len; i++) {
      comment = itemData.comments[i];
      comment.create_time = util.getDiffTime(comment.create_time, true);
    }
    return itemData.comments;
  }
  //将评论按照时间降序排列
  compareWithTime(value1, value2) {
    var flag = parseFloat(value1.create_time) - parseFloat(value2.create_time);
    if (flag < 0)
      return 1;
    else if (flag > 0)
      return -1;
    else
      return 0;
  }
}
export {
  DBPost
}