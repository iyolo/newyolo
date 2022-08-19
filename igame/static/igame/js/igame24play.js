var WIN_WIDTH = document.body.clientWidth ;
if(document.body.clientHeight < document.documentElement.clientHeight){
    var WIN_HEIGHT = document.documentElement.clientHeight ;
}else var WIN_HEIGHT = document.body.clientHeight ;


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var canvas1 = document.getElementById("canvas1");
var context1 = canvas1.getContext("2d");


var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
var points = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
var str =[randomNub(13),randomNub(13),randomNub(13),randomNub(13)];//随机数组
var design =[randomNub(4),randomNub(4),randomNub(4),randomNub(4)]; //随机花色
var Lists = [];//数字
var symbols = [];//符号
var equations = [];//计算
var balls =[];



var mynumber =0;

var x= 10,
    y= 10,
    r= 2,
    offset = 2,
    offsetCol = -25,
    ballR = 4;
var PAD_LEFT = 100,
    PAD_TOP = 150;
var EQU_TOP = PAD_TOP+2*(y+offset)*12+140,
    EQU_LEFT = 100;
var LIST_TOP = PAD_TOP+(x+offset)*14+30;
var a = count();
window.onload = function() {
    canvas.width = WIN_WIDTH;
    canvas.height = WIN_HEIGHT;
    canvas1.width = WIN_WIDTH;
    canvas1.height = WIN_HEIGHT;
    begin();

    var control1 = document.getElementById("controlbtn1");
    var control2 = document.getElementById("controlbtn2");
    var control3 = document.getElementById("controlbtn3");
    var controlText = document.getElementById("resultText");
    control1.onclick = function(){
        if(equations.length>0){
            try  {
                if(countStr(equations)==24){
                    controlText.innerHTML  = "结果正确 = 24";
                }else{
                    controlText.innerHTML  = "结果不正确："+countStr(equations);
                }
            }
            catch(exception) {
                controlText.innerHTML  = "请检查算式！";
            }
            return false;
        }
    }
    control2.onclick = function(){
        begin();
    }
    control3.onclick = function(){
        if(a.length>0)controlText.innerHTML  = "解法: "+a[Math.floor(Math.random()*a.length)]+"=24";
    }

    //运动
    setInterval(function(){
        updateBalls();
    },50)
}
function begin(){
    init();
    while(a.length==0){
        str =[randomNub(13),randomNub(13),randomNub(13),randomNub(13)];
        a = count();
    }
    context.clearRect(0,0,WIN_WIDTH,WIN_HEIGHT);
    context.font="24px 微软雅黑";
// 创建渐变
    var gradient=context.createLinearGradient(0,0,WIN_WIDTH/2,0);
    gradient.addColorStop("0",'#ebf774');
    gradient.addColorStop("0.5",'#D0a5c1');
    gradient.addColorStop("1.0",'#8ce8d3');
// 用渐变填色
    context.fillStyle=gradient;
    context.fillText("根据给出的数字,用四则运算符进行计算",PAD_LEFT,PAD_TOP-50);
    SymbolList(PAD_LEFT,PAD_TOP);
    strList(str,PAD_LEFT,LIST_TOP);
    context.fillText("您的运算：",PAD_LEFT,LIST_TOP+(x+offset)*14+30);
    
    canvas.addEventListener("mouseup",clickEvent);

    //drawSymbol(context,symbols);
    drawStr(context,symbols,symbol);
    drawStr(context,Lists,digit);
}
//重置
function init(){
     str =[randomNub(13),randomNub(13),randomNub(13),randomNub(13)];//随机数组
     Lists = [];//数字
     symbols = [];//符号
     equations = [];//计算
     a = count();
    $("#resultText").html("");
    $("#resultText").html("结果");
}
//点击事件处理
function clickEvent(event){
    //获取鼠标点击在画布中的位置。
    var vx = event.clientX - canvas.getBoundingClientRect().left;
    var vy = event.clientY - canvas.getBoundingClientRect().top;
    addBall(vx,vy,Math.random()*20+10);
    drawBall(context1);

    if(vy<=PAD_TOP+(y+offset)*12+15){
        for(var i=0;i<symbols.length;i++){
            if(symbols[i].disabled){
                context.beginPath();
                context.rect(symbols[i].left-15,symbols[i].top-15,symbols[i].x,symbols[i].y+16);
                var isHas = equations.length>0 ? equations[equations.length-1].isNum:false;
                isHas =  symbols[i].num==4 ? true:isHas;
                isHas =   equations.length>0 && equations[equations.length-1].num == 5? true:isHas;

                if(context.isPointInPath(vx,vy) && isHas ) {
                    var aSymbol = {
                        left:symbols[i].left,
                        top:symbols[i].top,
                        x:symbols[i].x,
                        y:symbols[i].y,
                        r:symbols[i].r,
                        numcolor:symbols[i].numcolor,
                        num:symbols[i].num,
                        color:symbols[i].color,
                        op:true,//是否显示
                        disabled:true
                    }
                    symbols[i]=aSymbol;
                    var aEquation = {
                        oldleft:symbols[i].left,
                        oldtop:symbols[i].top,
                        inum:i,
                        oldnum:equations.length+1,
                        left:equations.length>0?equations[equations.length-1].left+equations[equations.length-1].x+15 : PAD_LEFT-15,
                        top:EQU_TOP,
                        x:symbols[i].x,
                        y:symbols[i].y,
                        r:symbols[i].r,
                        numcolor:symbols[i].numcolor,
                        num:symbols[i].num,
                        color:symbols[i].color,
                        op:true,
                        isNum:false, //是数字还是运算符
                        isnumber:false
                    }
                    equations.push(aEquation);
                    console.log("增加1："+equations.length);
                    update();
                }
            }
        }
    }
    else if(vy>LIST_TOP-15 && vy<=PAD_TOP+2*(y+offset)*12+60){
        for(var i=0;i<Lists.length;i++){
            if(Lists[i].disabled){
                context.beginPath();
                context.rect(Lists[i].left-15,Lists[i].top-15,Lists[i].x,Lists[i].y+16);
                var isHas = equations.length>0 ? equations[equations.length-1].isNum:false;
                if(context.isPointInPath(vx,vy) && !isHas ) {
                    var aList = {
                        left:Lists[i].left,
                        top:Lists[i].top,
                        x:Lists[i].x,
                        y:Lists[i].y,
                        r:Lists[i].r,
                        numcolor:Lists[i].numcolor,
                        num:Lists[i].num,
                        color:Lists[i].color,
                        op:false,//是否显示
                        disabled:false,
                        isnumber:true
                    }
                    Lists[i]=aList;
                    var aEquation = {
                        oldleft:Lists[i].left,
                        oldtop:Lists[i].top,
                        inum : i, //返回的顺序
                        oldnum:equations.length+1,
                        left:equations.length>0?equations[equations.length-1].left+equations[equations.length-1].x+15 :PAD_LEFT-15,
                        top:EQU_TOP,
                        x:Lists[i].x,
                        y:Lists[i].y,
                        r:Lists[i].r,
                        numcolor:Lists[i].numcolor,
                        num:Lists[i].num,
                        color:Lists[i].color,
                        op:true,
                        isNum:true,//是数字还是运算符
                        isnumber:true
                    }
                    equations.push(aEquation);
                    console.log("增加："+equations.length);
                    update();
                }
                //context.restore();
            }
        }
    }
    else if(vy>EQU_TOP){

        for(var i=0;i<equations.length;i++){
            context.beginPath();
            context.rect(equations[i].left-15,equations[i].top-15,equations[i].x,equations[i].y+16);
            if(context.isPointInPath(vx,vy)) {
                if(equations[i].isNum){
                    var n=equations[i].inum;
                    Lists[n].op=true;
                    Lists[n].disabled=true;
                }
                for(var j=i;j<equations.length-1;j++){
                    equations[j+1].left = equations[j].left;
                }
                equations.splice(i,1);
                console.log(equations);
                update();
            }

        }
    }
}
//更新画布
function update(){
    context.clearRect(0, PAD_TOP-16,WIN_WIDTH,LIST_TOP-30);
    drawStr(context,symbols,symbol);
    context.clearRect(0, LIST_TOP-2,WIN_WIDTH,PAD_TOP+(x+offset)*4-30);
    drawStr(context,Lists,digit);
    context.clearRect(0, EQU_TOP-2,WIN_WIDTH,PAD_TOP+(x+offset)*4-16);
    drawEquation(context,equations);
}
//用户算数
function countStr(arr){
    var ss = ["+","-","*","/","(",")"];
    var s="";
    for(var i=0;i<arr.length;i++){
       if(arr[i].isNum){
           s += arr[i].num;
       }
        else{
           s += ss[arr[i].num];
       }
    }
    return  eval(s);
}
//算式处理
function drawEquation(cxt,str){
  for(var i=0;i<equations.length;i++){
          if(equations[i].isNum) {
              drawStr(cxt,str,digit,str[i].num,str[i].oldnum);
          }
          else  {
              drawStr(cxt, str,symbol, str[i].num,str[i].oldnum);
          }
  }
}
//处理符号
function SymbolList(left,top){
    for (var i = 0; i < symbol.length; i++) {
       var color = 'hsl('+Math.round(Math.random()*360)+','+(Math.round(Math.random() * 10000)/100).toFixed(2) + '%,70%)';
        var aSymbol = {
            left:left+ ((x + offset) * 9+Math.abs(offsetCol)) *i-15,
            top:top-15,
            x:(x+offset)*10,
            y:(x+offset)*14,
            r:5,
            numcolor:color,
            num:i,
            color:'rgba(255,255,255,0.1)',
            op:true,
            disabled:true,
            isnumber:false
        }
        symbols.push(aSymbol);
    }
}
//处理四个数字
function strList(arr,left,top){
    var long=0;
    for (var i = 0; i < arr.length; i++) {
        var digNum = arr[i];
        if (digNum <= 9 ) {
            var color = 'hsl('+Math.round(Math.random()*360)+','+(Math.round(Math.random() * 10000)/100).toFixed(2) + '%,70%)';
            var aList = {
                left:left+ ((x + offset) * 9+Math.abs(offsetCol)) *long-15,
                top:top-15,
                x:(x+offset)*10,
                y:(x+offset)*14,
                r:5,
                numcolor:color,
                num:digNum,
                color:'rgba(255,255,255,0.1)',
                op:true,
                disabled:true,
                isnumber:true
            }
            long +=2;
            Lists.push(aList);
        } else {
            var color = 'hsl('+Math.round(Math.random()*360)+','+(Math.round(Math.random() * 10000)/100).toFixed(2) + '%,70%)';
            var aList = {
                left:left+ ((x + offset) * 9+Math.abs(offsetCol)) *long-15,
                top:top-15,
                x:(x+offset)*10,
                y:(x+offset)*14,
                r:5,
                numcolor:color,
                num:digNum,
                color:'rgba(255,255,255,0.1)',
                op:true,
                disabled:true,
                isnumber:true
            }
            long +=2;
            Lists.push(aList);
            
        }
    }
}
//画符号和数字
function drawStr(cxt,arr,form,listNum,oldnum) {
    var isDraw = true;
    for (var i = 0; i < arr.length; i++) {
        var digNum = arr[i].num;
        if(listNum!=null ){
            isDraw=false;
            if(arr[i].num == listNum  && arr[i].oldnum == oldnum){
                isDraw=true;
                console.log("??"+arr[i].oldnum);
            }
        }
        if(isDraw ){
            console.log("!!"+oldnum);
            if (digNum <= 9) {
                cxt.save();
                cxt.translate(arr[i].left + 15, arr[i].top + 15);
                if(arr[i].op)drawNum(cxt, form[digNum], offset, x, y, r, arr[i].isnumber,arr[i].top,arr[i].num,arr[i].numcolor);
                cxt.translate(-15, -15);
                drawRectr(cxt, (x + offset) * 10, (x + offset) * 14, 15, arr[i].color);
                cxt.restore();
            } else {
                cxt.save();
                cxt.translate(arr[i].left + 15, arr[i].top + 15);
                if(arr[i].op)drawNum(cxt, form[1], offset, x, y, r,arr[i].isnumber,arr[i].top,arr[i].num,arr[i].numcolor);
              
                cxt.translate(-15, -15);
                drawRectr(cxt, (x + offset) * 10, (x + offset) * 14, 15, arr[i].color);
               
//              cxt.translate((x + offset) * 10+offsetCol, 0);
//              var secondNum = digNum%10;
//              if(arr[i].op)drawNum(cxt, form[secondNum], offset, x, y, r,arr[i].top,arr[i].numcolor);
//              cxt.translate(-15 - (x + offset) * 10-offsetCol, -15);
//              drawRectr(cxt, arr[i].x, arr[i].y, 5, arr[i].color);
//        
                cxt.restore();
            }
        }
    }
}
//单个数字
function drawNum(cxt,arr,offset,x,y,r,isnumber,top,num,color){


    var width = x+offset*2;
    var height = y+offset*2;
    for(var i=0;i<arr.length;i++){
        for(var j=0; j<arr[i].length;j++){
            if(arr[i][j]==1){
            cxt.save();
            cxt.translate(height*j,width*i);
            drawRectr(cxt,x,y,r,color);
            cxt.restore();
            }
        }
        
     
     if( isnumber & (top >200) ){
     
     context.drawPokerCard(-16,-15,167,suits[randomNub(4)-1],points[num-1]);
     
}
    }

   mynumber +=1;
   console.log(isnumber);
   console.log(mynumber);
   

}
//单个圆角矩形
function drawRectr(cxt,width,height,r,fillcolor,strokecolor,strokewidth,){

    if(r>width/2||r>height/2){
        if(width<=height) r=width/2;
        else  r=height/2;
    }

    cxt.beginPath();
    cxt.arc(r,r,r,Math.PI,3*Math.PI/2,false);
    cxt.lineTo(width-r,0);
    cxt.arc(width-r,r,r,3*Math.PI/2,0,false);
    cxt.lineTo(width,height-r);
    cxt.arc(width-r,height-r,r,0,Math.PI/2,false);
    cxt.lineTo(r,height);
    cxt.arc(r,height-r,r,Math.PI/2,Math.PI,false);

    cxt.closePath();
    cxt.fillStyle=fillcolor || 'pink';
    cxt.strokeStyle=strokecolor || 'white';
    cxt.lineWidth=strokewidth || 1;
    cxt.fill();
    cxt.stroke();

}

