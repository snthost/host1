simpleCart.bind('beforeAdd', function (newitem) {
simpleCart.each(function (cartitem) {
    if (cartitem.get("name") === newitem.get("name")) {
        cartitem.remove();
    }
})
});
