import { default as cats } from './data.js';
import * as utils from './utilities.js';

var model = {
    init: (cats)=>{
        utils.save_locally(cats)
    },
    get: (cat, catlist = JSON.parse(localStorage.cats))=>{ 
        return catlist.filter((el)=> el.name == cat)
    },
    get_all: (catlist=JSON.parse(localStorage.cats))=>{return catlist},
    setCount: (count, cat, catlist = JSON.parse(localStorage.cats))=>{
        catlist.forEach(element => {
            if(element == cat){
                element.clickCount = count;
            }
        });
        utils.save_locally(catlist);
    },
    setName: (name, cat, catlist = JSON.parse(localStorage.cats))=>{
        catlist.forEach(element => {
            if(element == cat){
                element.clickCount = count;
            }
        });
        utils.save_locally(catlist);
    },
    setCount: (count, cat, catlist = JSON.parse(localStorage.cats))=>{
        // model.get(cat.name,catlist)
        catlist.forEach(element => {
            if(element == cat){
                element.clickCount = count;
            }
        });
        utils.save_locally(catlist);
    }
}

var sidebar_view = {
    init: ()=> {
        var cats = octopus.load_list();
        $(".sidebar").html(utils.load_cat_list(cats));
        utils.add_cat_list_event_listeners(cats, $(".cat-list").find("li"), octopus.updateCard);
    },
    update: ()=> {}
}

var card_view = {
    init: ()=> {},
    update: (target)=> {
        utils.load_cat(model.get($(target).attr("id"))[0], $('.content'));
    }
}

var octopus = {
    init: (cats)=> {
        model.init(cats);
        sidebar_view.init();
        card_view.init();
    },
    load_list: ()=>{ return model.get_all()},
    updateCard: (target)=>{
        card_view.update(target);
    },
    incrementCatCount: (event)=>{
        var counter = $(event.target).siblings('.cat-card_counter-text').children('span');
        var currentCount = parseInt($(counter).html());
        event.data.cat.clickCount = utils.increment(counter, currentCount).toString();
    }
}

$(document).ready(()=>{
    
    // Render cat list to the sidebar
    
    // $(".sidebar").html(utils.load_cat_list(cats));

    // add click listeners to sidebar cat names to show each cat
    // utils.add_cat_list_event_listeners(cats, $(".cat-list").find("li"));
    // cats.forEach((x)=> $('.content').append(fn_make_cat_card(x)));

    //GOAL
    octopus.init(cats);
})

export {octopus};