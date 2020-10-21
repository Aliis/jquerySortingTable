# jquerySortingTable

This is a small jQuery plugin for tabe sorting (numbers, dates and strings).

How to use

Jquery is looking for a class 'data-table', adding the class makes table sortable.
Table should also have id, it's added for the case if there is more than 1 sortable table on the same page.
Every th should have id in a format 'th_someID'.

To sort dates the th class 'sorting date' should be added ('HH:mm' is supported).
To sort numbers the th class 'sorting number' should be added.
To sort everything else, that is not a date or a number, class 'sorting' should be added.

Important! Sorting reorders/replaces rows. In order to get it working correctly, the id to td should be added.
td id should follow the logic of th id, it should contain 'td_someID'.
ID-s should be indexed to keep them unique, index can be placed before or after 'td_someID'.
