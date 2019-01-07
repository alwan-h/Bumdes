const {ipcRenderer} = require('electron')


$(document).ready(function() {
  let tableJenisPupuk = $('#pupuk-table-jenis-pupuk tbody')

  renderJenisPupuk()

  function renderJenisPupuk() {
    ipcRenderer.send('get-barang')
    ipcRenderer.on('data-barang', (event, arg) => {
      tableJenisPupuk.empty()
      //jenisPupuk.empty()
      //jenisPupuk.append('<option value="">Pilih Jenis Pupuk</option>')
      //console.log(arg)
      arg.map((jenis, index) => {
        // jenisPupuk.append(
        //   '<option value="'+jenis.barang_id+'">'+jenis.barang_nama+'</option>'
        // )
        tableJenisPupuk.append(
          `<tr>`+
            `<td>${index+1}</td>`+
            `<td>${jenis.barang_nama}</td>`+
            `<td>${jenis.barang_harga_jual}</td>`+
            `<td>${jenis.barang_kuota}</td>`+
            `<td><button class="btn btn-default btn-xs">Edit</button></td>`+
          `</tr>`
        )
      })
    })
  }
})