/*http://webaim.org/techniques/*/
var obj,jsn;
$(document).ready(function() {
    obj = jsn = new Object();
    $("form").submit(function(e) {
            e.preventDefault();
             getUserDetails();
    });
});
function getUserDetails() {
    obj.arr = [];
    obj.currUser = $('#uname').val();
    $.getJSON('./templates/userdetails.json', function (data) {
       $.each(data.users, function(key, value){
           jsn.userData = data.users;
            if(value.username == obj.currUser){
                obj.arr = $.map(value, function(elem) { return elem; });
            }
             else if(obj.currUser == "admin"){
                 obj.arr = $.map(data.users, function(elem) { return elem; });
             }
        });
        $('.header-right').show();
        $('#loginBox').hide();
        checkUser(obj.currUser);       
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
   obj.userProfile = '\
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
        <button type="button" id="editBtn" class="btn btn-primary" onClick = "editProf($(this))"; style="float:right;background-color:#0174df">Edit</button>\
 	 </div>\
 	</div>\
</section>';
 $('#data').append(obj.userProfile);
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
                            <table id="alluserTable" class="table table-responsive table-bordered table-hover table-condensed">\
                              <caption style="text-align:center;color:#0101DF"><h4>Users List</h4></caption>\
                                 <thead>\
                                    <tr>\
                                      <th scope="col">User</th>\
                                       <th scope="col" id="username">Username</th>\
                                        <th scope="col" id="userId">UserId</th>\
                                        <th scope="col" id="location">Location</th>\
                                         <th scope="col" id="role">Role</th>\
                                         <th scope="col" id="skills">Skills</th>\
                                        <th scope="col" id="projects">Projects</th>\
                                        <th scope="col">Edit</th>\
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
                $('<td style="width:15%"><div><img class="img-responsive" src="img/emp_ico.png" class="img-thumbnail" alt="profile-picture"><div></td>'),
                $('<td scope="row">').text(val[i].username),
                $('<td>').text(val[i].userId),
                $('<td>').text(val[i].location),
                $('<td>').text(val[i].role),
                $('<td>').text(val[i].skills),
                $('<td>').text(val[i].projects),
                $('<td><button type="button" id="editBtn_'+val[i].username+'" class="btn btn-primary" style="align:center;background-color:#0174df" onClick = "whichUser($(this))">Edit</button></td>')).appendTo($("#all-data").find('tbody'));
    });
}
function whichUser(who){
    obj.whichuser = who;
    var user = who.attr('id').split("_")[1];
    $.each(jsn.userData, function(key, value){
        if(value.username == user){
                obj.arr= $.map(value, function(elem) { return elem; });
            }
    });
    editProf();
}
function onlogout(){
    $('#data > *:not(#loginBox)').remove();
    $('.header-right').hide();
    $('#loginBox').show();
}


