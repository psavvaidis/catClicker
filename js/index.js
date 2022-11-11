import { default as cats } from './data.js';
import * as utils from './utilities.js';

var model = {
    init: (cats)=>{utils.save_locally(cats)},
    get: (cat, catlist = JSON.parse(localStorage.cats))=>{ return catlist.filter((el)=> el.name == cat.name)},
    get_all: (catlist=JSON.parse(localStorage.cats))=>{ return catlist},
    setCount: (count, cat, catlist = JSON.parse(localStorage.cats))=>{
        catlist.forEach(element => {
            if(element == cat){
                element.clickCount = count;
            }
        });
    }
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
    init: ()=> {
        model.init();
        sidebar_view.init();
        card_view.init();
    },
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

    //GOAL
    //octopus.init()
})