app.services.product = app.services.product || {};

// Version 3 //
app.services.product.getAll = function (isDeleted, onSuccess, onError) {
    var url = "/api/products/";
    if (isDeleted) {
        url = url + isDeleted;
    }

    var settings = {
        cache: false
        , contentType: "application/json"
        , success: onSuccess
        , error: onError
        , type: "GET"
        , xhrFields: {
            withCredentials: true
        }

    };
    $.ajax(url, settings)

};

app.services.product.getAlljerpProducts = function (onSuccess, onError) {
    var url = "/api/products/getAlljerp";
   
    var settings = {
        cache: false
        , contentType: "application/json"
        , success: onSuccess
        , error: onError
        , type: "GET"
        , xhrFields: {
            withCredentials: true
        }

    };
    $.ajax(url, settings)

};
app.services.product.get = function (id, onSuccess, onError) {
    var url = "/api/products/" + id;
    var settings = {
        cache: false
        , contentType: "application/json"
        , dataType: "json"
        , success: onSuccess
        , error: onError
         , type: "GET"
        , xhrFields: {
            withCredentials: true
        }
    };
    $.ajax(url, settings);
};
app.services.product.getProductType = function (productType, onSuccess, onError) {
    var url = "/api/products/productType/" + productType;
    var settings = {
        cache: false
        , contentType: "application/json"
        , dataType: "json"
        , success: onSuccess
        , error: onError
         , type: "GET"
        , xhrFields: {
            withCredentials: true
        }
    };
    $.ajax(url, settings);
};
app.services.product.add = function (newData, onSuccess, onError) {
    var url = "/api/products";

    var settings = {
        cache: false
        , contentType: "application/json"
        , dataType: "json"
        , data: JSON.stringify(newData)
        , success: function (responseData) {
            onSuccess(responseData, newData);
        }
        , error: function (resp) {
            console.log(resp);
        }
        , type: "Post"
        , xhrFields: {
            withCredentials: true
        }
    };
    $.ajax(url, settings);
};
app.services.product.update = function (data, onSuccess, onError) {
    var url = "/api/products/" + data.id;
    var settings = {
        cache: false
        , contentType: "application/json"
        , dataType: "json"
        , data: JSON.stringify(data)
        , success: onSuccess
        , error: onError
        , type: "PUT"
        , xhrFields: {
            withCredentials: true
        }

    };
    $.ajax(url, settings);
};
app.services.product.delete = function (id, onSuccess, onError) {
    var url = "/api/products/" + id;
    var settings = {
        cache: false
        , contentType: "application/json"
        , dataType: "json"
        , success: function (id, responseData) {
            onSuccess(id, responseData);
        }
        , error: onError
         , type: "Delete"
        , xhrFields: {
            withCredentials: true
        }
    };
    $.ajax(url, settings);
};
app.services.product.disable = function (id, onSuccess, onError) {
    var url = "/api/products/d/" + id;
    var settings = {
        cache: false
        , contentType: "application/json"
        , dataType: "json"
        , success: function (responseData) {
            onSuccess(responseData, id);
        }
        , error: onError
        , type: "PUT"
        , xhrFields: {
            withCredentials: true
        }
    };
    $.ajax(url, settings);
}
app.services.product.getAddons = function (product, onSuccess, onError)
{
    var url = "/api/products/addons/" + product.id;
    var settings = {
        cache: false, contentType: "application/json"
        , dataType: "json"
        , success: function (responseData) {
            onSuccess(responseData, product.index);
        }
        , error: onError
        , type: "GET"
        , xhrFields: {
            withCredentials: true
        }

    };
    $.ajax(url, settings);
}

app.services.product.getAccounts = function (id, onSuccess, onError) {
    var url = "/api/products/accounts/" + id;
    var settings = {
        cache: false, contentType: "application/json"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
        , xhrFields: {
            withCredentials: true
        }

    };
    $.ajax(url, settings);
}





// Utils //


app.services.product.activateDateTimePicker = (function (fx) {
    $('.datetimepicker').datetimepicker({
        icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-chevron-up",
            down: "fa fa-chevron-down",
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-screenshot',
            clear: 'fa fa-trash',
            close: 'fa fa-remove'
        }
    });
});

app.services.product.sweetAlert = function (fx, id) {
    // var myId = +$(this).data("id");
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'Yes, delete it!',
        buttonsStyling: false
    }).then(function (confirmed) {
        swal({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false,
            showConfirmButton: false,

        })
        if (confirmed) {
            fx(id);
        }
    });
};

