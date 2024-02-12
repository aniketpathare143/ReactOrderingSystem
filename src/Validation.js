$('.ui.form')
    .form({
        fields: {
            productName: 'empty',
            amount: 0,
            placedBy: 'empty',
            addressLine1: 'empty',
            addressLine2: 'empty',
            pincode: ['minLength[4]', 'empty'],
        }
    })
    ;
