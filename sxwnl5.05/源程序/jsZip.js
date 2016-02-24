/*cscript.exeִ��*/
/***********
 �ļ���������
 ***********/
fso = new ActiveXObject("Scripting.FileSystemObject");
function wfile(fname, s) { //д�ļ�
    var fp = fso.CreateTextFile(fname, true, false);
    fp.Write(s);
    fp.close();
}
function rfile(fname) { //���ļ�
    var fp = fso.OpenTextFile(fname, 1, false);
    var s = fp.ReadAll();
    fp.Close();
    return s;
}
function afile(fname, s) { //׷��д��
    if (!fso.FileExists(fname)) {
        wfile(fname, s);
        return;
    }
    var fp = fso.OpenTextFile(fname, 8, false);
    fp.Write(s);
    fp.close();
}
function fdelete(fname) {
    fso.DeleteFile(fname);
}
function fexists(fname) {
    return fso.FileExists(fname);
}
function dexists(dir) {
    return fso.FolderExists(dir);
}
function getfiles(path, lx) { //ȡָ��·���ڵ��ļ���,lxΪfolderʱȡ��Ŀ¼��
    var f = fso.GetFolder(path), fc;
    if (lx == "folder") fc = new Enumerator(f.SubFolders);
    else fc = new Enumerator(f.files);
    var s = new Array();
    for (; !fc.atEnd(); fc.moveNext())
        s[s.length] = fc.item();
    return s;
}


/***********
 javascriptԴ����ѹ������ֱ��ʹ�ú���ΪjsCompress()
 ***********/
