const { ipcRenderer } = require("electron");
const pengguna = require("../utils/render-pengguna");

$(document).ready(function() {
  var tablePengguna = $("#table-pengguna tbody");
  //$('#modal_user').load('./sections/modal_pengguna.html')

  // getAlluser();
  pengguna.renderPengguna();

  function btnEdit() {
    $(".btn-user").click(function() {
      var userId = $(this).attr("data-id");
      var userLevel = $(this).attr("data-level");
      $("#user_modal_title").text("Edit Password " + userLevel);
      $("#user_id").val(userId);

      //console.log('click edit user', {userid : userId, level : userLevel})
    });
  }

  function getAlluser() {
    ipcRenderer.send("get-all-user");
    ipcRenderer.on("data-all-user", (event, arg) => {
      //console.log('data all user',arg)
      tablePengguna.empty();
      arg.map((user, index) => {
        tablePengguna.append(
          "<tr>" +
            "<td>" +
            (index + 1) +
            "</td>" +
            "<td>" +
            user.user_level +
            "</td>" +
            "<td>" +
            user.user_username +
            "</td>" +
            "<td>" +
            '<button class="btn btn-default btn-fill btn-sm btn-user" data-id="' +
            user.user_id +
            '" data-level="' +
            user.user_level +
            '" data-toggle="modal" data-target="#user_modal">Ubah</button>' +
            "</td>" +
            "</tr>"
        );
      });
      btnEdit();
    });
  }

  function updateUser(userId, userPassword) {
    ipcRenderer.send("update-user", [userId, userPassword]);
    ipcRenderer.on("data-update-user", (event, arg) => {
      //console.log('user', arg)
      if (arg) {
        //getAlluser()
        $("#user_modal").modal("hide");
      }
    });
  }
});
