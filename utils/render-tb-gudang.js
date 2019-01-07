const pembelian = require('./pembelian.js')

exports.renderTbGudang = () => {
  let tablePupuk = $('#table-pupuk-gudang')
  
  param = {
    parameter: {
      byId: false,
      byName: false
    }
  }
  
  pembelian.getPembelian(param).then(arg => {
    datatablePupuk = []

    arg.map((pupuk, index) => {
      dataItem = [index+1, pupuk.barang_nama, pupuk.pembelian_jumlah+' '+pupuk.pembelian_satuan, 'Rp. '+pupuk.pembelian_harga_total, pupuk.pembelian_tanggal]
      datatablePupuk.push(dataItem)
    })

    var tbPupuk = tablePupuk.DataTable({
      destroy: true,
      // searching: false,
      data: datatablePupuk,
      columns: [
          { title: "No." },
          { title: "Nama Barang" },
          { title: "Jumlah" },
          { title: "Harga Beli" },
          { title: "Tanggal Beli" },
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
          //     var datapupuk = this.rows({ filter : 'applied'}).data()
          //     var tempPup = []
          //     datapupuk.map(pup => {
          //       tempPup.push(pup)
          //     })
          //     //console.log(tempPup)
          //     //console.log(this.rows( { filter : 'applied'} ).data());
          //     //console.log(this.rows( { filter : 'applied'} ).nodes().data());
              
          //     ipcRenderer.send('data-pupuk-print', tempPup)
          //     //handlePrintGudang(tempPup)
          //   }
          // }
      ]
    })

    tbPupuk.on( 'order.dt search.dt', function () {
      tbPupuk.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
          cell.innerHTML = i+1;
      } );
    } ).draw();

    tbPupuk.draw()
  }) 
}