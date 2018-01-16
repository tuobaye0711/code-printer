(function () {
    const codes = require('./code.js');

    // 速度控制
    let speed = 16;

    let $body = document.getElementsByTagName("body")[0];

    // 简便的创建方法，可以直接附加id
    let createElement = function (tag, id) {
        let el = document.createElement(tag);
        if (id) {
            el.id = id;
        }
        return el;
    };

    // 主要元素
    let _style_elem = createElement("style", "style-elem");
    let _code_pre = createElement("pre", "my-code");
    let _script_area = createElement("div", "script-area");

    // 把主元素添加到body上
    $body.appendChild(_style_elem);
    $body.appendChild(_code_pre);
    $body.appendChild(_script_area);

    // 获取主元素
    let $style_elem = document.getElementById("style-elem");
    let $code_pre = document.getElementById("my-code");
    let $script_area = document.getElementById("script-area");

    // 状态控制
    let openComment = false;
    let openInteger = false;
    let openString = false;
    let prevAsterisk = false;
    let prevSlash = false;

    // 脚本语法高亮处理
    let jsHighlight = function (string, which) {
        let s;

        // 数字结尾时，给数字两端封上<em class="int"></em>的标签
        if (openInteger && !which.match(/[0-9\.]/) && !openString && !openComment) {
            s = string.replace(/([0-9\.]*)$/, "<em class=\"int\">$1</em>" + which);

            // 注释状态开启
        } else if (which === '*' && !openComment && prevSlash) {
            openComment = true;
            s = string + which;

            // 注释状态关闭
        } else if (which === '/' && openComment && prevAsterisk) {
            openComment = false;
            s = string.replace(/(\/[^(\/)]*\*)$/, "<em class=\"comment\">$1/</em>");

            // 给var两端封上<em class="var"></em>的标签
        } else if (which === 'r' && !openComment && string.match(/[\n ]va$/)) {
            s = string.replace(/va$/, "<em class=\"var\">var</em>");

            // 给操作符两端封上<em class="operator"></em>的标签
        } else if (which.match(/[\!\=\-\?]$/) && !openString && !openComment) {
            s = string + "<em class=\"operator\">" + which + "</em>";
            // 把 . 和 ( 中间的字符串两端封上<em class="method"></em>
        } else if (which === "(" && !openString && !openComment) {
            s = string.replace(/(\.)?(?:([^\.\n]*))$/, "$1<em class=\"method\">$2</em>(");

            // 给 " 两端加<em class="string"></em>
        } else if (which === '"' && !openComment) {
            s = openString ? string.replace(/(\"[^"\\]*(?:\\.[^"\\]*)*)$/, "<em class=\"string\">$1\"</em>") : string + which;

            // 给 ~ 两端加<em class="run-command"></em>
        } else if (which === "~" && !openComment) {
            s = string + "<em class=\"run-command\">" + which + "</em>";
        } else {
            s = string + which;
        }

        // 返回经过格式化的字符串
        return s;
    };

    // 样式语法高亮处理
    let cssHighlight = function (string, which) {
        let regular_match, formatted_string, s;

        // 数字结尾时，给数字两端封上<em class="int"></em>的标签
        if (openInteger && !which.match(/[0-9\.\%pxems]/) && !openString && !openComment) {
            formatted_string = string.replace(/([0-9\.\%pxems]*)$/, "<em class=\"int\">$1</em>");
        } else {
            formatted_string = string;
        }

        // 注释状态开启
        if (which === '*' && !openComment && prevSlash) {
            openComment = true;
            s = formatted_string + which;

            // 注释状态关闭
        } else if (which === '/' && openComment && prevAsterisk) {
            openComment = false;
            s = formatted_string.replace(/(\/[^(\/)]*\*)$/, "<em class=\"comment\">$1/</em>");

            // 给CSS属性名两端封上<em class="key"></em>的标签
        } else if (which === ':') {
            s = formatted_string.replace(/([a-zA-Z- ^\n]*)$/, '<em class="key">$1</em>:');

            // 给CSS属性值两端封上<em class="int"></em>的标签
        } else if (which === ';') {
            // 检测16进制码
            regular_match = /((#[0-9a-zA-Z]{6})|#(([0-9a-zA-Z]|\<em class\=\"int\"\>|\<\/em\>){12,14}|([0-9a-zA-Z]|\<em class\=\"int\"\>|\<\/em\>){8,10}))$/;

            // 如果是16进制，两端封上<em class="hex"></em>的标签
            if (formatted_string.match(regular_match)) {
                s = formatted_string.replace(regular_match, '<em class="hex">$1</em>;');
            } else {
                // 如果不是16进制，两端封上<em class="value"></em>的标签
                s = formatted_string.replace(/([^:]*)$/, '<em class="value">$1</em>;');
            }
            // 给选择器两端封上<em class="selector"></em>的标签
        } else if (which === '{') {
            s = formatted_string.replace(/(.*)$/, '<em class="selector">$1</em>{');
        } else {

            s = formatted_string + which;
        }
        // 返回经过格式化的字符串
        return s;
    };

    let isJs = false;

    let unformatted_code = "";

    // 打印单个字符
    let printChar = function (which) {
        let char, formatted_code, prior_block_match, prior_comment_match, script_tag;

        // 通过 ` 来切换 CSS/JS 代码
        if (which === "`") {
            // 重置为空字符串，防止打印出来
            which = "";
            isJs = !isJs;
        }

        if (isJs) {
            // 使用JS

            // 通过 ~ 来执行一个代码块
            if (which === "~" && !openComment) {
                script_tag = createElement("script");
                // two matches based on prior scenario
                prior_comment_match = /(?:\*\/([^\~]*))$/;
                prior_block_match = /([^~]*)$/;
                if (unformatted_code.match(prior_comment_match)) {
                    script_tag.innerHTML = unformatted_code.match(prior_comment_match)[0].replace("*/", "") + "\n\n";
                } else {
                    script_tag.innerHTML = unformatted_code.match(prior_block_match)[0] + "\n\n";
                }
                $script_area.innerHTML = "";
                $script_area.appendChild(script_tag);
            }
            char = which;
            formatted_code = jsHighlight($code_pre.innerHTML, char);
        } else {

            // 使用CSS
            char = which === "~" ? "" : which;
            $style_elem.innerHTML += char;
            formatted_code = cssHighlight($code_pre.innerHTML, char);
        }

        // 设置状态
        prevAsterisk = which === "*";
        prevSlash = (which === "/") && !openComment;
        openInteger = which.match(/[0-9]/) || (openInteger && which.match(/[\.\%pxems]/)) ? true : false;
        if (which === '"') {
            openString = !openString;
        }

        unformatted_code += which;

        // 打印字符
        return $code_pre.innerHTML = formatted_code;
    };

    // 遍历打印全部codes
    let printCodes = function (message, index, interval) {
        if (index < message.length) {
            // 自动滚动到底部
            $code_pre.scrollTop = $code_pre.scrollHeight;
            printChar(message[index++]);
            return setTimeout((function () {
                return printCodes(message, index, interval);
            }), speed);
        }
    };

    // 脚本初始化
    printCodes(codes, 0, speed);

}).call(this);