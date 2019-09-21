var cart = {};
$("form#addProduct").on("submit", function (e) {
    e.preventDefault();
    console.log($($(this).children()[0]).val());
    var quantity = $($(this).children()[0]).val();
    var product = $(this).parent().children(".card-title").text();
    var price = $(this).parent().children(".price").text();
    var type = $(this).parent().children(".type").text();
    var total = Number(price) * Number(quantity);
    // cart[$(this).parent().children(".card-title").text()] = $($(this).children()[0]).val();
    if (quantity != "" && quantity != "0") {
        // $("#cart").append("<li>" + product + "<ul><li>Quantity: " + quantity + "</li>" + "<li>Price: $" + total + "</li></ul></li>");
        if (product in cart) {
            cart[product]["quantity"] += Number(quantity);
            cart[product]["price"] += Number(total);
        } else {
            cart[product] = {};
            cart[product]["quantity"] = Number(quantity);
            cart[product]["price"] = Number(total);
            cart[product]["type"] = type;
        }
        $("#cart").html("<h5>Your selection: </h5>");
        $(".modal-body").html("");
        Object.keys(cart).forEach(function (item) {
            $("#cart").append("<li>" + item + "<ul><li>Quantity: " + cart[item]["quantity"] +
                "</li>" + "<li>Price: $" + cart[item]["price"] + "</li></ul></li>");
            $(".modal-body").append("<li>" + item + "<ul><li>Quantity: " + cart[item][
                    "quantity"
                ] +
                "</li>" + "<li>Price: $" + cart[item]["price"] + "</li></ul></li>");
        });
    }
    $($(this).children()[0]).val("");
});


$(document).ready(function () {
    $("#checkout").on("click", function () {
        var checkBike = false;
        Object.keys(cart).forEach(function (item) {
            if (cart[item]["type"] == "bike") {
                checkBike = true;
            }
        });
        if (!checkBike) {
            $("#error").removeClass("hide");
        } else {
            $("#error").addClass("hide");
            $("form#upload").submit();
        }
    });
});

$("#checkoutmodal").on("click", function () {
    var checkBike = false;
    var total = 0;
    Object.keys(cart).forEach(function (item) {
        if (cart[item]["type"] == "bike") {
            checkBike = true;
        }
        total += cart[item]["price"];
    });
    if (checkBike) {
        $("#error").addClass("hide");
    }
    $("#totalPrice").text("Total Price: $" + total.toFixed(2));
});

$("#remove").on("click", function () {
    cart = {};
    $("#cart").html("<h5>Your selection: </h5>")
});