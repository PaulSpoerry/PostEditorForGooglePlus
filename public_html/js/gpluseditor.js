chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if ( document.readyState === "complete" && $('div[guidedhelpid="sharebox_editor"]').length === 0 ) {
            clearInterval(readyStateCheckInterval);
            // ----------------------------------------------------------
            // This part of the script triggers when page is done loading
            console.log("Begin Post Editor for Google+");
            // ----------------------------------------------------------

            $(document).ready(function() {
              
            }); // END document.ready
            
            $('div[guidedhelpid="sharebox_editor"]').on("focusin", null, null, function() {
               if ( $( ".gpebuttons" ).length === 0 ) {
                       $('div[guidedhelpid="sharebox_editor"]').after('\
                            <div class="gpebuttons">\n\
                                <a href="#" id="homehomeontheweb" class="button" title="To use Post Editor for Google+™ highlight the text you want to style.\nThen hit the button (ex:Bold) and G+ markup will be added to the highlighted text."><span class="icon icon145"></span><span class="label">Post Editor</span></a>\n\
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
                            </div>');
    
    
                        $('#gpeSymbolItems').append(function() { return returnShapes(); });
            
                        // Launch TipTip tooltip
                        $('.tiptip a.button, .tiptip button').tipTip();

                        $( "#homehomeontheweb" ).click(function(e) { 
                            e.preventDefault();
                            window.open("http://www.paulspoerry.com/code/post-editor-for-google-plus/"); 
                        });
                        $( "#gpeBold" ).mousedown(function() { applyPlusStyle("bold"); });
                        $( "#gpeItalic" ).mousedown(function() { applyPlusStyle("italic"); });
                        $( "#gpeStrike" ).mousedown(function() { applyPlusStyle("strike"); });
                        $( "#gpeSymbols" ).click(function() { 
                            if (!$(this).find('span.toggle').hasClass('active')) {
                                $('.dropdown-slider').slideUp();
                                $('span.toggle').removeClass('active');
                            }
                            $(this).parent().find('.dropdown-slider').slideToggle('fast'); // open selected dropown
                            $(this).find('span.toggle').toggleClass('active');
                            return false;
                        });
                        $( ".gpeSymboleItemsItem" ).mousedown(function() { insertShape(this); });
                }
            });
        }
        
        // Close open dropdown slider/s by clicking elsewhwere on page
            $(document).bind('click', function (e) {
                if (e.target.id !== $('.dropdown').attr('class')) {
                    $('.dropdown-slider').slideUp();
                    $('span.toggle').removeClass('active');
                }
            }); // END document.bind
        
        function applyPlusStyle(style) {
            var sel, range;
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    rangeTextOrigLength = range.toString().length;
                    if (rangeTextOrigLength === 0) return;
                    rangeText = range.toString().trim();
                    range.deleteContents();
                    rangeText = formatText(rangeText, style);
                    if (rangeText.length < rangeTextOrigLength) { rangeText = rangeText + ' '; }
                    range.insertNode(document.createTextNode(rangeText));
                }
            }
        }
        
        function formatText(text, style) {
            if (style === 'bold') text = '*' + text + '*';
            if (style === 'italic') text = '_' + text + '_';
            if (style === 'strike') text = '-' + text + '-';
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
            var kind = ["Smiley Face", "Heart",   "Sad Face", "Email",   "Phone",  "Box Check", "Box X",   "Cloud",   "Umbrella", "Snowflake", "Ying Yang", "Biohazard", "Radioactive", "Crossbones"];
            var code = ["  &#9786;",     "&#9825;", "&#9785;",  "&#9993;", "&#9743;","&#9745;",   "&#9746;", "&#9729;", "&#9730;",   "&#10052;",  "&#9775;",  "&#9763;",   "&#9762;",     "&#9760;"];
            var shapes = '';
            for (var i = 0; i < kind.length; i++)
            {
//<a href="#" id="homehomeontheweb" class="button" title="To use GPlusEditor highlight the"><span class="icon icon145"></span><span class="label">GPlusEditor</span></a>\n\
                //shapes = shapes + '<a href="#" class="ddm" id="gpeSymboleItemsItem"><span class="label"><code  id="gpeSymboleItemsItem">' + code[i] + '</code></span> <code class="ddmText>' + kind[i] + '</code></a>';
                shapes = shapes + '<a href="#" class="ddm" title=' + kind[i] + '><span class="label"><code class="gpeSymboleItemsItem">' + code[i] + '</code></span></a>';
            }
            return shapes;
        }

    }, 10);
});
//http://ikreator.com/special-characters/#legal
//http://www.tumuski.com/code/htmlencode/
// icon6 for arrows
// icon177 for stars
// icon150 for shapes
// icon145 for drawing

