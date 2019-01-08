const {ipcRenderer} = require('electron')
const barang = require('../utils/barang.js')
const renderTbAir = require('../utils/render-tb-air.js')

$(document).ready(function() {
  var btnEditAir = $('#edit_data_air')
  var idAir = $('#edit_air_id')
  var hargaJualAir = $('#harga_jual_air')

  btnEditAir.click(function(e){
    // console.log('click edit')
    e.preventDefault()
    editDataAir()
  })

  function editDataAir() {
    // console.log('send air')
    var dataSend = [hargaJualAir.val(), idAir.val()]
    // ipcRenderer.send('edit-harga-air', dataSend)
    // ipcRenderer.on('notif-edit-air', (event, arg) => {
    //   if (arg) {
    //     $('#air_modal_edit').modal('hide')
    //     var param = {category: null} 
    //     ipcRenderer.send('get-barang', param)
    //   }
      
    // })

    barang.updateHargaAir(dataSend).then(data => {
      if (data) {
        $('#air_modal_edit').modal('hide')
        renderTbAir.renderTbAir()
      }
    })
  }
})