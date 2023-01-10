var btn = document.querySelector(".btn__add");
var table = document.querySelector(".rating-player__content");
var count = 0;
var max = 0;
btn.addEventListener("click", function () {
  count++;
  console.log(count);
  console.log(max);
  var row = document.createElement("ul");
  row.classList.add("table-row");
  row.innerHTML = `
    <ul class="rating-player__contenr-list row table-row no-gutters">
    <li class="rating-player__contenr-item col col-mobile-1">${count}</li>
    <li class=" rating-player__contenr-item col col-mobile-3">
        <input class="form__input8" type="text" id="name_of_player"
            name="name_of_player${count}" placeholder="Nhập tên cầu thủ">
    </li>
    <li class="rating-player__contenr-item col col-mobile-3">
        <input class="form__input8" type="text" id="name_of_team"
            name="name_team${count}" placeholder="Nhập tên đội">
    </li>
    <li class="rating-player__contenr-item col col-mobile-2">
        <select class="form__input8" name="type_of_goal${count}" id="type_of_goal">
            <option value="0">Chọn loại bàn thắng</option>
            <option value="1">Bàn thắng bóng sống</option>
            <option value="2">Bàn thắng đá phạt, phạt đền</option>
            <option value="3">Bàn thắng phản lưới</option>
        </select>
    </li>
    <li class="rating-player__contenr-item col col-mobile-3">
        <input class="form__input9" type="text" id="time_of_goal"
            name="time_of_goal${count}" placeholder="Nhập thời điểm">
    </li>
</ul>
    `;
  table.insertBefore(row, btn.parentNode.parentNode);
});

var btnRemove = document.querySelector(".btn__remove");
btnRemove.addEventListener("click", function () {
  if (count > 0) {
    //delete the row next to the add button
    table.removeChild(table.lastElementChild.previousElementSibling);
    count--;
  }
});

$(function () {
  $("#form-result").submit(function (e) {
    e.preventDefault();
    var can_submit = true;
    if (checkName($("#name_of_team1").val()) == false) {
      can_submit = false;
      $("#name_of_team1").css("border", "3px solid red");
    } else $("#name_of_team1").css("border", "1px solid #ccc");
    if (checkName($("#name_of_team2").val()) == false) {
      can_submit = false;
      $("#name_of_team2").css("border", "3px solid red");
    } else $("#name_of_team2").css("border", "1px solid #ccc");
    if (checkName($("#stadium").val()) == false) {
      can_submit = false;
      $("#stadium").css("border", "3px solid red");
    } else $("#stadium").css("border", "1px solid #ccc");

    if (checkScore($("#score_of_team1").val()) == false) {
      can_submit = false;
      $("#score_of_team1").css("border", "3px solid red");
    } else $("#score_of_team1").css("border", "1px solid #ccc");
    if (checkScore($("#score_of_team2").val()) == false) {
      can_submit = false;
      $("#score_of_team2").css("border", "3px solid red");
    } else $("#score_of_team2").css("border", "1px solid #ccc");

    if (checkDate($("#date").val()) == false) {
      can_submit = false;
      $("#date").css("border", "3px solid red");
    } else $("#date").css("border", "1px solid #ccc");

    if (checkTime($("#time").val()) == false) {
      can_submit = false;
      $("#time").css("border", "3px solid red");
    } else $("#time").css("border", "1px solid #ccc");

    if (!cansubmit) {
      return;
    }

    const form = $(this);
    const actionUrl = form.attr("action");
    $.ajax({
      type: "POST",
      url: "/tournaments/match_result",
      data: form.serialize(), // serializes the form's elements.
      success: function (data) {
        window.location.href = "/tournaments/match_result";
      },
    });
  });
});

function checkName(name) {
  var regex_name =
    /^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
  return regex_name.test(name);
}

function checkEmail(email) {
  var regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex_email.test(email);
}

function checkScore(score) {
  var regex = /^[0-9]+$/;
  return regex.test(score);
}

function checkTime(time) {
  var regex_time = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex_time.test(time);
}

function checkDate(date) {
  var regex_date = /^\d{4}-\d\d-\d\d$/;
  return regex_date.test(date);
}

function check_type_of_goal(type_of_goal) {
  var regex_type_of_goal = /^[1-9]+$/;
  return regex_type_of_goal.test(type_of_goal);
}

function check_time_of_goal(time_of_goal) {
  var regex_time_of_goal = /^(12[0-0]|1[01][0-9]|[1-9]?[0-9])$/;
  return regex_time_of_goal.test(time_of_goal);
}
