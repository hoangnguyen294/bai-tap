var first = {} || first;

first.drawTable = function(){
    $.ajax({
        url : "http://localhost:3000/First",
        method : "GET",
        dataType : "json",
        success : function(data){
            $('#tbFirst').empty();
            $.each(data, function(i, v){
                $('#tbFirst').append(
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
                        "<a href='javascript:;' title='Edit Player'onclick='first.get("+v.id+")'><i class=\"fa fa-edit\"></i></a>"+
                        "<a href='javascript:;' title='Remove Player'onclick='first.delete("+v.id+")'><i class=\"fa fa-user-times\"></i></a>"+
                        "<a href='javascript:;' title='Edit Player'onclick='first.go("+v.id+")'><i class=\"fa fa-walking\"></i></a>"+
                    "</td>"+
                    "</tr>"
                );
            });
            $('#myTable').DataTable();
        }
    });
};

first.openModal = function(){
    first.reset();
    $('#addFirst').modal('show');
};
first.editModal = function(){
    $('#editFirst').modal('show');
};

first.save = function(){
    if($('#formAddEditFirst').valid()){
        var firstObj = {};
        firstObj.Avatar = $('#Avatar').val();
        firstObj.FullName = $('#FullName').val();
        firstObj.DOB = $('#DOB').val();
        firstObj.Nation = $('#Nation').val();
        firstObj.Foot = $('#Foot').val();
        firstObj.Height = $('#Height').val();
        firstObj.Position = $('#Position').val();

        $.ajax({
            url : "http://localhost:3000/First",
            method : "POST",
            dataType : "json",
            contentType : "application/json",
            data : JSON.stringify(firstObj),
            success : function(data){
                $('#addFirst').modal('hide');
                first.drawTable();
            }
        });
    }
};
first.saveEdit = function(){
    if($('#formEditFirst').valid()){
        var firstObj = {};
        firstObj.Avatar = $('#AvatarEdit').val();
        firstObj.FullName = $('#FullNameEdit').val();
        firstObj.DOB = $('#DOBEdit').val();
        firstObj.Nation = $('#NationEdit').val();
        firstObj.Foot = $('#FootEdit').val();
        firstObj.Height = $('#HeightEdit').val();
        firstObj.Position = $('#PositionEdit').val();
        firstObj.id = $('#id').val();
        $.ajax({
            url : "http://localhost:3000/First/" + firstObj.id,
            method : "PUT",
            dataType : "json",
            contentType : "application/json",
            data : JSON.stringify(firstObj),
            success : function(data){
                $('#editFirst').modal('hide');
                first.drawTable();
            }
        });
    }
};
// transfer.saveTransfer = function(){
//     if($('#formEditTransfer').valid()){
//         var transferObj = {};
//         transferObj.Avatar = $('#AvatarEdit').val();
//         transferObj.FullName = $('#FullNameEdit').val();
//         transferObj.DOB = $('#DOBEdit').val();
//         transferObj.Nation = $('#NationEdit').val();
//         transferObj.Foot = $('#FootEdit').val();
//         transferObj.Height = $('#HeightEdit').val();
//         transferObj.Position = $('#PositionEdit').val();
//         transferObj.id = $('#id').val();
//         $.ajax({
//             url : "http://localhost:3000/Transfer/" + transferObj.id,
//             method : "PUT",
//             dataType : "json",
//             contentType : "application/json",
//             data : JSON.stringify(transferObj),
//             success : function(data){
//                 $('#editTransfer').modal('hide');
//                 first.drawTable();
//             }
//         });
//     }
// };
first.delete = function(id){
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
                    url : "http://localhost:3000/First/"+id,
                    method : "DELETE",
                    dataType : "json",
                    success : function(data){
                        first.drawTable();
                    }
                })
            }
        }
    });
};
// first.get = function(id){
//     $.ajax({
//         url: "http://localhost:3000/First/"+id,
//         method: "GET",
//         dataType: "json",
//         success: function (data) {
//             $('#AvatarEdit').val(data.Avatar);
//             $('#FullNameEdit').val(data.FullName);
//             $('#DOBEdit').val(data.DOB);
//             $('#NationEdit').val(data.Nation);
//             $('#FootEdit').val(data.Foot);
//             $('#HeightEdit').val(data.Height);
//             $('#PositionEdit').val(data.Position);
//             $('#id').val(data.id);
//             first.editModal();
//         }
//     });
// };
// first.go = function(){
//     first.get();
//     transfer.saveTransfer();
//
// }
first.reset = function(){
    $('#Avatar').val('');
    $('#FullName').val('');
    $('#DOB').val('');
    $('#Nation').val('');
    $('#Foot').val('');
    $('#Height').val('');
    $('#Position').val('');
};
first.init = function(){
    first.drawTable();
};

$(document).ready(function(){
    first.init();
});