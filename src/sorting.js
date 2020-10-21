const data = (tableId, tdId) => $(tableId + 'tr').map(function(idx, el) {
    return {
        'data': $(el).find(tdId).text(),
        'row': $(el).html()
    }
})

const convertDate = (dateString) => {
    if (dateString.includes(':')) {
        return new Date(Date.parse(dateString))
    }
    const dateParts = dateString.split(".")
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
}

const sortDates = (tableId, tdId) => data(tableId, tdId).slice().sort((a, b) => convertDate(a.data) - convertDate(b.data))
const unsortDates = (tableId, tdId) => data(tableId, tdId).slice().sort((a, b) => convertDate(b.data) - convertDate(a.data))
const sortNums = (tableId, tdId) => data(tableId, tdId).slice().sort((a, b) => a.data - b.data)
const unsortNums = (tableId, tdId) => data(tableId, tdId).slice().sort((a, b) => b.data - a.data)
const sortStrings = (tableId, tdId) => data(tableId, tdId).slice().sort((a, b) => (a.data > b.data) - (a.data < b.data))
const unsortStrings = (tableId, tdId) => data(tableId, tdId).slice().sort((a, b) => (a.data < b.data) - (a.data > b.data))
const updateRows = (id, d) => {
    $(id + 'tr').map(function(idx, el) {
        $(el).html(d[idx].row)
    })
}

jQuery.fn.clickToggle = function(a, b) {
    return this.on("click", function(ev) { [a, b][this.$_io ^= 1].call(this, ev) })
}

// Jquery is looking for a class 'data-table', adding the class makes table sortable.
// Table should also have id, it's added for the case if there is more than 1 sortable table on the same page.
$('.data-table').each(function(){
    const tblID = '#' + $(this).attr('id')

    // Every th should have id in a format 'th_someID'.
    $(tblID + ' th.sorting').clickToggle(function(elem) {
        const thID = '#' + elem.target.id
        const tdID = thID.split('_').pop()

        // To sort dates the th class 'sorting date' should be added ('HH:mm' is supported).
        // To sort numbers the th class 'sorting number' should be added.
        // To sort everything else, that is not a date or a number, class 'sorting' should be added.

        // Important! Sorting reorders/replaces rows. In order to get it working correctly, the id to td should be added.
        // td id should follow the logic of th id, it should contain 'td_someID' (index can be placed before or after).
        if ($(thID).hasClass('date')) {
            updateRows(tblID + ' tbody ', sortDates(tblID + ' tbody ', "td[id*='td_" + tdID + "']"))
        } else if ($(thID).hasClass('number')) {
            updateRows(tblID + ' tbody ', sortNums(tblID + ' tbody ', "td[id*='td_" + tdID + "']"))
        } else {
            updateRows(tblID + ' tbody ', sortStrings(tblID + ' tbody ', "td[id*='td_" + tdID + "']"))
        }
    }, function(elem) {
        const thID = '#' + elem.target.id
        const tdID = thID.split('_').pop()
        if ($(thID).hasClass('date')){
            updateRows(tblID + ' tbody ', unsortDates(tblID + ' tbody ', "td[id*='td_" + tdID + "']"))
        } else if ($(thID).hasClass('number'))  {
            updateRows(tblID + ' tbody ', unsortNums(tblID + ' tbody ', "td[id*='td_" + tdID + "']"))
        } else {
            updateRows(tblID + ' tbody ', unsortStrings(tblID + ' tbody ', "td[id*='td_" + tdID + "']"))
        }
    })
})
