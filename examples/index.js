/**
 * 文件描述
 * @author ydr.me
 * @create 2016-06-27 17:34
 */


'use strict';

var textarea = require('../src/index');
var modification = require('blear.core.modification');
var attribute = require('blear.core.attribute');

var textareaEl = document.getElementById('textarea');
var span1Ele = modification.create('span', {
    style: {
        position: 'absolute',
        width: 4,
        height: 20,
        background: '#f00'
    }
});
var span2Ele = modification.create('span', {
    style: {
        position: 'absolute',
        width: 4,
        height: 20,
        background: '#2433ff'
    }
});
modification.insert(span1Ele, document.body);
modification.insert(span2Ele, document.body);


document.getElementById('getSelection').onclick = function () {
    document.getElementById('ret').innerHTML = JSON.stringify(textarea.getSelection(textareaEl));
};

document.getElementById('setSelection').onclick = function () {
    var length = textareaEl.value.length;
    var middle = Math.ceil(length / 2);

    textarea.setSelection(textareaEl, [middle - 1, middle + 1]);
    textarea.focus(textareaEl);
};

document.getElementById('insert1').onclick = function () {
    textarea.insert(textareaEl, '[定位到这段文本之前]', 0);
    textarea.focus(textareaEl);
};

document.getElementById('insert2').onclick = function () {
    textarea.insert(textareaEl, '[选中这段文本]', 1);
    textarea.focus(textareaEl);
};

document.getElementById('insert3').onclick = function () {
    textarea.insert(textareaEl, '[定位到这段文本之后]', 2);
    textarea.focus(textareaEl);
};

document.getElementById('insert4').onclick = function () {
    textarea.insert(textareaEl, '![image]()', [9, 9]);
    textarea.focus(textareaEl);
};

document.getElementById('getSelectionRect').onclick = function () {
    var rect = textarea.getSelectionRect(textareaEl);
    attribute.style(span1Ele, rect[0]);
    attribute.style(span2Ele, rect[1]);
    textarea.focus(textareaEl);
};

document.getElementById('wrap1').onclick = function () {
    textarea.wrap(textareaEl, '《', '》', 0);
    textarea.focus(textareaEl);
};

document.getElementById('wrap2').onclick = function () {
    textarea.wrap(textareaEl, '【', '】', 1);
    textarea.focus(textareaEl);
};


window.textarea = textarea;


