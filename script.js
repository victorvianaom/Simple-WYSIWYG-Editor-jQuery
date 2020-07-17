//import 'jquery'

$(document).ready(function() {
    $('button.toolbar-btn').click(function() {
        var data = this && $(this).data && $(this).data() // returns the last one if all the previous are truthy, this is basically a verification, all i want is $(this).data()
        if (data && data.format && document.execCommand) { // `this` in the context is the element being clicked
            document.execCommand(data.format, false, null)
            $('div#container').focus()
            console.log("this: ", this)
            console.log("$(this).data: ", $(this).data)
            console.log("$(this).data(): ", $(this).data())
        }
    })

    $('select.toolbar-ddl').change(function() {
        var data = this && $(this).data && $(this).data()
        if (data && data.format && document.execCommand) {
            document.execCommand(data.format, false, this[this.selectedIndex].value)
            this.selectedIndex = 0
            $('div#container').focus()
        }
    })
})