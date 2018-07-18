$(document).ready(function() {

  let selecting = false;
  //
  // const streams = $('.live-channel-card a.tw-interactive.tw-link');
  // const streamsAlt = $('[data-a-target="preview-card-image-link"]');
  // const streams3 = $('.live-channel-card');

  // $.each(streams, (index, stream) => {
  //   console.log(stream, $(stream).attr('href'), $('[data-a-target="preview-card-image-link"]'));
  // });
  //
  // $.each(streams3, (index, stream) => {
  //   console.log(stream, $(stream).find('img'));
  // });

  // find selectable live streams
  liveStreams = [];
  for (var i = 0; i < 100; i++) {
    let stream = $('[data-a-target="live-channel-card-' + i + '"]');
    if (stream && stream.length) {
      $(stream).addClass('selectable-stream');
      liveStreams.push(stream);
    }
  }
  // console.log('liveStreams ', liveStreams);
  //
  // $.each(liveStreams, (index, stream) => {
  //   console.log($(stream), $(stream).find('[data-test-selector="preview-card-thumbnail__image-selector"]'));
  // });

  function startSelecting() {
    selecting = true;
    if ($('.overlay').length === 0) {
      $('<div class="overlay"></div>').prependTo('.root-scrollable__wrapper');
    }

    $.each(liveStreams, (index, stream) => {
      console.log($(stream), $(stream).find('[data-test-selector="preview-card-thumbnail__image-selector"]'));
      $('<a class="stream-overlay"></a>').prependTo(stream);
    });
  }

  startSelecting();

  // remove added classes and elements on overlay click
  $('.overlay').on('click', function() {
    $(this).remove();
    $('.stream-overlay').remove();
    $('.selectable-stream').removeClass('selectable-stream');
  });

});
