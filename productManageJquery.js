@model app.Web.Models.ViewModels.ItemViewModel<int>   

@{ 
    Layout = "~/Views/Shared/_LayoutAdmin.cshtml";
}

<div class="container-fluid">
    @*<div class="row">
        <div class="logo2 col-md-offset-3" style="position:relative; z-index:1; margin-top:31px;">
            <a href="http://jerpgirlstudio.com"><img src="http://jerpgirlstudio.com/wp-content/themes/jerp/images/logo.png" border="o" width="497" height="114"></a>
        </div>
    </div>*@
<div class="row">
    <div class="col-md-6 col-md-offset-3">
        <div class="card">
            <form id="productForm">
                <input type="hidden" id="productId" value="@Model.Item" />
               
                <div class="card-header card-header-icon" data-background-color="rose">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24">
                        <path clip-rule="evenodd" d="M0 0h24v24H0z" fill="none" />
                        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
                    </svg>
                </div>
                <div class="card-content">
                    <h2 class="card-title">New Product</h2>
                    <div class="form-group label-floating">
                        <label for="productTitle" class="control-label">
                            Title
                            <star>*</star>
                        </label>
                        <input name="title" type="text" id="title" class="form-control" required="true" />
                    </div>
                    <div class="form-group label-floating">
                        <label for="description" class="control-label">Description<star>*</star>
                        </label>
                        <textarea name="description" type="text" id="description" class="form-control" rows="4" cols="100" required="true"></textarea>
                    </div>
                    <div class="form-group label-floating">
                        <label for="basePrice" class="control-label">
                            Base Price:
                            <star>*</star>
                        </label>
                        <input name="basePrice" type="text" id="basePrice" class="form-control" required="true" />
                    </div>
                    <div class="form-group label-floating byUser">
                        <label for="createdBy" class="control-label">
                            Created By:
                        </label>
                        <input name="createdBy" type="text" id="createdBy" class="form-control" />
                    </div>
                    <div class="form-group label-floating dateActive">
                        <label class="label-control">
                            Created Date
                          
                        </label>
                        <input name="createdDate" type="text" id="createdDate" class="form-control datetimepicker" value="" /> 
                    </div>
                    <div class="category form-category">
                        <star>*</star> Required fields
                    </div>
                    <div class="text-center">
                        <button type="button" id="btnSubmit" class="btn btn-rose btn-fill btn-wd">Create</button> 
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</div>


@section scripts{
<script type="text/javascript" src="~/Scripts/app.services.product.js"></script>
<script type="text/javascript">
            app.page.productId= null;  //  initialize a property to hold the id

            app.page.startUp = function ()
            {
                app.page.productId = $("#productId").val();
                app.page.intializeFormValidation();

                if (app.page.productId > 0) {  // && app.page.productId.length 
                    console.log("EDIT mode - go get the data");
                    app.page.handlers.editMode();
                   
                    $("#btnSubmit").on("click", app.page.handlers.modifyProduct);
                }
                else {
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
                    console.log("CREATE mode - id is empty");
                    $("#btnSubmit").on("click", app.page.handlers.createProduct);
                    
                };
            }

            app.page.intializeFormValidation = function () {
                jQuery.validator.setDefaults({
                    debug: true
                });

                jQuery.validator.addMethod("money", function (value, element)
                { return /^\d{0,4}(\.\d{0,2})?$/.test(value); });

                $("#productForm").validate({
                    rules: {
                        "title": {
                            required: true
                            , minlength: 3
                            , maxlength: 50
                        }
                        , "description": {
                            required: true
                            , minlength: 5
                            , maxlength: 500
                        }
                         , "basePrice": {
                             required: true
                            , money: true
                         }
                    },
                    messages: {
                        "title": {
                            required: "Please Enter a Title"
                            , minlength: "Please enter more than 3 characters"
                            , maxlength: "Please enter less than 50 character"
                        }
                        ,
                        //"lastName": "Please Enter your Last Name",
                        "description": {
                            required: "Please enter a description"
                            , minlength: "Please enter more than 5 characters"
                            , maxlength: "Please enter less than 500 character"
                        },
                        //,
                        "basePrice": {
                            required: "Please enter a base Price"
                           , money: "Please enter decimal numbers"
                        }

                    }
                    , errorPlacement: function (error, element) {
                        $(element).parent('div').addClass('has-error');
                    }
                });
            }

            app.page.handlers.modifyProduct = function () {
                if ($("#productForm").valid()) {
                    app.services.product.updateProduct(app.page.readForm(), app.page.onModifySuccess, app.page.onFail);
                }
            }
        
            app.page.handlers.editMode = function () {
                $(".dateActive").remove();
                $(".byUser").remove();
                $("h2.card-title").text("Modify Product");
                $("#btnSubmit").html("Submit");
                app.services.product.getProductById(app.page.productId, app.page.onGetProductSuccess, app.page.onFail);
                
            }
            app.page.handlers.createProduct = function () {
                if ($("#productForm").valid())
                {
                    var data = app.page.readValues();
                    app.services.product.addProduct(data, app.page.onAddSuccess, app.page.onFail);
                }
            }
            app.page.onGetProductSuccess = function (data, status, xhr) {
                console.log(data);
                app.page.setForm(data.item);
                $("#title").val(data.item.title).change();
                $("#description").val(data.item.description).change();
                $("#basePrice").val(data.item.basePrice).change();
                $("#createdBy").val(data.item.modifiedBy).change();
            }

            app.page.onModifySuccess = function (data, status, xhr) {
                window.location.href = "/products";
            }
            
            app.page.onAddSuccess = function (data, newData) {
                console.log("Post Success");
                //console.log(newData);
                $('#productForm')[0].reset();
            }

            app.page.onFail = function (xhr, status, errorThrown) {
                console.log(status + "/" + errorThrown + "/" + xhr.response);
            };
            app.page.setForm = function (data) {

                $("#title").val(data.title);
                $("#description").val(data.description);
                $("#basePrice").val(data.basePrice);
                $("#createdBy").val(data.modifiedBy);
            }
            app.page.readForm = function () {
                var data = {
                     id: app.page.productId
                    , title: $("#title").val()
                    , description: $("#description").val()
                    , basePrice: $("#basePrice").val()
                };
                return data;
            }
            app.page.readValues = function () {
                var data = {
                    title: $("#title").val()
                    , description: $("#description").val()
                    , basePrice: $("#basePrice").val()
                    , createdBy: $("#createdBy").val()
                    , createdDate: $("#createdDate").val()
                };

                return data;
            }
            //app.services.product.addProduct
  </script>
    }
  
