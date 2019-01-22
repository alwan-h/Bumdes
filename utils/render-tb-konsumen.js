const konsumen = require('./new-konsumen')

exports.renderTbKonsumen = () => {
  let param = {nik: null}
  let tbKonsumen = $('#data-konsumen')
  konsumen.getKonsumen(param).then(data => {
    let dataKonsumen = []
    data.map((konsumen, index) => {
      dataItem = [index+1, konsumen.nik, konsumen.nama, konsumen.kelompok_tani, konsumen.nama_desa, konsumen.luas_lahan]
      dataKonsumen.push(dataItem)
    })

    let datatableKonsumen = tbKonsumen.DataTable({
      destroy: true,
      data: dataKonsumen,
      columns: [
        {title: 'No.'},
        {title: 'NIK'},
        {title: 'Nama'},
        {title: 'Kelompok Tani'},
        {title: 'Nama Desa'},
        {title: 'Luas Lahan'},
      ],
      dom: 'Bfrtip',
      buttons: [
          'csv', 'excel', 'pdf',
      ]
    })

    datatableKonsumen.on( 'order.dt search.dt', function () {
      datatableKonsumen.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
          cell.innerHTML = i+1;
      } );
    } ).draw();
  }) 
}