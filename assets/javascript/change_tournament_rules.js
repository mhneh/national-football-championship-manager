// khi tick vào mới được điền vào ô input
$(document).ready(function () {
  $(".check").prop("disabled", true);
  $("select").prop("disabled", true);
  $("input[type=checkbox]").click(function () {
    if ($(this).is(":checked")) {
      $(this).parent().find(".check").prop("disabled", false);
      $(this).parent().find("select").prop("disabled", false);
    } else {
      $(this).parent().find(".check").prop("disabled", true);
      $(this).parent().find("select").prop("disabled", true);

      $(this).parent().find(".check").val("");
      $(this).parent().find(".check").css("border", "1px solid #ccc");
      $(this).parent().find(".check").removeClass("invalid");

      //remove invalid class in win
      $(this).parent().find(".win").removeClass("invalid");

      $(this).parent().find(".icon").remove();
      $(this).parent().find(".notice").remove();
    }
  });
});

// kiểm tra điểm thắng, hòa, thua
$(".scores input").on("input", function () {
  var win = parseInt($(".win").val());
  var draw = parseInt($(".draw").val());
  var lose = parseInt($(".lose").val());

  // if win, draw, lose is not empty
  if (win && draw && lose) {
    if (win > draw && draw > lose) {
      $(".win").css("border", "3px solid green");
      $(".win").addClass("valid");
      $(".win").removeClass("invalid");

      $(".draw").css("border", "3px solid green");
      $(".draw").addClass("valid");
      $(".draw").removeClass("invalid");

      $(".lose").css("border", "3px solid green");
      $(".lose").addClass("valid");
      $(".lose").removeClass("invalid");
    } else {
      $(".win").css("border", "3px solid red");
      $(".win").addClass("invalid");
      $(".win").removeClass("valid");

      $(".draw").css("border", "3px solid red");
      $(".draw").addClass("invalid");
      $(".draw").removeClass("valid");

      $(".lose").css("border", "3px solid red");
      $(".lose").addClass("invalid");
      $(".lose").removeClass("valid");
    }
  }
});

// kiểm tra định dạng input
$(".check").on("input", function () {
  var input = $(this).val();
  var regex = /^[0-9]+$/;

  if (!regex.test(input)) {
    $(this).css("border", "3px solid red");
    $(this).addClass("invalid");
    $(this).removeClass("valid");
  } else {
    $(this).css("border", "3px solid green");
    $(this).addClass("valid");
    $(this).removeClass("invalid");
  }
});

$(".submit").click(function (e) {
  var canSubmit = true;
  $(".check").each(function () {
    if ($(this).hasClass("invalid")) {
      canSubmit = false;
    }
  });
  if (!canSubmit) {
    e.preventDefault();
    $(".invalid").css("border", "3px solid red");
  }
});