app.services.product.addRelation = function (jerpProductId, HealthProductId, onSuccess, onError)
{
    var url = "/api/products/configure/" + jerpProductId + "/" + HealthProductId;

    var settings = {
        cache: false
       , contentType: "application/json"
       , dataType: "json"
       , data: null
       , success: function(resp)
       {
           onSuccess(resp, HealthProductId);
       }
       , error: onError
       , type: "POST"
       , xhrFields: {
           withCredentials: true
       }
    };
    $.ajax(url, settings);

}

app.services.product.deleteRelation = function (jerpProductId, HealthProductId, onSuccess, onError) {
    var url = "/api/products/configure/" + jerpProductId + "/" + HealthProductId;

    var settings = {
        cache: false
      , contentType: "application/json"
      , dataType: "json"
      , data: null
      , success: function (resp) {
          onSuccess(resp, HealthProductId);
      }
      , error: onError
      , type: "DELETE"
      , xhrFields: {
          withCredentials: true
      }
    };
    $.ajax(url, settings);

}

app.services.product.addCoachRelation = function (AccountId, ProductId, onSuccess, onError) {
    var url = "/api/products/configure/" + AccountId + "/" + ProductId;

    var settings = {
        cache: false
       , contentType: "application/json"
       , dataType: "json"
       , data: null
       , success: function (resp) {
           onSuccess(resp, AccountId);
       }
       , error: onError
       , type: "POST"
       , xhrFields: {
           withCredentials: true
       }
    };
    $.ajax(url, settings);

}

app.services.product.deleteCoachRelation = function (AccountId, ProductId, onSuccess, onError) {
    var url = "/api/products/configure/" + AccountId + "/" + ProductId;

    var settings = {
        cache: false
      , contentType: "application/json"
      , dataType: "json"
      , data: null
      , success: function (resp) {
          onSuccess(resp, AccountId);
      }
      , error: onError
      , type: "DELETE"
      , xhrFields: {
          withCredentials: true
      }
    };
    $.ajax(url, settings);

}

app.services.product.activateFlexisel = function (mediaArrLength) {
    $(window).load(function () {
        $("#flexiselDemo1").flexisel({
            visibleItems: 4,
            enableResponsiveBreakpoints: true,
            clone: (mediaArrLength <= 4 ? false : true),
            responsiveBreakpoints: {
                portrait: {
                    changePoint: 480,
                    visibleItems: 3
                },
                landscape: {
                    changePoint: 640,
                    visibleItems: 3
                },
                tablet: {
                    changePoint: 768,
                    visibleItems: 3
                }
            }
        }).removeClass("hideCarousel");

        /* This is used on ProductDetail.cshtml. */
        if (mediaArrLength <= 4) {
            $("#flexiselDemo1").addClass("fourOrLess");
        }
    });
}

app.services.product.getProductPagination = function (pageIndex, pageSize, productType, onSuccess, onError) {
    var url = "/api/products/page/" + pageIndex + "/" + pageSize + "/" + productType;

    var settings = {
        cache: false
        , contentType: "application/json"
        , success: onSuccess
        , error: onError
        , type: "GET"
        , xhrFields: {
            withCredentials: true
        }

    };
    $.ajax(url, settings)

};

app.services.product.getAccountsPagination = function (id, pageIndex, pageSize, onSuccess, onError) {
    var url = "/api/products/account/" + id + "/" + pageIndex + "/" + pageSize;

    var settings = {
        cache: false
        , contentType: "application/json"
        , success: onSuccess
        , error: onError
        , type: "GET"
        , xhrFields: {
            withCredentials: true
        }

    };
    $.ajax(url, settings)

};

app.services.product.getSearch = function (search, pageIndex, pageSize, productType, onSuccess, onError) {
    var url = "/api/products/" + search + "/" + pageIndex + "/" + pageSize + "/" + productType;

    var settings = {
        cache: false
        , contentType: "application/json"
        , success: onSuccess
        , error: onError
        , type: "GET"
        , xhrFields: {
            withCredentials: true
        }

    };
    $.ajax(url, settings)

};

app.services.product.getRecycled = function (pageIndex, pageSize, onSuccess, onError) {
    var url = "/api/products/recycled/" + pageIndex + "/" + pageSize;

    var settings = {
        cache: false
        , contentType: "application/json"
        , success: onSuccess
        , error: onError
        , type: "GET"
        , xhrFields: {
            withCredentials: true
        }

    };
    $.ajax(url, settings)

};
