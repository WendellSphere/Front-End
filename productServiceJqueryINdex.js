
<style>
    .btnTab {
    background-color: lightgrey;
    }

</style>
@{
    Layout = "~/Views/Shared/_LayoutAdmin.cshtml";
}
<div>
        <button class="btn btn-primary createBtn">Create New Product</button>
</div>

<table class="table">
    <thead>
        <tr>
            <th class="text-center">#</th>
            <th>Title</th>
            <th>Base Price</th>
            <th>Modified By</th>
            <th>Modified Date</th>
            
            <th class="text-right">Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            
        </tr>
        
    </tbody>
</table>


            @section scripts{
                    
                    <script type="text/javascript" src="~/Scripts/app.services.product.js"></script>
                    <script type="text/javascript">
                        var index = 0;
                        app.page.startUp = function () {
                            console.log("Runnig");
                            app.page.handlers.loadProducts();
                            $("tbody").on("click", ".modifyBtn", app.page.handlers.editProduct); //card-list
                            $("tbody").on("click", ".deleteBtn", app.page.handlers.removeProduct);
                            $(".createBtn").on("click", app.page.handlers.goToCreatePage)
                            $("tbody").on("click", ".viewDescriptionBtn", app.page.handlers.showDescription)
                        }
                        // handlers //
                        app.page.handlers.showDescription = function () {
                            var active = this.closest("tr");
                            var id = $(this).data("id");
                            app.services.product.getProductById(id, app.page.onGetByIdSuccess, app.page.onFail);  
                        }
                        app.page.handlers.goToCreatePage = function () {
                            window.location.href = "products/create";
                        }
                        app.page.handlers.removeProduct = function () {
                            var active = this.closest("tr");
                            var id = $(this).data("id");
                            app.services.product.deleteProduct(id, app.page.onRemoveSuccess, app.page.onFail);
                            active.remove();
                        }

                        app.page.handlers.editProduct = function () {
                           // var active = this.closest(".card");
                            var id = $(this).data("id");
                            window.location.href = "/products/" + id + "/edit";
                        }
                        app.page.handlers.loadProducts = function () {
                            app.services.product.ajaxGetAll(app.page.onGetAllSuccess, app.page.onAjaxFail);
                        }



                        // ajax functions //
                        app.page.onGetByIdSuccess = function(data, xhr, status)
                        {
                            $(".modal-body").text(data.item.description);
                            app.page.openDescription();
                        }
                        
                        app.page.onGetAllSuccess = function (data, xhr, status) {
                            var size = data.items.length
                            for(var item in data.items)
                            {
                                var template = app.page.loadTemple();
                                $(".title", template).text(data.items[item].title);
                                //$("p.card-title span", template).text(data.items[item].description);
                                $(".basePrice", template).text(data.items[item].priceFormatted);
                                $(".createdBy", template).text(data.items[item].createdBy);
                                $(".createdDate", template).text(data.items[item].createdDate);
                                $(".modifiedBy", template).text(data.items[item].modifiedBy);
                                $(".modifiedDate", template).text(data.items[item].modifiedDateFormatted);
                                $(".modifyBtn", template).attr("data-id", data.items[item].id);
                                $(".deleteBtn", template).attr("data-id", data.items[item].id);
                                $(".viewDescriptionBtn", template).attr("data-id", data.items[item].id);

                                //app.page.handlers.storeIndex(template);
                                //index = app.page.generateId();
                                //$(".index", template).attr("data-id", index);
                                $(".index", template).text(size)
                                size--;
                                $("tbody").prepend(template);
                            }

                        }

                        app.page.onAjaxFail = function (xhr, status, errorThrown) {
                            console.log(status + "/" + errorThrown + "/" + xhr.ResponseText);
                        }
                        // util functions//
                      
                        app.page.loadTemple = function () {
                            return $($("#template3").html());
                        }

                        app.page.generateId = function () {
                            return index + 1;
                        }

                        app.page.openDescription = function () {
                            $("#dModal").modal("show");
                        }

                    </script>

                
                    <div id="dModal" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Description: </h4>
      </div>
      <div class="modal-body">
        <p>One fine body&hellip;</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        @*<button type="button" class="btn btn-primary">Save changes</button>*@
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
                

  

        <script type="text/html" id="template">

            <tr>
                <td class="title">Dakota Rice</td>
                <td class="description">Niger</td>
                <td class="text-primary basePrice">$36,738</td>
                <td class="createdBy">Oud-Turnhout</td>
                <td class="createdDate">Oud-Turnhout</td>
                <td class="modifiedBy">Oud-Turnhout</td>
                <td class="modifiedDate">Oud-Turnhout</td>
            </tr>
        </script>

                <script type="text/html" id="template3">
                    <tr>
                        <td class="text-center index">1</td>
                        <td class="title">Andrew Mike</td>
                        <td class="basePrice">&euro; Develop</td>
                        <td class="modifiedBy">2013</td>
                        <td class="modifiedDate"> 99,225</td>
                        <td class="td-actions text-right">
                            <button type="button" rel="tooltip" title="View Description" class="btn btn-info btn-simple btn-xs viewDescriptionBtn">
                                @*<i class="fa fa-user"></i>*@
                                @*<i class="md-icon dp48">description</i>*@
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="18" viewBox="0 0 24 24" width="18">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                                </svg>
                            </button>
                            <button type="button" rel="tooltip" title="Edit Product" class="modifyBtn btn btn-success btn-simple btn-xs">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" rel="tooltip" title="Remove" class="deleteBtn btn btn-danger btn-simple btn-xs">
                                <i class="fa fa-times"></i>
                            </button>
                        </td>
                    </tr>
                </script>



                    <script type="text/html" id="template2">
                        <div class="card">
                            <div class="card-header card-header-text" data-background-color="orange">
                                <h4 class="card-title">Title: <span></span></h4>
                                <p class="card-title">Description: <span class="category">sflkdsjgew kje ewjgoi w egjk qriogj w rlga;jweoiej iesoewiogj ioweg ;oiweg iesg;iwiasgej ksldgjkl rjgierq lqkgjrsgo irasdkgjrosigj roig jrirjg qe</span></p>
                                <td class="td-actions text-right">
                                    <div>
                                        
                                            <button type="button" rel="tooltip" title="" class="btnTab btn btn-primary btn-simple btn-xs modifyBtn" data-original-title="Edit Task">
                                                <i class="material-icons btnTab">edit</i>
                                            </button>
                                       


                                        <button type="button" rel="tooltip" title="" class="btn btn-danger btn-simple btn-xs deleteBtn" data-original-title="Remove">
                                            <i class="material-icons">close</i>
                                        </button>
                                    </div>
                            </td>
                        </div>
                            <div class="card-content table-responsive">
                                <table class="table table-hover">
                                    <thead class="text-warning">
                                        <tr>
                                            <th>Base Price</th>
                                            <th>Created By</th>
                                            <th>Created Date</th>
                                            <th>Modified By</th>
                                            <th>Modified Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="basePrice text-primary">1</td>
                                            <td class="createdBy">Dakota Rice</td>
                                            <td class="createdDate">$36,738</td>
                                            <td class="modifiedBy">Niger</td>
                                            <th class="modifiedDate">Modified Date</th>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </script>

}



