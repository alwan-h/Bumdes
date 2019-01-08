const pembelian = require('./pembelian.js')
const barang = require('./barang.js')

exports.renderJenisPupuk = () => {
  var param = {category: 1}
  let tableJenisPupuk = $('#table-jenis-pupuk tbody')
  let jenisPupuk = $('#jenisPupuk')
  //return new Promise((resolve, reject) => {
    barang.getBarang(param).then(arg => {
      tableJenisPupuk.empty()
      jenisPupuk.empty()
      jenisPupuk.append('<option value="">Pilih Jenis Pupuk</option>')
      //console.log(arg)
      arg.map((jenis, index) => {
        if (jenis.barang_category == 1) { 
          jenisPupuk.append(
            '<option value="'+jenis.barang_id+'">'+jenis.barang_nama+'</option>'
          )
          tableJenisPupuk.append(
            `<tr>`+
              `<td>${index+1}</td>`+
              `<td>${jenis.barang_nama}</td>`+
              // `<td><button class="btn btn-default btn-xs">Edit</button></td>`+
            `</tr>`
          )
        }
      })
    }) 
  //})
}

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