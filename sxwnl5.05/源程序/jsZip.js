/*cscript.exe执行*/
/***********
文件操作函数
***********/
fso=new ActiveXObject("Scripting.FileSystemObject");
function wfile(fname,s){ //写文件
  var fp=fso.CreateTextFile(fname,true,false);
  fp.Write(s);
  fp.close();
}
function rfile(fname){ //读文件
  var fp=fso.OpenTextFile(fname,1,false);
  var s=fp.ReadAll();
  fp.Close();
  return s;
}
function afile(fname,s){ //追加写入
  if(!fso.FileExists(fname)) { wfile(fname,s); return; }
  var fp=fso.OpenTextFile(fname,8,false);
  fp.Write(s);
  fp.close();
}
function fdelete(fname){ fso.DeleteFile(fname); }
function fexists(fname){ return fso.FileExists(fname); }
function dexists(dir)  { return fso.FolderExists(dir); }
function getfiles(path,lx){ //取指定路径内的文件表,lx为folder时取子目录表
  var f=fso.GetFolder(path),fc;
  if(lx=="folder") fc=new Enumerator(f.SubFolders);
  else fc=new Enumerator(f.files);
  var s=new Array();
  for(; !fc.atEnd(); fc.moveNext())
    s[s.length]=fc.item();
  return s;
}


