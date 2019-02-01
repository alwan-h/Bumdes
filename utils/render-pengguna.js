const pengguna = require("./pengguna");

exports.renderPengguna = () => {
  var tablePengguna = $("#table-pengguna tbody");
  tablePengguna.empty();
  let arg = {
    level: null,
    password: null,
    id: null
  };
  pengguna.get(arg).then(data => {
    data.map((user, index) => {
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
};

function btnEdit() {
  $(".btn-user").click(function() {
    var userId = $(this).attr("data-id");
    var userLevel = $(this).attr("data-level");
    $("#user_modal_title").text("Edit Pengguna " + userLevel);
    $("#user_id").val(userId);
    let arg = {
      level: null,
      password: null,
      id: userId
    };
    pengguna.get(arg).then(data => {
      console.log(data[0].user_username);
      $("#user_username").val(data[0].user_username);
      $("#user_password").val(data[0].user_password);
    });
  });
}
