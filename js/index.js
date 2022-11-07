var cats = [
    {name: "Fizzy", src: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHw%3D&w=1000&q=80"},
    // {name: "Lola", src: "https://rukminim1.flixcart.com/image/416/416/kph8h3k0/poster/e/w/4/large-adorable-cat-poster-cute-kittens-poster-cat-poster-funny-original-imag3p7tcxuzhpn2.jpeg?q=70"}
]

fn_increment=(elem, current)=>{
    elem.html(current + 1);
}

fn_btn_click=(event)=>{
    var counter = $(event.target).siblings('.cat-card_counter-text').children('span');
    var currentCount = parseInt($(counter).html());
    fn_increment(counter, currentCount);
}

fn_make_cat_card = (cat) => {
    var card = document.createElement("div");
    var name_text = document.createElement("span");
    var image = document.createElement("img");
    var counter = document.createElement("span");
    var counter_text = document.createElement("p");
    
    $(counter_text).addClass("cat-card_counter-text");
    $(image).addClass("cat-card_image");
    $(image).attr('src', cat.src);
    $(image).click(fn_btn_click)
    $(counter).addClass("cat-card_counter-text_counter")
    $(card).addClass("cat-card");
    $(name_text).addClass("cat-card_name");

    $(name_text).html(cat.name);
    $(counter).html("0");
    $(counter_text).append(counter," clicks!");
    $(card).append(name_text, image, counter_text);
    return card
}

$(document).ready(()=>{
    cats.forEach((x)=> $('.container').append(fn_make_cat_card(x)));
})