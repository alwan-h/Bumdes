//const Promise = require('bluebird')
const penjualan = require('../utils/penjualan.js')
const barang = require('./barang.js')

exports.renderTbPenjualan = () => {

  var tbPenjualan = $('#data-penjualan')

  var param = {byID: null, byCategory: null, byNik: null}
    // ipcRenderer.send('get-penjualan', param)
    // ipcRenderer.on('data-penjualan', (event, arg) => {

    penjualan.getPenjualan(param).then(arg => {
      dataTablePenjualan = []
      arg.map(pj => {
        var dataItem = [
          '', pj.penjualan_insert_tanggal, pj.penjualan_nama, pj.penjualan_nik, pj.barang_nama,
          (pj.penjualan_jumlah_barang+' '+pj.penjualan_satuan_barang), pj.penjualan_harga_barang, pj.penjualan_total_bayar, 
          pj.metode_nama, pj.penjualan_status_pembayaran
        ]
        dataTablePenjualan.push(dataItem)
      })

      var tmpTbPenjualan = tbPenjualan.DataTable({
        destroy: true,
        // searching: false,
        data: dataTablePenjualan,
        columns: [
            { title: "No." },
            { title: "Tanggal" },
            { title: "Nama Pembeli" },
            { title: "Nik" },
            { title: "Nama Barang" },
            { title: "Jumlah Barang" },
            { title: "Harga Barang" },
            { title: "Total Bayar" },
            { title: "Metode" },
            { title: "Lunas" },
            
        ],
        //order: [[ 0, 'asc' ]],
        dom: 'Bfrtip',
        buttons: [
            'csv', 'excel', 'pdf',
            // {
            //   text: 'Print',
            //   className: 'btn btn-default print-gudang',
            //   action: function ( e, dt, node, config ) {
            //     //alert( 'Button activated' );
            //     // var datapupuk = this.rows({ filter : 'applied'}).data()
            //     // var tempPup = []
            //     // datapupuk.map(pup => {
            //     //   tempPup.push(pup)
            //     // })
            //     // //console.log(tempPup)
            //     // //console.log(this.rows( { filter : 'applied'} ).data());
            //     // //console.log(this.rows( { filter : 'applied'} ).nodes().data());
                
            //     // ipcRenderer.send('data-pupuk-print', tempPup)
            //     //handlePrintGudang(tempPup)
            //   }
            // }
        ]
      })

      tmpTbPenjualan.on( 'order.dt search.dt', function () {
        tmpTbPenjualan.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
      } ).draw();

      tmpTbPenjualan.draw()

    })
}

exports.renderJenisBarang = () => {
  var jenisBarang = $('#jenisBarang')
  var param = {category: null}
  barang.getBarang(param).then(data => {
    jenisBarang.empty()
    jenisBarang.append('<option></option>')
    console.log('data barang kasir', data)
    data.map(barang => {
      if (barang.barang_stock != 0 || barang.barang_stock != '') {
        jenisBarang.append(
          `<option value="${barang.barang_id}" data-harga="${barang.barang_harga_jual}" data-nama="${barang.barang_nama}">${barang.barang_nama}</option>`
        )
      }
      
    })
  })
}