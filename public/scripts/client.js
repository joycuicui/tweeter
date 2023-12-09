/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (data) {
  const $tweet = $("<article>");

  // header
  const $header = $("<header>");
  const $userName = $("<span>").text(data.user.name).attr("id", "user-name");
  const $avatars = $("<img>").attr({ src: data.user.avatars, id: "avatar" });
  const $handle = $("<span>").text(data.user.handle).attr("id", "handle");
  $header.append($avatars, $userName, $handle);

  // content
  const $content = $("<div>");
  const $text = $("<p>").text(data.content.text);
  $content.append($text);

  //footer
  const $footer = $("<footer>");
  const time = timeago.format(data.created_at);
  const $timestamp = $("<span>").text(time);
  const $icons = $("<div>").addClass("icons");
  const $flag = $("<i>").addClass("fa-solid fa-flag");
  const $retweet = $("<i>").addClass("fa-solid fa-retweet");
  const $heart = $("<i>").addClass("fa-solid fa-heart");
  $icons.append($flag, $retweet, $heart);
  $footer.append($timestamp, $icons);

  $tweet.append($header, $content, $footer);
  return $tweet;
};

const renderTweets = function (tweetArray) {
  $(".tweet-container").empty();
  tweetArray.forEach((tweetData) => {
    const $tweet = createTweetElement(tweetData);
    $(".tweet-container").prepend($tweet);
  });
};

const loadTweets = function () {
  $.ajax("/tweets", { method: "GET" }).then(function (data) {
    renderTweets(data);
  });
};

$(document).ready(function () {
  loadTweets();

  // event listener for submit
  $("#tweet-form").on("submit", function (event) {
    // prevent default form submission behavior
    event.preventDefault();
    // turn a set of form data into a query string
    const data = $(this).serialize();

    const tweetText = $("#tweet-text").val();

    if (!tweetText) {
      $(".error")
        .text(
          "Whoopsie! Your tweet is empty! Add some words to it! #🐦TweetFail"
        )
        .slideDown("slow");
      return;
    } else {
      $(".error").slideUp("slow");
    }

    if (tweetText.length > 140) {
      $(".error")
        .text(
          "Whoopsie! Your tweet is too long! Trim it down a tad! #🐦TweetFail"
        )
        .slideDown("slow");
      return;
    } else {
      $(".error").slideUp("slow");
    }

    // submit a POST request that sends the serialized data to the server
    $.ajax({
      method: "POST",
      data: data,
      url: "/tweets",
    })
      .then((response) => {
        // clear textarea
        $("#tweet-text").val("");
        // reset counter
        counter();
        loadTweets();
      })
      .catch((err) => {
        // error handling with AJAX calls
        $(".error")
          .text(
            "Whoopsie! Something went wrong when submitting your new tweet! #🐦TweetFail"
          )
          .slideDown("slow");
      });
  });

  // event listener for compose button
  $("#compose-button").on("click", function () {
    if ($(window).width() < 1024) {
      $(".new-tweet").slideToggle("slow");
      $("#tweet-text").focus();
    }
  });
});
