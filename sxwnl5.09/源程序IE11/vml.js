//====================日食作图物件=====================
function ht_init(can) {
  //绘图物件初始化
  if (this.isInit) return;
  this.isInit = 1;
  this.can = can; //document.getElementById("can");
  this.ctx = can.getContext("2d");
  //this.ctx.translate(0.5,0.5);
  this.ctx.lineWidth = 1;
  this.w = can.width - 0;
  this.h = can.height - 0;
}
function ht_oval1(ctx, x, y, r, col) {
  //画空心圆
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.strokeStyle = col;
  ctx.closePath();
  ctx.stroke();
}
function ht_oval2(ctx, x, y, r, col) {
  //画实心圆
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = col;
  ctx.closePath();
  ctx.fill();
}
function ht_line(ctx, x1, y1, x2, y2, col) {
  //画线
  ctx.beginPath();
  ctx.strokeStyle = col;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}
function ht_text(ctx, x, y, txt, col, font) {
  //绘文本
  ctx.font = font; //例'bold 35px Arial'
  //ctx.textAlign = 'center';
  ctx.textBaseline = "top"; //top bottom等
  ctx.fillStyle = col;
  ctx.fillText(txt, x, y); //只描边则用 ctx.strokeText(txt, x, y)
}

var tu1 = {
  isInit: 0,
  x0: 0,
  y0: 0,
  w: 0,
  h: 0,
  dx: 0,
  dy: 0, //坐标参数
  diming: new Array(
    116.4,
    40,
    "北京",
    119,
    25.4,
    "莆田",
    91,
    29.7,
    "拉萨",
    -73,
    41,
    "纽约",
    151,
    -34,
    "悉尼",
    37,
    56,
    "莫斯科",
    30,
    -20,
    "非洲南部",
    -56,
    -33,
    "乌拉圭"
  ), //几个地标
  rsph: [], //日食路径
  init: ht_init, //初始化
  showzb: function () {
    //显示坐标等
    //坐标参数
    var i, c, x, y;
    var dx = (this.dx = int2(this.w / 8.5));
    var dy = (this.dy = int2(this.h / 8.0));
    var x0 = (this.x0 = int2((this.w - dx * 8) / 2));
    var y0 = (this.y0 = int2(dy * 6) + 3);
    (this.vs = dx), (this.vx = x0 + 4 * dx), (this.vy = y0 - 3 * dy); //vs对应32角分(放大区参数)
    //画地图
    this.can.height = this.can.height;
    this.ctx.beginPath();
    this.ctx.fillStyle = "#D0D0D0";
    for (i = 0; i < ditu0.length; i += 2) {
      if (ditu0[i] == 1e7) i++, (c = 1);
      else c = 0;
      x = x0 + (8 * dx * ditu0[i]) / 2009;
      y = y0 - 6 * dy * (1 - ditu0[i + 1] / 970);
      if (c) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    }
    this.ctx.fill();
    //创建坐标
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#00FF00";

    for (i = 0; i <= 6; i++) {
      //画水平网格线(y刻度)
      c = y0 - i * dy + 0.5; //加0.5使线变细
      this.ctx.moveTo(x0, c);
      this.ctx.lineTo(x0 + dx * 8, c);
      if (i)
        ht_text(
          this.ctx,
          x0 + 2,
          c,
          15 * i + "(" + (i > 3 ? "+" : "") + 30 * (i - 3) + ")",
          "#000000",
          "12px 宋体"
        );
    }
    for (i = 0; i <= 8; i++) {
      //画竖直网格线(x刻度)
      c = x0 + i * dx + 0.5; //加0.5使线变细
      this.ctx.moveTo(c, y0);
      this.ctx.lineTo(c, y0 - dy * 6);
      if (i > 0 && i < 8)
        ht_text(
          this.ctx,
          c - 10,
          y0,
          30 * (i - 4) + "(" + (i <= 4 ? 45 * i : 45 * i - 360) + ")",
          "#000000",
          "12px 宋体"
        );
    }
    this.ctx.stroke();
    //创建地标
    for (i = 0; i < this.diming.length; i += 3) {
      var J = this.diming[i];
      if (J < 0) J += 360;
      var W = this.diming[i + 1];
      (J = J / 45), (W = W / 30 + 3);
      J = x0 + dx * J - 5;
      W = y0 - dy * W - 8;
      ht_text(this.ctx, J, W, "·" + this.diming[i + 2], "#000000", "12px 宋体");
    }
  },

  draw1: function (sm, J, W, bei) {
    //地平坐标中画日、月。sm日或月,J经度,W纬度,bei为真时,表示坐标图中的0度为正北,否则为正南
    //经纬度转为格数
    var col = sm == "sun" ? "#FF0000" : "#B0A070";
    if (bei) J = J - Math.PI;
    J = rad2rrad(J);
    W = (W * 180) / Math.PI / 15;
    J = (J * 180) / Math.PI / 30 + 4;
    ht_oval2(this.ctx, this.x0 + J * this.dx, this.y0 - W * this.dy, 4, col);
  },
  draw1b: function (sm, J, W, gst) {
    //时角坐标中画日、月。sm日或月,赤经,赤纬,恒星时
    //经纬度转为格数
    var col = sm == "sun" ? "#FF0000" : "#B0A070";
    W = (W * 180) / Math.PI / 30 + 3;
    J = (rad2mrad(J - gst) * 180) / Math.PI / 45;
    ht_oval2(this.ctx, this.x0 + J * this.dx, this.y0 - W * this.dy, 4, col);
  },
  draw2a: function (J1, W1, J2, W2, mr, sr) {
    //画日食放大图,转入月、太阳坐标及视半径(前者为月),半径单位是角秒。未做大气折射修正。
    var dJ = -rad2rrad(J1 - J2),
      dW = W1 - W2,
      v = this.vs;
    //默认向右为东，月亮东行所以向右运动，经度取反，月亮向左运动(左边变为东)
    (dJ *= Math.cos((W1 + W2) / 2) * rad), (dW *= rad); //转为平面
    (dJ = ((v / 32) * dJ) / 60), (dW = ((v / 32) * dW) / 60); //坐标转为点数
    (sr = ((v / 32) * sr) / 60), (mr = ((v / 32) * mr) / 60); //日月面大小转为点数
    if (Math.abs(dJ) > 3.5 * this.dx || Math.abs(dW) > 2.5 * this.dy) return; //出界
    //画日月
    ht_oval2(this.ctx, this.vx, this.vy, sr, "#FF0000");
    ht_oval2(this.ctx, this.vx + dJ, this.vy - dW, mr, "#A0A000");
  },
  draw2b: function (J1, W1, J2, W2, mr, er, Er) {
    //画月食放大图,转入月、地影坐标及视半径(前者为月),半径单位是角秒。未做大气折射的修正。
    var dJ = -rad2rrad(J1 - J2),
      dW = W1 - W2,
      v = this.vs / 2;
    (dJ *= Math.cos((W1 + W2) / 2) * rad), (dW *= rad); //转为平面
    (dJ = ((v / 32) * dJ) / 60), (dW = ((v / 32) * dW) / 60); //坐标转为点数
    (er = ((v / 32) * er) / 60),
      (Er = ((v / 32) * Er) / 60),
      (mr = ((v / 32) * mr) / 60); //日月面大小转为点数
    if (Math.abs(dJ) > 3.5 * this.dx || Math.abs(dW) > 2.5 * this.dy) return; //出界
    ht_oval2(this.ctx, this.vx + dJ, this.vy - dW, mr, "#A0A000"); //月亮
    ht_oval2(this.ctx, this.vx, this.vy, Er, "rgba(0,0,0,0.2)"); //半影
    ht_oval2(this.ctx, this.vx, this.vy, er, "rgba(0,0,0,0.4)"); //本影
  },
  draw3: function (J, W, bl) {
    //画出日食中心线，J,W为某中心点的地标，bl表示是否保留路径
    var i,
      ph = this.rsph;
    if (!bl) ph.length = 0; //清除路径
    if (Math.abs(J) <= Math.PI * 2 || Math.abs(W) <= Math.PI) {
      //保存路径
      J = ((rad2mrad(J) / Math.PI) * 180) / 45;
      W = ((W / Math.PI) * 180) / 30 + 3;
      J = this.x0 + this.dx * J - 3;
      W = this.y0 - this.dy * W;
      (ph[ph.length] = J), (ph[ph.length] = W);
    }
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#FF0000";
    for (i = 0; i < ph.length; i += 2) {
      (J = ph[i]), (W = ph[i + 1]);
      this.ctx.moveTo(J, W);
      this.ctx.lineTo(J - 3, W + 8);
      this.ctx.lineTo(J + 3, W + 8);
      this.ctx.lineTo(J, W);
    }
    this.ctx.stroke();
    this.ctx.closePath();
  },
};

