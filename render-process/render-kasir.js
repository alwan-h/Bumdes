const {ipcRenderer} = require('electron')

const penjualan = require('../utils/penjualan.js')
const barang = require('../utils/barang.js')
const tbKasir = require('../utils/render-tb-kasir.js')
const pupuk = require('../utils/render-tb-pupuk.js')
const panelBeranda = require('../utils/render-panel-beranda.js')
const renderTbAir = require('../utils/render-tb-air.js')
const konsumen = require('../utils/konsumen.js')
const renderChart = require('../utils/render-chart.js')
const gudang = require('../utils/render-tb-gudang.js')
const nota = require('../utils/nota')
const newKonsumen = require('../utils/new-konsumen')
const kuota = require('../utils/kuota')

// require('events').EventEmitter.prototype._maxListeners = 100;

$(document).ready(function() {

  var pesanan = $('#pesanan')
  var metodePembayaran = $('#metodePembayaran')
  var nik = $('#nik')
  var namaPembeli = $('#namaPembeli')
  var jenisBarang = $('#jenisBarang')
  var jumlahBarang = $('#jumlahPesanan')
  var satuanBarang = $('#satuanBarang')
  var totalBayar = $('#totalBayar')
  var btnSimpanPenjulan = $('#simpanPenjualan')
  var tbKuota = $('#tb-kuota tbody')
  var tbPenjualan = $('#data-penjualan')
  var totalHargaKasir = $('#totalHargaKasir')
  var sisaPembayarang = $('#sisaPembayaran')
  var notifBon = $('#notifBon')
  var notifNik = $('#notifNik')
  var jumlahPembayaran = $('#jumlahPembayaran')
  var jmlhPembayaran = $('#jmlhPembayaran')
  var cancel = $('#cancel')
  var namaInfo = $('#namaInfo')
  var statusPembayaran
  var update = false
  var bayarOld
  var kasirOld
  var idPenjualan

  let today = (arg) => {
    // let date = new Date()
    // let day = date.setDate(date.getDate() + 30)
    // let month = date.getMonth() + 1
    // let year = date.getFullYear()
    // //return day+'-'+month+'-'+year
    // return year+'-'+month+'-'+day

    var date = new Date(); // Now
    date.setDate(date.getDate()); // Set now + 30 days as the new date
    //console.log(date.toISOString().slice(0, 10));
    date.setFullYear(date.getFullYear() + arg)
    return date.toISOString().slice(0, 10)
  }

  console.log(today(0))
  

  //var date = new Date(); // Now
  //date.setDate(date.getDate() + 30); // Set now + 30 days as the new date
  //console.log(date.toISOString().slice(0, 10));

  btnSimpanPenjulan.click(function() {
    if (update) {
      updatePenjualan()
    } else {
      simpanPenjualan()
    }
  })

  //getPesanan()
  tbKasir.renderJenisBarang()
  getMetode()
  //getPenjualan()
  tbKasir.renderTbPenjualan()
  konsumen.deleteKonsumen()

  jenisBarang.change(function() {
    var harga = $('option:selected', this).attr('data-harga')
    var jenis = $('option:selected', this).val()
    //console.log(harga)
    setTotalBayar(harga)
    satuanBarang.text(setSatuan())
    setNotifBon(jenis)
  })

  metodePembayaran.change(function() {
    var harga = $('option:selected', jenisBarang).attr('data-harga')
    //console.log(harga)
    setTotalBayar(harga)
  })

  jumlahBarang.keyup(function() {
    var harga = $('option:selected', jenisBarang).attr('data-harga')
    //console.log(harga)
    setTotalBayar(harga)
  })

  
  jumlahPembayaran.keyup(function() {
    var bayarNew = $(this).val()
    console.log(bayarOld)
    if (bayarNew == '') {
      totalBayar.text(bayarOld)
      sisaPembayarang.text(parseInt(kasirOld) - parseInt(totalBayar.text()))
    } else {
      totalBayar.text(parseInt(bayarOld) + parseInt(bayarNew))
      sisaPembayarang.text(parseInt(kasirOld) - parseInt(totalBayar.text()))
    }
    
  })

  nik.keyup(function() {
    var param = {nik: $(this).val()}
    $('#nikInfo').text($(this).val())
    newKonsumen.getKonsumen(param).then(data => {
      // console.log(data[0].nama)
      tbKuota.empty()
      if (data.length > 0) {
        namaInfo.text(data[0].nama)
        namaPembeli.val(data[0].nama)
        kuota.getKuota(data[0].nik).then(kuotaData => {
          console.log(kuotaData)
          kuotaData.map(kuota => {
            console.log('oke')
            tbKuota.append(
              `<tr>`+
                `<td>${kuota.barang_nama}</td>`+
                `<td>${kuota.barang_kuota}</td>`+
                `<td>${kuota.jumlah_barang}</td>`+
                `<td>${kuota.barang_kuota - kuota.jumlah_barang}</td>`+
                `<td>${kuota.end_kuota}</td>`+
              `</tr>`
            )
          })
        })
      }
      
    })
    // tbKuota.empty()
    // penjualan.getPenjualanByNik(param).then(data => {
    //   console.log(data)
    //   data.map(kuota => {
    //     tbKuota.append(
    //       `<tr>`+
    //         `<td>${kuota.barang_nama}</td>`+
    //         `<td>${kuota.barang_kuota}</td>`+
    //         `<td>${kuota.total_beli}</td>`+
    //         `<td>${kuota.barang_kuota - kuota.total_beli}</td>`+
    //         `<td>${kuota.end_kuota}</td>`+
    //       `</tr>`
    //     )
    //   })
    // })
    // var arg = {byNik: $(this).val(), byStatus: 'Belum'}
    // penjualan.getPenjualan(arg).then(data => {
    //   notifBon.addClass('hidden')
    //   console.log(data)
    //   update = false
    //   if (data.length > 0) {
    //     if (data[0].metode_nama == 'Cicilan') {
    //       console.log('nyicil');
    //       update = true
    //       namaPembeli.val(data[0].penjualan_nama)
    //       metodePembayaran.val(data[0].penjualan_metode_pembayaran)
    //       jenisBarang.val(data[0].penjualan_nama_barang)
    //       jumlahBarang.val(data[0].penjualan_jumlah_barang)
    //       satuanBarang.val(data[0].penjualan_satuan_barang)
    //       totalBayar.text(data[0].penjualan_total_bayar)
    //       totalHargaKasir.text(data[0].penjualan_harga_barang)
    //       sisaPembayarang.text(data[0].penjualan_harga_barang - data[0].penjualan_total_bayar)
    //       notifBon.removeClass('hidden')
    //       notifNik.text(data[0].penjualan_nik)
    //       jmlhPembayaran.removeClass('hidden')
    //       bayarOld = data[0].penjualan_total_bayar
    //       kasirOld = data[0].penjualan_harga_barang
    //       idPenjualan = data[0].penjualan_id
    //     }
    //   } else {
    //     clearValue()
    //   }
    // })
  })

  cancel.click(function() {
    clearValue()
    jmlhPembayaran.addClass('hidden')
    notifBon.addClass('hidden')
  })

  function setNotifBon(jenis) {
    console.log('set notif', jenis);
    
    notifBon.addClass('hidden')
    update = false
    penjualan.getPenjualanByBarang(jenis).then(data => {
      console.log(data);
      
      if (data.length > 0) {
        // if (data[0].penjualan_status_pembayaran == 'Belum') {
          console.log('nyicil');
          update = true
          namaPembeli.val(data[0].penjualan_nama)
          metodePembayaran.val(data[0].penjualan_metode_pembayaran)
          jenisBarang.val(data[0].penjualan_nama_barang)
          jumlahBarang.val(data[0].penjualan_jumlah_barang)
          satuanBarang.val(data[0].penjualan_satuan_barang)
          totalBayar.text(data[0].penjualan_total_bayar)
          totalHargaKasir.text(data[0].penjualan_harga_barang)
          sisaPembayarang.text(data[0].penjualan_harga_barang - data[0].penjualan_total_bayar)
          notifBon.removeClass('hidden')
          notifNik.text(data[0].penjualan_nik)
          jmlhPembayaran.removeClass('hidden')
          bayarOld = data[0].penjualan_total_bayar
          kasirOld = data[0].penjualan_harga_barang
          idPenjualan = data[0].penjualan_id
        // }
      } else {
        clearValue()
      }
    })
  }

  function setTotalBayar(harga) {
    //console.log(metodePembayaran.val())
    //console.log('jumlah barang', jumlahBarang.val());
    
    
    if (metodePembayaran.val() == 1) {
      totalBayar.text(harga * jumlahBarang.val())
    } else if (metodePembayaran.val() == 2) {
      totalBayar.text(harga * 20 / 100 * jumlahBarang.val())
    } else if (metodePembayaran.val() == 3) {
      totalBayar.text(0)
    }

    setTotalHarga(harga)
  }

  function setTotalHarga(harga) {
    totalHargaKasir.text(harga * jumlahBarang.val())
    sisaPembayarang.text(parseInt(totalHargaKasir.text()) - parseInt(totalBayar.text()))
  }

  function getPesanan() {
    // pesanan.empty()
    var param = {category: null}
    // ipcRenderer.send('get-barang', param)
    // ipcRenderer.on('data-barang', (event, arg) => {
    //   jenisBarang.empty()
    //   jenisBarang.append('<option></option>')
    //   console.log('data barang kasir', arg)
    //   arg.map(barang => {
    //     if (barang.barang_stock != 0) {
    //       jenisBarang.append(
    //         `<option value="${barang.barang_id}" data-harga="${barang.barang_harga_jual}" data-nama="${barang.barang_nama}">${barang.barang_nama}</option>`
    //       )
    //     }
        
    //   })
      
    // })

    barang.getBarang(param).then(data => {
      jenisBarang.empty()
      jenisBarang.append('<option></option>')
      console.log('data barang kasir', data)
      data.map(barang => {
        if (barang.barang_stock != 0) {
          jenisBarang.append(
            `<option value="${barang.barang_id}" data-harga="${barang.barang_harga_jual}" data-nama="${barang.barang_nama}">${barang.barang_nama}</option>`
          )
        }
        
      })
    })
  }

  function setStatusPembayaran() {
    if (metodePembayaran.val() != 1) {
      return 'Belum'
    }
    return 'Lunas'
  }

  function setSatuan() {
    if (jenisBarang.val() == 5) {
      return 'Galon'
    } else {
      return 'Kg'
    }
  }

  function simpanPenjualan() {
    console.log('total bayar', totalBayar.text())
    var dataPenjualan = [
      namaPembeli.val(),
      nik.val(),
      jenisBarang.val(),
      jumlahBarang.val(),
      totalHargaKasir.text(),
      setSatuan(),
      metodePembayaran.val(),
      setStatusPembayaran(),
      today(0),
      totalBayar.text()
    ]

    let wrapData = {
      data: dataPenjualan,
      param: 'penjualan'
    }

    // console.log('data', dataPenjualan)

    penjualan.insertPenjualan(wrapData).then(data => {
      console.log('id last insert',data)
      if (data > 0) {
        console.log('insert oke')
        //getPenjualan()
        

          var dataNota = [data, dataPenjualan[4], dataPenjualan[9], dataPenjualan[9], today(0)]
          nota.insertNota(dataNota).then(() => {
            showNotaModal(dataPenjualan)
            clearValue()
            dataPenjualan.push($('option:selected', metodePembayaran).attr('data-nama'))
            tbKasir.renderTbPenjualan()
            pupuk.renderTbPenjualan()
            pupuk.renderTbPupuk()
            gudang.renderTbGudang()
            panelBeranda.renderPanelPenjualan()
            renderTbAir.renderTbPenjulanAir()
            
            renderChart.setGrafikPupuk()
            renderChart.setGrafikAir()
            panelBeranda.renderPanelStock()
            panelBeranda.renderPanelPiutang()
            renderChart.setGrafikPupuk()
            renderChart.setGrafikAir()

            if (dataPenjualan[2] != 5) {
              
              let dataKuota = [dataPenjualan[1], dataPenjualan[2], dataPenjualan[3], today(0), today(1)]
              kuota.insertKuota(dataKuota).then(() => {
              
              })
          
            }
          })
      }
    })
  }

  function updatePenjualan() {
    var statusPembayaran = 'Belum'
    if (sisaPembayarang.text() == '0') {
      statusPembayaran = 'Lunas'
    }
    var arg = [totalBayar.text(), statusPembayaran, today(), idPenjualan]
    var dataPenjualan = [
      namaPembeli.val(),
      nik.val(),
      jenisBarang.val(),
      jumlahBarang.val(),
      totalHargaKasir.text(),
      setSatuan(),
      metodePembayaran.val(),
      setStatusPembayaran,
      today(),
      totalBayar.text()
    ]
    penjualan.updatePenjualan(arg).then(data => {
      if (data) {
        console.log('insert oke')
        var dataNota = [idPenjualan, dataPenjualan[4], jumlahPembayaran.val(), dataPenjualan[9], today()]
        nota.insertNota(dataNota).then(() => {
          //getPenjualan()
          dataPenjualan.push($('option:selected', metodePembayaran).attr('data-nama'))
          tbKasir.renderTbPenjualan()
          pupuk.renderTbPenjualan()
          panelBeranda.renderPanelPenjualan()
          renderTbAir.renderTbPenjulanAir()
          showNotaModal(dataPenjualan)
          clearValue()
          renderChart.setGrafikPupuk()
          renderChart.setGrafikAir()
          panelBeranda.renderPanelStock()
          panelBeranda.renderPanelPiutang()
          renderChart.setGrafikPupuk()
          renderChart.setGrafikAir()
        })
        
        
      }
    })
  }

  function getMetode() {
    ipcRenderer.send('get-metode')
    ipcRenderer.on('data-metode', (event, arg) => {
      metodePembayaran.empty()
      metodePembayaran.append('<option></option>')
      arg.map(metode => {
        metodePembayaran.append(
          `<option value="${metode.metode_id}" data-nama="${metode.metode_nama}">${metode.metode_nama}</option>`
        )
      })
    })
  }

  function showNotaModal(data) {

    var pembayaranSekarang

    $('#nota_modal').modal('show')

    $('#nota-tanggal').text(data[8])
    $('#nota-nama').text(data[0])
    $('#nota-ket').text($('option:selected', metodePembayaran).attr('data-nama'))
    var namaBarang = $('option:selected', jenisBarang).attr('data-nama')
    var hargaBarang = $('option:selected', jenisBarang).attr('data-harga')
    $('#nota-nama-barang').text(namaBarang)
    $('#nota-jumlah-barang').text(data[3])
    $('#nota-satuan-barang').text(data[5])
    
    $('#nota-harga-barang').text(hargaBarang)
    var total = parseInt(hargaBarang) * parseInt(data[3])
    $('#nota-total').text(total)
    var dp = (metodePembayaran.val() == 1) ? '' : totalBayar.text()
    var dp = (metodePembayaran.val() == 1) ? '' : totalBayar.text()
    $('#nota-dp').text(totalBayar.text())
    var sisa = (parseInt(hargaBarang) * parseInt(data[3]) - parseInt(totalBayar.text()))
    $('#nota-sisa').text(sisa)
    $('#nama-konsumen').text(data[0])

    if (update) {
      pembayaranSekarang = jumlahPembayaran.val()
    } else {
      pembayaranSekarang = totalBayar.text()      
    }

    $('#nota-jumlah-pembayaran').text(pembayaranSekarang)

    var data = {
      nota_tanggal: data[8],
      nota_nama: data[0],
      nota_ket: $('option:selected', metodePembayaran).attr('data-nama'),
      nota_nama_barang: namaBarang,
      nota_jumlah_barang: data[3],
      nota_satuan_barang: data[5],
      nota_harga_barang: hargaBarang,
      nota_total: total,
      nota_dp: dp,
      nota_sisa: sisa,
      nama_konsumen: data[0],
      nota_jumlah_pembayaran: pembayaranSekarang
    }

    $('#print-nota').click(function() {
      console.log('click print nota')
      // clearValue()
      ipcRenderer.send('print-nota', data)
    })
  }

  function clearValue() {
    metodePembayaran.val('')
    //nik.val('')
    jenisBarang.val('')
    jumlahBarang.val(0)
    satuanBarang.val('')
    namaPembeli.val('')
    totalBayar.text(0)
    totalHargaKasir.text(0)
    sisaPembayarang.text(0)
    //$('#nikInfo').text('')
    tbKuota.empty()
    jmlhPembayaran.addClass('hidden')
  }
})