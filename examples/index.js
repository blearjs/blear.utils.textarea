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
    console.log(textarea.getSelection(textareaEl));
};

document.getElementById('setSelection').onclick = function () {
    var length = textareaEl.value.length;
    var middle = Math.ceil(length / 2);

    textarea.setSelection(textareaEl, middle - 1, middle + 1);
};

document.getElementById('insert1').onclick = function () {
    textarea.insert(textareaEl, '[' + Date.now() + ']', true);
};

document.getElementById('insert2').onclick = function () {
    textarea.insert(textareaEl, '[' + Date.now() + ']', true, false);
};

document.getElementById('insert3').onclick = function () {
    textarea.insert(textareaEl, '[' + Date.now() + ']', true, [2, 4]);
};

document.getElementById('insert4').onclick = function () {
    textarea.insert(textareaEl, '[' + Date.now() + ']', [2, 4]);
};

document.getElementById('insert5').onclick = function () {
    textarea.insert(textareaEl, '[' + Date.now() + ']', [2, 4], false);
};

document.getElementById('insert6').onclick = function () {
    textarea.insert(textareaEl, '[' + Date.now() + ']', [2, 4], [2, 4]);
};

document.getElementById('getSelectionRect').onclick = function () {
    var rect = textarea.getSelectionRect(textareaEl);
    attribute.style(span1Ele, rect.start);
    attribute.style(span2Ele, rect.end);
};

window.textarea = textarea;


