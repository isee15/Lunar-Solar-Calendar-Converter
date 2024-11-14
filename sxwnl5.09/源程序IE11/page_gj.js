//此脚本为工具页面的专用函数

//================工具1===================
function GJ1_calc1() {
  var jd = GJ1_jd.value - 0;
  if (jd < 0) GJ1_out.innerHTML = "不能为负";
  else GJ1_out.innerHTML = JD.JD2str(jd);
}
function GJ1_calc2(fs) {
  var jd = JD.JD(
    year2Ayear(GJ1_y.value),
    GJ1_m.value - 0,
    GJ1_d.value - 0 + timeStr2hour(GJ1_t.value) / 24
  );
  if (fs == 1) {
    jd -= GJ1_jd.value - 0;
    if (jd >= 0) jd += "(" + JD.JD2str(jd) + ")";
  } //日期加上一个偏移量
  if (fs == 2) jd -= JD.JD(year2Ayear(GJ1_y.value), 1, 1.5) - 1; //年内积日
  if (fs == 3)
    jd -= JD.JD(
      year2Ayear(GJ1_y2.value),
      GJ1_m2.value - 0,
      GJ1_d2.value - 0 + timeStr2hour(GJ1_t2.value) / 24
    ); //两个日期相减
  GJ1_out.innerHTML = jd;
}

//================工具2===================
//刘徽割圆术
function GJ2_pi1(fs) {
  var st = "正弦迭代T=2-√(4-T)",
    ct = "余弦迭代T=2+√T";
  var i,
    a,
    T,
    p,
    s = "刘徽割圆,";
  if (fs == 0) (a = 6), (T = 1), (s += "6边 T=1 p=3　 " + ct);
  if (fs == 1) (a = 4), (T = 0), (s += "4边 T=0 p=2√2" + ct);

  if (fs == 2) (a = 6), (T = 1), (s += "6边 T=1 p=3　 " + st);
  if (fs == 3) (a = 4), (T = 2), (s += "4边 T=2 p=2√2" + st);

  if (fs == 4) (a = 6), (T = 1), (s += "6边 T=1 补弧田p=(1+T/24)*3　 " + st);
  if (fs == 5) (a = 4), (T = 2), (s += "6边 T=1 补弧田p=(1+T/24)*2√2" + st);

  s += "<table><tr><td>割圆次数</td><td>边数</td><td>T</td><td>PI</td></tr>";
  for (i = 0; i < 30; i++) {
    a *= 2;
    if (fs == 0 || fs == 1)
      (T = 2 + sqrt(T)), (p = (a * sqrt(2 - sqrt(T))) / 2);
    if (fs == 2 || fs == 3) (T /= 2 + sqrt(4 - T)), (p = (a * sqrt(T)) / 2);
    if (fs == 4 || fs == 5)
      (T /= 2 + sqrt(4 - T)), (p = (a * sqrt(T) * (1 + T / 24)) / 2);
    s +=
      "<tr><td>" +
      (i + 1) +
      "</td><td>" +
      a +
      "</td><td>" +
      T +
      "</td><td>" +
      p +
      "</td></tr>";
  }
  s += "</table>";
  GJ2_out.innerHTML = s;
}

//模拟祖总之计算PI

function GJ2_jie(x, B) {
  //截断处理,保留与B相同的有效数字(模拟人工计算用到)
  var m = Math.pow(10, floor(Math.log(x / B) / 2.3));
  if (m < 1) m = 1;
  return floor(x / m + 0.5) * m;
}
function GJ2_pi2() {
  var i,
    R = GJ2_r.value - 0,
    a = 6,
    T = 1 * R * R;
  var s =
    "　从6边开始 T=R*R，正弦迭代T=2-√(4-T),弦长、差幂计算保留3位有效字就已足够用，计算PI=a*√(T/4)则采用全精度。<br>" +
    "　如果祖冲之算出下表中的差幂ΔS=aR(H/4R)<sup>3</sup>，那么实际每行只需计算T，不必算PI就可得到差幂。如果祖冲之算出更精确的差幂是4ΔS/3，那么他只需割圆5次(192边)就得到3.1415926。<br>" +
    "<table><tr align=center><td>割圆次数<br>i</td><td>边数<br>a</td><td>迭代变量<br>T</td><td>弦长<br>H=sqrt(T)</td><td>差幂<br>ΔS</td><td>精差幂<br>ΔJ</td><td>圆周率<br>PI(毫)</td></tr>";
  for (i = 0; i < 25; i++) {
    a *= 2;
    (T /= 2 + sqrt(4 * R * R - T) / R), (T = GJ2_jie(T, R)); //计算T并截断
    if (T < R) break; //T应保持比R更多的有效数字

    var H = GJ2_jie(sqrt(T), 100); //计算弦长(只计算两位有效字)
    var dS = GJ2_jie((((H * H * H) / 64) * a) / R / R, 100); //差幂
    var dJ = GJ2_jie((dS * 4) / 3, 100);

    (p = (a * sqrt(T)) / 2), (p = floor(p + 0.5));
    s +=
      "<tr align=right><td>" +
      (i + 1) +
      "</td><td>" +
      a +
      "</td><td>" +
      T +
      "</td><td>" +
      H +
      "</td><td>" +
      dS +
      "</td><td>" +
      dJ +
      "</td><td>" +
      p +
      "</td></tr>";
  }
  s += "</table>";
  GJ2_out.innerHTML = s;
}

