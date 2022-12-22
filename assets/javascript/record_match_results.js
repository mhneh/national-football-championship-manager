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
            name="name_of_player" placeholder="Nhập tên cầu thủ">
    </li>
    <li class="rating-player__contenr-item col col-mobile-3">
        <input class="form__input8" type="text" id="name_of_team"
            name="name_of_team" placeholder="Nhập tên đội">
    </li>
    <li class="rating-player__contenr-item col col-mobile-2">
        <select class="form__input8" name="type_of_goal" id="type_of_goal">
            <option value="0">Chọn loại bàn thắng</option>
            <option value="1">Bàn thắng bóng sống</option>
            <option value="2">Bàn thắng đá phạt, phạt đền</option>
            <option value="3">Bàn thắng phản lưới</option>
        </select>
    </li>
    <li class="rating-player__contenr-item col col-mobile-3">
        <input class="form__input9" type="text" id="time_of_goal"
            name="time_of_goal" placeholder="Nhập thời điểm">
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

// regex
$(document).ready(function () {
  $("#name_of_team1").on("input", function () {
    var regex =
      /^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;

    var input = $(this);
    var is_name = regex.test(input.val());
    if (is_name) {
      input.removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
    }
  });

  $("#name_of_team2").on("input", function () {
    var regex =
      /^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;

    var input = $(this);
    var is_name = regex.test(input.val());
    if (is_name) {
      input.removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
    }
  });

  $("#name_of_pitch").on("input", function () {
    var regex =
      /^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;

    var input = $(this);
    var is_name = regex.test(input.val());
    if (is_name) {
      input.removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
    }
  });

  $("#score_of_team1").on("input", function () {
    var regex = /^[0-9]+$/;

    var input = $(this);
    var is_true = regex.test(input.val());
    if (is_true) {
      input.removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
    }
  });

  $("#score_of_team2").on("input", function () {
    var regex = /^[0-9]+$/;

    var input = $(this);
    var is_true = regex.test(input.val());
    if (is_true) {
      input.removeClass("invalid").addClass("valid");
    } else {
      input.removeClass("valid").addClass("invalid");
    }
  });
});

$(".submit").click(function (e) {
  var can_submit = true;

  $(".form__input6").each(function () {
    if ($(this).val() == "") {
      $(this).addClass("invalid");
      $(this).removeClass("valid");
    }
  });
  $(".form__input8").each(function () {
    if ($(this).val() == "") {
      $(this).addClass("invalid");
      $(this).removeClass("valid");
    }
  });
  $(".form__input9").each(function () {
    if ($(this).val() == "") {
      $(this).addClass("invalid");
      $(this).removeClass("valid");
    }
  });
  $(".square").each(function () {
    if ($(this).val() == "") {
      $(this).addClass("invalid");
      $(this).removeClass("valid");
    }
  });

  var date = $("#date").val();
  var time = $("#time").val();

  // regex of input type date mm/dd/yyyy
  var regex_date = /^\d{4}-\d\d-\d\d$/;
  var is_date = regex_date.test(date);

  // regex input type time    --:-- -- AM/PM
  var regex_time = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  var is_time = regex_time.test(time);

  if (is_date == false) {
    $("#date").addClass("invalid");
    $("#date").removeClass("valid");
  } else {
    $("#date").removeClass("invalid");
    $("#date").addClass("valid");
  }

  if (is_time == false) {
    $("#time").addClass("invalid");
    $("#time").removeClass("valid");
  } else {
    $("#time").removeClass("invalid");
    $("#time").addClass("valid");
  }

  var regex_name =
    /^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
  $("#name_of_player").each(function () {
    var is_name = regex_name.test($(this).val());
    if (is_name == false) {
      $(this).addClass("invalid");
      $(this).removeClass("valid");
    } else {
      $(this).removeClass("invalid");
      $(this).addClass("valid");
    }
  });

  $("#name_of_team").each(function () {
    var is_name = regex_name.test($(this).val());
    if (is_name == false) {
      $(this).addClass("invalid");
      $(this).removeClass("valid");
    } else {
      $(this).removeClass("invalid");
      $(this).addClass("valid");
    }
  });

  var regex_type_of_goal = /^[1-9]+$/;
  $("#type_of_goal").each(function () {
    var is_true = regex_type_of_goal.test($(this).val());
    if (is_true == false) {
      $(this).addClass("invalid");
      $(this).removeClass("valid");
    } else {
      $(this).removeClass("invalid");
      $(this).addClass("valid");
    }
  });

  var regex_time_of_goal = /^(12[0-0]|1[01][0-9]|[1-9]?[0-9])$/;
  $("#time_of_goal").each(function () {
    var is_true = regex_time_of_goal.test($(this).val());
    if (is_true == false) {
      $(this).addClass("invalid");
      $(this).removeClass("valid");
    } else {
      $(this).removeClass("invalid");
      $(this).addClass("valid");
    }
  });

  if (
    $(".form__input6").hasClass("invalid") ||
    $(".form__input8").hasClass("invalid") ||
    $(".form__input9").hasClass("invalid") ||
    $("#date").hasClass("invalid") ||
    $("#time").hasClass("invalid") ||
    $("#type_of_goal").hasClass("invalid")
  ) {
    can_submit = false;
    e.preventDefault();
    $(".form__input6").each(function () {
      if ($(this).hasClass("invalid")) {
        ($(this)).css("border", "3px solid red");

      } else {
        ($(this)).css("border", "1px solid #ccc");
      }
    });

    $(".form__input8").each(function () {
      if ($(this).hasClass("invalid")) {
        ($(this)).css("border", "3px solid red");

      } else {
        ($(this)).css("border", "1px solid #ccc");
      }
    });

    $(".form__input9").each(function () {
      if ($(this).hasClass("invalid")) {
        ($(this)).css("border", "3px solid red");

      } else {
        ($(this)).css("border", "1px solid #ccc");
      }
    });

    $("#date").each(function () {
      if ($(this).hasClass("invalid")) {
        ($(this)).css("border", "3px solid red");

      } else {
        ($(this)).css("border", "1px solid #ccc");
      }
    });

    $("#time").each(function () {
      if ($(this).hasClass("invalid")) {
        ($(this)).css("border", "3px solid red");

      } else {
        ($(this)).css("border", "1px solid #ccc");
      }
    }
    );

    $(".square").each(function () {
      if ($(this).hasClass("invalid")) {
        ($(this)).css("border", "3px solid red");

      } else {
        ($(this)).css("border", "1px solid #ccc");
      }
    }
    );  
  }
  else {
    can_submit = true;
    e.preventDefault();
    $(".form__input6").each(function () {
      ($(this)).css("border", "1px solid #ccc");
    });

    $(".form__input8").each(function () {
      ($(this)).css("border", "1px solid #ccc");
    });

    $(".form__input9").each(function () {
      ($(this)).css("border", "1px solid #ccc");
    });

    $("#date").each(function () {
      ($(this)).css("border", "1px solid #ccc");
    });

    $("#time").each(function () {
      ($(this)).css("border", "1px solid #ccc");
    }
    );

    $(".square").each(function () {
      ($(this)).css("border", "1px solid #ccc");
    }
    );
  }
  
});
