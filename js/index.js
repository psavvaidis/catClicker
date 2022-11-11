import cats from './data';
import './utilities';

var model = {
    init: ()=>{},
    getCat: ()=>{},
    getAllCats: ()=>{},
    setCount: ()=>{}
}

var sidebar_view = {
    init: ()=> {},
    update: ()=> {}
}

var card_view = {
    init: ()=> {},
    update: ()=> {}
}

var octopus = {
    init: ()=> {},
    updateCard: ()=>{},
    incrementCatCount: ()=>{}
}




$(document).ready(()=>{
    // Render cat list to the sidebar
    $(".sidebar").html(fn_load_cat_list(cats));

    // add click listeners to sidebar cat names to show each cat
    fn_add_cat_list_event_listeners($(".cat-list").find("li"));
    // cats.forEach((x)=> $('.content').append(fn_make_cat_card(x)));
})