//最简单PI计算javascript程序,2006.12 许剑伟 莆田十中

function GJ2_pi() {
  //,本程序所得最后5位可能有错
  var N = GJ2_N.value - 0 + 1,
    a = new Array(); //N为计算的位数
  var i = Math.round(3.4 * N),
    b = 2 * i + 1,
    j,
    f;
  for (j = 0; j < N; j++) a[j] = 0; //PI结果数组初始化
  for (
    ;
    i > 0;
    i--, b -= 2, a[0] += 2 //每计算3.4次得到1位十进制精度
  )
    for (j = 0, f = 0; j < N; j++) {
      //多精度a与单精度b相除算法(小学除法),分子i,分母2*i+1
      f = a[j] * i + f * 10;
      a[j] = Math.floor(f / b);
      f %= b;
    }
  for (i = N - 1; i > 0; i--) (a[i - 1] += Math.floor(a[i] / 10)), (a[i] %= 10); //进位处理
  a[0] = "<br>";
  for (i = 1; i < N; i++) {
    if (i % 10 == 0) a[i] += " ";
    if (i % 100 == 0) a[i] += "<br>";
  } //换行处理
  GJ2_out.innerHTML =
    "本算法为低速算法，计算位数不宜过大，否则计算时间太长。<br>" +
    "以下计算圆周率,计算公式：PI/2=1+1/3+1*2/(1*3*5)+1*2*3/(1*3*5*7)+...<br>" +
    "通过提取公因子得连分式形式：PI=2+1/3(2+2/5(2+3/7(2+...,这样只需迭代计算a=2+a*n/(2n+1),n=N,…3,,2,1即可得到a=PI<br>" +
    "最后5位可能有错:<font color=red>PI=3." +
    a.join("") +
    "</font>";
}

//PI计算javascript程序,Machin+百亿进制优化,2006.12 许剑伟 莆田十中

GJ2_machin = {
  add: function (a, b, n) {
    //多精度a对多精度b的相加算法(小学加法)
    for (var i = n - 1, f = 0; i >= 0; i--) {
      a[i] += b[i] + f;
      if (a[i] >= 10000000000) (a[i] -= 10000000000), (f = 1);
      else f = 0;
    }
  },
  sub0: function (a, b, r, n) {
    //多精度a对多精度b的相减算法(小学减法)
    for (var i = n - 1, f = 0; i >= 0; i--) {
      r[i] = a[i] - b[i] - f;
      if (r[i] < 0) (r[i] += 10000000000), (f = 1);
      else f = 0;
    }
  },
  div: function (a, b, n) {
    //多精度a与单精度b相除算法(小学除法)
    for (var i = 0, f = 0, c; i < n; i++) {
      c = a[i] + f * 10000000000;
      a[i] = Math.floor((c + 0.1) / b);
      f = c % b;
    }
  },
  dao: function (a, f, b, n) {
    //倒数(f/b)
    a[0] = Math.floor(f / b);
    f = f % b;
    for (var i = 1, c; i < n; i++) {
      c = f * 10000000000;
      a[i] = Math.floor((c + 0.1) / b);
      f = c % b;
    }
  },
  set: function (a, v, n) {
    for (var i = 0; i < n; i++) a[i] = 0;
    a[0] = v;
    a.length = n;
  }, //给数组置0并给首位置初值v
  //以下计算圆周率,计算公式：Machin PI=16arctg(1/5)-4arctg(1/239)
  a: new Array(),
  b: new Array(),
  c: new Array(), //三个工作数组,a存PI,b存arctg,c是临时数组
  arctg: function (k, v, zf, N) {
    //求v*arctg(k),zf表示结果累加到a时的正负号
    var i = Math.round((N * 23.1) / Math.log(k * k)),
      n = i,
      n2;
    var a = this.a,
      b = this.b,
      c = this.c;
    for (; i >= 0; i--) {
      n2 = Math.round(((n - i) * N) / n) + 1; //末项计算位数控制
      if (n2 > N) n2 = N;
      this.dao(c, v, 2 * i + 1, n2);
      this.div(b, k * k, n2);
      this.sub0(c, b, b, n2);
    }
    this.div(b, k, N);
    if (zf > 0) this.add(a, b, N);
    else this.sub0(a, b, a, N);
  },
  pi: function () {
    //本程序所得最后5位可能有错
    var N = GJ2_N.value - 0;
    N = floor(N / 10 + 1.5); //N为计算的位数
    var a = this.a,
      b = this.b;
    this.set(a, 0, N);
    this.set(b, 0, N); //PI结果数组及arctg数组,初值置0
    this.arctg(5, 16, 1, N);
    this.arctg(239, 4, -1, N);
    a[0] = "<br>";
    for (var i = 1; i < N; i++) {
      a[i] = String(10000000000 + a[i]).substr(1, 10); //补足10位
      if (i % 10 == 0) a[i] += "<br>";
      else a[i] += " ";
    }
    GJ2_out.innerHTML =
      "基于Machin公式，并做百亿进制优化，速度较快。<br>" +
      "计算公式：Machin PI=16arctg(1/5)-4arctg(1/239)<br>" +
      "最后5位可能有错:<font color=red>PI=3." +
      a.join("") +
      "</font>";
  },
};

//清空PI显示
function GJ2_cls() {
  GJ2_out.innerHTML = "";
}
