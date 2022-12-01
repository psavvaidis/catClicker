import { default as cats } from './data.js';
import * as utils from './utilities.js';

const model = {
    init: (cats) => {
        utils.save_locally(cats)
    },
    get: (cat, catlist = JSON.parse(localStorage.cats)) => {
        return catlist.filter((el) => el.name == cat)
    },
    get_all: (catlist = JSON.parse(localStorage.cats)) => { return catlist },
    setLink: (link, cat, catlist = JSON.parse(localStorage.cats)) => {
        model.get(cat, catlist)[0].src = link;
        utils.save_locally(catlist);
    },
    setName: (name, cat, catlist = JSON.parse(localStorage.cats)) => {
        model.get(cat, catlist)[0].name = name;
        utils.save_locally(catlist);
    },
    setCount: (count, cat, catlist = JSON.parse(localStorage.cats)) => {
        model.get(cat, catlist)[0].clickCount = count;
        utils.save_locally(catlist);
    }
}

var sidebar_view = {
    init: () => {
        var cats = octopus.load_list();
        $(".sidebar").html(utils.load_cat_list(cats));
        utils.add_cat_list_event_listeners(cats, $(".cat-list").find("li"), octopus.updateCard);
    },
    update: () => { }
}

var card_view = {
    init: () => {
        card_view.hideAdminBtn();
    },
    update: (target) => {
        var currentCat = octopus.get_cat($(target).attr("id"))[0];
        utils.load_cat(currentCat, $('.content'));
        octopus.updateAdmin(currentCat);
        card_view.showAdminBtn();
    },
    showAdminBtn: () => {
        utils.show('.admin-btn')
    },
    hideAdminBtn: () => {
        utils.hide('.admin-btn')
    },
    hideAdmin: ()=>{
        utils.hide('form#admin-form')
    },
    showAdmin: ()=>{
        utils.show('form#admin-form')
    }
}

var admin_view = {
    init: () => {
        utils.hide('form#admin-form')
        $('.admin-btn').click(admin_view.toggle)
    },
    initForm: (cat) => {
        //fill the form with cat info
        $('#catName').val(cat.name)
        $('#catImage').val(cat.src)
        $('#catCount').val(cat.clickCount)
        $('#cancelBtn').click(()=>{octopus.hideAdmin()})
        $('#saveBtn').click(admin_view.updateCat)
    },
    updateCat: () => {
        let cat = {
            name: $('#catName').val(),
            src: $('#catImage').val(),
            clickCount: $('#catCount').val()
        }
        octopus.updateCat(cat)
        octopus.hideAdmin()


    },
    toggle: (event) => {
        $('form#admin-form').toggle();
    },

}

var octopus = {
    init: (cats) => {
        model.init(cats);
        sidebar_view.init();
        card_view.init();
        admin_view.init();
    },
    load_list: () => { return model.get_all() },
    get_cat: (cat) => { return model.get(cat) },
    updateCard: (target) => {
        card_view.update(target);
    },
    hideAdmin: ()=>{card_view.hideAdmin()},
    updateAdmin: (cat)=>{admin_view.initForm(cat)},
    incrementCatCount: (event) => {
        var counter = $(event.target).siblings('.cat-card_counter-text').children('span');
        var currentCount = parseInt($(counter).html());
        counter = utils.increment(counter, currentCount).toString();
        model.setCount(counter, event.data.cat.name)
    },
    updateCat: (mycat)=>{
        model.setName(mycat.name, mycat.name)
        model.setLink(mycat.src, mycat.name)
        model.setCount(mycat.clickCount, mycat.name)
        console.log("cat updated")
    }
    
}

$(document).ready(() => {
    octopus.init(cats);
})

export { octopus, admin_view };