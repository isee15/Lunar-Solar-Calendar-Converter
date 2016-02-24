//==============================
//--���������?ΰ����
//--��ƣ�VML��ͼ���߰�
//--���ܣ�ʵ��IE��ͼ
//--������ʮ��
//--2008.11
//==============================
//ҳ�治��Ϊ�գ��񻭲�����ʾ
document.write('<html xmlns:v="urn:schemas-microsoft-com:vml">');//������ƿռ�
document.createStyleSheet().cssText = "v\\:*{behavior:url(#default#VML)}"; //������ʽ��
var ht_b = {
    //Ԫ�صĴ���
    Vel: function (s) {
        return document.createElement('<v:' + s + '/>');
    },     //����һ��vmlԪ��
    INSel: function (el, el2) { //��el���ڲ�Ԫ��el2
        el.insertBefore(el2); //XML�ķ���
        el2.style.zIndex--;
        el2.style.zIndex++; //�໭����el�����,��ǰ����(����)��һ���յ�refresh()�¼�,�����ı���ʾ������ˢ��
    },
    Ael: function (el, name) {//��el����Ԫ��(nameΪģ��)
        var s;
        if (name == "xx" || "arr") s = 'stroke'; //������Ԫ�ػ��ͷ
        if (name == "txt") s = 'textBox  inset="5px,5px,5px,5px" style="font-size:12px"'; //�ı�;position:absolute
        if (name == "sh")  s = 'shadow on="T" type="single" color="#b3b3b3" offset="5px,5px"'; //��Ӱ
        if (name == "ext") s = 'extrusion on="True" color="red" rotationangle="0,0"'; //����ͼ��
        if (name == "fill")s = "fill";
        var el2 = ht_b.Vel(s);
        ht_b.INSel(el, el2, name);
        return el2;
    },
    ABSel: function (s) {
        return this.Vel(s + ' style="position:absolute"');
    }, //����һ����Զ�λ��vmlԪ��
    Vel2: function (s) { //����һ����Զ�λ��vmlԪ��,�������·���
        var el = this.Vel(s + ' style="position:absolute"');
        //��el��ӳ��÷���
        el.zindex = function (index) {
            this.style.zIndex = index;
        }; //�ı���Ŵ���
        el.resize = function (w, h) {
            this.style.width = Math.round(w) + 'px', this.style.height = Math.round(h) + 'px';
        }; //�ı�����С
        el.moveto = function (x, y) {
            this.style.left = Math.round(x) + 'px', this.style.top = Math.round(y) + 'px';
        }; //�ƶ�����x,y
        el.moveto2 = function (x, y) { //���������ƶ���(x,y)��
            var dx = String(this.style.width).replace(/[^0-9]/g, '');
            var dy = String(this.style.height).replace(/[^0-9]/g, '');
            this.moveto(x - dx / 2, y - dy / 2);
        },

            el.movedx = function (dx, dy) { //�ƶ�����,�ƶ�����Ϊdx,dy
                var x = String(this.style.left).replace(/[^0-9]/g, "") - 0;
                var y = String(this.style.top).replace(/[^0-9]/g, "") - 0;
                this.style.left = Math.round(x + dx) + 'px';
                this.style.top = Math.round(y + dy) + 'px';
            };
        el.setopa = function (b) { //�ı����͸����
            if (!this.fillID) this.fillID = ht_b.Ael(el, "fill");
            this.fillID.opacity = b;
        };
        el.setcol = function (c1, c2) { //�ı������ɫ
            if (!this.fillID) this.fillID = ht_b.Ael(el, "fill");
            this.fillID.color = c1;
            this.fillID.color2 = c2;
        };
        el.setqb = function (qb) { //����Ǧ��
            if (!el.qbID) this.qbID = ht_b.Ael(el, "xx");  //����������Ԫ��
            this.fillColor = qb.fillcolor;   //���ɫ
            this.filled = qb.filled;      //�Ƿ����
            this.stroked = qb.stroked;     //�Ƿ�������
            this.strokeColor = qb.strokecolor; //����ɫ
            this.strokeWeight = qb.strokeweight;//�߿��
            this.qbID.dashstyle = qb.strokestyle;
        };
        el.setzbx = function (cd, w, h) { //�������ϵ,����shape��group������
            this.coordsize = cd; //coordsizeָ�����(����ܶ�)
            this.style.width = Math.round(w) + 'px';
            this.style.height = Math.round(h) + 'px';
        };
        el.setzbx2 = function (canvas) { //�������ϵ����,����shape��group������
            var cd = canvas.coordsize;
            this.coordsize = cd;
            cd = String(cd).split(',');
            this.style.width = cd[0] + 'px';
            this.style.height = cd[1] + 'px';
        };
        return el;
    },
    //���ߺ���
    clone: function (ob) { //������
        var obj = new Object();
        for (var ns in ob) { //�����Ӷ���
            if (typeof(ob[ns]) == "object") obj[ns] = ht.clone(ob[ns]);
            else obj[ns] = ob[ns];
        }
        return obj;
    }

};
var ht = {
    canvas: '',
    qb: {
        fillcolor: "#FF0000",
        filled: "true",
        stroked: "true",
        strokecolor: "#00cc00",
        strokeweight: "1px",
        strokestyle: "solid"
    }, //Ĭ��Ǧ��1

    line: function (x1, y1, x2, y2) { //����
        var el = ht_b.Vel2('line');
        el.setqb(this.qb);   //����el��Ǧ��
        el.from = Math.round(x1) + "," + Math.round(y1);
        el.to = Math.round(x2) + "," + Math.round(y2);
        ht_b.INSel(this.canvas, el);
        return el;  //��el���뻭��
    },
    polyLine: function (points, canvas) { //������
        var el = ht_b.Vel2('polyline');
        el.setqb(this.qb);   //����el��Ǧ��
        el.points = points;
        ht_b.INSel(this.canvas, el);
        return el;  //��el���뻭��
    },
    textbox: function (x, y, sx, sy, txt) { //����ı�
        //��������
        var el = ht_b.Vel2('rect');
        el.setqb(this.qb);   //����el��Ǧ��
        //�����ı�
        el.txtID = ht_b.ABSel('textBox inset="0px,0px,0px,0px" style="font-size:12px;font-family:����;text-align:left"');
        el.set = function (x, y, sx, sy, txt) {
            this.moveto(x, y);
            this.resize(sx, sy);
            this.txtID.innerHTML = txt;
        };
        el.set(x, y, sx, sy, txt);
        ht_b.INSel(el, el.txtID);
        //��el���뻭��
        ht_b.INSel(this.canvas, el);
        return el;
    },
    shape: function (path) { //������ͼ��
        var el = ht_b.Vel2('shape');
        el.setqb(this.qb);   //����el��Ǧ��
        el.path = path;
        el.setzbx2(this.canvas); //���б���,������ʾ

        var ph = String(ph).replace(/[ ,]+/g, ",");
        if (ph.substr(0, 1) == ",") ph = ph.substr(1, ph.length - 1); //ȥǰ���ָ���
        el.phs = ph.split(',');
        if (!ph) el.phs.length = 0;

        el.p_cls = function () {
            this.phs.length = 0;
        }; //���·������

        el.p_moveto = function (x, y) {
            var c = this.phs, n = c.length;
            c[n++] = "=m=", c[n++] = Math.round(x), c[n++] = Math.round(y);
        };
        el.p_lineto = function (x, y) {
            var c = this.phs, n = c.length;
            c[n++] = "=l=", c[n++] = Math.round(x), c[n++] = Math.round(y);
        };
        el.p_oval = function (x, y, sx, sy) {
            this.p_arc(x, y, sx, sy, 0, 360);
        }; //Բ
        el.p_arc = function (x, y, sx, sy, jd1, jd2) { //Բ��
            jd1 = Math.round(jd1 * 65536), jd2 = Math.round(jd2 * 65536);
            sx = Math.round(sx / 2), sy = Math.round(sy / 2);
            var c = this.phs, n = c.length;
            c[n++] = "=al=";
            c[n++] = Math.round(x + sx), c[n++] = Math.round(y + sy); //����
            c[n++] = sx, c[n++] = sy; //�뾶
            c[n++] = jd1;
            c[n++] = jd2; //�Ƕ�
        };
        el.p_save = function () { //����·��
            var s = this.phs.toString();
            s = s.replace(/,=|=,/g, " ");
            s = s.replace(/=/g, "") + " e";
            this.path = s;
        };

        ht_b.INSel(this.canvas, el);
        return el;  //��el���뻭��
    },

    quxian: function (points, qz) { //������ת��׼�����߻���������,Ӧ����shape
        var s = String(points).replace(/[, ]+/g, ",");
        s = s.replace(/(^,)*/g, '');
        if (qz == 'q') s = 'm ' + s + ' qb ' + points + 'r 0,0 e'; //���ױ��������,qb�ڵ������Ӧ������ſ���e������,������x����(�����ص�ԭ��)
        if (qz == 'z') s = 'm ' + s + ' l ' + points + ' e'; //����
        if (qz == 'c') s = 'm ' + s + ' c ' + points + ' e'; //������߷�6n������
        return this.shape(s);
    },

    cls: function () {
        this.canvas.innerHTML = '';
    }, //��յ�ǰ��������
    group: function (x, y, canvas) {//��������������:λ��
        var el = ht_b.Vel2('group');
        el.setzbx2(this.canvas);
        ht_b.addMethod(el);       //��el���һЩ���÷���
        ht_b.INSel(this.canvas, el);  //��el���뻭��
        el.moveto(x, y);
        return el;
    },
    rect0: function (x, y, sx, sy, na) {//����(��)����,naΪRoundRectʱ��Բ�Ǿ���
        var el = ht_b.Vel2(na);
        el.setqb(this.qb);   //����el��Ǧ��
        if (sx < 0) x += sx, sx = -sx;
        if (sy < 0) y += sy, sy = -sy; //������
        el.moveto(x, y);
        el.resize(sx, sy);//���þ���λ����С
        ht_b.INSel(this.canvas, el);
        return el;  //��el���뻭��
    },
    rect: function (x, y, sx, sy) {
        return this.rect0(x, y, sx, sy, "rect");
    }, //������
    oval: function (x, y, sx, sy) {
        return this.rect0(x, y, sx, sy, "oval");
    }, //��Բ��
    img: function (x, y, sx, sy, src) {
        return this.rect0(x, y, sx, sy, 'image src="' + src + '"');
    }, //����ͼƬ
    rrect: function (x, y, sx, sy, arc) {
        return this.rect0(x, y, sx, sy, "roundrect arcsize=" + arc);
    },    //��Բ�Ǿ���,arcsizeΪԲ�ǰ뾶
    arc: function (x, y, sx, sy, a, b) {
        return this.rect0(x, y, sx, sy, 'arc startAngle="' + a + '" endAngle="' + b + '"');
    }, //Բ��
    point: function (x, y, s) {
        var el = this.oval(x - s / 2, y - s / 2, s, s);
        el.fillcolor = this.qb.strokecolor;
        return el;
    }//����
};

