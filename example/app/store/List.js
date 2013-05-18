Ext.define('HorizontalNestedList.store.List', {
    extend: 'Ext.data.TreeStore',

    config: {
        model: 'HorizontalNestedList.model.List',
        defaultRootProperty: 'items',
        root: {
          items: [
            {
                text: 'Drinks',
                icon: './resources/images/drinks-icon.png',
                items: [
                    {
                        text: 'Water',
                        items: [
                            { text: 'Still', leaf: true },
                            { text: 'Sparkling', leaf: true }
                        ]
                    },
                    { text: 'Soda', leaf: true }
                ]
            },
            {
                text: 'Snacks',
                icon: './resources/images/snack-icon.png',
                items: [
                    { text: 'Nuts', leaf: true },
                    { text: 'Pretzels', leaf: true },
                    { text: 'Wasabi Peas', leaf: true  }
                ]
            },
            {
                text: 'Indian Sweets',
                icon: './resources/images/sweets-icon.png',
                items: [
                    { text: 'Rasgulla', leaf: true },
                    { text: 'Gulabjamun', leaf: true },
                    { text: 'Barfi', leaf: true  }
                ]
            },
            {
                text: 'Indian Streetfood',
                icon: './resources/images/food-icon.png',
                items: [
                    {
                        text: 'Golgappa',
                        items: [
                            { text: 'Cholewala', leaf: true },
                            { text: 'Aloowala', leaf: true }
                        ]
                    },
                    { text: 'Paw Bhaji', leaf: true }
                ]
            }
        ]
      }
    }
});
