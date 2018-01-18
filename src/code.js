let codes = `
/* 
 * 创意灵感来源于codepen作者Jake Albaugh 
 *
 * 项目名code-printer，已在github上开源
 *   
 * 与同类作品不同的是，本项目在支持CSS特效展示的同时，还支持部分JS操作
 */

* {
    -webkit-transition: all 1s;
}
                   
 /* 首先，我先画一张背景板 */
 
body {
    background-color: #3D5F8F;
    color: #B6E7DC;
    font-size: 14px; line-height: 1.4;
    margin: 0;
    -webkit-font-smoothing: subpixel-antialiased;
}

/* 然后，准备我们的“打印纸” */
 
#my-code {
    overflow: auto;
    position: fixed; width: 70%;
    margin: 0;
    top: 55px; bottom: 20px; left: 15%;
    transition: left 500ms, width 500ms, opacity 500ms;
    background-color: #111111; color: #f9f9f9;
    border: 1px solid rgba(0,0,0,0.2);
    padding: 24px 12px;
    box-sizing: border-box;
    border-radius: 2px;
    box-shadow:
        0px 0px 0px 1px rgba(255,255,255,0.2),
        0px 4px 0px 2px rgba(0,0,0,0.1);
}

/* 
 * 现在还很丑，我们把代码高亮一下就好看了
 *  
 * 就用我平时IDE里用的Monokai主题给我们的代码配色吧
 */

pre em:not(.comment) { font-style: normal; }

.comment       { color: #75715e; }
.selector      { color: #a6da27; }
.selector .key { color: #a6da27; }
.selector .int { color: #a6da27; }
.key           { color: #64d9ef; }
.int           { color: #fd971c; }
.hex           { color: #f92772; }
.hex .int      { color: #f92772; }
.value         { color: #fefefe; }
.var           { color: #66d9e0; }
.operator      { color: #f92772; }
.string        { color: #d2cc70; }
.method        { color: #f9245c; }
.run-command   { color: #ae81ff; }

/* 
 * 是不是很漂亮？             
 *
 * 光打印CSS还是有点无趣，不如来点JS代码？          
 *
 * 走起！               
 */
~\`

/* 我要操作DOM，给这个页面加个标题 */
var title = document.createElement("h1");
title.id = "title";

/* 恩，起个名字 */
title.innerHTML = "<a>这是<em>code-printer</em>的项目地址</a>";

/* 做点小动作 */
title.childNodes[0].href = "https://github.com/tuobaye0711/code-printer";
title.childNodes[0].target = "view_window";

/* 最后把他添加到DOM里面 */
document.body.appendChild(title);
             
/* 
 * 如果我们的JS边打印边执行的话，我们的控制台肯定被报错刷屏了
 * 
 * 因此我们使用一个波浪号来控制代码执行
 * 
 * 听我号令，执行！
 */

 ~                 

/*
 * 怎么样？ 
 * 
 * 标题已经添加到DOM里了，但是有点丑
 * 
 * 再换成CSS代码，修饰一下吧
 */
\`

#title {
  position: fixed; width: 100%; 
  top: 0; left: 0; right: 0;
  font-size: 14px; line-height: 1;
  font-weight: 100; text-align: center;
  padding: 10px; margin: 0;
  z-index: 10;
  background-color: #111111;
  border-top: 1px solid rgba(255,255,255,0.2);
  transition: opacity 500ms;
}

#title a {
    text-decoration: none;
    color: white;
}

#title em { 
  font-style: normal;
  color: #ff2eed;
}

/*
 * 偷偷地告诉你，点击文字可以直接跳转到项目地址哦
 *
 * 希望好心的你能star&fork一下哦
 */

/* 调整一下布局 */

#my-code { left: 20px; width: calc(50% - 30px); }

#iframe {
  position: fixed;
  display: block;
  border: 0;
  background-color: white;
  border-radius: 2px;
  width: calc(50% - 30px); height: calc(100% - 75px);
  transition: left 500ms, width 500ms;
  top: 55px; bottom: 20px; left: 100%; 
  box-shadow: 
    0px 0px 0px 1px rgba(255,255,255,0.2),
    0px 4px 0px 2px rgba(0,0,0,0.1);
}
~\`
/* 接下来展示一个拓拔野的简历，这部分还得用JS来实现 */

/* 首先，创建一个iframe */
var iframe = document.createElement("iframe");

/* 把拓拔野的简历附上 */
iframe.src = "resume/lndex.html";

/* 附上ID */
iframe.id = "iframe"

/* 加到DOM上 */
document.body.appendChild(iframe); ~
\`
/* 出现吧 */
#iframe { left: calc(50% + 10px); }
                                             
/*
 * 这就是我高中时期曾经疯狂迷恋的书籍
 *   
 * 那时曾经每期必定追着奇幻看搜神记的连载
 *                   
 * 现在却一本也找不到了
 *
 * 心中只剩下怀念
 *
 * 和为之注册的个人域名 tuobaye.com
 */
~\`
document.getElementById("iframe").src = "resume/index.html"; ~\`

/*
 * 这是拓拔野
 *                        
 * 一个我做梦都能梦到的男人...
 *         
 * 您可以fork我的项目，把这个地方修改成自己的简历
 *
 * 就是一份炫酷的自我介绍啦    
 *
 * 就先到这儿吧，感谢您的耐心观看
 */
 
`;


module.exports = codes;