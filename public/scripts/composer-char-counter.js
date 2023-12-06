$(document).ready(function () {
  $("textarea").on("input", function (event) {
    const $text = $(this).val();
    const $remainingChar = 140 - $text.length;
    const $counter = $(this).closest(".new-tweet").find(".counter");
    $counter.text($remainingChar);

    if ($remainingChar < 0) {
      $counter.css("color", "#C63D2F");
    } else {
      $counter.css("color", "");
    }
  });
});
