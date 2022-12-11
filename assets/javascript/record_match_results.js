var btn = document.querySelector('.btn__add');
var table = document.querySelector('.rating-player__content');
var count = 0;
var max=0;
btn.addEventListener('click', function () {
    count++;
    console.log(count);
    console.log(max);
    var row = document.createElement('ul');
    row.classList.add('table-row');
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

var btnRemove = document.querySelector('.btn__remove');
btnRemove.addEventListener('click', function () {
    if(count>0){
        //delete the row next to the add button
        table.removeChild(table.lastElementChild.previousElementSibling);
        count--;
    }
});