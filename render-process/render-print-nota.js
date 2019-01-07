const ipc = require('electron').ipcRenderer

$(document).ready(function() {
  console.log('nota')
  ipc.on('data-nota', (event, arg) => {
    console.log('data from print nota', arg)
    $('#nota-tanggal').text(arg.nota_tanggal)
    $('#nota-nama').text(arg.nota_nama)
    $('#nota-ket').text('-')
    $('#nota-nama-barang').text(arg.nota_nama_barang)
    $('#nota-jumlah-barang').text(arg.nota_jumlah_barang)
    $('#nota-satuan-barang').text(arg.nota_satuan_barang)
    $('#nota-harga-barang').text(arg.nota_harga_barang)
    $('#nota-total').text(arg.nota_total)
    $('#nota-dp').text(arg.nota_dp)
    $('#nota-sisa').text(arg.nota_sisa)
  })
})