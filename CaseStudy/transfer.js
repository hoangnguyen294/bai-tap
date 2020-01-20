var transfer = {} || transfer;

transfer.drawTable = function(){
    $.ajax({
        url : "http://localhost:3000/Transfer",
        method : "GET",
        dataType : "json",
        success : function(data){
            $('#tbTransfer').empty();
            $.each(data, function(i, v){
                $('#tbTransfer').append(
                    "<tr>"+
                    "<td>"+ (i+1) +"</td>"+
                    "<td><img src='"+ v.Avatar +"' width='50px' height='60px' /></td>"+
                    "<td>" + v.FullName + "</td>"+
                    "<td>"+ v.DOB +"</td>"+
                    "<td>"+ v.Nation +"</td>"+
                    "<td>"+ v.Foot +"</td>"+
                    "<td>"+ v.Height +"</td>"+
                    "<td>"+ v.Position +"</td>"+
                    "<td>" +
                    "<a href='javascript:;' title='Edit Player'onclick='transfer.get("+v.id+")'><i class=\"fa fa-edit\"></i></a>"+
                    "<a href='javascript:;' title='Remove Player'onclick='transfer.delete("+v.id+")'><i class=\"fa fa-user-times\"></i></a>"+
                    "</td>"+
                    "</tr>"
                );
            });
            $('#myTable').DataTable();
        }
    });
};

transfer.openModal = function(){
    transfer.reset();
    $('#addTransfer').modal('show');
};
transfer.editModal = function(){
    $('#editTransfer').modal('show');
};

// transfer.save = function(){
//     if($('#formAddEditTransfer').valid()){
//         var transferObj = {};
//         transferObj.Avatar = $('#Avatar').val();
//         transferObj.FullName = $('#FullName').val();
//         transferObj.DOB = $('#DOB').val();
//         transferObj.Nation = $('#Nation').val();
//         transferObj.Foot = $('#Foot').val();
//         transferObj.Height = $('#Height').val();
//         transferObj.Position = $('#Position').val();
//
//         $.ajax({
//             url : "http://localhost:3000/Transfer",
//             method : "POST",
//             dataType : "json",
//             contentType : "application/json",
//             data : JSON.stringify(transferObj),
//             success : function(data){
//                 $('#addTransfer').modal('hide');
//                 transfer.drawTable();
//             }
//         });
//     }
// };
transfer.saveEdit = function(){
    if($('#formEditTransfer').valid()){
        var transferObj = {};
        transferObj.Avatar = $('#AvatarEdit').val();
        transferObj.FullName = $('#FullNameEdit').val();
        transferObj.DOB = $('#DOBEdit').val();
        transferObj.Nation = $('#NationEdit').val();
        transferObj.Foot = $('#FootEdit').val();
        transferObj.Height = $('#HeightEdit').val();
        transferObj.Position = $('#PositionEdit').val();
        transferObj.id = $('#id').val();
        $.ajax({
            url : "http://localhost:3000/Transfer/" + transferObj.id,
            method : "PUT",
            dataType : "json",
            contentType : "application/json",
            data : JSON.stringify(transferObj),
            success : function(data){
                $('#editTransfer').modal('hide');
                first.drawTable();
            }
        });
    }
};
transfer.delete = function(id){
    bootbox.confirm({
        title: "Remove Player",
        message: "Do you want to remove this player now?",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> Cancel'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Confirm'
            }
        },
        callback: function (result) {
            if(result){
                $.ajax({
                    url : "http://localhost:3000/Transfer/"+id,
                    method : "DELETE",
                    dataType : "json",
                    success : function(data){
                        transfer.drawTable();
                    }
                })
            }
        }
    });
};
transfer.get = function(id){
    $.ajax({
        url: "http://localhost:3000/Transfer/"+id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#AvatarEdit').val(data.Avatar);
            $('#FullNameEdit').val(data.FullName);
            $('#DOBEdit').val(data.DOB);
            $('#NationEdit').val(data.Nation);
            $('#FootEdit').val(data.Foot);
            $('#HeightEdit').val(data.Height);
            $('#PositionEdit').val(data.Position);
            $('#id').val(data.id);
            transfer.editModal();
        }
    });
};
transfer.reset = function(){
    $('#Avatar').val('');
    $('#FullName').val('');
    $('#DOB').val('');
    $('#Nation').val('');
    $('#Foot').val('');
    $('#Height').val('');
    $('#Position').val('');
};
transfer.init = function(){
    transfer.drawTable();
};

$(document).ready(function(){
    transfer.init();
});