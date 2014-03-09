chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            // ----------------------------------------------------------
            // This part of the script triggers when page is done loading
            console.log("Begin Google+Editor");
            // ----------------------------------------------------------

            $(document).ready(function() {

                // Toggle the dropdown menu's
                $(".dropdown .button, .dropdown button").click(function() {
                    if (!$(this).find('span.toggle').hasClass('active')) {
                        $('.dropdown-slider').slideUp();
                        $('span.toggle').removeClass('active');
                    }

                    // open selected dropown
                    $(this).parent().find('.dropdown-slider').slideToggle('fast');
                    $(this).find('span.toggle').toggleClass('active');

                    return false;
                });

                // Launch TipTip tooltip
                $('.tiptip a.button, .tiptip button').tipTip();

            });

            // Close open dropdown slider by clicking elsewhwere on page
            $(document).bind('click', function(e) {
                if (e.target.id !== $('.dropdown').attr('class')) {
                    $('.dropdown-slider').slideUp();
                    $('span.toggle').removeClass('active');
                }
            });






            var plusShareBox = document.querySelector('div[guidedhelpid="sharebox_editor"]');
            var plusEditorButtons = document.createElement('div');
            var htmlToInject = '<div class="buttons"><a href=# class=plusEditItemHome>GPlusEditor:</a>';
            //var htmlToInject = '<div class="buttons"><a href="#" class="button on"><span class="icon icon145"></span><span class="label">GPlusEditor</span></a>';
            
            htmlToInject = htmlToInject + '<a href=# class=plusEditItemBold>Bold</a>';
            htmlToInject = htmlToInject + '<a href=# class=plusEditItemItalic>Italic</a>';
            htmlToInject = htmlToInject + '<a href=# class=plusEditItemStrike>Strikethrough</a></div>';
            htmlToInject = htmlToInject + returnShapes();
            plusEditorButtons.innerHTML = htmlToInject;
            plusEditorButtons.className = "button special-plugin-button";
            plusShareBox.parentElement.insertAdjacentElement('beforeEnd', plusEditorButtons);
            // add event listeners
            plusEditorButtons.querySelector('.plusEditItemBold').addEventListener('click', function() {
                applyPlusStyle("bold");
            }, true);
            plusEditorButtons.querySelector('.plusEditItemItalic').addEventListener('click', function() {
                applyPlusStyle("italic");
            }, true);
            plusEditorButtons.querySelector('.plusEditItemStrike').addEventListener('click', function() {
                applyPlusStyle("strike");
            }, true);
            plusEditorButtons.querySelector('.plusEditItemShapes').addEventListener('change', function() {
                insertShape(this.id);
            }, true);
        }

        function applyPlusStyle(style) {
            var sel, range;
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    rangeText = range.toString().trim();
                    range.deleteContents();
                    range.insertNode(document.createTextNode(formatText(rangeText, style)));
                }
            }
        }

        function insertShape(selectedOption) {
            var sel, range, choice;
            if (window.getSelection) {
                sel = window.getSelection();
                if (sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    rangeText = range.toString().trim();
                    range.deleteContents();
                    choice = document.getElementById(selectedOption);
                    range.insertNode(document.createTextNode(choice.options[choice.selectedIndex].value));
                    choice.selectedIndex = 0;
                }
            }
        }

        function returnShapes() {
//http://ikreator.com/special-characters/#legal
//http://www.tumuski.com/code/htmlencode/
            var kind = ["&#8592;", "&#8594;", "&#8593;", "&#8595;",
                "&#9650;", "&#9658;", "&#9660;", "&#9668;", "&#10084;", "&#9992;", "&#9733;", "&#10022;", "&#9728;", "&#9670", "&#9672;", "&#9635;", "&#174;", "&#169;", "&#8482;",
                "&#8471;", "&#8480;", "$", "&#162;", "&#163;", "&#164;", "&#8364;", "&#165;", "&#8369;", "&#8377;", "&#9833;", "&#9834;", "&#9835;", "&#9836;", "&#9837;", "&#9839;",
                "&#9744", "&#9745", "&#9746", "&#10003", "&#10004", "&#10005", "&#10006", "&#10007", "&#10008", "&#9768", "&#9769", "&#10013", "&#10014", "&#10016", "&#8224", "&#10018", "&#10020", "&#10019", "&#10021",
                "&#9733", "&#10026", "&#10017", "&#10031", "&#10037", "&#10038", "&#10040", "&#10041", "&#10042", "&#10023", "&#10034", "&#10045", "&#10059", "&#10053", "&#9744", "&#9787", "&#9786", "&#9785", "&#9993",
                "&#9742", "&#9743", "&#9729", "&#9730", "&#9731", "&#10047", "&#10048", "&#10049", "&#9765", "&#9774", "&#9775", "&#9770", "&#9764", "&#9988", "&#9784", "&#9762", "&#9760", "&#9756", "&#9758", "&#9757", "&#9759",
                "&#9997", "&#9794", "&#9792", "&#9818", "&#2665"];
            var shapes = '<span class="styled-select"><select id="plusEditShapes" class=plusEditItemShapes>';
            shapes = shapes + "   <option enabled=false>Shapes</option>";
            for (var i = 0; i < kind.length; i++)
            {
                shapes = shapes + "   <option><code>" + kind[i] + "</code></option>";
            }
            shapes = shapes + "</select></span>";
            return shapes;
        }

        function formatText(text, style) {
// g+formating may require spaces to be around any text, so if double formatting happens may need to force spacing
            if (style === 'bold')
                text = '*' + text + '*';
            if (style === 'italic')
                text = '_' + text + '_';
            if (style === 'strike')
                text = '-' + text + '-';
            return text;
        }
    }, 10);
});