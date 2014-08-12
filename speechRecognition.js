/**
 * Created by Boliver on 6/11/14.
 */
(function () {
    $.widget("custom.speechRecognition", {
        options: {
            lang: 'en-US',
            micImage: 'mic.gif',
            micActiveImage: 'mic-animate.gif'
        },
        _destroy: function(){
            this.mic.remove();
        },
        _create: function () {
            var _this = this;
            _this.input = _this.element;
            _this.recording = false;
            _this.recognition = null;
            _this.mic = $('<img>')
                .attr('src', _this.options['micImage'])
                .css('width', '32px')
                .css('height', '32px')
                .css('margin-bottom','-10px')
                .insertAfter(this.element)
                .on('click', function (event) {
                    if (!!window.webkitSpeechRecognition) {
                        if(_this.recording){
                            _this.recognition.stop();
                            _this.recording = false;
                            _this.mic.attr('src', _this.options['micImage']);
                            return;
                        }
                        _this.recognition = new webkitSpeechRecognition();
                        _this.recognition.continuous = false;
                        _this.recognition.interimResults = false;
                        _this.recognition.lang = _this.options['lang'];
                        _this.recognition.start();
                        _this.recording = true;
                        _this.recognition.onstart = function () {
                            $(event.currentTarget).attr('src', _this.options['micActiveImage']);
                            console.log("Speech recognition started.");
                        };
                        _this.recognition.onresult = function (event) {
                            console.log(event.results[0][0].transcript);
                            $(_this.input).val(event.results[0][0].transcript);
                            _this.mic.attr('src', _this.options['micImage']);
                        };
                        _this.recognition.onerror = function (event) {
                            console.log("Error", event);
                            _this.mic.attr('src', _this.options['micImage']);
                        };
                        _this.recognition.onend = function (event) {
                            console.log(event);
                            _this.mic.attr('src', _this.options['micImage']);
                            console.log("Speech recognition ended");
                        };
                    } else {
                        console.error("Speech recognition is not available on this device.");
                    }
                });
        }
    });
}());