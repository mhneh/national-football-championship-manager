$(document).ready(function () {
    //regex name of team
    $('#name').on('input', function () {
        // vietnamese
        var regex_name = /^[0-9a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/
        var name = $(this).val();
        // name can't be empty
        if (!regex_name.test(name) || name == " ") {
            $(this).addClass("invalid");
            $(this).removeClass("valid");
        } else {
            $(this).removeClass("invalid");
            $(this).addClass("valid");
        }
    });
    //regex phone
    $('#phone').on('input', function () {
        var regex_phone = /^[0-9]{10,11}$/;
        var phone = $(this).val();
        if (!regex_phone.test(phone)) {
            $(this).addClass("invalid");
            $(this).removeClass("valid");
        } else {
            $(this).removeClass("invalid");
            $(this).addClass("valid");
        }
    });
    //regex email
    $('#mail').on('input', function () {
        var regex_mail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var mail = $(this).val();
        if (!regex_mail.test(mail)) {
            $(this).addClass("invalid");
            $(this).removeClass("valid");
        } else {
            $(this).removeClass("invalid");
            $(this).addClass("valid");
        }
    });
    //regex home yard
    $('#home_yard').on('input', function () {
        var regex_home_yard = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
        var home_yard = $(this).val();
        if (!regex_home_yard.test(home_yard)) {
            $(this).addClass("invalid");
            $(this).removeClass("valid");
        } else {
            $(this).removeClass("invalid");
            $(this).addClass("valid");
        }
    });
});




$('.submit').click(function (e) {
    var can_submit = true;

    $('.form__input6').each(function () {
        if ($(this).val() == '') {
            $(this).addClass("invalid");
            $(this).removeClass("valid");
        }
    });

    // check if the logo and uniform have upfile
    var logo = $('#logo').val();
    var uniform = $('#uniform').val();
    var regex_logo = /(.jpg|.jpeg|.png|.gif)$/i;
    var regex_uniform = /(.jpg|.jpeg|.png|.gif)$/i;
    if (!regex_logo.test(logo)) {
        $('#logo').addClass("invalid");
        $('#logo').removeClass("valid");
    } else {
        $('#logo').removeClass("invalid");
        $('#logo').addClass("valid");
    }
    if (!regex_uniform.test(uniform)) {
        $('#uniform').addClass("invalid");
        $('#uniform').removeClass("valid");
    } else {
        $('#uniform').removeClass("invalid");
        $('#uniform').addClass("valid");
    }

    if ($('.form__input6').hasClass('invalid') || $('.file').hasClass('invalid')) {
        can_submit = false;
        e.preventDefault();
        $('.form__input6').each(function () {
            if ($(this).hasClass('invalid')) {
                $(this).parent().find('.icon').remove();
                $(this).parent().append('<i class="fas fa-exclamation-circle icon"></i>');
            } else {
                $(this).parent().find('.icon').remove();
                $(this).parent().append('<i class="fas fa-check-circle icon"></i>');
            }
        });
        $('.file').each(function () {
            if ($(this).hasClass('invalid')) {
                $(this).parent().find('.icon').remove();
                $(this).parent().append('<i class="fas fa-exclamation-circle icon"></i>');
            } else {
                $(this).parent().find('.icon').remove();
                $(this).parent().append('<i class="fas fa-check-circle icon"></i>');
            }
        });
        // if can submit link to the next page
    } else {
        can_submit = true;
        e.preventDefault();
        // if can submit link to the next page
        window.location.href = "./teams/team.html";
    }
});