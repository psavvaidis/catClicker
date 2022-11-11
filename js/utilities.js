export const    increment=(elem, current)=>{
    elem.html(current + 1);
    return current + 1
}
export const
btn_click=(event)=>{
    var counter = $(event.target).siblings('.cat-card_counter-text').children('span');
    var currentCount = parseInt($(counter).html());
    event.data.cat.clickCount = increment(counter, currentCount).toString();
}

export const make_cat_card = (cat) => {
    var card = document.createElement("div");
    var name_text = document.createElement("span");
    var image = document.createElement("img");
    var counter = document.createElement("span");
    var counter_text = document.createElement("p");
    
    $(counter_text).addClass("cat-card_counter-text");
    $(image).addClass("cat-card_image");
    $(image).attr('src', cat.src);
    $(image).click({"cat": cat}, btn_click)
    $(counter).addClass("cat-card_counter-text_counter")
    $(card).addClass("cat-card");
    $(name_text).addClass("cat-card_name");

    $(name_text).html(cat.name);
    $(counter).html(cat.clickCount);
    $(counter_text).append(counter," clicks!");
    $(card).append(name_text, image, counter_text);
    return card
}

export const load_cat = (cat, target) => {
    $(target).html(make_cat_card(cat));
}

export const load_cat_list = (cats) => {
    var list = document.createElement("ul");
    $(list).addClass("cat-list");
    cats.forEach((cat)=> $(list).append("<li><a class=\"cat-list_item\" id=\""+ cat.name + "\">" + cat.name + "</a></li>"));
    return list;
}

export const add_cat_list_event_listeners = (cats, catListitems) => {

    catListitems.each(item => {
        $(catListitems[item]).click((event)=> {
            // console.log(cats.filter(cat => cat.name == $(event.target).attr("id"))[0])
            load_cat(cats.filter(cat => cat.name == $(event.target).attr("id"))[0], $(".content"));
        })
    })
    
}

export default {}