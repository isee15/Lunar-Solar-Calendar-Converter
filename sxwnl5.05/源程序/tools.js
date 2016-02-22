//一些工具函数
function trim(s){ return s.replace(/(^\s*)|(\s*$)/g, "");  }
/****************
天文纪年与普通纪年的转换
****************/
function year2Ayear(c){ //传入普通纪年或天文纪年，传回天文纪年
 var y = String(c).replace(/[^0-9Bb\*-]/g,'');
 var q = y.substr(0,1);
 if( q=='B' || q=='b' || q=='*' ){ //通用纪年法(公元前)
   y = 1-y.substr(1,y.length);
   if(y>0) { alert('通用纪法的公元前纪法从B.C.1年开始。并且没有公元0年'); return -10000; }
 }
 else y -= 0;
 if( y < -4712 )   alert('超过B.C. 4713不准'); 
 if( y > 9999  )   alert('超过9999年的农历计算很不准。');
 return y;
}

function Ayear2year(y){ //传入天文纪年，传回显示用的常规纪年
 y -= 0;
 if( y<=0 ) return 'B'+ (-y+1);
 return ''+y;
}
function timeStr2hour(s){//时间串转为小时
 var a,b,c;
 s=String(s).replace(/[^0-9:\.]/g,'');
 s=s.split(':');
 if(s.length==1) a=s[0].substr(0,2)-0, b=s[0].substr(2,2)-0, c=s[0].substr(4,2)-0;
 else if(s.length==2) a=s[0]-0, b=s[1]-0, c=0;
 else a=s[0]-0, b=s[1]-0, c=s[2]-0;
 return a+b/60+c/3600;
}
/*********************
工具函数：cookie读写函数
*********************/
function getCookie(name) {
  var start,end, s = document.cookie;
  start = s.indexOf(name + '=');  if (start == -1) return '';
  start += name.length + 1;
  end = s.indexOf(';', start);
  if (end == -1) end = s.length;
  return unescape(s.substring(start, end));
}
function setCookie(name,value){
   var Days = 700; //此 cookie 将被保存多天
   var exp  = new Date();
   exp.setTime(exp.getTime() + Days*86400*1000);
   document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

/*********************
给select加option等
*********************/
function addOp(sel,v,t){ //给select对象加入option
  var Op = document.createElement("OPTION");
  Op.value=v;  Op.text=t;
  sel.add(Op);
}

