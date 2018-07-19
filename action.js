$(document).ready(function() {

  let selecting = false,
      selectedStreams = [],
      multiLink = '/kinggothalion';
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
    let rootEl = '.root-scrollable__wrapper';
    if ($('.overlay').length === 0) {
      $('<div class="overlay"></div>').prependTo('.root-scrollable__wrapper');
    }

    let headingEl = '<div class="select-heading-wrapper"><h1 class="select-heading">Select Streams</h1></div>';
    let buttonsEl = '<div class="select-buttons-wrapper">' +
                      '<a href="https://multitwitch.tv' + multiLink + '" class="button-confirm" target="_blank">Go to MultiTwitch</a>' +
                      '<a class="button-cancel">Cancel</a>' +
                    '</div>';

    $(headingEl).appendTo(rootEl);
    $(buttonsEl).appendTo(rootEl);

    $.each(liveStreams, (index, stream) => {
      // console.log($(stream), $(stream).find('[data-test-selector="preview-card-thumbnail__image-selector"]'));

      // throw overlay over entire page except for selectable streams
      $('<a class="stream-overlay"></a>').prependTo(stream);

      // get href from stream to be used when constructing multitwitch url later
      let linkEl = $(stream).find('[data-a-target="preview-card-image-link"]').attr('href');
      // console.log(linkEl);

      // add on click action to each stream
      $(stream).on('click', function() {

        // add or rmeove stay class to indicate selection
        $(stream).children('.stream-overlay').toggleClass('stay');

        // Remove or add selected stream to array
        let selectedIndex = selectedStreams.indexOf(linkEl);
        if (selectedIndex >= 0) {
          selectedStreams.splice(selectedIndex, 1);
        } else {
          selectedStreams.push(linkEl);
        }
      });
    });
  }

  // let selectedStreams = [];
  startSelecting();

  function cancelSelecting() {
    $('.overlay').remove();
    $('.stream-overlay').remove();
    $('.select-heading-wrapper').remove();
    $('.select-buttons-wrapper').remove();
    $('.selectable-stream').removeClass('selectable-stream');
    selectedStreams = [];
  }

  // remove added classes and elements on overlay click
  $('.overlay').on('click', cancelSelecting);
  $('.select-heading').on('click', cancelSelecting);
  $('.button-cancel').on('click', cancelSelecting);

  // unselect selected stream
  // $('.stream-overlay.stay').on('click', function() {
  //   $(this).removeClass('stay');
  // });

  // // remove added classes and elements on overlay click
  // $('.stream-overlay').on('click', function() {
  //   $(this).remove();
  //   $('.stream-overlay').remove();
  //   $('.selectable-stream').removeClass('selectable-stream');
  // });

});
