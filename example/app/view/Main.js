Ext.define('HorizontalNestedList.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.data.Store',
        'Ext.Button',
        'Ext.ux.dataview.HNestedList'
    ],

    config: {
        store: 'List',

        defaultTitle: 'Horizontal Nested List',

        titlebar: {
            xtype: 'titlebar',
            docked: 'top',
            ui: 'light',
            inline: true,
            items: [
            { xtype: 'spacer' }
            ]
        },
        
        backbtn: {
            text: 'Back',
            ui: 'back',
            hidden: true
        }, 

        nestedList: {
            minHeight: 65,
            useToolbar: false, // we have implemented our own toolbar for demo purposes
            displayIcon: 'icon',
            displayField: 'text'
        },

        container: {
            width: '100%',
            height: '100%',
            style: 'text-align: center; padding-top: 50px;',
            html: 'Welcome'
        }
    },

    applyStore: function(storeid) {
        var store = Ext.getStore ( storeid );
        return store;
    },

    applyTitlebar: function(config) {
        var titlebar = Ext.factory ( config, Ext.TitleBar, this.getTitlebar() );
        titlebar.setTitle( this.getDefaultTitle() );
        return titlebar;
    },

    applyContainer: function(config) {
        var container = Ext.factory ( config, Ext.Container, this.getContainer() );
        return container;
    },

    applyBackbtn: function(config) {
        var backbtn = Ext.factory ( config, Ext.Button, this.getBackbtn() );
        backbtn.element.on ( 'tap', this.doCategoryBack, this );
        return backbtn;
    },

    applyNestedList: function(config) {
        var nestedList = Ext.factory (config, Ext.HNestedList, this.getNestedList());
        nestedList.setStore ( this.getStore() );
        nestedList.on ( 'listchange', this.doListChange, this );
        nestedList.on ( 'jumptonode', this.doJumpToNode, this );
        return nestedList;
    },

    // called for a leaf item
    doListChange: function(list, index, target, record, e) {
        var me = this,
            title = record.getData().text;
        this.getTitlebar().setTitle( title );
        this.getBackbtn().show();
        this.getContainer().setHtml( 'Selected option<br>' + title );
    },

    // called when user jumps to any out of turn node
    //   by using jumpToNode(node) API. 
    doJumpToNode: function(node) {
        var me = this,
            title = record.getData().text;
        this.getTitlebar().setTitle( title );
        this.getBackbtn().show();
    },

    doCategoryBack: function() {
        var me = this
          , title
          ;
        me.getNestedList().getActiveItem().deselectAll();
        me.getNestedList().onBackTap();

        title = me.getNestedList().getTitle(); 
        if ( title === "" ) {
            title = this.getDefaultTitle();
            this.getBackbtn().hide();
        }
        this.getTitlebar().setTitle( title );
    },

    initialize: function() {
        var me = this;
        this.getTitlebar().add ( this.getBackbtn() );
        me.add ( this.getTitlebar() );
        me.add ( this.getNestedList() );
        me.add ( this.getContainer() );
    }

});
