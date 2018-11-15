/**
 * karma 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var textarea = require('../src/index.js');

describe('blear.utils.textarea', function () {

    it('.getSelection', function () {
        var el = document.createElement('textarea');
        document.body.appendChild(el);
        var sel = textarea.getSelection(el);

        expect(sel.length).toBe(2);
        expect(sel[0]).toBe(0);
        expect(sel[1]).toBe(0);
    });

    it('.setSelection', function () {
        var el = document.createElement('textarea');
        document.body.appendChild(el);
        el.value = 'abcd1234';
        textarea.setSelection(el, 1, 2);
        var sel = textarea.getSelection(el);

        expect(sel.length).toBe(2);
        expect(sel[0]).toBe(1);
        expect(sel[1]).toBe(2);
    });

});
