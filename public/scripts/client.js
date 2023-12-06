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
  const $timestamp = $("<span>").text(data.created_at);
  const $icons = $("<div>").addClass("icons");
  const $flag = $("<i>").addClass("fa-solid fa-flag");
  const $retweet = $("<i>").addClass("fa-solid fa-retweet");
  const $heart = $("<i>").addClass("fa-solid fa-heart");
  $icons.append($flag, $retweet, $heart);
  $footer.append($timestamp, $icons);

  $tweet.append($header, $content, $footer);
  return $tweet;
};

// const $test = createTweetElement(tweetData);
// console.log($test);
// $(".tweet-container").append($test);
