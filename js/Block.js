(function () {
  window.Block = function () {
    // 得到随机的方块
    // 第一步：罗列所有的类型
    var allType = ["S", "T", "O", "L", "J", "I", "Z"];
    // 第二步：从所有的类型中随机得到一种
    this.type = allType[parseInt(Math.random() * allType.length)];
    // 第三步：得到随机的类型方块，然后通过这个类型获取当前类型所有的形状总数量，因为不同类型，形状数量不同，比如 ‘o‘只有一种等
    this.allDir = fangkuai[this.type].length;
    // 第四步：通过当前的allDir的length随机得到不同的数字
    this.dir = parseInt(Math.random() * this.allDir);
    // 第五步：得到随机的方块
    this.code = fangkuai[this.type][this.dir];
    // 渲染初始的方
    this.row = 0;
    //  初始的列，因为要居中显示，所以列要为4
    this.col = 6;
  };
  Block.prototype.render = function () {
    // 渲染四行四列的方块
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        // 如果 4*4 的矩阵中某一个不是0，就说明有颜色，渲染这个颜色
        var temp = this.code[i][j];
        console.log(this.code);
        if (temp !== 0) {
          game.setColor(i + this.row, j + this.col, temp);
        }
      }
    }
  };
})();