var tu2 = {
  isInit: 0,
  eR: 140,
  x0: 240,
  y0: 210,
  init: ht_init, //初始化
  line1: function (as, hd) {
    var i, a, js, xc, yc;
    var R = this.eR,
      R2 = this.eR * 1.2;
    this.can.height = this.can.height; //清除画布
    ht_oval1(this.ctx, this.x0, this.y0, R, "#000000"); //画地球圆
    //画黄赤道与地心极轴
    ht_line(this.ctx, this.x0 - R2, this.y0, this.x0 + R2, this.y0, "#000000");
    ht_line(this.ctx, this.x0, this.y0 + R2, this.x0, this.y0 - R2, "#000000");

    for (i = 0; i < as.length; i++) {
      //画斜线
      a = as[i];
      (xc = a.xc), (yc = a.yc), (k = a.k);
      if (a.d > 1.6) continue;
      if (hd) {
        //转为黄道坐标
        var r = sqrt(xc * xc + yc * yc);
        var s = atan2(yc, xc) + a.ds,
          dk = tan(a.ds);
        xc = r * cos(s);
        yc = r * sin(s);
        k = (k + dk) / (1 - k * dk);
        ht_text(this.ctx, 400, 210, "贝黄交线", "#FF0000", "20px 宋体");
      } else {
        //在赤道贝塞尔坐标中显示北极
        js = Math.PI / 2 - a.I[1];
        ht_oval2(
          this.ctx,
          this.x0,
          this.y0 - R * cos(js),
          3,
          js > 0 ? "#00a0ff" : "#000000"
        );
        ht_text(this.ctx, 400, 210, "贝赤交线", "#FF0000", "20px 宋体");
      }
      ht_text(this.ctx, 10, 30, "影轴-贝塞尔交线", "#FF0000", "16px 宋体");
      //画线斜线
      ht_line(
        this.ctx,
        this.x0 - R2,
        this.y0 - (k * (-1.2 - xc) + yc) * R,
        this.x0 + R2,
        this.y0 - (k * (1.2 - xc) + yc) * R,
        "#000000"
      );
    }
  },
};