/*****************
 ����html����ʾ��
 ͼ�����<br>
 <v:group id=can1 coordsize="2000,2000" style="width:300px;height:300px;position:relative"/>
 <script language=javascript>
 ht.canvas=can1;
 pc=ht.rect(1000,1000,100,100); //��һ������
 </script>
 *****************/


//====================��ʳ��ͼ���=====================

var tu1 = {
    isInit: 0, x0: 0, y0: 0, w: 0, h: 0, dx: 0, dy: 0, //������
    diming: new Array(116.4, 40, '����', 119, 25.4, '����', 91, 29.7, '����', -73, 41, 'ŦԼ', 151, -34, 'Ϥ��', 37, 56, 'Ī˹��', 30, -20, '�����ϲ�', -56, -33, '������'), //�����ر�
    init: function (can) { //��ʼ������
        ht.canvas = can;
        if (this.isInit) return;
        this.isInit = 1; //����ָ�򻭲�,׼����ͼ
        //�������
        this.w = String(can.style.width).replace(/[^0-9]/g, '');
        this.h = String(can.style.height).replace(/[^0-9]/g, '');
        can.coordsize = this.w + ',' + this.h;
        var x0, y0, dx, dy, vs, vx, vy, us;
        dx = this.dx = int2((this.w - this.x0) / 8.5);
        dy = this.dy = int2((this.h - this.y0) / 6.5);
        x0 = this.x0 = int2((this.w - this.dx * 8) / 2);
        y0 = this.y0 = this.h - int2((this.h - this.dy * 6) / 2);
        vs = this.vs = this.dx, vx = this.vx = x0 + 4 * dx, vy = this.vy = y0 - 3 * dy, us = this.us = vs / 2; //vs��Ӧ32�Ƿ�(�Ŵ������)

        var ditu = //��Сͼ���С2009*970���Ӧ360��*180��
            'm 2,212 l 58,180,121,180,128,143,150,129,130,129,99,147,92,171,74,170,42,150,122,104,175,102,230,118,223,124,192,125,215,138,405,92,413,99,411,126,445,117,422,100,590,65,639,76,606,88,724,88,741,101,818,93,942,111,1010,111,1064,126,1045,134,1003,130,1003,146,918,159,896,189,881,189,879,170,926,146,922,142,861,159,793,160,767,176,776,181,793,180,793,213,758,253,740,255,720,270,731,299,714,297,713,282,702,273,689,273,688,263,667,274,673,283,689,283,676,296,689,325,678,353,642,373,604,373,596,387,619,422,598,435,569,417,564,440,594,475,586,479,551,441,554,415,531,400,519,371,459,401,453,433,437,441,390,359,335,353,278,328,273,336,299,361,317,354,340,375,259,420,206,339,187,334,240,427,291,431,269,470,220,511,228,566,163,663,108,672,72,575,85,524,41,453,2,454,2,290,65,286,67,308,193,320,208,292,163,291,158,273,203,260,231,267,234,253,208,229,175,229,161,260,129,282,86,232,74,238,99,265,94,275,54,246,2,272,2,212 ' //��ŷ�Ǵ�½
            + 'm 67,54 l 115,46,154,50,155,54,119,58,100,71,67,54 m 300,96 l 321,77,385,68,388,71,315,91,327,101,317,105,300,96 m 522,45 l 547,44,592,58,573,62,550,60,522,45 m 775,75 l 780,82,808,83,818,74,806,72,775,75 ' //ŷ�����漸��
            + 'm 809,180 l 799,188,800,232,811,230,809,180 m 802,238 l 790,256,788,284,748,295,738,310,744,317,754,302,791,301,797,269,816,244,802,238 ' //�ձ�
            + 'm 686,354 l 681,357,677,365,683,371,686,354 m 544,460 l 583,487,602,515,640,527,597,528,544,460 m 662,452 l 619,482,638,507,646,507,672,484,665,469,673,460,662,452 m 680,480 l 671,513,684,514,703,479,680,480 m 747,492 l 750,504,808,532,846,537,820,507,776,494,747,492 ' //̨�弰���ɱ�����
            + 'm 771,548 l 708,560,641,604,659,675,746,653,790,690,842,689,865,666,868,628,802,541,796,576,767,564,771,548 m 973,672 l 981,693,941,736,952,742,1003,693,973,672 m 282,550 l 257,571,254,619,268,619,289,564,282,550 ' //���������鼰����˹��
            + 'm 1092,112 l 1117,120,1119,126,1091,124,1082,130,1118,134,1091,146,1135,163,1105,176,1107,178,1140,169,1172,151,1255,160,1316,204,1322,278,1425,388,1517,419,1550,449,1579,450,1560,516,1587,566,1620,582,1593,744,1614,786,1644,785,1621,773,1643,745,1634,739,1771,605,1815,536,1815,519,1629,429,1557,442,1543,405,1522,404,1526,377,1486,392,1464,371,1477,332,1546,326,1559,351,1559,320,1618,256,1672,238,1639,204,1685,203,1699,192,1657,162,1582,146,1574,200,1502,169,1483,153,1573,108,1607,115,1607,126,1582,134,1644,145,1667,119,1559,96,1558,75,1666,31,1593,27,1334,68,1329,109,1259,112,1142,101,1092,112 ' //����
            + 'm 1680,39 l 1617,62,1634,77,1684,75,1734,110,1721,121,1744,151,1774,156,1788,131,1890,101,1864,88,1897,88,1906,54,1947,36,1927,36,1862,49,1892,37,1831,41,1836,33,1900,28,1833,22,1750,39,1680,39 m 1889,122 l 1884,136,1914,138,1933,130,1889,122 ' //������������
            + 'm 1969,175 l 1959,182,1958,198,1979,192,1980,179,1969,175 m 1987,162 l 1980,172,1995,182,1976,203,2010,201,2010,180,1996,173,2002,166,1987,162 m 2010,208 l 1989,215,2001,222,2001,247,1961,249,1962,287,1999,285,2010,273,2010,208 m 2010,297 l 1980,297,1918,361,1916,415,1943,452,1970,466,2010,456,2010,297 ' //���޶�������
            + 'e';

        var p = ht.shape(ditu), p2;
        p.stroked = false;
        p.fillcolor = '#D0D0D0';
        p.setzbx('2009,970', this.dx * 8, this.dy * 6);
        p.moveto(this.x0, this.h - this.y0);


        p = ht.shape('');
        //�������
        for (i = 0; i <= 6; i++) { //��ˮƽ�����(y�̶�)
            c = y0 - i * dy;
            p.p_moveto(x0, c);
            p.p_lineto(x0 + dx * 8, c);
            if (i) {
                p2 = ht.textbox(x0 + 2, c, 45, 15, '<b>' + 15 * i + '</b>(' + (i > 3 ? '+' : '') + 30 * (i - 3) + ')');
                p2.filled = false;
                p2.stroked = false;
            }
        }
        for (i = 0; i <= 8; i++) { //����ֱ�����(x�̶�)
            c = x0 + i * dx;
            p.p_moveto(c, y0);
            p.p_lineto(c, y0 - dy * 6);
            if (i > 0 && i < 8) {
                p2 = ht.textbox(c - 10, y0, 60, 35, '<b>' + 30 * (i - 4) + '</b><br>(' + (i <= 4 ? 45 * i : 45 * i - 360) + ')');
                p2.filled = false;
                p2.stroked = false;
            }
        }
        p.p_save();
        //����̫������������Ӱ
        this.Sun = ht.oval(0, 0, vs, vs);
        this.Sun.moveto2(vx, vy);
        this.Sun.stroked = false;
        this.Moon = ht.oval(0, 0, vs, vs);
        this.Moon.moveto2(vx, vy);
        this.Moon.stroked = false;
        this.Moon.fillcolor = '#a0a000';
        this.Eys = ht.oval(0, 0, vs, vs);
        this.Eys.moveto2(vx, vy);
        this.Eys.stroked = false;
        this.Eys.fillcolor = '#000000';
        this.Eys.setopa(0.2); //�����Ӱ
        this.eys = ht.oval(0, 0, vs, vs);
        this.eys.moveto2(vx, vy);
        this.eys.stroked = false;
        this.eys.fillcolor = '#000000';
        this.eys.setopa(0.4); //����Ӱ
        this.sun = ht.oval(0, 0, 7, 7);
        this.sun.moveto2(vx, vy);
        this.sun.stroked = false;
        this.moon = ht.oval(0, 0, 7, 7);
        this.moon.moveto2(vx, vy);
        this.moon.stroked = false;
        this.moon.fillcolor = '#B0A070';
        //�����ر�
        for (i = 0; i < this.diming.length; i += 3) {
            var J = this.diming[i];
            if (J < 0) J += 360;
            var W = this.diming[i + 1];
            J = J / 45, W = W / 30 + 3;
            J = this.x0 + this.dx * J - 5;
            W = this.y0 - this.dy * W - 8;
            p = ht.textbox(J, W, 60, 16, '<font color=red>��</font>' + this.diming[i + 2]);
            p.filled = false;
            p.stroked = false;
        }
        this.mark = ht.shape('');
        this.mark.filled = false;
        this.mark.strokecolor = '#FF00FF';//����α��
    },
    move: function (el, J, W, bei) { //��ƽ����ƶ����¡�beiΪ��ʱ,��ʾ���ͼ�е�0��Ϊ��,����Ϊ����
                                     //��γ��תΪ����
        W = W * 180 / Math.PI / 15;
        J = rad2rrad(J);
        if (bei) J = rad2rrad(J - Math.PI);
        J = J * 180 / Math.PI / 30 + 4;
        if (J > 8 || J < 0) {
            el.style.display = 'none';
            return;
        }
        //�ƶ�λ��
        el.style.display = 'block';
        el.moveto2(this.x0 + J * this.dx, this.y0 - W * this.dy);
    },
    ecShow: function (m, s, e, E) {
        if (m) m = 'block'; else m = 'none';
        this.Moon.style.display = m;
        if (s) s = 'block'; else s = 'none';
        this.Sun.style.display = s;
        if (e) e = 'block'; else e = 'none';
        this.eys.style.display = e;
        if (E) E = 'block'; else E = 'none';
        this.Eys.style.display = E;
    },
    move2a: function (J1, W1, J2, W2, mr, sr) { //ȡ����ʳ�÷Ŵ�ͼ,ת���¡�̫����꼰�Ӱ뾶(ǰ��Ϊ��),�뾶��λ�ǽ��롣δ��������������
        var dJ = -rad2rrad(J1 - J2), dW = W1 - W2, v = this.vs;
        //Ĭ������Ϊ���������������������˶�������ȡ�������������˶�(��߱�Ϊ��)
        dJ *= Math.cos((W1 + W2) / 2) * rad, dW *= rad; //תΪƽ��
        dJ = v / 32 * dJ / 60, dW = v / 32 * dW / 60;   //���תΪ����
        sr = v / 32 * 2 * sr / 60, mr = v / 32 * 2 * mr / 60; //�������СתΪ����
        if (Math.abs(dJ) > 3.5 * this.dx || Math.abs(dW) > 2.5 * this.dy) {
            this.ecShow(0, 0, 0, 0);
            return;
        } //����
        //�������µĴ�С��λ��,�Ա㾫׼�۲�����ʳ
        this.ecShow(1, 1, 0, 0);
        this.Sun.resize(sr, sr);
        this.Sun.moveto2(this.vx, this.vy);
        this.Moon.resize(mr, mr);
        this.Moon.moveto2(this.vx + dJ, this.vy - dW);
    },
    move2b: function (J1, W1, J2, W2, mr, er, Er) { //ȡ�õ���ʳ�Ŵ�ͼ,ת���¡���Ӱ��꼰�Ӱ뾶(ǰ��Ϊ��),�뾶��λ�ǽ��롣δ���������������
        var dJ = -rad2rrad(J1 - J2), dW = W1 - W2, v = this.us;
        dJ *= Math.cos((W1 + W2) / 2) * rad, dW *= rad; //תΪƽ��
        dJ = v / 32 * dJ / 60, dW = v / 32 * dW / 60;   //���תΪ����
        er = v / 32 * 2 * er / 60, Er = v / 32 * 2 * Er / 60, mr = v / 32 * 2 * mr / 60; //�������СתΪ����
        if (Math.abs(dJ) > 3.5 * this.dx || Math.abs(dW) > 2.5 * this.dy) {
            this.ecShow(0, 0, 0, 0);
            return;
        } //����
        this.ecShow(1, 0, 1, 1);
        this.eys.resize(er, er);
        this.eys.moveto2(this.vx, this.vy);
        this.Eys.resize(Er, Er);
        this.Eys.moveto2(this.vx, this.vy);
        this.Moon.resize(mr, mr);
        this.Moon.moveto2(this.vx + dJ, this.vy - dW);
    },
    move3: function (J, W, bl) { //������ʳ�����ߣ�J,WΪĳ���ĵ�ĵر꣬bl��ʾ�Ƿ���·��
        if (!bl) {
            this.mark.p_cls();
            this.mark.p_save();
        }
        if (Math.abs(J) > Math.PI * 2 || Math.abs(W) > Math.PI) return;
        J = rad2mrad(J) / Math.PI * 180 / 45;
        W = W / Math.PI * 180 / 30 + 3;
        J = this.x0 + this.dx * J - 3;
        W = this.y0 - this.dy * W;
        this.mark.p_moveto(J, W);
        this.mark.p_lineto(J - 3, W + 8);
        this.mark.p_lineto(J + 3, W + 8);
        this.mark.p_lineto(J, W);
        this.mark.p_save();
    },
    move4: function (el, J, W, gst) { //ʱ��������ƶ�����,����:���¶���,�ྭ,��γ,����ʱ
                                      //��γ��תΪ����
        W = W * 180 / Math.PI / 30 + 3;
        J = rad2mrad(J - gst) * 180 / Math.PI / 45;
        if (J > 8 || J < 0) {
            el.style.display = 'none';
            return;
        }
        //�ƶ�λ��
        el.style.display = 'block';
        el.moveto2(this.x0 + J * this.dx, this.y0 - W * this.dy);
    }

};


