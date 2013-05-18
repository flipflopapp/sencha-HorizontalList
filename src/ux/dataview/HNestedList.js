
Ext.define('Ext.ux.dataview.HNestedList', {
    alternateClassName: 'Ext.HNestedList',
    extend: 'Ext.dataview.NestedList',
    xtype: 'hnestedlist',

    config: {
        buttonCls: 'x-nestedlist-tab',
        displayIcon: null 
    },

    goToLeaf: function (node) {
        return;
    },

    getList: function (node) {
        var me = this,
            nodeStore = Ext.create('Ext.data.NodeStore', {
                recursive: false,
                node: node,
                rootVisible: false,
                model: me.getStore().getModel()
            }), 
            itemtpl;

        node.expand();

        itemtpl = '<div class="' + me.getButtonCls() + '">';
        if ( me.getDisplayIcon() && me.getDisplayIcon().length > 0 ) { // if we have specified a record for icon
            itemtpl += '<tpl if= "' + me.getDisplayIcon() + '" >' // if the record for icon is not null
                    +   '<div class="x-item-icon" style="background:url({' + me.getDisplayIcon() + '}) no-repeat center left;"> </div>' 
                    +  '</tpl>'; 
        }
        itemtpl += '<span <tpl if="leaf == true">class="x-leaf-item"</tpl><tpl if="leaf != true">class="x-nonleaf-item"</tpl>>' + me.getItemTextTpl(node) + '<tpl if="leaf != true"></b></tpl></span></div>';

        return Ext.Object.merge({
            xtype: 'dataview',
            scrollable: 'horizontal',
            inline: { wrap: false },

            pressedDelay: 250,
            autoDestroy: true,
            store: nodeStore,
            allowDeselect: me.getAllowDeselect(),
            listeners: [
                { event: 'itemdoubletap', fn: 'onItemDoubleTap', scope: me },
                { event: 'itemtap', fn: 'onItemInteraction', scope: me, order: 'before'},
                { event: 'itemtouchstart', fn: 'onItemInteraction', scope: me, order: 'before'},
                { event: 'itemtap', fn: 'onItemTap', scope: me },
                { event: 'beforeselectionchange', fn: 'onBeforeSelect', scope: me },
                { event: 'containertap', fn: 'onContainerTap', scope: me },
                { event: 'selectionchange', fn: 'onSelectionChange', order: 'before', scope: me }
            ],
            itemTpl: itemtpl
        }, this.getListConfig());
    },

    onItemTap: function (list, index, target, record, e) {
        var me = this,
            store = list.getStore(),
            node = store.getAt(index);
        if (!node.isLeaf()) {
            this.goToNode(node);
        }
        me.fireEvent('listchange', list, index, target, record, e); 
    },

    goToNode: function(node) {
        if (!node) {
            return;
        }

        var me = this,
            activeItem = me.getActiveItem(),
            detailCard = me.getDetailCard(),
            detailCardActive = detailCard && me.getActiveItem() == detailCard,
            reverse = me.goToNodeReverseAnimation(node),
            firstList = me.firstList,
            secondList = me.secondList,
            layout = me.getLayout(),
            animation = (layout) ? layout.getAnimation() : null,
            list;

        //if the node is a leaf, throw an error
        if (node.isLeaf()) {
            throw new Error('goToNode: passed a node which is a leaf.');
        }

        //if we are currently at the passed node, do nothing.
        if (node == me.getLastNode() && !detailCardActive) {
            return;
        }

        if (detailCardActive) {
            if (animation) {
                animation.setReverse(true);
            }
            me.setActiveItem(me.getLastActiveList());
        }
        else {
            if (firstList && secondList) {
                //firstList and secondList have both been created
                activeItem = me.getActiveItem();

                me.setLastActiveList(activeItem);
                list = (activeItem == firstList) ? secondList : firstList;
                list.getStore().setNode(node);
                node.expand();

                if (animation) {
                    animation.setReverse(reverse);
                }
                me.setActiveItem(list);
                list.deselectAll();
            }
            else if (firstList) {
                //only firstList has been created
                me.setLastActiveList(me.getActiveItem());
                me.setActiveItem(me.getList(node));
                me.secondList = me.getActiveItem();
            }
            else {
                //no lists have been created
                me.setActiveItem(me.getList(node));
                me.firstList = me.getActiveItem();
            }
        }

        me.setLastNode(node);
        me.syncToolbar();
    },

    jumpToNode: function(node) {
        var me = this,
            tree = me.getStore(),
            nodes = [];
        if(Ext.isString(node)) {
            // do lookup of node based on id
            node = tree.getNodeById(node);
            if(!node) {
                return false;
            }
        }
        if (!node.isLeaf()) {
            this.goToNode(node);
        } else {
            this.goToNode(node.parentNode);
        }
        me.getActiveItem().select(node);
        me.fireEvent('jumptonode', node);
    }
});
