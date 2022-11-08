var cats = [
    {
        name: "Fizzy", 
        src: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHw%3D&w=1000&q=80",
        clickCount: "0"
    },
    {
        name: "Lola", 
        src: "https://rukminim1.flixcart.com/image/416/416/kph8h3k0/poster/e/w/4/large-adorable-cat-poster-cute-kittens-poster-cat-poster-funny-original-imag3p7tcxuzhpn2.jpeg?q=70",
        clickCount: "0"
    },
    {
        name: "Jynx", 
        src: "https://play-lh.googleusercontent.com/AmKSpZt_rynhOO0ID1eS0gqeW3DFzoH6KNZkAAgepQ0t9MDRQTmil-nlY5GqkZ_7El0",
        clickCount: "0"
    },
    {
        name: "Roi", 
        src: "https://www.rd.com/wp-content/uploads/2019/09/Cute-cat-lying-on-his-back-on-the-carpet.-Breed-British-mackerel-with-yellow-eyes-and-a-bushy-mustache.-Close-up-e1573490045672.jpg",
        clickCount: "0"
    },
    {
        name: "Fluff", 
        src: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2020%2F06%2F26%2Ftiny-white-kitten-873941684-2000.jpg",
        clickCount: "0"
    }
]

fn_increment=(elem, current)=>{
    elem.html(current + 1);
    return current + 1

}

fn_btn_click=(event)=>{
    var counter = $(event.target).siblings('.cat-card_counter-text').children('span');
    var currentCount = parseInt($(counter).html());
    event.data.cat.clickCount = fn_increment(counter, currentCount).toString();
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
    $(image).click({"cat": cat}, fn_btn_click)
    $(counter).addClass("cat-card_counter-text_counter")
    $(card).addClass("cat-card");
    $(name_text).addClass("cat-card_name");

    $(name_text).html(cat.name);
    $(counter).html(cat.clickCount);
    $(counter_text).append(counter," clicks!");
    $(card).append(name_text, image, counter_text);
    return card
}

fn_load_cat = (cat, target) => {
    $(target).html(fn_make_cat_card(cat));
}

fn_load_cat_list = (cats) => {
    var list = document.createElement("ul");
    $(list).addClass("cat-list");
    cats.forEach((cat)=> $(list).append("<li><a class=\"cat-list_item\" id=\""+ cat.name + "\">" + cat.name + "</a></li>"));
    return list;
}

fn_add_cat_list_event_listeners = (catListitems) => {

    catListitems.each(item => {
        $(catListitems[item]).click((event)=> {
            // console.log(cats.filter(cat => cat.name == $(event.target).attr("id"))[0])
            fn_load_cat(cats.filter(cat => cat.name == $(event.target).attr("id"))[0], $(".content"));
        })
    })
    
}



$(document).ready(()=>{
    // Render cat list to the sidebar
    $(".sidebar").html(fn_load_cat_list(cats));

    // add click listeners to sidebar cat names to show each cat
    fn_add_cat_list_event_listeners($(".cat-list").find("li"));
    // cats.forEach((x)=> $('.content').append(fn_make_cat_card(x)));
})