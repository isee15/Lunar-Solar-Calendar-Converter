//�˽ű�Ϊ����ҳ���ר�ú���

//================����1===================
function GJ1_calc1() {
    var jd = GJ1_jd.value - 0;
    if (jd < 0) GJ1_out.innerHTML = '����Ϊ��';
    else     GJ1_out.innerHTML = JD.JD2str(jd);
}
function GJ1_calc2(fs) {
    var jd = JD.JD(year2Ayear(GJ1_y.value), GJ1_m.value - 0, (GJ1_d.value - 0) + timeStr2hour(GJ1_t.value) / 24);
    if (fs == 1) {
        jd -= GJ1_jd.value - 0;
        if (jd >= 0) jd += '(' + JD.JD2str(jd) + ')';
    } //���ڼ���һ��ƫ����
    if (fs == 2) jd -= JD.JD(year2Ayear(GJ1_y.value), 1, 1.5) - 1; //���ڻ���
    if (fs == 3) jd -= JD.JD(year2Ayear(GJ1_y2.value), GJ1_m2.value - 0, (GJ1_d2.value - 0) + timeStr2hour(GJ1_t2.value) / 24); //�����������
    GJ1_out.innerHTML = jd;
}

//================����2===================
//���ո�Բ��
function GJ2_pi1(fs) {
    var st = '���ҵ��T=2-��(4-T)', ct = '���ҵ��T=2+��T';
    var i, a, T, p, s = '���ո�Բ,';
    if (fs == 0) a = 6, T = 1, s += '6�� T=1 p=3�� ' + ct;
    if (fs == 1) a = 4, T = 0, s += '4�� T=0 p=2��2' + ct;

    if (fs == 2) a = 6, T = 1, s += '6�� T=1 p=3�� ' + st;
    if (fs == 3) a = 4, T = 2, s += '4�� T=2 p=2��2' + st;

    if (fs == 4) a = 6, T = 1, s += '6�� T=1 ������p=(1+T/24)*3�� ' + st;
    if (fs == 5) a = 4, T = 2, s += '6�� T=1 ������p=(1+T/24)*2��2' + st;

    s += '<table><tr><td>��Բ����</td><td>����</td><td>T</td><td>PI</td></tr>';
    for (i = 0; i < 30; i++) {
        a *= 2;
        if (fs == 0 || fs == 1) T = 2 + sqrt(T), p = a * sqrt(2 - sqrt(T)) / 2;
        if (fs == 2 || fs == 3) T /= 2 + sqrt(4 - T), p = a * sqrt(T) / 2;
        if (fs == 4 || fs == 5) T /= 2 + sqrt(4 - T), p = a * sqrt(T) * (1 + T / 24) / 2;
        s += '<tr><td>' + (i + 1) + '</td><td>' + a + '</td><td>' + T + '</td><td>' + p + '</td></tr>';
    }
    s += '</table>';
    GJ2_out.innerHTML = s;
}

//ģ������֮����PI

function GJ2_jie(x, B) { //�ضϴ���,������B��ͬ����Ч����(ģ���˹������õ�)
    var m = Math.pow(10, floor(Math.log(x / B) / 2.3));
    if (m < 1) m = 1;
    return floor(x / m + 0.5) * m;
}
function GJ2_pi2() {
    var i, R = GJ2_r.value - 0, a = 6, T = 1 * R * R;
    var s = '����6�߿�ʼ T=R*R�����ҵ��T=2-��(4-T),�ҳ������ݼ��㱣��3λ��Ч�־����㹻�ã�����PI=a*��(T/4)�����ȫ���ȡ�<br>'
        + '��������֪֮���±��еĲ��ݦ�S=aR(H/4R)<sup>3</sup>����ôʵ��ÿ��ֻ�����T��������PI�Ϳɵõ����ݡ�������֪֮����ȷ�Ĳ�����4��S/3����ô��ֻ���Բ5��(192��)�͵õ�3.1415926��<br>'
        + '<table><tr align=center><td>��Բ����<br>i</td><td>����<br>a</td><td>������<br>T</td><td>�ҳ�<br>H=sqrt(T)</td><td>����<br>��S</td><td>������<br>��J</td><td>Բ����<br>PI(��)</td></tr>';
    for (i = 0; i < 25; i++) {
        a *= 2;
        T /= 2 + sqrt(4 * R * R - T) / R, T = GJ2_jie(T, R); //����T���ض�
        if (T < R) break; //TӦ���ֱ�R������Ч����

        var H = GJ2_jie(sqrt(T), 100); //�����ҳ�(ֻ������λ��Ч��)
        var dS = GJ2_jie(H * H * H / 64 * a / R / R, 100); //����
        var dJ = GJ2_jie(dS * 4 / 3, 100);

        p = a * sqrt(T) / 2, p = floor(p + 0.5);
        s += '<tr align=right><td>' + (i + 1) + '</td><td>' + a + '</td><td>' + T + '</td><td>' + H + '</td><td>' + dS + '</td><td>' + dJ + '</td><td>' + p + '</td></tr>';
    }
    s += '</table>';
    GJ2_out.innerHTML = s;
}


