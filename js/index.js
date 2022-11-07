fn_increment=(elem, current)=>{
    elem.html(current + 1);
}

fn_btn_click=()=>{
    var currentCount = parseInt($('.counter').html());
    // console.log(currentCount);
    $('.countbtn').click(fn_increment($('.counter'), currentCount));
}