var deleSpaceN = 10000000; //delSpace()��Чִ�д���(���ڵ���ѹ����ĳ���)
function deleSpace(s) {//ȥ��հ׷�
    if (deleSpaceN <= 0) return s;
    deleSpaceN--;
    //ĳЩ�ؼ��ֺ���Ŀո�Ӧ����һ��
    s = s.replace(/function[ \t]+/g, 'function__KG__');
    s = s.replace(/new[ \t]+/g, 'new__KG__');
    s = s.replace(/var[ \t]+/g, 'var__KG__');
    s = s.replace(/else[ \t]+/g, 'else__KG__');
    s = s.replace(/return[ \t]+/g, 'return__KG__');
    s = s.replace(/[ \t]+in[ \t]+/g, '__KG__in__KG__');
    s = s.replace(/[ \t\r\n]/g, '');
    //s=s.replace(/[ \t]/g,'');
    //s=s.replace(/[\r\n]+/g,'\r\n');

    s = s.replace(/__KG__/g, ' ');
    return s;
}
function deleZS(s) { //����ȥ�����ע��
    var p1 = 0, p2, out = '';
    while (1) {
        p2 = s.indexOf('/*', p1);  //ȡ����ĩ��
        if (p2 < 0) p2 = s.length;   //�Ҳ�����λ����β
        out += s.substr(p1, p2 - p1);
        p1 = s.indexOf('*/', p2) + 2; //ȡ�������
        if (p1 < 2) return out;
    }
}
function jsCompress(s) {
    s = s.replace(/http:\/\//g, '_TSurl'); //url
    s = s.replace(/\/\/[^\r\n]*/g, ''); //ȥ����ע��
    s = deleZS(s); //ȥ�����ע��
    s = s.replace(/\\\'/g, '_TSdy'); //���ڵĵ����
    s = s.replace(/\\\"/g, '_TSsy'); //���ڵ�˫���

    var i, c, out = '', p1 = 0, cf = '';
    for (i = 0; i < s.length; i++) {
        c = s.substr(i, 1);

        if (c == '.' && !cf && s.substr(i, 10) == '.replace(/') { //��ų���֮��(������֮��)��replace����ѹ��
            out += deleSpace(s.substr(p1, i - p1));
            p1 = i;

            i = s.indexOf('/g,', p1 + 11);
            if (i == -1) {
                i = p1;
                continue;
            }

            out += s.substr(p1, i + 1 - p1);
            p1 = i + 1;
            continue;
        }

        if (c != "'" && c != '"') continue;
        if (!cf) {
            out += deleSpace(s.substr(p1, i - p1));
            p1 = i;
            cf = c;
            continue;
        }
        if (c == cf) {
            out += s.substr(p1, i + 1 - p1);
            p1 = i + 1;
            cf = '';
        }
    }
    out += deleSpace(s.substr(p1, i - p1));
    out = out.replace(/_TSdy/g, "\\\'");
    out = out.replace(/_TSsy/g, '\\\"');
    out = out.replace(/_TSurl/g, 'http://');
    return out;
}


/***********
 WScript����
 ***********/

function getLine() {
    //WScript.StdIn.Skip(1);
    var a = '';
    while (!WScript.StdIn.AtEndOfLine) a += WScript.StdIn.Read(1); //�����ж���һ��,read()������з�,�����������з�Ͳ���ѭ��
    WScript.StdIn.Read(2);
    return a;
}


/***********
 ����ʼ
 ***********/
var about = '\
============================================\n\
      ��ӭʹ�á�����JSscriptѹ��������      \n\
      ���ܣ������js�ű��ϲ�ѹ����HTML��    \n\
      ��ƣ��?ΰ 2008��12��9��            \n\
============================================\n\
1��jsZip������4����ڲ���:\n\
2���﷨��\n   cscript jsZip.js Ŀ��.htm ����.htm Դ1.js+Դ2.js+..+Դn.js ѹ��������\n\
3������\n   cscript jsZip.js index.htm wnl.htm a1.js+a2.js+a3.js 1000000 \n\
4��ע�⣺�����ļ�·����������"�ű�.js"���Եġ�\n\
5��jsZip�������������е���ͨ��\n\
6������htm �������<!--js1S-->��<!--js1E-->��������ǩ��ѹ�����JS�ű����滻��������ǩ֮������ݡ�\n\
7����ѹ����������JavaScript \n\n\
8��ѹ�����������ڵ��ԡ���ȥ���з�ʱ������Դ���򲻹淶(��������ʱû�м�";")�����ѹ����ĳ��򲻿��á��ֶε��������ڿ����ҳ�ԭ��\n\
9����ν������ָ���Գ����еľ�̬�ִ���Ϊ����ķֽ磬����̬������һ��������Ϊ�ֽ����򲻶Ծ�̬�����κ�ѹ�����?\n\
============================================\n\n\
';

var i, ph, p1, p2, s = '', s2 = '';
ph = WScript.ScriptFullName;
ph = ph.substr(0, ph.lastIndexOf("\\") + 1); //��ǰ·��

WScript.Echo(about);

var args = WScript.Arguments; //�����в���
if (args.length != 4) {
    getLine();
    WScript.Quit();
}

deleSpaceN = args.item(3) - 0; //����ѹ���Ķ�����(һ���ִ���������ķֽ��),������


//�ϲ�jsԴ�ļ�
var fs = args.item(2); //Դjs�ļ�
fs = fs.split('+');

for (i = 0; i < fs.length; i++) {
    if (fs[i] == '') {
        WScript.Echo('Դjs�ļ������Ч');
        getLine();
        WScript.Quit();
    }
    if (!fexists(ph + fs[i])) {
        WScript.Echo(fs[i] + ' �ļ�������!');
        getLine();
        WScript.Quit();
    }
}

WScript.Echo('\r\n���ڶ�ȡ�ļ�...');
for (i = 0, s = ''; i < fs.length; i++) s += rfile(ph + fs[i]);

//ѹ���ļ�
WScript.Echo('����ѹ���ļ�...');
s = jsCompress(s);
s = '<script language="javascript">\r\n' + s + '\r\n</script>\r\n';

//��js����htm��
fs = args.item(1);
if (!fexists(ph + fs)) {
    WScript.Echo(fs + ' ����htm������');
    getLine();
    WScript.Quit();
}
s2 = rfile(ph + fs);
p1 = s2.indexOf('<!--js1S-->');
p2 = s2.indexOf('<!--js1E-->') + 11;
if (p1 >= 0 && p2 >= 0)
    s2 = s2.substr(0, p1) + s + s2.substr(p2, s2.length - p2); ////дĿ���ļ�(�ϲ��ļ�)
else s2 = s + s2;

//���浽Ŀ���ļ���
fs = args.item(0);
if (fexists(ph + fs)) {
    WScript.Echo(fs + ' Ŀ���ļ��Ѵ��ڡ�������(y/n)');
    if (getLine() != 'y') WScript.Quit();
}

s2 = '<!-- saved from url=(0021)http://www.sxwnl.com/ -->\r\n' + s2;
s2 = s2.replace(/readme\.htm/g, 'javascript:showHelp(1);');
s2 = s2.replace(/exphelp1/g, rfile("exphelp1.htm").replace(/\r\n/g, ''));
wfile(ph + fs, s2);

WScript.Echo('Ŀ���ļ���' + ph + fs + ' �ϲ����');
getLine();