//���PI����javascript����,2006.12 �?ΰ ����ʮ��

function GJ2_pi() {//,������������5λ�����д�
    var N = GJ2_N.value - 0 + 1, a = new Array(); //NΪ�����λ��
    var i = Math.round(3.4 * N), b = 2 * i + 1, j, f;
    for (j = 0; j < N; j++) a[j] = 0;    //PI��������ʼ��
    for (; i > 0; i--, b -= 2, a[0] += 2) //ÿ����3.4�εõ�1λʮ���ƾ���
        for (j = 0, f = 0; j < N; j++) {      //�ྫ��a�뵥����b����㷨(Сѧ��),����i,��ĸ2*i+1
            f = a[j] * i + f * 10;
            a[j] = Math.floor(f / b);
            f %= b;
        }
    for (i = N - 1; i > 0; i--) a[i - 1] += Math.floor(a[i] / 10), a[i] %= 10; //��λ����
    a[0] = '<br>';
    for (i = 1; i < N; i++) {
        if (i % 10 == 0) a[i] += ' ';
        if (i % 100 == 0) a[i] += '<br>';
    } //���д���
    GJ2_out.innerHTML =
        '���㷨Ϊ�����㷨������λ���˹�󣬷������ʱ��̫����<br>'
        + '���¼���Բ����,���㹫ʽ��PI/2=1+1/3+1*2/(1*3*5)+1*2*3/(1*3*5*7)+...<br>'
        + 'ͨ����ȡ�����ӵ�����ʽ��ʽ��PI=2+1/3(2+2/5(2+3/7(2+...,����ֻ�������a=2+a*n/(2n+1),n=N,��3,,2,1���ɵõ�a=PI<br>'
        + '���5λ�����д�:<font color=red>PI=3.' + a.join('') + '</font>';
}


//PI����javascript����,Machin+���ڽ����Ż�,2006.12 �?ΰ ����ʮ��

GJ2_machin = {
    add: function (a, b, n) { //�ྫ��a�Զྫ��b������㷨(Сѧ�ӷ�)
        for (var i = n - 1, f = 0; i >= 0; i--) {
            a[i] += b[i] + f;
            if (a[i] >= 10000000000) a[i] -= 10000000000, f = 1; else f = 0;
        }
    },
    sub0: function (a, b, r, n) { //�ྫ��a�Զྫ��b������㷨(Сѧ����)
        for (var i = n - 1, f = 0; i >= 0; i--) {
            r[i] = a[i] - b[i] - f;
            if (r[i] < 0) r[i] += 10000000000, f = 1; else f = 0;
        }
    },
    div: function (a, b, n) { //�ྫ��a�뵥����b����㷨(Сѧ��)
        for (var i = 0, f = 0, c; i < n; i++) {
            c = a[i] + f * 10000000000;
            a[i] = Math.floor((c + 0.1) / b);
            f = c % b;
        }
    },
    dao: function (a, f, b, n) { //����(f/b)
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
    }, //��������0������λ�ó�ֵv
    //���¼���Բ����,���㹫ʽ��Machin PI=16arctg(1/5)-4arctg(1/239)
    a: new Array(), b: new Array(), c: new Array(), //�����������,a��PI,b��arctg,c����ʱ����
    arctg: function (k, v, zf, N) {//��v*arctg(k),zf��ʾ����ۼӵ�aʱ�����
        var i = Math.round(N * 23.1 / Math.log(k * k)), n = i, n2;
        var a = this.a, b = this.b, c = this.c;
        for (; i >= 0; i--) {
            n2 = Math.round((n - i) * N / n) + 1; //ĩ�����λ�����
            if (n2 > N) n2 = N;
            this.dao(c, v, 2 * i + 1, n2);
            this.div(b, k * k, n2);
            this.sub0(c, b, b, n2);
        }
        this.div(b, k, N);
        if (zf > 0) this.add(a, b, N);
        else     this.sub0(a, b, a, N);
    },
    pi: function () { //������������5λ�����д�
        var N = GJ2_N.value - 0;
        N = floor(N / 10 + 1.5); //NΪ�����λ��
        var a = this.a, b = this.b;
        this.set(a, 0, N);
        this.set(b, 0, N); //PI������鼰arctg����,��ֵ��0
        this.arctg(5, 16, 1, N);
        this.arctg(239, 4, -1, N);
        a[0] = '<br>';
        for (var i = 1; i < N; i++) {
            a[i] = String(10000000000 + a[i]).substr(1, 10); //����10λ
            if (i % 10 == 0) a[i] += '<br>'; else a[i] += ' ';
        }
        GJ2_out.innerHTML = '����Machin��ʽ���������ڽ����Ż����ٶȽϿ졣<br>'
            + '���㹫ʽ��Machin PI=16arctg(1/5)-4arctg(1/239)<br>'
            + '���5λ�����д�:<font color=red>PI=3.' + a.join('') + '</font>';
    }
};


//���PI��ʾ
function GJ2_cls() {
    GJ2_out.innerHTML = '';
}


