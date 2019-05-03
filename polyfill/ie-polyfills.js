if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function(valueToFind, fromIndex) {

            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(valueToFind, elementK) is true, return true.
                if (sameValueZero(o[k], valueToFind)) {
                    return true;
                }
                // c. Increase k by 1.
                k++;
            }

            // 8. Return false
            return false;
        }
    });
}
if (!Element.prototype.toggleAttribute) {
    Element.prototype.toggleAttribute = function(name, force) {
        if(force !== void 0) force = !!force

        if (this.getAttribute(name) !== null) {
            if (force) return true;

            this.removeAttribute(name);
            return false;
        } else {
            if (force === false) return false;

            this.setAttribute(name, "");
            return true;
        }
    };
}
/*
 * @function
 * @name Object.prototype.inArray
 * @description Extend Object prototype within inArray function
 *
 * @param {mix}    needle       - Search-able needle
 * @param {bool}   searchInKey  - Search needle in keys?
 *
 */
Object.defineProperty(Object.prototype, 'inArray',{
    value: function(needle, searchInKey, ignore, property){

        var object = this, ignoredProps = {}, searchProperty = {};

        if(ignore){
            ignoredProps = needle[ignore];
        }
        if(property){
            searchProperty = needle[property];
        }
        if( Object.prototype.toString.call(needle) === '[object Object]' ||
            Object.prototype.toString.call(needle) === '[object Array]'){
            needle = JSON.stringify(needle);
        }

        return Object.keys(object).some(function(key){

            var value = object[key];

            if(ignore){
                value[ignore] = ignoredProps;
            }
            if(property){
                if (value[property] == searchProperty){
                    return true;
                }
            }
            if( Object.prototype.toString.call(value) === '[object Object]' ||
                Object.prototype.toString.call(value) === '[object Array]'){
                value = JSON.stringify(value);
            }

            if(searchInKey){
                if(value === needle || key === needle){
                    return true;
                }
            }else{
                if(value === needle){
                    return true;
                }
            }
        });
    },
    writable: true,
    configurable: true,
    enumerable: false
});
(function () {

    if ( typeof window.CustomEvent === "function" ) return false;

    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();
