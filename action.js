$(document).ready(function() {

  var counter = 0;

  var streams = $('.live-channel-card .tw-interactive.tw-link');

  let firstStream = streams[0];

  $.each(streams, (index, stream) => {
    console.log('first ', $(stream).attr('href'));
  })

  // alert('some thing happaitng here');
});


// alert('some thing happaitng 123');
