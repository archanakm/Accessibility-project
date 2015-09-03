function editProf(){
 var modal = '\
     <div class="modal fade" id="myModal" data-backdrop="static" role="dialog" style="color:black">\
    <div class="modal-dialog">\
      <div class="modal-content">\
        <div class="modal-header">\
          <button type="button" class="close" data-dismiss="modal">&times;</button>\
          <h4>User details</h4>\
        </div>\
        <div class="modal-body" style="padding:40px 50px;">\
          <form role="form">\
            <div class="form-group">\
              <label for="username">Employee Name</label>\
              <input type="text" class="form-control" id="uname" title="username" name="username" aria-required="true">\
<br>\
              <label for="empid">Employee Id</label>\
              <input type="text" class="form-control" id="empid" title="empid" name="empid" aria-required="true">\
<br>\
              <label for="location">Location</label>\
              <input type="text" class="form-control" id="location" title="location" name="location" aria-required="true">\
<br>\
              <label for="role">Role</label>\
              <input type="text" class="form-control" id="role" title="role" name="role" aria-required="true">\
<br>\
              <label for="skills">Skills</label>\
              <input type="text" class="form-control" id="skills" title="skills" name="skills" aria-required="true">\
<br>\
              <label for="projects">Projects</label>\
              <input type="text" class="form-control" id="projects" title="projects" name="title" aria-required="true">\
<br>\
            </div>\
         </form>\
        </div>\
        <div class="modal-footer">\
        <button type="submit" class="btn btn-success btn-default pull-left" data-dismiss="modal" onClick="saveProf()">Save</button>\
          <button type="submit" class="btn btn-primary btn-default pull-left" data-dismiss="modal">Cancel</button>\
        <button type="submit" id="deleteBtn" class="btn btn-danger btn-default pull-right" data-dismiss="modal" onClick="deleteProf()" style="display:none">Delete</button>\
         </div>\
      </div>\
    </div>\
  </div>';
    
    $(".container").append(modal);
     $("#myModal").modal();
    if(obj.currUser == "admin") $('#deleteBtn').show();
     $.each($(".form-group input[type=text]"), function(i){ 
        $(this).val(obj.arr[i]);
    });
}
function saveProf(){
     $.each($(".form-group input[type=text]"), function(i){ 
         obj.arr[i] = $(this).val();
     });
    updateData();
}
function updateData(){
    if(obj.currUser == "admin"){
        $.each($(obj.whichuser.parent().parent()), function(i){
            $(this).text(obj.arr[i]);
        });
    }
    else{
        $.each($(".profList li"), function(i){
         obj.itemId = $(this).attr('id');
            if(obj.arr[i] != ""){
                $("li[id="+obj.itemId+"]").find("v").text(obj.arr[i]);
            }
        });
    }
}
function deleteProf(){
        var td = obj.whichuser.parent();
        var tr = td.parent();
               tr.fadeOut(700, function(){
               tr.remove();
                if($('#alluserTable >tbody >tr').length < 1){
                    $('#data > *:not(#loginBox)').remove();
                      var confirmation = '\
                        <section class = "confirm"><h3>All records deleted</h3></section>';
                        $('#data').append(confirmation);
                }
         });
}


