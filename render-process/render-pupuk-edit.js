const {ipcRenderer} = require('electron')
const renderPupuk = require('../utils/render-tb-pupuk')

$(document).ready(function() {
  let btnEditDataPupuk = $('#edit_data_pupuk')
  let tableJenisPupuk = $('#pupuk-table-jenis-pupuk tbody')

  btnEditDataPupuk.click(function(e) {
    e.preventDefault()
    //console.log('edit data pupuk')
    var editNama = $('#edit_nama_pupuk')
    var editHarga = $('#edit_harga_jual')
    var editKuota = $('#edit_kuota')
    var editId = $('#edit_pupuk_id')

    var arg = [editNama.val(), editHarga.val(), editKuota.val(), editId.val()]

    ipcRenderer.send('update-barang', arg)
    ipcRenderer.on('notif-update-barang', (event, arg) => {
      //console.log(arg)
      if (arg) {
        $('#pupuk_modal_edit').modal('hide')
        //renderJenisPupuk()
        renderPupuk.renderTbPupuk()
      }
    })
  })

  // function renderJenisPupuk() {
  //   tableJenisPupuk.empty()
  //   var param = {category: 'Pupuk'} 
  //   ipcRenderer.send('get-barang', param)
  //   ipcRenderer.on('data-barang', (event, arg) => {
  //     tableJenisPupuk.empty()
  //     //jenisPupuk.empty()
  //     //jenisPupuk.append('<option value="">Pilih Jenis Pupuk</option>')
  //     //console.log(arg)
  //     arg.map((jenis, index) => {
  //       // jenisPupuk.append(
  //       //   '<option value="'+jenis.barang_id+'">'+jenis.barang_nama+'</option>'
  //       // )
  //       tableJenisPupuk.append(
  //         `<tr>`+
  //           `<td>${index+1}</td>`+
  //           `<td>${jenis.barang_nama}</td>`+
  //           `<td>${jenis.barang_harga_jual}</td>`+
  //           `<td>${jenis.barang_kuota}</td>`+
  //           `<td>${jenis.barang_stock}</td>`+
  //           `<td><button class="btn btn-default btn-xs btn-edit-pupuk" data-id="${jenis.barang_id}" data-toggle="modal" data-target="#pupuk_modal_edit">Edit</button> `+
  //           `<button class="btn btn-danger btn-xs btn-delete-pupuk" data-id="${jenis.barang_id}">Delete</button></td>`+
  //         `</tr>`
  //       )
  //     })
  //     btnEditPupuk()
  //     btnDeletePupuk()
  //   })
  // }

  // function btnEditPupuk() {
  //   $('.btn-edit-pupuk').click(function() {
  //     var id = $(this).attr('data-id')
  //     console.log('edit pupuk', {id: id})
  //     ipcRenderer.send('get-barang-by-id', id)
  //     ipcRenderer.on('data-barang-by-id', (event, arg) => {
  //       //console.log('data by id', arg)
  //       $('#edit_nama_pupuk').val(arg[0].barang_nama)
  //       $('#edit_harga_jual').val(arg[0].barang_harga_jual)
  //       $('#edit_kuota').val(arg[0].barang_kuota)
  //       $('#edit_pupuk_id').val(id)
  //     })
  //   })
  // }

  // function btnDeletePupuk() {
  //   $('.btn-delete-pupuk').click(function() {
  //     var c = confirm('Apakah anda yakin ?')
  //     if (c) {
  //       var id = $(this).attr('data-id')
  //       ipcRenderer.send('delete-barang', id)
  //       ipcRenderer.on('notif-delete-barang', (event, arg) => {
  //         if (arg) {
  //           renderJenisPupuk()
  //         }
  //       })
  //     }
  //   })
  // }
})