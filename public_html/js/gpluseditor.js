chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            if (($('div[guidedhelpid="sharebox_editor"]').length === 0) || ($('div[guidedhelpid="sharebox_editor"]').length !== 0 && $(".gpebuttons").length === 0)) {

                console.log("--Post Editor for Google+: attempt attach to sharebox.");

                if ($(".gpebuttons").length === 0) {
                    $('div[guidedhelpid="sharebox_editor"]').after(returnMainEditor('main'));

                    function returnMainEditor(type) {
                        var label = '';
                        if (type === 'main') {
                            label = 'Post Editor';
                        }
                        var s = '<div class="gpebuttons">\n\
                                    <a href="#" id="homehomeontheweb" class="button" title="To use Post Editor for Google+™ highlight the text you want to style.\nThen hit the button (ex:Bold) and G+ markup will be added to the highlighted text."><span class="icon icon145"></span><span class="label">' + label + '</span></a>\n\
                                    <a href="#" id="gpeBold" class="button left" title="Bold"><span class="icon icon20"></span></a>\n\
                                    <a href="#" id="gpeItalic" class="button middle" title="Italic"><span class="icon icon114"></span></a>\n\
                                    <a href="#" id="gpeStrike" class="button middle" title="Strikethrough"><span class="icon icon182"></span></a>\n\
                                    <div class="dropdown right" id="gpeSymbols">\n\
                                        <a href="#" class="button right">\n\
                                            <span class="icon icon73">Symbols</span>\n\
                                            <span class="label">Symbols</span>\n\
                                            <span class="toggle"></span>\n\
                                        </a>\n\
                                            <div id="gpeSymbolItems" class="dropdown-slider">\n\
                                            </div> <!-- /.dropdown-slider -->\n\
                                      </div> <!-- /.dropdown -->\n\
                                </div>';
                        return s;
                    }

                    $('#gpeSymbolItems').append(function() { return returnShapes(); });

                    $('.tiptip a.button, .tiptip button').tipTip(); 

                    $("#homehomeontheweb").on("click", function(event) {
                        event.preventDefault();
                        window.open("http://www.paulspoerry.com/code/post-editor-for-google-plus/");
                    });

                    $("#gpeBold, #gpeItalic, #gpeStrike").on("click", function(event) {
                        event.preventDefault();
                        applyPlusStyle($(this).attr("id").replace('gpe', '').toLowerCase());
                    });
                    
                    $("#gpeSymbols").on("click", function(event) {
                        event.preventDefault();
                        if (!$(this).find('span.toggle').hasClass('active')) {
                            $('.dropdown-slider').slideUp();
                            $('span.toggle').removeClass('active');
                        }
                        $(this).parent().find('.dropdown-slider').slideToggle('fast'); // open selected dropown
                        $(this).find('span.toggle').toggleClass('active');
                        return false;
                    });

                    $(".gpeSymboleItemsItem").on("mousedown", function(event) {
                        event.preventDefault();
                        insertShape(this);
                    });

                    clearInterval(readyStateCheckInterval);
                }
            }

            $(document).on('click', function(e) {
                if (e.target.id !== $('.dropdown').attr('class')) {
                    $('.dropdown-slider').slideUp(); // Close open dropdown slider/s by clicking elsewhwere on page
                    $('span.toggle').removeClass('active');
                }
            });


            function applyPlusStyle(style) {
                var sel, range;
                if (window.getSelection) {
                    sel = window.getSelection();
                    if (sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        rangeTextOrigLength = range.toString().length;
                        if (rangeTextOrigLength === 0)
                            return;
                        rangeText = range.toString().trim();
                        range.deleteContents();
                        rangeText = formatText(rangeText, style);
                        if (rangeText.length < rangeTextOrigLength) {
                            rangeText = rangeText + ' ';
                        }
                        range.insertNode(document.createTextNode(rangeText));
                    }
                }
            }

            function formatText(text, style) {
                if (style === 'bold')
                    text = '*' + text + '*';
                if (style === 'italic')
                    text = '_' + text + '_';
                if (style === 'strike')
                    text = '-' + text + '-';
                return text;
            }

            function insertShape(selectedOption) {
                var sel, range;
                if (window.getSelection) {
                    sel = window.getSelection();
                    if (sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        rangeText = range.toString().trim();
                        range.deleteContents();
                        range.insertNode(document.createTextNode(selectedOption.innerText.charAt(0)));
                    }
                }
            }

            function returnShapes() {
                var kind = ["Smiley Face", "Heart", "Sad Face", "Email", "Phone", "Box Check", "Box X", "Cloud", "Umbrella", "Snowflake", "Ying Yang", "Biohazard", "Radioactive", "Crossbones"];
                var code = ["  &#9786;", "&#9825;", "&#9785;", "&#9993;", "&#9743;", "&#9745;", "&#9746;", "&#9729;", "&#9730;", "&#10052;", "&#9775;", "&#9763;", "&#9762;", "&#9760;"];
                var shapes = '';
                for (var i = 0; i < kind.length; i++)
                {
                    //<a href="#" id="homehomeontheweb" class="button" title="To use GPlusEditor highlight the"><span class="icon icon145"></span><span class="label">GPlusEditor</span></a>\n\
                    //shapes = shapes + '<a href="#" class="ddm" id="gpeSymboleItemsItem"><span class="label"><code  id="gpeSymboleItemsItem">' + code[i] + '</code></span> <code class="ddmText>' + kind[i] + '</code></a>';
                    shapes = shapes + '<a href="#" class="ddm" title=' + kind[i] + '><span class="label"><code class="gpeSymboleItemsItem">' + code[i] + '</code></span></a>';
                }
                return shapes;
            }
        }

    }, 50);
});
//http://ikreator.com/special-characters/#legal
//http://www.tumuski.com/code/htmlencode/
//http://code.brucegalpin.com/google-plus-ui-buttons/demo.html
// icon6 for arrows
// icon177 for stars
// icon150 for shapes
// icon145 for drawing

