const {ipcRenderer} = require('electron')
const renderTbAir = require('../utils/render-tb-air.js')

$(document).ready(function() {

  let tableAir = $('#table-air-data tbody')

  //renderTableAir()
  renderTbAir.renderTbAir()
  renderTbAir.renderTbPenjulanAir()

  function renderTableAir() {
    var param = {category: 2} 
    ipcRenderer.send('get-barang', param)
    ipcRenderer.on('data-barang', (event, arg) => {
      tableAir.empty()
      var i = 1
      arg.map((air, index) => {
        if (air.barang_category == '2') {
          tableAir.append(
            '<tr>'+
              `<td>${i++}</td>`+
              `<td>${air.barang_nama}</td>`+
              `<td>Rp. ${air.barang_harga_jual}</td>`+
              `<td><button class="btn btn-default btn-xs btn-edit-harga-air" data-id="${air.barang_id}" data-harga="${air.barang_harga_jual}" data-toggle="modal" data-target="#air_modal_edit">Edit</button> `+
              // `<button class="btn btn-danger btn-xs btn-delete-penj-pupuk" data-id="${air.barang_id}">Delete</button></td>`+
            '</tr>'
          )
        }
      })

      btnEditAir()
    })
  }

  function btnEditAir() {
    $('.btn-edit-harga-air').click(function() {
      var idAir = $(this).attr('data-id')
      var hargaAir = $(this).attr('data-harga')
      $('#harga_jual_air').val(hargaAir)
      $('#edit_air_id').val(idAir)
    })
  }

})