var tu2 = {
    isInit: 0, eR: 150, x0: 240, y0: 280,
    init: function (can) {
        ht.canvas = can;
        if (this.isInit) return;
        this.isInit = 1; //����ָ�򻭲�,׼����ͼ
        //�������
        this.w = String(can.style.width).replace(/[^0-9]/g, '');
        this.h = String(can.style.height).replace(/[^0-9]/g, '');
        can.coordsize = this.w + ',' + this.h;

        //����
        this.eth = ht.oval(0, 0, this.eR * 2, this.eR * 2);
        this.eth.filled = false;
        this.eth.moveto2(this.x0, this.y0);

        //���Ƶ�����ĻƼ���
        var p = ht.shape(''), p2;
        p.stroke.endArrow = 'classic';
        p.p_moveto(this.x0 - this.eR * 1.2, this.y0);
        p.p_lineto(this.x0 + this.eR * 1.2, this.y0);
        p.p_moveto(this.x0, this.y0 + this.eR * 1.2);
        p.p_lineto(this.x0, this.y0 - this.eR * 1.2);
        p.p_save();
        p2 = ht.textbox(this.x0 + this.eR * 1.2 - 20, this.y0, 60, 15, '����');
        p2.filled = false;
        p2.stroked = false;
        this.zbTxt = p2;

        this.zxx = ht.shape(''); //������
        this.dbj = ht.oval(0, 0, 6, 6); //���򱱼�
        this.dbj.stroked = false;
        this.dbj.style.display = 'none';
    },
    line1: function (a, hd) {
        if (a.d > 1.6) return;
        //��б��
        var p = this.zxx, R = this.eR;
        var xc = a.xc, yc = a.yc, k = a.k;

        if (hd) { //תΪ�Ƶ����
            var r = sqrt(xc * xc + yc * yc), s = atan2(yc, xc) + a.ds, dk = tan(a.ds);
            xc = r * cos(s);
            yc = r * sin(s);
            k = (k + dk) / (1 - k * dk);
        }

        p.p_moveto(-1.2 * R + this.x0, -(k * (-1.2 - xc) + yc) * R + this.y0);
        p.p_lineto(1.2 * R + this.x0, -(k * ( 1.2 - xc) + yc) * R + this.y0);
        p.p_save();

        //������
        if (!hd) { //�ڳ��������������ʾ����
            this.zbTxt.txtID.innerHTML = innerText = '���ཻ��';
            this.dbj.moveto2(this.x0, -R * cos(Math.PI / 2 - a.I[1]) + this.y0);
            if (a.I[1] < Math.PI / 2) this.dbj.fillcolor = '#00a0FF'; else this.dbj.fillcolor = '#000000'; //�����������£���Ϊ����
            this.dbj.style.display = 'block';
        } else {
            this.zbTxt.txtID.innerHTML = innerText = '���ƽ���';
            this.dbj.style.display = 'none';
        }

    }
};