/***********
javascript源程序压缩，可直接使用函数为jsCompress()
***********/
var deleSpaceN=10000000; //delSpace()有效执行次数(用于调试压缩后的程序)
function deleSpace(s){//去除空白符
 if(deleSpaceN<=0) return s;
 deleSpaceN--;
 //某些关键字后面的空格应保留一个
 s=s.replace(/function[ \t]+/g,'function__KG__');
 s=s.replace(/new[ \t]+/g,     'new__KG__'     );
 s=s.replace(/var[ \t]+/g,     'var__KG__'     );
 s=s.replace(/else[ \t]+/g,    'else__KG__'    );
 s=s.replace(/return[ \t]+/g,  'return__KG__'  );
 s=s.replace(/[ \t]+in[ \t]+/g,  '__KG__in__KG__'  );
 s=s.replace(/[ \t\r\n]/g,'');
 //s=s.replace(/[ \t]/g,'');
 //s=s.replace(/[\r\n]+/g,'\r\n');

 s=s.replace(/__KG__/g,' ');
 return s;
}
function deleZS(s){ //快速去除段落注释
 var p1=0,p2,out='';
 while(1){
   p2=s.indexOf('/*',p1);  //取串的末点
   if(p2<0) p2=s.length;   //找不到则定位到串尾
   out+=s.substr(p1,p2-p1);
   p1=s.indexOf('*/',p2)+2; //取串的起点
   if(p1<2) return out;
 }
}
function jsCompress(s){
 s=s.replace(/http:\/\//g,'_TSurl'); //url
 s=s.replace(/\/\/[^\r\n]*/g,''); //去除行注释
 s=deleZS(s); //去除段落注释
 s=s.replace(/\\\'/g,'_TSdy'); //串内的单引号
 s=s.replace(/\\\"/g,'_TSsy'); //串内的双引号

 var i,c, out='', p1=0, cf='';
 for(i=0;i<s.length;i++){
  c=s.substr(i,1);

  if(c=='.' && !cf && s.substr(i,10)=='.replace(/'){ //引号常量之外(即代码之中)的replace函数不压缩
   out += deleSpace(s.substr(p1,i-p1));
   p1 = i;

   i = s.indexOf('/g,',p1+11);
   if(i == -1) { i = p1; continue; }

   out += s.substr(p1,i+1-p1);
   p1 = i+1;
   continue;
  }

  if( c!="'" && c!='"' ) continue;
  if(!cf){
   out += deleSpace(s.substr(p1,i-p1));
   p1=i;
   cf=c;
   continue;
  }
  if(c==cf){
   out+=s.substr(p1,i+1-p1);
   p1=i+1;
   cf='';
  }
 }
 out += deleSpace(s.substr(p1,i-p1));
 out=out.replace(/_TSdy/g,"\\\'");
 out=out.replace(/_TSsy/g,'\\\"');
 out=out.replace(/_TSurl/g,'http://');
 return out;
}


/***********
WScript操作
***********/

function getLine(){
 //WScript.StdIn.Skip(1);
 var a='';
 while(!WScript.StdIn.AtEndOfLine) a+=WScript.StdIn.Read(1); //缓存中读入一行,read()会读换行符,所以遇至换行符就不再循环
 WScript.StdIn.Read(2);
 return a;
}


/***********
程序开始
***********/
var about='\
============================================\n\
      欢迎使用《寿星JSscript压缩器》。      \n\
      功能：将多个js脚本合并压缩到HTML中    \n\
      设计：许剑伟 2008年12月9日            \n\
============================================\n\
1、jsZip程序需4个入口参数:\n\
2、语法：\n   cscript jsZip.js 目标.htm 缩主.htm 源1.js+源2.js+..+源n.js 压缩段落数\n\
3、范例：\n   cscript jsZip.js index.htm wnl.htm a1.js+a2.js+a3.js 1000000 \n\
4、注意：所有文件路径表达是相对"脚本.js"而言的。\n\
5、jsZip在寿星万年历中调试通过。\n\
6、缩主htm 内最好有<!--js1S-->和<!--js1E-->这两个标签，压缩后的JS脚本将替换这两个标签之间的内容。\n\
7、本压缩器适用于JavaScript \n\n\
8、压缩段落数用于调试。在去除换行符时可能因源程序不规范(如语句结束时没有加";")而造成压缩后的程序不可用。分段调试有助于快速找出原因。\n\
9、所谓段落数指：以程序中的静态字串作为段落的分界，即静态串看作一个整体作为分界符。程序不对静态串作任何压缩处理。\n\
============================================\n\n\
';

var i,ph,p1,p2,s='',s2='';
ph=WScript.ScriptFullName;
ph=ph.substr(0,ph.lastIndexOf("\\")+1); //当前路径

WScript.Echo(about);

var args=WScript.Arguments; //命令行参数
if(args.length!=4){
  getLine();
  WScript.Quit();
}

deleSpaceN = args.item(3)-0; //设置压缩的段落数(一个字串看作段落的分界符),调试用


//合并js源文件
var fs = args.item(2); //源js文件
fs=fs.split('+');

for(i=0; i<fs.length; i++){
 if(fs[i]=='')          { WScript.Echo('源js文件名称无效');   getLine(); WScript.Quit(); }
 if(!fexists(ph+fs[i])) { WScript.Echo(fs[i]+' 文件不存在!'); getLine(); WScript.Quit(); }
}

WScript.Echo('\r\n正在读取文件...');
for(i=0,s=''; i<fs.length; i++) s += rfile(ph+fs[i]);

//压缩文件
WScript.Echo('正在压缩文件...');
s=jsCompress(s);
s='<script language="javascript">\r\n' + s + '\r\n</script>\r\n';

//将js插入htm中
fs=args.item(1);
if( !fexists(ph+fs) ){ WScript.Echo(fs+' 缩主htm不存在'); getLine(); WScript.Quit(); }
s2 = rfile(ph+fs);
p1=s2.indexOf('<!--js1S-->');
p2=s2.indexOf('<!--js1E-->')+11;
if(p1>=0&&p2>=0)
 s2 = s2.substr(0,p1) + s + s2.substr(p2,s2.length-p2); ////写目标文件(合并文件)
else s2=s+s2;

//保存到目标文件中
fs=args.item(0);
if( fexists(ph+fs) ){
 WScript.Echo(fs+' 目标文件已存在。覆盖吗？(y/n)');
 if(getLine()!='y') WScript.Quit();
}

s2='<!-- saved from url=(0021)http://www.sxwnl.com/ -->\r\n'+s2;
s2=s2.replace(/readme\.htm/g,'javascript:showHelp(1);');
s2=s2.replace(/exphelp1/g, rfile("exphelp1.htm").replace(/\r\n/g,'') );
wfile(ph+fs,s2);

WScript.Echo('目标文件：'+ph+fs+' 合并完成');
getLine();
