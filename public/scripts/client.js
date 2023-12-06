/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json

$(document).ready(function () {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

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

  const renderTweets = function (tweetArray) {
    tweetArray.forEach((tweetData) => {
      const $tweet = createTweetElement(tweetData);
      $(".tweet-container").append($tweet);
    });
  };

  renderTweets(data);

  // $(function () {
  //   const $button = $("#load-more-posts");
  //   $button.on("click", function () {
  //     console.log("Button clicked, performing ajax call...");
  //     $.ajax("more-posts.html", { method: "GET" }).then(function (
  //       morePostsHtml
  //     ) {
  //       console.log("Success: ", morePostsHtml);
  //       $button.replaceWith(morePostsHtml);
  //     });
  //   });
  // });

  // event listener for submit
  $("#tweet-form").on("submit", function (event) {
    // prevent default form submission behavior
    event.preventDefault();
    // turn a set of form data into a query string
    const data = $(this).serialize();
    // submit a POST request that sends the serialized data to the server
    console.log(data);

    $.ajax({
      method: "POST",
      data: data,
      url: "/tweets",
    });
  });
});
