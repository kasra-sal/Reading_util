// ==UserScript==
// @name         Bionic Reading
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Applies bionic reading method to help read faster.
// @author       Qaboos
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to convert text nodes to Bionic Reading style
    function bionicReadingElement(element) {
        element.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const span = document.createElement('span');
                span.innerHTML = node.textContent.replace(/\b(\w{2})(\w*)\b/g, (match, firstPart, rest) => {
                    return `<strong>${firstPart}</strong>${rest}`;
                });
                element.replaceChild(span, node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                bionicReadingElement(node); // Recursively handle child elements
            }
        });
    }

    // Apply Bionic Reading effect to all paragraphs
    document.querySelectorAll('p').forEach(paragraph => {
        paragraph.style.fontFamily = 'sans-serif';
        bionicReadingElement(paragraph);
    });
})();