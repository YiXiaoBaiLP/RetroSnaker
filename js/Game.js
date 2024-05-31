// 这种方式
// 打包时会与别的项目同名文件会存在冲突
// function Game(){
//     alert("执行了！");
// }
// 使用IIFE包裹起来进行隔离（使用IIFE隔离作用域），避免打包时出现冲突
// (function() {})() 可以将这个方法变成 window 的一个属性
(function () {
  // 赋值给 window 中的一个属性；主要用于隔绝作用域
  window.Game = function () {
    // 初始化
    // 设置表格的大小
    this.row = 20;
    this.col = 16;
    // 初始化
    this.init();
    // 实例方块
    this.block = new Block();
    // 实例地图
    this.map = new Map();
    // 启动定时器
    this.start();
  };
  // 初始化游戏中的表格
  Game.prototype.init = function () {
    var $table = $("<table></table>");
    // 渲染表格
    for (var i = 0; i < this.row; i++) {
      // 创建tr
      var $tr = $("<tr></tr>");
      for (var j = 0; j < this.col; j++) {
        // 创建td
        var $td = $("<td></td>");
        $td.appendTo($tr);
      }
      $tr.appendTo($table);
    }
    $($table).appendTo("body");
  };
  Game.prototype.setColor = function (row, col, num) {
    // 给对应有颜色的方块添加类名
    $("tr")
      .eq(row)
      .children("td")
      .eq(col)
      .addClass("c" + num);
  };
  Game.prototype.start = function () {
    var self = this;
    this.timer = setInterval(function () {
      // 渲染方块
      self.block.render();
      // 渲染地图
      self.map.render(self);
    }, 500);
  };
})();
