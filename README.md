Horizontal Nested List 
======================

This is implementation for a horizontal (nested list) in Sencha Touch.

Demo link: http://flipflopapp.github.io/sencha-HorizontalList/example/index.html

Horizontal nested list is derived from nested list.

It accepts mostly the same fields as a nested list.

See: http://docs.sencha.com/touch/2-0/#!/guide/nested_list

Its been tested with Sencha Touch 2.1 .


Additional config options
=========================

There are some additional fields, such as,

* buttonCls: <class name>   (default is 'x-nestedlist-tab')
* displayIcon: <field name>


Additonal commands
==================

* jumpToNode: function(node)

Jump to node can  be called to make a jump to any node in the 
nested list (for example, we want to jump to a top-level node
from somewhere deeper in the nested list. Such jumps may happen
from a search or from the side navigation.


Additional events
=================

When a list item is selected, following events are fired,

* listchange

A list change event is fired when an event is selected.

* jumptonode

An event fired, when user makes a jump to any node using jumpToNode 
function (described above).