var tu3 = {
  isInit: 0,
  eR: 250,
  x0: 350,
  y0: 260,
  init: ht_init, //初始化函数
  lineArr: function (d, color) {
    //画曲线
    var c, x, y;
    d = touY.lineArr(d);
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    for (var i = 0; i < d.length; i += 2) {
      if (d[i] == 1e7) i++, (c = 1);
      else c = 0;
      x = this.x0 + this.eR * d[i];
      y = this.y0 - this.eR * d[i + 1];
      if (c) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();
  },
  drawJWQ: function (n, m) {
    //画经纬圈
    var i,
      k,
      a = new Array(),
      N = 96,
      pi = Math.PI; //N经纬圈描点的个数
    for (k = 0; k < m; k++) {
      //画纬圈
      for (i = 0, f = 0; i <= N; i++)
        (a[2 * i] = (i * pi2) / N),
          (a[2 * i + 1] = ((k + 1) * pi) / (m + 1) - pi_2);
      this.lineArr(a, "#E0E0E0");
    }
    for (k = 0; k < n; k++) {
      //画经圈
      for (i = 0, f = 0; i <= N; i++)
        (a[2 * i] = (k * pi2) / n), (a[2 * i + 1] = (i * pi) / N - pi_2);
      this.lineArr(a, "#E0E0E0");
    }
  },

  lineNN: function (p1, n1, p2, n2, color) {
    //连接p1中的n1到p2中的n2
    if (!p1.length || !p2.length) return;
    if (n1 == -1) n1 = p1.length - 2;
    if (n2 == -1) n2 = p2.length - 2;
    this.lineArr([p1[n1], p1[n1 + 1], p2[n2], p2[n2 + 1]], color); //p1与p2两线头部连接
  },
  draw: function (F, J0, W0, eR, jb, tylx) {
    //jb局部放大参数
    var col1 = "#FF6060",
      col2 = "#80F080",
      n;
    touY.setlx(tylx, J0, W0, jb);
    this.eR = eR;
    this.x0 = (this.w * eR) / 250 / 2;
    this.y0 = (this.h * eR) / 250 / 2;
    this.can.width = (this.w * eR) / 250; //重置画布大小,清除画布
    this.can.height = (this.h * eR) / 250;

    this.lineArr(ditu1, "#808080"); //地图shape
    this.lineArr(ditu2, "#D0D0FF"); //地图shape(国界)
    this.drawJWQ(24, 11); //经纬圈

    this.lineArr(F.p1, col1); //初亏复圆线1，二次方程第1根
    this.lineArr(F.p2, col1); //初亏复圆线1，二次方程第2根
    this.lineArr(F.p3, col1); //初亏复圆线2，二次方程第1根
    this.lineArr(F.p4, col1); //初亏复圆线2，二次方程第2根

    n = F.p1.length - 2;
    this.lineNN(F.p1, 0, F.p2, 0, col1); //p1与p2两线头部连接,食界线1
    this.lineNN(F.p1, n, F.p2, n, col1); //p1与p2两线尾部连接,食界线1

    n = F.p3.length - 2;
    this.lineNN(F.p3, 0, F.p4, 0, col1); //p3与p4两线头部连接,食界线1
    this.lineNN(F.p3, n, F.p4, n, col1); //p3与p4两线尾部连接,食界线1

    this.lineArr(F.q1, col1); //日出日没食甚线线1,第1根,食界线1
    this.lineArr(F.q2, col1); //日出日没食甚线线1,第2根,食界线1
    this.lineArr(F.q3, col1); //日出日没食甚线线2,第1根,食界线1
    this.lineArr(F.q4, col1); //日出日没食甚线线2,第2根,食界线1

    this.lineArr(F.L0, col1); //中心线,食界线1
    this.lineArr(F.L1, col1); //半影北界,食界线1
    this.lineArr(F.L2, col1); //半影南界,食界线1
    this.lineArr(F.L3, col1); //本影北界(或伪本影南界),食界线1
    this.lineArr(F.L4, col1); //本影南界(或伪本影北界),食界线1
    this.lineArr(F.L5, col2); //0.5半影北界,食界线2
    this.lineArr(F.L6, col2); //0.5半影南界,食界线2

    //画出地球圆的
    if (
      !(
        tylx == 3 ||
        tylx == 4 ||
        tylx == 5 ||
        tylx == 6 ||
        jb[2] < 1 ||
        jb[3] < 1
      )
    )
      ht_oval1(this.ctx, this.x0, this.y0, this.eR, "#000000");
  },
  draw2: function (F) {
    this.lineArr(F.p3, "#8080F0"); //晨昏圈
    this.lineArr(F.p1, "#000000"); //本影
    this.lineArr(F.p2, "#000000"); //半影
  },
};
