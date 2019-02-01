const { ipcRenderer } = require("electron");
const pengguna = require("../utils/pengguna");
const rendPengguna = require("../utils/render-pengguna");

$(document).ready(function() {
  $("#edit_user_password").click(function(e) {
    e.preventDefault();
    //console.log('clik update btn')
    var userId = $("#user_id").val();
    var userPassword = $("#user_password").val();
    var userUsername = $("#user_username").val();
    let arg = [userPassword, userUsername, userId];
    //updateUser(userId, arg);
    pengguna.update(arg).then(data => {
      console.log(data);
      $("#user_modal").modal("hide");
      rendPengguna.renderPengguna();
    });
  });

  function updateUser(userId, userPassword) {
    ipcRenderer.send("update-user", [userPassword, userId]);
    ipcRenderer.on("data-update-user", (event, arg) => {
      //console.log('user', arg)
      if (arg) {
        //getAlluser()
        $("#user_modal").modal("hide");
      }
    });
  }
});
