var Handler = function () {
    //element count for each query
    var _offset = 3,
        _loadMore = true;
    return {
        'init': function () {
            var app = this;
            app.infinitScroll();
        },
        'infinitScroll': function () {
            var app = this;
            //you can personalize your data to be sended as query param here
            //
            setTimeout(function () {
                $(window).scroll(function (e) {
                    e.stopPropagation();
                    if (($(document).height() - $(this).height()) == $(this).scrollTop()) {
                            if (($(window).scrollTop() + $(window).height()) >= ($(document).height() - $("#footer").height())) {
                                //console.log( ($(document).height() - $('#footer').height() ));
                                var urlData = "YOUR URL WITH PARAM";
                                if (_loadMore) {
                                    app.do_ajax(urlData, 'loader');
                                }
                            }

                    }
                });
            }, 1000);
        },
        'do_ajax': function (urlData, typeLoader) {
            var app = this;
            $.ajax({
                url: urlData,
                method: 'GET',
                beforeSend:function () {
                    if($('.loader').length != 0){
                        $('.loader').fadeIn();
                    }
                    _offset += 3;
                },
                success: function (rep) {
                        app.callback_response(rep)
                },
                complete: function () {
                    switch (typeLoader) {
                        case 'cache_page':

                            break;
                        case 'loader':
                            if($('.loader').length != 0) {
                                $('.loader').fadeOut();
                            }
                            break;
                        case 'loader_btn':
                            break;
                    }
                }
            });
        },
        'callback_response': function (response) {
            //add new element to current list with class DATA
            $('.DATA').append(response);
            _loadMore = true;
        },
    }
};
/** instance of Handler */
var Handler = new Handler();
Handler.init();