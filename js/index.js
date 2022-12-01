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
        if ($('.admin-btn').hasClass('hide')) {
            $('.admin-btn').removeClass('hide');
        }
        $('.admin-btn').addClass('show');
    },
    hideAdminBtn: () => {
        if ($('.admin-btn').hasClass('show')) {
            $('.admin-btn').removeClass('show');
        }
        $('.admin-btn').addClass('hide');
    }
}

var admin_view = {
    init: () => {
        $('.admin-btn').click(admin_view.toggle)
    },
    initForm: (cat) => {
        //fill the form with cat info
        $('#catName').val(cat.name)
        $('#catImage').val(cat.src)
        $('#catCount').val(cat.clickCount)
    },
    updateCat: () => {
        //send data to octopus
    },
    toggle: (event) => {
        $('form#admin-form').toggleClass('visible');
    }
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
    updateAdmin: (cat)=>{admin_view.initForm(cat)},
    incrementCatCount: (event) => {
        var counter = $(event.target).siblings('.cat-card_counter-text').children('span');
        var currentCount = parseInt($(counter).html());
        counter = utils.increment(counter, currentCount).toString();
        model.setCount(counter, event.data.cat.name)
    }
}

$(document).ready(() => {

    // Render cat list to the sidebar

    // $(".sidebar").html(utils.load_cat_list(cats));

    // add click listeners to sidebar cat names to show each cat
    // utils.add_cat_list_event_listeners(cats, $(".cat-list").find("li"));
    // cats.forEach((x)=> $('.content').append(fn_make_cat_card(x)));

    //GOAL
    octopus.init(cats);
})

export { octopus, admin_view };