var young = {} || young;

young.drawTable = function(){
    $.ajax({
        url : "http://localhost:3000/Young",
        method : "GET",
        dataType : "json",
        success : function(data){
            $('#tbYoung').empty();
            $.each(data, function(i, v){
                $('#tbYoung').append(
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
                    "<a href='javascript:;' title='Edit Player'onclick='young.get("+v.id+")'><i class=\"fa fa-edit\"></i></a>"+
                    "<a href='javascript:;' title='Remove Player'onclick='young.delete("+v.id+")'><i class=\"fa fa-user-times\"></i></a>"+
                    "</td>"+
                    "</tr>"
                );
            });
            $('#myTable').DataTable();
        }
    });
};

young.openModal = function(){
    young.reset();
    $('#addYoung').modal('show');
};
young.editModal = function(){
    $('#editYoung').modal('show');
};

young.save = function(){
    if($('#formAddEditYoung').valid()){
        var youngObj = {};
        youngObj.Avatar = $('#Avatar').val();
        youngObj.FullName = $('#FullName').val();
        youngObj.DOB = $('#DOB').val();
        youngObj.Nation = $('#Nation').val();
        youngObj.Foot = $('#Foot').val();
        youngObj.Height = $('#Height').val();
        youngObj.Position = $('#Position').val();

        $.ajax({
            url : "http://localhost:3000/Young",
            method : "POST",
            dataType : "json",
            contentType : "application/json",
            data : JSON.stringify(youngObj),
            success : function(data){
                $('#addYoung').modal('hide');
                first.drawTable();
            }
        });
    }
};
young.saveEdit = function(){
    if($('#formEditYoung').valid()){
        var youngObj = {};
        youngObj.Avatar = $('#AvatarEdit').val();
        youngObj.FullName = $('#FullNameEdit').val();
        youngObj.DOB = $('#DOBEdit').val();
        youngObj.Nation = $('#NationEdit').val();
        youngObj.Foot = $('#FootEdit').val();
        youngObj.Height = $('#HeightEdit').val();
        youngObj.Position = $('#PositionEdit').val();
        youngObj.id = $('#id').val();
        $.ajax({
            url : "http://localhost:3000/Young/" + youngObj.id,
            method : "PUT",
            dataType : "json",
            contentType : "application/json",
            data : JSON.stringify(youngObj),
            success : function(data){
                $('#editYoung').modal('hide');
                first.drawTable();
            }
        });
    }
};
young.delete = function(id){
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
                    url : "http://localhost:3000/Young/"+id,
                    method : "DELETE",
                    dataType : "json",
                    success : function(data){
                        young.drawTable();
                    }
                })
            }
        }
    });
};
young.get = function(id){
    $.ajax({
        url: "http://localhost:3000/Young/"+id,
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
            young.editModal();
        }
    });
};
young.reset = function(){
    $('#Avatar').val('');
    $('#FullName').val('');
    $('#DOB').val('');
    $('#Nation').val('');
    $('#Foot').val('');
    $('#Height').val('');
    $('#Position').val('');
};
young.init = function(){
    young.drawTable();
};

$(document).ready(function(){
    young.init();
});