const pembelian = require('./pembelian.js')
const penjualan = require('./penjualan.js')
const barang = require('./barang.js')

exports.renderPanelPembelian = () => {  
  pembelian.totalPembelian().then(arg => {
    if (arg.length > 0) {
      var pembelianPupuk = $('#pembelianPupuk')
      pembelianPupuk.text(arg[0].total_pembelian)
      pembelianPupuk.append('<span> Kg</span>')
    }
  })
}

exports.renderPanelPenjualan = () => {
  penjualan.totalPenjualan().then(arg => {
    if (arg.length > 0) {
      var penjualanPupuk = $('#penjualanPupuk')
      penjualanPupuk.text(arg[0].total_penjualan)
      penjualanPupuk.append('<span> Kg</span>')

    } 
    if (arg.length > 1) {
      var penjualanAir = $('#penjualanAir')
      penjualanAir.text(arg[1].total_penjualan)
      penjualanAir.append('<span> Galon</span>') 

    }
  }) 
}

exports.renderPanelStock = () => {
  barang.getStock().then(data => {
    console.log('stock', data)
    // var penjualanPupuk = $('#penjualanPupuk')
    // penjualanPupuk.text(arg[0].total_penjualan)
    // penjualanPupuk.append('<span> Kg</span>')
    var stock = $('#stockGudang')
    stock.text(data[0].stock)
    stock.append('<span> Kg</span>')
  })
}

exports.renderPanelPiutang = () => {
  penjualan.getTotalPiutang().then(data => {
    console.log('piutang', data)
    var piutang = $('#piutang')
    piutang.text(data[0].bon)
    piutang.append('<span> Orang</span>')
  })
}