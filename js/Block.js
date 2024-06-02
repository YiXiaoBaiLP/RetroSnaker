(function() {
  window.Block = function() {
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
  Block.prototype.render = function() {
    // 渲染四行四列的方块
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        // 如果 4*4 的矩阵中某一个不是0，就说明有颜色，渲染这个颜色
        var temp = this.code[i][j];
        console.log(this.code);
        // console.log(this.code);
        if (temp !== 0) {
          game.setColor(i + this.row, j + this.col, temp);
        }
      }
    }
  };
  Block.prototype.check = function(row, col) {
    // check 函数的row 和col 指的是要校验的地图的 row 和 col 的位置
    // 能力判断方法，判断的是对应位置的方块和地图位置的方块是否有都不为0的情况，如果有返回 true，否则返回false：就代表没有重合
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (row === 18) return false;
        if (this.code[i][j] !== 0 && row < 18 && game.map.mapCode[i + row][j + col] !== 0) {
          return false;
        }
      }
    }
    return true;
  };
  // 方块下落，需要判断当前的方块是否能够下落
  Block.prototype.checkDown = function() {
    // 判断当前地图的位置和自己方块的位置是否有重合this.row + 1 指的是预判
    // 预判断就是在下一次方块将要到达的位置是否有对应的地图方块不为0
    if (this.check(this.row + 1, this.col)) {
      this.row++;
    } else {
      // 此时就是下落到底的状态，渲染新的方块
      game.block = new Block();
      // 方块到底了，然后要渲染到地图的code 中
      this.renderMap();
    }
  };
  // 判断是否能够向左移动，如果可以则移动
  Block.prototype.checkLeft = function() {
    // 判断是否可以向左
    if (this.check(this.row, this.col - 1)) {
      this.col--;
    }
  };
  // 判断是否能够向右移动，如果可以则移动
  Block.prototype.checkRight = function() {
    // 判断是否可以向左
    if (this.check(this.row, this.col + 1)) {
      this.col++;
    }
  };

  // 一键到底，空格到底
  Block.prototype.checkBlockEnd = function() {
    // 使用 while 循环，如果当前的check返回的是true则代表能够下移，继续让row++
    while (this.check(this.row + 1, this.col)) {
      this.row++;
    }
  }

  // 方块旋转
  Block.prototype.checkRot = function() {
    // 备份旧的形状方向
    var oldDir = this.dir;
    // 改变新的
    this.dir++;
    // 判断如果当前dir大于了最后一种方向，回到第一种状态
    if (this.dir > this.allDir - 1) {
      this.dir = 0;
    }
    // 改变方向之后渲染新的方块方向
    this.cdoe = fangkuai[this.type][this.dir];
    // 渲染之后的新方块需要判断，是否有能力进行渲染
    if (!this.check(this.row, this.col)) {
      // 进入这里了就说明重合了，违规了，打回原形
      this.dir = oldDir;
      // 再次渲染方块
      this.code = fangkuai[this.type][this.dir];
    }

  }
  // 将已经到底的方块渲染到地图中
  Block.prototype.renderMap = function() {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        // 将现在已有的方块渲染到Map类的mapCode上
        if (this.code[i][j] !== 0) {
          // 改变爹图的mapCode数据
          game.map.mapCode[this.row + i][this.col + j] = this.code[i][j];
        }
      }
    }
  }

})();
