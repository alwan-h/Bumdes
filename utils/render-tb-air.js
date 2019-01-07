const penjualan = require('./penjualan.js')

exports.renderTbPenjulanAir = () => {
  let tableAirPenjulan = $('#table-air-penjualan')

  var param = {byID: null, byCategory: null, byNik: null}
  penjualan.getPenjualan(param).then(arg => {
      dataTablePenjualan = []
      arg.map(pj => {
        if (pj.barang_category == 2) {
          var dataItem = [
            '', pj.penjualan_insert_tanggal, pj.penjualan_nama, 
            (pj.penjualan_jumlah_barang+' '+pj.penjualan_satuan_barang), pj.penjualan_harga_barang, 
            pj.penjualan_status_pembayaran
          ]
          dataTablePenjualan.push(dataItem)
        }
      })

      var tmpTbPenjualan = tableAirPenjulan.DataTable({
        destroy: true,
        // searching: false,
        data: dataTablePenjualan,
        columns: [
            { title: "No." },
            { title: "Tanggal" },
            { title: "Nama Pembeli" },
            { title: "Jumlah Barang" },
            { title: "Harga Barang" },
            { title: "Status" },
        ],
        //order: [[ 0, 'asc' ]],
        dom: 'Bfrtip',
        buttons: [
            'csv', 'excel', 'pdf',
            // {
            //   text: 'Print',
            //   className: 'btn btn-default',
            //   action: function ( e, dt, node, config ) {
            //     // alert( 'Button activated' );
            //     var datapupuk = this.rows({ filter : 'applied'}).data()
            //     var tempPup = []
            //     datapupuk.map(pup => {
            //       tempPup.push(pup)
            //     })
            //     console.log(tempPup)
            //     // //console.log(this.rows( { filter : 'applied'} ).data());
            //     // //console.log(this.rows( { filter : 'applied'} ).nodes().data());
                
            //     //ipcRenderer.send('print-penjualan-pupuk', tempPup)
            //     //printPenjualanPupuk(tempPup)
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