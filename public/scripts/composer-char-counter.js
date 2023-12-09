const counter = function () {
  const $text = $("textarea").val();
  const $remainingChar = 140 - $text.length;
  const $counter = $("textarea").closest(".new-tweet").find(".counter");
  $counter.text($remainingChar);

  if ($remainingChar < 0) {
    $counter.addClass("red");
  } else {
    $counter.removeClass("red");
  }
};

$(document).ready(function () {
  $("textarea").on("input", function (event) {
    counter();
  });
});
