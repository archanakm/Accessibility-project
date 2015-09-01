var obj;
$(document).ready(function() {
    obj = new Object();
    $("form").submit(function(e) {
            e.preventDefault();
            getUserDetails();
    });
});

function getUserDetails() {
    obj.arr = [];
    obj.user = $('#uname').val();
    $.getJSON('./templates/userdetails.json', function (data) {
         $.each(data.users, function(key, value){
            if(value.username == obj.user){
                obj.arr = $.map(value, function(elem) { return elem; });
            
            }
             else if(obj.user == "admin"){
                 obj.arr = $.map(data.users, function(elem) { return elem; });
             }
        });
        $('.header-right').show();
        $('#loginBox').hide();
        checkUser(obj.user);       
     });  
}
function checkUser(user){
    if(user == obj.arr[0]) {
        loadProfiles(obj.arr);
    }
    else {
        loadAllUsers(obj.arr);
    }
}
function loadProfiles(val){
    var userProfile = '\
        <section class="user-data">\
	<div class="panel panel-primary">\
	   <div class="panel-heading">User profile</div>\
	      <div class="panel-body">\
		<div id ="profileBox" class="profileBox clearfix">\
		           <div class = "profPic">\
                           <img src="img/emp_ico.png" class="img-responsive" alt="profile picture" width="80"                                           height="100">\
                                     </div>\
                    <div class = "profDetails">\
            <ul class="list-group profList">\
                <li class="list-group-item-text" id="username">\
                    <i>Employee Name:</i>\
                        <v>User-1</v>\
                                </li>\
                                <li class="list-group-item-text" id="userId">\
                                    <i>Employee Id:</i>\
                                    <v>Emp -101</v>\
                                </li>\
                                <li class="list-group-item-text" id="location">\
                                    <i>Location :</i>\
                                     <v>India</v>\
                                </li>\
                                <li class="list-group-item-text" id="role">\
                                    <i>Role :</i>\
                                    <v>Software Developer</v>\
                                </li>\
                                <li class="list-group-item-text" id="skills">\
                                    <i>Skills :</i>\
                                    <v>HTML5, CSS, JQuery</v>\
                                </li>\
                                <li class="list-group-item-text" id="projects">\
                                    <i>Projects :</i>\
                                   <v>P1, P2, P3</v>\
                                </li>\
                       </ul>\
	               </div>\
         </div>\
        <button type="button" id="editBtn" class="btn btn-primary" style="float:right;background-color:#0174df"     >Edit</button>\
 	 </div>\
 	</div>\
</section>';
 $('#data').append(userProfile);
    
    $.each($(".profList li"), function(i){ 
        obj.itemId = $(this).attr('id');
         $("li[id="+obj.itemId+"]").find("v").text(val[i]);
    });
}
function loadAllUsers(val){
    var alldata =  '\
        <section class="all-data" id="all-data">\
                 <div class="panel panel-primary">\
                    <div class="panel-heading"></div>\
                        <div class="panel-body">\
                          <section class = "table-responsive">\
                            <table class="table table-responsive table-bordered table-hover table-condensed">\
                              <caption style="text-align:center;color:#0101DF"><h4>Users List</h4></caption>\
                                 <thead>\
                                    <tr>\
                                      <th>User</th>\
                                       <th>Username</th>\
                                        <th>UserId</th>\
                                        <th>Location</th>\
                                         <th>Role</th>\
                                         <th>Skills</th>\
                                        <th>Projects</th>\
                                        <th>Edit</th>\
                                       </tr>\
                                    </thead>\
                                <tbody>\
                             </tbody>\
                             </table>\
                            </section>\
                         </div>\
                     </div>\
               </section>';
    $('#data').append(alldata);
    $.each(val, function(i){
                $('<tr class = "danger">').append(
                $('<td style="width:15%"><div><img class ="img-responsive" src="img/emp_ico.png" class="img-thumbnail" alt="profile picture"><div></td>'),
                $('<td>').text(val[i].username),
                $('<td>').text(val[i].userId),
                $('<td>').text(val[i].location),
                $('<td>').text(val[i].role),
                $('<td>').text(val[i].skills),
                $('<td>').text(val[i].projects),
                $('<td><button type="button" id="editBtn'+i+'" class="btn btn-primary" style="align:center;background-color:#0174df">Edit</button></td>')).appendTo($("#all-data").find('tbody'));
    });
        $("#editBtn").on('click', function() {
            alert('you clicked me!');
    });
}
function editProf(){
    $("#myModal").modal();
}
function SaveData(){
 $(".form-control").each(function(val) {
    obj.itemId = $(this).attr('id');
     if($(this).val() != ''){
        $("li[id="+obj.itemId+"]").find("v").text($(this).val());
         $(this).val(" ");
     }
 });
}
function onlogout(){
    $('#data > *:not(#loginBox)').remove();
    $('.header-right').hide();
    $('#loginBox').show();
}


