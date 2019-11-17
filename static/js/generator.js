$(function () {
    $('#gen-form').submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "https://gpt2-bq5jveycyq-ew.a.run.app",
        dataType: "json",
        data: JSON.stringify(getInputValues()),
        beforeSend: function (data) {
          $('#generate-text').addClass("is-loading");
          $('#generate-text').prop("disabled", true);
        },
        success: function (data) {
          $('#generate-text').removeClass("is-loading");
          $('#generate-text').prop("disabled", false);
          $('#tutorial').remove();
          var gentext = data.text;
          if ($("#prefix").length & $("#prefix").val() != '') {
            var pattern = new RegExp('^' + $("#prefix").val(), 'g');
            var gentext = gentext.replace(pattern, '<strong>' + $("#prefix").val() + '</strong>');
          }

          var gentext = gentext.replace(/\n\n/g, "<div><br></div>").replace(/\n/g, "<div></div>");
          var html = '<div class=\"gen-box\">' + gentext + '</div><div class="gen-border"></div>';
          $(html).appendTo('#model-output').hide().fadeIn("slow");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $('#generate-text').removeClass("is-loading");
          $('#generate-text').prop("disabled", false);
          $('#tutorial').remove();
          var html = '<div class="gen-box warning">There was an error generating the text! Please try again!</div><div class="gen-border"></div>';
          $(html).appendTo('#model-output').hide().fadeIn("slow");
        }
      });
    });
    $('#clear-text').click(function (e) {
      $('#model-output').text('')
    });

    // https://stackoverflow.com/a/51478809
    $("#save-image").click(function () {

      html2canvas(document.querySelector('#model-output')).then(function (canvas) {

        saveAs(canvas.toDataURL(), 'gen_texts.png');
      });
    });

  });

  function getInputValues() {
    var inputs = {};
    $("textarea, input").each(function () {
      inputs[$(this).attr('id')] = $(this).val();
    });
    return inputs;
  }

  // https://stackoverflow.com/a/51478809
  function saveAs(uri, filename) {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {

      link.href = uri;
      link.download = filename;

      //Firefox requires the link to be in the body
      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);

    } else {

      window.open(uri);

    }
  }