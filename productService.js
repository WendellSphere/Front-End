(function () {
    "use strict";

    angular.module(APPNAME).factory('$productService', ProductService);

    ProductService.$inject = ['$baseService', '$sabio', '$http'];

    function ProductService($baseService, $sabio, $http) {
        var productServiceObj =  {
            getProducts: _getProducts
            ,get3Products: _get3Products
            , getAddOns: _getAddOns
        };

        var newService = $baseService.merge(true, {}, productServiceObj, $baseService);

        return newService;

        function _get3Products(onSuccess, onError) {
            $http({
                method: "GET",
                url: "/api/products/addons"
            }).then(onSuccess
                , onError);
        }
        function _getAddOns(id, onSuccess, onError) {
            
            $http({
                method: "GET",
                url: "/api/products/addons/" + id
            }).then(onSuccess
                , onError);          
        }

        function _getProducts(onSuccess,onError) {
            $http({
                method: "GET",
                url: "/api/products/getall"
            }).then(onSuccess
               , onError);
        }


    }
})();