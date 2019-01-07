$('#Content').load('./sections/dashboard/dashboard.html', function() {
  require('../../sections/dashboard/dashboard.js')
})

function toggleActiveButton(page) {
  console.log(page)
  $('#side-nav.my li').each(function(index) {
    
    if ($(this).find('a').attr('data-section') === page) {
      $(this).addClass('active')
      console.log('active')
    } else {
      $(this).removeClass('active')
      console.log('not active')
    }

  })
}

toggleActiveButton('dashboard')

var btnDashboard = document.getElementById('button-dashboard')
btnDashboard.addEventListener('click', function() {
  //console.log('dashboard')
  toggleActiveButton('dashboard')
  $('#Content').load('./sections/dashboard/dashboard.html', function() {
    // require('../../sections/dashboard/dashboard.js')
  })
})

var btnPupuk = document.getElementById('button-pupuk')
btnPupuk.addEventListener('click', function() {
  //console.log('pupuk')
  toggleActiveButton('pupuk')
  $('#Content').load('./sections/pupuk/pupuk.html', function() {
    console.log('load data pupuk')
    // var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    // $.getJSON( flickerAPI, {
    //   tags: "mount rainier",
    //   tagmode: "any",
    //   format: "json"
    // })
    //   .done(function( data ) {
    //     $.each( data.items, function( i, item ) {
    //       $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
    //       if ( i === 3 ) {
    //         return false;
    //       }
    //     });
    //     console.log(data)
    //   })
    //   .fail(function( jqxhr, textStatus, error ) {
    //     var err = textStatus + ", " + error;
    //     console.log( "Request Failed: " + err );
    //   });
  })
})

var airIsiUlang = document.getElementById('button-airisiulang')
airIsiUlang.addEventListener('click', function() {
  //console.log('pupuk')
  toggleActiveButton('airisiulang')
  $('#Content').load('./sections/airisiulang/airisiulang.html', function() {
    console.log('load data air')
    
  })
})

var transaksi = $('#button-transaksi')
transaksi.click(function() {
  console.log('transaksi')
  toggleActiveButton('transaksi')
  $('#Content').load('./sections/transaksi/transaksi.html')
})

var pengguna = $('#button-pengguna')

pengguna.click(function() {
  toggleActiveButton('pengguna')

  

  $('#Content').load('./sections/user/user.html', function() {

    //$('.card').html('<div>Tes append</div>')
    

    var bumdesApi = 'http://localhost:8888/Bumdes/index.php/api/user';
    $.getJSON(bumdesApi)
      .done(function( data ) {
        console.log(data)
        var tablePengguna = $('#table-pengguna tbody')
        data.map(function(user, index) {
          console.log('data', index)
          tablePengguna.append(
            '<tr>'+
              '<td>'+(index+1)+'</td>'+
              '<td>'+user.user_level+'</td>'+
              '<td>'+
                '<button class="btn btn-default btn-fill btn-sm btn-user" data-id="'+user.user_id+'" data-level="'+user.user_level+'" data-toggle="modal" data-target="#user_modal">Ubah Password</button>'+
              '</td>'+
            '</tr>'
          )
        })

        require('../../sections/user/user.js')
      })
      .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
      });
  })
})
