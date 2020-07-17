//import 'jquery'

// The Selection.focusNode read-only property returns the Node in which the selection ends.
// The Selection.anchorNode read-only property returns the Node in which the selection begins.
// The Selection object may contain 0 to many selection ranges

$(document).ready(function() {//
    $("div#container").focus()//
    $('button.toolbar-btn').click(function() { // `this` in the context is the element being clicked
        var data = this && $(this).data && $(this).data() // returns the last one if all the previous are truthy, this is basically a verification, all i want is $(this).data()
        if (data && data.format && document.execCommand) { // some sanity checks
            document.execCommand(data.format, false, null)//
            $('div#container').focus()//
        }//
    })//
    $('select.toolbar-ddl').change(function() {//
        var data = this && $(this).data && $(this).data()//
        if (data && data.format && document.execCommand) {//
            document.execCommand(data.format, false, this[this.selectedIndex].value)//
            this.selectedIndex = 0//
            $('div#container').focus()//
        }//
    })//
    $("button#btnCreateSelection").click(function() {// calls setSelectionRange()
        var container = document.getElementById("container")//
        container.innerHTML = "Here is some sample text for selection"//
        var range = document.createRange()// returns a 'Range' object
        range.setStart(container.firstChild, 5) // range.setStart(startNode, startOffset);
        range.setEnd(container.firstChild, 17) // range.setEnd(endNode, endOffset);
        setSelectionRange(range)
    })//
    $("button#btnStoreSelection").click(function() {//calls getSelectionRange()
        window.selectedRange = getSelectionRange() // saves the selected range globally
    })//
    $("button#btnRestoreSelection").click(function() {//calls setSellectionRange()
        if (window.selectedRange) {//sanity check
            setSelectionRange(window.selectedRange)// passes the 'Range' object stored as a windows level variable
        }//
    })//
})//

function getSelectionRange() {//
    if (window.getSelection) {//
        var sel = window.getSelection() // returns a 'Selection' object
        if (sel.getRangeAt && sel.rangeCount) { // checking for browser support as well as selection ranges ... if there is this .getRangeAt in the browser and the page was clicked (.rangeCount==1) ...
            return sel.getRangeAt(0) // returns the first 'Range' object whithin the Selection object
        } else {// this is for browser that dont support .getRangeAt... creates a 'Range' object from 'Selection' properties
            var range = document.createRange() // retunrs a new 'Range' object
            range.setStart(sel.anchorNode, sel.anchorOffset) // passes Selection attributes to 'range'
            range.setEnd(sel.focusNode, sel.focusOffset) // passes Selection attributes to 'range'
            return range//
        }//
    }//
    return null//
}//

function setSelectionRange(range) {
    if (range && window.getSelection) {// sanity check
        var sel = window.getSelection() // returns a sellection object
        sel.removeAllRanges() //The Selection.removeAllRanges() method removes all ranges from the selection, leaving the anchorNode and focusNode properties equal to null and leaving nothing selected.
        sel.addRange(range) // selects the specified range in the screen, addRange() adds a range to a selection
    }
}