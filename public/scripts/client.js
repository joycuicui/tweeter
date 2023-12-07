/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json

const createTweetElement = function (data) {
  const $tweet = $("<article>");

  // header
  const $header = $("<header>");
  const $userName = $("<span>").text(data.user.name);
  const $avatars = $("<img>").attr("src", data.user.avatars);
  const $handle = $("<span>").text(data.user.handle);
  $header.append($avatars, $userName, $handle);

  // content
  const $content = $("<div>");
  const $text = $("<p>").text(data.content.text);
  $content.append($text);

  //footer
  const $footer = $("<footer>");
  // const $timestamp = $("<span>").text(data.created_at);
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
    // submit a POST request that sends the serialized data to the server

    const tweetText = $("#tweet-text").val();

    if (!tweetText) {
      $(".error").text("Error: Tweet Empty!").slideDown("slow");
      return;
    } else {
      $(".error").slideUp("slow");
    }

    if (tweetText.length > 140) {
      $(".error").text("Error: Tweet Too Long!").slideDown("slow");
      return;
    } else {
      $(".error").slideUp("slow");
    }

    $.ajax({
      method: "POST",
      data: data,
      url: "/tweets",
    }).then((response) => {
      loadTweets();
    });
  });
});
