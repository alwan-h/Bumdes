const {ipcRenderer} = require('electron')

$(document).ready(function() {

  $('#edit_user_password').click(function(e) {
    e.preventDefault()
    //console.log('clik update btn')
    var userId = $('#user_id').val()
    var userPassword = $('#user_password').val()
    updateUser(userId, userPassword)
  })

  function updateUser(userId, userPassword) {
    ipcRenderer.send('update-user', [userPassword, userId])
    ipcRenderer.on('data-update-user', (event, arg) => {
      //console.log('user', arg)
      if (arg) {
        //getAlluser()
        $('#user_modal').modal('hide')
      }
    })
  }
})