const {ipcRenderer} = require('electron')

$(document).ready(function() {

  $('#simpan_nama_pupuk').click(function(e) {
    e.preventDefault()
    var namaPupuk = $('#nama_pupuk')
    //console.log(namaPupuk.val())
    ipcRenderer.send('insert-barang', [namaPupuk.val(), 'Pupuk'])
    ipcRenderer.on('notif-barang', (event, arg) => {
      //console.log(arg)
      if (arg) {
        $('#pupuk_modal').modal('hide')
        renderJenisPupuk()
      }
    })
  })

  function renderJenisPupuk() {
    let jenisPupuk = $('#jenisPupuk')
    jenisPupuk.empty()
    jenisPupuk.append('<option value="">Pilih Jenis Pupuk</option>')
    ipcRenderer.send('get-barang')
    ipcRenderer.on('data-barang', (event, arg) => {
      //console.log(arg)
      arg.map((jenis) => {
        jenisPupuk.append(
          '<option value="'+jenis.barang_id+'">'+jenis.barang_nama+'</option>'
        )
      })
    })
  }
})