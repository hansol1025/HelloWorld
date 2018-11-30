window.sp = window.sp || {
    _key : "sp",
    _sp_exception : "sc_error",

    get : function() {
        try {
            return localStorage.getItem(this._key);
        } catch(e) {
            return this._sp_exception;
        }
    },

    set : function() {
        var sp;

        if (this._hasSp()) {
            return;
        }

        sp = this._create();

        try {
            localStorage.setItem(this._key, sp);
        } catch(e) {
            // NTD
        }
    },

    _create : function() {
        var sp;

        this._polyfill();

        sp = (((new Date()).toISOString().slice(0,10).replace(/-/g,"")+'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')).replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });

        return sp;
    },

    _polyfill : function() {
        if (!Date.prototype.toISOString) {
            (function() {

                function pad(number) {
                    if (number < 10) {
                        return '0' + number;
                    }
                    return number;
                }

                Date.prototype.toISOString = function() {
                    return this.getUTCFullYear() +
                        '-' + pad(this.getUTCMonth() + 1) +
                        '-' + pad(this.getUTCDate()) +
                        'T' + pad(this.getUTCHours()) +
                        ':' + pad(this.getUTCMinutes()) +
                        ':' + pad(this.getUTCSeconds()) +
                        '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
                        'Z';
                };

            }());
        }
    },

    _hasSp : function() {
        try {
            var sp = localStorage.getItem(this._key);

            return sp != null && sp.length > 0;
        } catch(e) {
            return false;
        }
    }
};