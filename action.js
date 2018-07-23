$(document).ready(function() {

  let selecting = false,
      selectedStreams = [],
      multiLink = '';
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
                      '<a class="button-confirm" target="_blank">Go to Multi-Stream</a>' +
                      '<a class="button-cancel">Cancel</a>' +
                    '</div>';

    $(headingEl).appendTo(rootEl);
    $(buttonsEl).appendTo(rootEl);

    $.each(liveStreams, (index, stream) => {
      // throw overlay over entire page except for selectable streams
      $('<a class="stream-overlay"></a>').prependTo(stream);

      // get href from stream to be used when constructing multitwitch url later
      let linkEl = $(stream).find('[data-a-target="preview-card-image-link"]').attr('href');
      // console.log(linkEl);

      // add checkbox (hidden)
      let iconSrc = chrome.extension.getURL('images/check-circle-regular.svg');
      $(stream).append('<div class="check-wrapper"><svg aria-hidden="true" data-prefix="far" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path></svg></div>');

      // add on click action to each stream
      $(stream).on('click', function() {

        // add or rmeove stay class to indicate selection
        $(stream).children('.stream-overlay').toggleClass('stay');

        $(stream).children('.check-wrapper').slideToggle();

        // Remove or add selected stream to array
        let selectedIndex = selectedStreams.indexOf(linkEl);
        if (selectedIndex >= 0) {
          selectedStreams.splice(selectedIndex, 1);
        } else {
          selectedStreams.push(linkEl);
        }
        updateMultiLink();
      });
    });
  }

  startSelecting();

  function updateMultiLink() {
    console.log(selectedStreams);
    multiLink = selectedStreams.join('');
    $('.button-confirm').attr('href', 'https://multistre.am' + multiLink + '/layout0');
  }

  function cancelSelecting() {
    $('.overlay').remove();
    $('.stream-overlay').remove();
    $('.select-heading-wrapper').remove();
    $('.select-buttons-wrapper').remove();
    $('.check-wrapper').remove();
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