//随机数组
function randomNub(i){
   
    var num = Math.ceil(Math.random()*i);
 
   
    return num;
}
//穷举计算。
function count(){
    var countStr = arrayList();
    console.log(countStr.length);
    var result =[];
    for(var i =0; i<countStr.length ; i++){
        var x=countStr[i].a;
        var y=countStr[i].b;
        var z=countStr[i].c;
        var w=countStr[i].d;
        if (x+y+z+w==24){ var aResult = x+"+"+y+"+"+z+"+"+w;result.push(aResult);}
        else if (x+y+z-w==24){ var aResult = x+"+"+y+"+"+z+"-"+w;result.push(aResult);}
        else if ((x+y)*(z+w)==24){ var aResult = "("+x+"+"+y+")*("+z+"+"+w+")";result.push(aResult);}
        else if ((x-y)*(z+w)==24){ var aResult = "("+x+"-"+y+")*("+z+"+"+w+")";result.push(aResult);}
        else if ((x-y)*(z-w)==24){ var aResult = "("+x+"-"+y+")*("+z+"-"+w+")";result.push(aResult);}
        else if ((x+y+z)*w==24){ var aResult = "("+x+"+"+y+"+"+z+")*"+w;result.push(aResult);}
        else if ((x-y-z)*w==24){ var aResult = "("+x+"-"+y+"-"+z+")*"+w;result.push(aResult);}
        else if ((x+y-z)*w==24){ var aResult = "("+x+"+"+y+"-"+z+")*"+w;result.push(aResult);}
        else if ((x*y*z)/w==24){ var aResult = "("+x+"*"+y+"*"+z+")/"+w;result.push(aResult);}
        else if (x*y*(z+w)==24){ var aResult = "("+x+"*"+y+")*("+z+"+"+w+")";result.push(aResult);}
        else if (x*y*(z-w)==24){ var aResult = "("+x+"*"+y+")*("+z+"-"+w+")";result.push(aResult);}
        else if (x*y*z-w==24){ var aResult = "("+x+"*"+y+")*("+z+")-"+w;result.push(aResult);}
        else if (x*y*z+w==24){ var aResult = "("+x+"*"+y+")*("+z+")+"+w;result.push(aResult);}
        else if (x*y*z*w==24){ var aResult = x+"*"+y+"*"+z+"*"+w;result.push(aResult);}
        else if ((x+y)+(z/w)==24){ var aResult = "("+x+"+"+y+")+("+z+"/"+w+")";result.push(aResult);}
        else if ((x+y)*(z/w)==24){ var aResult = "("+x+"+"+y+")*("+z+"/"+w+")";result.push(aResult);}
        else if (x*y+z+w==24){ var aResult = "("+x+"*"+y+")+"+z+"+"+w;result.push(aResult);}
        else if (x*y+z-w==24){ var aResult = "("+x+"*"+y+")+"+z+"-"+w;result.push(aResult);}
        else if (x*y-(z/w)==24){ var aResult = "("+x+"*"+y+")-("+z+"/"+w+")";result.push(aResult);}
        else if (x*y+(z/w)==24){ var aResult = "("+x+"*"+y+")-("+z+"/"+w+")";result.push(aResult);}
        else if (x*y-z-w==24){ var aResult = "("+x+"*"+y+")-"+z+"-"+w;result.push(aResult);}
        else if (x*y+(z*w)==24){ var aResult = "("+x+"*"+y+")+("+z+"*"+w+")";result.push(aResult);}
        else if (x*y-(z*w)==24){ var aResult = "("+x+"*"+y+")-("+z+"*"+w+")";result.push(aResult);}
        else if (x*y/(z*w)==24){ var aResult = "("+x+"*"+y+")/("+z+"*"+w+")";result.push(aResult);}
        else if (x*y/(z-w)==24){ var aResult = "("+x+"*"+y+")/("+z+"-"+w+")";result.push(aResult);}
        else if (x*y/(z+w)==24){ var aResult = "("+x+"*"+y+")/("+z+"+"+w+")";result.push(aResult);}

    }
    return result;

}
//遍历数组顺序；
function arrayList() {
    var mathStr = [];
    for(var i=0;i<str.length;i++){
        var num1 = str[i];
        var numid1  = i;
        //console.log("i1:"+i);
        for(var i2=0;i2<str.length;i2++){
            if(i2 != numid1){
                //console.log("i2:"+i2);
                var num2 = str[i2];
                var numid2  = i2;
                for(var i3=0;i3<str.length;i3++){
                    if(i3 != numid1 && i3 != numid2){
                        //console.log("i3:"+i3);
                        var num3 = str[i3];
                        var numid3  = i3;
                        for(var i4=0;i4<str.length;i4++){
                            if(i4 != numid1 && i4 != numid2 && i4 != numid3){
                                //console.log("i4:"+i4);
                                var num4 = str[i4];
                                var aMathStr = {
                                    a:num1,
                                    b:num2,
                                    c:num3,
                                    d:num4};
                                if(isInAry(mathStr,aMathStr)){
                                    mathStr.push(aMathStr);
                                }
                            }
                        }
                    }
                }
            }
        }


    }
    return mathStr;
}
//检测重复；
function isInAry(arr,content){
    var w = '';
    for(var i; i<=arr.length;i++){
        if(content==arr[i]){
            w = i;
        }
    }
    return (w=='')? true:false;
}
//以下为鼠标点击的球
function addBall(x,y,num){
    for(var i=0;i<num;i++){
        var aball = {
            op:1,
            left:x +Math.pow(-1,Math.ceil(Math.random()*2))*(1+Math.random()*8)*i,
            top:y +Math.pow(-1,Math.ceil(Math.random()*2))*(1+Math.random()*8)*i,
            vx:Math.pow(-1,Math.ceil(Math.random()*1000))*(4+Math.random()),
            vy:Math.pow(-1,Math.ceil(Math.random()*1000))*(4+Math.random()),
            g:Math.pow(-1,Math.ceil(Math.random()*1000))*(1.5+Math.random()),
            color:'hsla('+Math.round(Math.random()*360)+','+(Math.round(Math.random() * 10000)/100).toFixed(2) + '%,30%,'+Math.random()*0.5+')'
        }
        balls.push(aball);
    }
}
function updateBalls(){
    for(var i=0;i<balls.length;i++){
        balls[i].op -=Math.random()*0.1;
        balls[i].left += balls[i].vx;
        balls[i].top += balls[i].vy;
        balls[i].vx  =balls[i].vx+ Math.pow(-1,Math.ceil(Math.random()*1000))*balls[i].g;
        balls[i].vy = balls[i].g;
        if(balls[i].left<0 || balls[i].left>WIN_WIDTH || balls[i].top<0 || balls[i].top>WIN_HEIGHT || balls[i].op<0.1){
            balls.splice(i,1);
        }
    }
    context1.clearRect(0,0,WIN_WIDTH,WIN_HEIGHT);
    drawBall(context1);
}
function drawBall(cxt) {
    for (var i = 0; i < balls.length; i++) {
        cxt.beginPath();
        cxt.arc(balls[i].left-ballR/2,balls[i].top-ballR/2,ballR,0,2*Math.PI);
        cxt.fillStyle =balls[i].color;
        cxt.fill();
    }
}