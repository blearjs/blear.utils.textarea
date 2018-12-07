/**
 * blear.utils.textarea
 * @author ydr.me
 * @create 2018年11月15日17:19:48
 */

'use strict';

var modification = require('blear.core.modification');
var attribute = require('blear.core.attribute');
var layout = require('blear.core.layout');
var access = require('blear.utils.access');

// @link https://github.com/Codecademy/textarea-helper/blob/master/textarea-helper.js
var mirrorStyleKeys = [
    // Box Styles.
    'box-sizing', 'height', 'width', 'padding-bottom',
    'padding-left', 'padding-right', 'padding-top',

    // Font stuff.
    'font-family', 'font-size', 'font-style',
    'font-variant', 'font-weight',

    // Spacing etc.
    'word-spacing', 'letter-spacing', 'line-height',
    'text-decoration', 'text-indent', 'text-transform', 'white-space',

    // The direction.
    'direction'
];
var spanStyles = {
    position: 'absolute',
    width: 1,
    height: 1,
    fontSize: 0,
    linHeight: 0,
    padding: 0,
    margin: 0
};
var mirrorEle = modification.create('div', {
    tabindex: -1,
    style: {
        position: 'absolute',
        top: '-9999em',
        left: '-9999em'
    }
});
modification.insert(mirrorEle);


/**
 * 获取当前文本输入框选区
 * @link https://github.com/kof/field-selection/blob/master/lib/field-selection.js#L45
 * @param el {Object} 元素
 * @returns {[number, number]}
 */
var getSelection = exports.getSelection = function (el) {
    return [
        el.selectionStart,
        el.selectionEnd
    ];
};

/**
 * 设置选区
 * @param el {Object} 输入元素
 * @param sel {Array} 选区
 */
var setSelection = exports.setSelection = function (el, sel) {
    var start = sel[0];
    var end = sel.length === 1 ? start : sel[1];

    el.focus();
    el.setSelectionRange(start, end);
};

/**
 * 插入文本
 * @param el {HTMLTextAreaElement} 元素
 * @param text {string} 文本
 * @param [mode=2] {Number} 插入模式，0=定位到文本开始，1=选中文本，2=定位到文本结尾
 */
exports.insert = function (el, text, mode) {
    var args = access.args(arguments);
    text = String(text);
    var sel = getSelection(el);
    var start = sel[0];
    var end = sel[1];
    var value = el.value;
    var textLength = text.length;

    if (args.length !== 3) {
        mode = 2;
    }

    var left = value.slice(0, start);
    var right = value.slice(end);
    var focusStart = [
        // 开始
        start,
        // 选中
        start,
        // 结束
        start + textLength
    ][mode];
    var focusEnd = [
        // 开始
        start,
        // 选中
        start + textLength,
        // 结束
        start + textLength
    ][mode];

    el.value = left + text + right;
    setSelection(el, [focusStart, focusEnd]);
};

/**
 * 包裹文本
 * @param el {HTMLTextAreaElement} 元素
 * @param before {string} 前文本
 * @param after {string} 后文本
 * @param [mode=0] {Number} 模式，0=切换模式，1=重复模式
 */
exports.wrap = function (el, before, after, mode) {
    var args = access.args(arguments);
    var val = el.value;
    var sel = getSelection(el);
    var start = sel[0];
    var end = sel[1];
    var begin = val.slice(0, start);
    var finish = val.slice(end);
    var beforeLength = before.length;
    var afterLength = after.length;
    var focusBefore = val.slice(start - beforeLength, start);
    var focusCenter = val.slice(start, end);
    var focusAfter = val.slice(end, end + afterLength);

    if (args.length !== 4) {
        mode = 0;
    }

    // unwrap
    if (mode === 0 && focusBefore === before && focusAfter === after) {
        el.value = begin.slice(0, -beforeLength) + focusCenter + finish.slice(afterLength);
        setSelection(el, [
            start - beforeLength,
            end - beforeLength
        ]);
    }
    // wrap
    else {
        el.value = begin + before + focusCenter + after + finish;
        setSelection(el, [
            start + beforeLength,
            end + beforeLength
        ]);
    }
};

/**
 * 获取选区相对于客户端的坐标
 * @param el
 * @returns {[{left: number, top: number},  {left: number, top: number}]}
 */
exports.getSelectionRect = function (el) {
    var sel = exports.getSelection(el);
    var value = el.value || '';

    // 复制样式
    var nodeStyle = attribute.style(el, mirrorStyleKeys);
    attribute.style(mirrorEle, nodeStyle);
    var nodeLeft = layout.clientLeft(el);
    var nodeTop = layout.clientTop(el);
    var start = getSelectionRect(value, sel[0]);
    var end = getSelectionRect(value, sel[1]);
    var scrollTop = layout.scrollTop(el);
    var scrollLeft = layout.scrollLeft(el);

    return [
        {
            left: nodeLeft + start.left - scrollLeft,
            top: nodeTop + start.top - scrollTop
        },
        {
            left: nodeLeft + end.left - scrollLeft,
            top: nodeTop + end.top - scrollTop
        }
    ];
};

// ======================================================
// ======================================================
// ======================================================

/**
 * 获取选区
 * @param value
 * @param length
 * @returns {{left: number, top: number}}
 */
function getSelectionRect(value, length) {
    mirrorEle.innerText = value.slice(0, length);
    var spanEle = modification.create('span', {
        style: spanStyles
    });
    modification.insert(spanEle, mirrorEle, 'beforeend');
    var spanEleLeft = layout.clientLeft(spanEle);
    var spanEleTop = layout.clientTop(spanEle);
    var mirrorEleLeft = layout.clientLeft(mirrorEle);
    var mirrorEleTop = layout.clientTop(mirrorEle);
    var relativeLeft = spanEleLeft - mirrorEleLeft;
    var relativeTop = spanEleTop - mirrorEleTop;

    return {
        left: relativeLeft,
        top: relativeTop
    };
}

