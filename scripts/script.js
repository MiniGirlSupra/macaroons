'use strict';
$(document).ready(() => {

    let phone = $('#order_phone');
    let products = $('#order_product');

// скролл к выбору при нажатии на кнопку "Выбрать макарун"
    $('#choose-macaroon').click(function () {
        $('.choice')[0].scrollIntoView({behavior: "smooth"});
    });

// при выборе товара, клик на заказать + "добавление в Ваш выбор"
    $('.btn-add-to-cart').click((e) => {
        products.val($(e.target).parents('.product').find('.product-title').text().trim())
        $('.order')[0].scrollIntoView({behavior: "smooth"});
    })

// маска телефона
    phone.inputmask({"mask": "+9(999) 999-9999"});

// бургерное меню -после less не работает
    $('#burger').click(function () {
        $('#menu').show();
    })

    $('.menu-item *').click(function () {
        $('#menu').hide();
    })

    $('.close *').click(function () {
        $('#menu').hide();
    })


// валидация полей
    $('#submit').click(function () {

        let input = $('.input');
        let product = $('#order_product');
        let name = $('#order_name');
        let hasError = false;


        input.css('border-color', '#821328');
        $('.error-input').hide();
        $('.error-name-input').hide();
        $('.error-phone-input').hide();
        if (!product.val()) {
            product.next().show();
            product.css('border-color', 'red');
            hasError = true;
        }
        if (!name.val()) {
            name.next().show();
            name.css('border-color', 'red');
            hasError = true;
        }
        if (!phone.val()) {
            phone.next().show();
            phone.css('border-color', 'red');
            hasError = true;
        }


        if (!hasError) {
            let loader = $('.loader');
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {product: product.val(), name: name.val(), phone: phone.val()}
            })
                .done(function (message) {
                    loader.hide();
                    let form = $('form');
                    let orderPopUp = $('.order-after');

                    if (message.success) {
                        form.hide();
                        orderPopUp.css('display', 'flex');
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }

                });
        }
    })
})