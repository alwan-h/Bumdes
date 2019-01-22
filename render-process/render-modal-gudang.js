const {ipcRenderer} = require('electron')
const barang = require('../utils/barang')
const tb_gudang = require('../utils/render-tb-gudang')
const renderPupuk = require('../utils/render-tb-pupuk')

$(document).ready(function() {

  $('#simpan_nama_pupuk').click(function(e) {
    e.preventDefault()
    var namaPupuk = $('#nama_pupuk')
    
    barang.insertBarang([namaPupuk.val(), '1']).then((data) => {
      if (data) {
        // renderJenisPupuk()
        $('#pupuk_modal').modal('hide')
        namaPupuk.val('')
        tb_gudang.renderJenisPupuk()
        renderPupuk.renderTbPupuk()
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