var tu3 = {
    isInit: 0, eR: 250, x0: 350, y0: 300,
    init: function (can) {
        ht.canvas = can;
        if (this.isInit) return;
        this.isInit = 1; //����ָ�򻭲�,׼����ͼ
        //�������
        this.w = String(can.style.width).replace(/[^0-9]/g, '');
        this.h = String(can.style.height).replace(/[^0-9]/g, '');
        can.coordsize = this.w + ',' + this.h;

        //��ͼshape
        this.p = ht.shape(''), this.p.filled = false, this.p.strokeColor = '#E0E0E0'; //��γ��
        this.P1 = ht.shape(''), this.P1.filled = false, this.P1.strokeColor = '#808080'; //��ͼshape
        this.P2 = ht.shape(''), this.P2.filled = false, this.P2.strokeColor = '#D0D0FF'; //��ͼshape(���)
        this.A = ht.shape(''), this.A.filled = false, this.A.strokeColor = '#FF6060'; //ʳ����1
        this.B = ht.shape(''), this.B.filled = false, this.B.strokeColor = '#80F080'; //ʳ����2
        this.C = ht.shape(''), this.C.filled = false, this.C.strokeColor = '#8080F0'; //����Ȧ
        this.D = ht.shape(''), this.D.filled = false, this.D.strokeColor = '#000000'; //Ӱ�ӽ���
        //����
        this.eth = ht.oval(0, 0, this.eR * 2, this.eR * 2);
        this.eth.filled = false;
        this.eth.moveto2(this.x0, this.y0);
        this.eth.strokeColor = '#000000'

    },

    lineArr: function (d, p) { //������
        d = touY.lineArr(d);
        var c, x, y;
        for (var i = 0; i < d.length; i += 2) {
            if (d[i] == 1e7) i++, c = 1; else c = 0;
            x = this.x0 + this.eR * d[i];
            y = this.y0 - this.eR * d[i + 1];
            if (c) p.p_moveto(x, y);
            else  p.p_lineto(x, y);
        }
    },
    showDitu: function () {//��ʾ��ͼ
        this.P1.p_cls();
        this.P2.p_cls();
        this.lineArr(ditu1, this.P1);
        this.lineArr(ditu2, this.P2);
        this.P1.p_save();
        this.P2.p_save();
    },
    drawJWQ: function (n, m) { //����γȦ
        var i, k, a = new Array(), N = 96, pi = Math.PI; //N��γȦ���ĸ���
        this.p.p_cls();
        for (k = 0; k < m; k++) { //��γȦ
            for (i = 0, f = 0; i <= N; i++) a[2 * i] = i * pi2 / N, a[2 * i + 1] = (k + 1) * pi / (m + 1) - pi_2;
            this.lineArr(a, this.p);
        }
        for (k = 0; k < n; k++) { //����Ȧ
            for (i = 0, f = 0; i <= N; i++) a[2 * i] = k * pi2 / n, a[2 * i + 1] = i * pi / N - pi_2;
            this.lineArr(a, this.p);
        }
        this.p.p_save();
    },

    lineNN: function (p1, n1, p2, n2, A) { //����p1�е�n1��p2�е�n2
        if (!p1.length || !p2.length) return;
        if (n1 == -1) n1 = p1.length - 2;
        if (n2 == -1) n2 = p2.length - 2;
        this.lineArr([p1[n1], p1[n1 + 1], p2[n2], p2[n2 + 1]], A); //p1��p2����ͷ������
    },
    draw: function (F, J0, W0, eR, jb, tylx) { //jb�ֲ��Ŵ����
        this.eR = eR;
        touY.setlx(tylx, J0, W0, jb);

        var n, A = this.A, B = this.B, C = this.C, D = this.D;
        this.showDitu();
        this.drawJWQ(24, 11);
        A.p_cls();
        B.p_cls();
        C.p_cls();
        D.p_cls();

        this.lineArr(F.p1, A); //������Բ��1�����η��̵�1��
        this.lineArr(F.p2, A); //������Բ��1�����η��̵�2��
        this.lineArr(F.p3, A); //������Բ��2�����η��̵�1��
        this.lineArr(F.p4, A); //������Բ��2�����η��̵�2��

        n = F.p1.length - 2;
        this.lineNN(F.p1, 0, F.p2, 0, A); //p1��p2����ͷ������
        this.lineNN(F.p1, n, F.p2, n, A); //p1��p2����β������

        n = F.p3.length - 2;
        this.lineNN(F.p3, 0, F.p4, 0, A); //p3��p4����ͷ������
        this.lineNN(F.p3, n, F.p4, n, A); //p3��p4����β������

        this.lineArr(F.q1, A); //�ճ���ûʳ������1,��1��
        this.lineArr(F.q2, A); //�ճ���ûʳ������1,��2��
        this.lineArr(F.q3, A); //�ճ���ûʳ������2,��1��
        this.lineArr(F.q4, A); //�ճ���ûʳ������2,��2��

        this.lineArr(F.L0, A); //������
        this.lineArr(F.L1, A); //��Ӱ����
        this.lineArr(F.L2, A); //��Ӱ�Ͻ�
        this.lineArr(F.L3, A); //��Ӱ����(��α��Ӱ�Ͻ�)
        this.lineArr(F.L4, A); //��Ӱ�Ͻ�(��α��Ӱ����)
        this.lineArr(F.L5, B); //0.5��Ӱ����
        this.lineArr(F.L6, B); //0.5��Ӱ�Ͻ�

        A.p_save();
        B.p_save();
        C.p_save();
        D.p_save();

        //���õ���Բ�Ĵ�С��λ��(��Ϊ���eR�����û����)
        if (tylx == 3 || tylx == 4 || tylx == 5 || tylx == 6 || jb[2] < 1 || jb[3] < 1) {
            this.eth.style.display = 'none';
            this.eth.resize(0, 0);
        } else {
            this.eth.style.display = 'block';
            this.eth.resize(this.eR * 2, this.eR * 2);
        }
        this.eth.moveto2(this.x0, this.y0);
        this.isDrawed = 1;
    },
    draw2: function (F) {
        if (!this.isDrawed) {
            alert('��ͼδ��,�޷���ʾ.');
            return;
        }
        var C = this.C, D = this.D;
        C.p_cls();
        D.p_cls();
        this.lineArr(F.p3, C); //����Ȧ
        this.lineArr(F.p1, D); //��Ӱ
        this.lineArr(F.p2, D); //��Ӱ
        C.p_save();
        D.p_save();
    }
};
