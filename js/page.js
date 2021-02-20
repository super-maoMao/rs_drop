new Vue({
  el: ".container",
  data: function () {
    return {
      text_input: "",
      interval: "5",
      rs_height: 450,
      updateTimes: 0,
      timer: null,
    };
  },
  created() {
    let phoneHeight = window.screen.height;
    this.rs_height = phoneHeight - 160;
  },
  methods: {
    searchRsWord() {
      console.log(this.text_input);
      console.log(this.interval);
      if (!this.text_input) {
        this.alertMsg("请填写热搜名称!", 3);
        return;
      }
      this.updateTimes = 0;
      this.timer && clearInterval(this.timer);
      this.searchWeiboKeyWords(this.text_input, this.interval);
    },
    alertMsg(msg = "", type = 1) {
      if (type === 3) {
        this.$message.error(msg);
        return;
      }
      let reType = type == 1 ? "success" : "warning";
      this.$message({ message: msg, type: reType });
    },
    searchWeiboKeyWords(keyWord = "", interval) {
      let times = Number(interval) * 1000;
      let search_url = `https://s.weibo.com/weibo?q=${keyWord}`;
      $(".rs_box").html(
        `<div style="height: 100%;width: 100%;"><iframe src=${search_url}></iframe></div>`
      );
      this.updateTimes++;
      this.timer = setInterval(() => {
        $(".rs_box").html(
          `<div style="height: 100%;width: 100%;"><iframe src=${search_url}></iframe></div>`
        );
        this.updateTimes++;
      }, times);
    },
  },
});