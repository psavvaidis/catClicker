import { default as cats } from './data.js';
import * as utils from './utilities.js';

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
    console.log(cats)
    $(".sidebar").html(utils.load_cat_list(cats));

    // add click listeners to sidebar cat names to show each cat
    utils.add_cat_list_event_listeners(cats, $(".cat-list").find("li"));
    // cats.forEach((x)=> $('.content').append(fn_make_cat_card(x)));
})