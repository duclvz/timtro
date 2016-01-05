Template.search.onRendered(function() {
    // if(!Session.get("loainhatro"))
    //     Session.set("loainhatro", "Tất cả");
    // else {
    //     $('select option[selected]')[0].removeAttribute("selected")
    //     switch (Session.get("loainhatro")) {
    //         case 'Tất cả':
    //             $('select option[value=1]')[0].setAttribute("selected", "")
    //             break;
    //         case 'Khu nhà trọ':
    //             $('select option[value=2]')[0].setAttribute("selected", "")
    //             break;
    //         case 'Chung cư mini':
    //             $('select option[value=3]')[0].setAttribute("selected", "")
    //             break;
    //         case 'Nhà trọ độc lập':
    //             $('select option[value=4]')[0].setAttribute("selected", "")
    //             break;
    //         case 'Nhà riêng':
    //             $('select option[value=5]')[0].setAttribute("selected", "")
    //             break;
    //         case 'Ở cùng chủ':
    //             $('select option[value=6]')[0].setAttribute("selected", "")
    //             break;
    //         case 'Ở ghép':
    //             $('select option[value=7]')[0].setAttribute("selected", "")
    //             break;
    //         default:
    //             break;
    //     }
    // }
    // if(!Session.get("mucgia"))
    //     Session.set("mucgia", "Tất cả");
    // else {
    //     $('select option[selected]')[1].removeAttribute("selected")
    //     switch (Session.get("mucgia")) {
    //         case 'Tất cả':
    //             $('select option[value=1]')[1].setAttribute("selected", "")
    //             break;
    //         case 'Dưới 1 triệu':
    //             $('select option[value=2]')[1].setAttribute("selected", "")
    //             break;
    //         case '1-2 triệu':
    //             $('select option[value=3]')[1].setAttribute("selected", "")
    //             break;
    //         case '2-3 triệu':
    //             $('select option[value=4]')[1].setAttribute("selected", "")
    //             break;
    //         case 'Trên 3 triệu':
    //             $('select option[value=5]')[1].setAttribute("selected", "")
    //             break;
    //         default:
    //             break;
    //     }
    // }
    // if(!Session.get("dientich"))
    //     Session.set("dientich", "Tất cả");
    // else {
    //     $('select option[selected]')[2].removeAttribute("selected")
    //     switch (Session.get("dientich")) {
    //         case 'Tất cả':
    //             $('select option[value=1]')[2].setAttribute("selected", "")
    //             break;
    //         case 'Dưới 10 m2':
    //             $('select option[value=2]')[2].setAttribute("selected", "")
    //             break;
    //         case '10-15 m2':
    //             $('select option[value=3]')[2].setAttribute("selected", "")
    //             break;
    //         case '15-20 m2':
    //             $('select option[value=4]')[2].setAttribute("selected", "")
    //             break;
    //         case '20-25 m2':
    //             $('select option[value=5]')[2].setAttribute("selected", "")
    //             break;
    //         case 'Trên 25 m2':
    //             $('select option[value=6]')[1].setAttribute("selected", "")
    //             break;
    //         default:
    //             break;
    //     }
    // }
    // if(Session.get("dieuhoa") == undefined)
    //     Session.set("dieuhoa", false);
    // else {
    //     if(Session.get("dieuhoa")==true)
    //         $('#dieuhoa').attr("checked", "checked")
    // }
    // if(Session.get("nonglanh") == undefined)
    //     Session.set("nonglanh", false);
    // else {
    //     if(Session.get("nonglanh")==true)
    //         $('#nonglanh').attr("checked", "checked")
    // }
    // if(Session.get("khepkin") == undefined)
    //     Session.set("khepkin", false);
    // else {
    //     if(Session.get("khepkin")==true)
    //         $('#khepkin').attr("checked", "checked")
    // }
    $('select').material_select();
    $('#search').val(Router.current().params.query.q);
    Session.set("limitsearch", 4);
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            if (Session.get("limitsearch") < Article.find().fetch().length)
                Session.set("limitsearch", Session.get("limitsearch") + 4);
        }
    });
    var tmpl = this;
    VazcoMaps.init({}, function() {
        tmpl.mapEngine = VazcoMaps.gMaps();
    });
    
})

function khongdau(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

Template.search.helpers({
    articles: function() {
        var query = {};
        if (Router.current().params.query.q && Router.current().params.query.q.length > 0) {
            var q = khongdau(Router.current().params.query.q);
            query = {
                $or: [{
                    tieude: {
                        $regex: q
                    }
                }, {
                    ownername: {
                        $regex: q
                    }
                }, {
                    diachi: {
                        $regex: q
                    }
                }, {
                    dienthoai: {
                        $regex: q
                    }
                }, {
                    mota: {
                        $regex: q
                    }
                }, {
                    gia: parseInt(q)
                }, {
                    loai: {
                        $regex: q
                    }
                }, {
                    giadien: {
                        $regex: q
                    }
                }, {
                    gianuoc: {
                        $regex: q
                    }
                }, {
                    internet: {
                        $regex: q
                    }
                }, {
                    tieudekd: {
                        $regex: q
                    }
                }, {
                    diachikd: {
                        $regex: q
                    }
                }, {
                    motakd: {
                        $regex: q
                    }
                }, {
                    loaikd: {
                        $regex: q
                    }
                }, {
                    giadienkd: {
                        $regex: q
                    }
                }, {
                    gianuockd: {
                        $regex: q
                    }
                }, {
                    internetkd: {
                        $regex: q
                    }
                }]
            };
        }
        if (Session.get("loainhatro") && Session.get("loainhatro") != 'Chọn loại nhà trọ' && Session.get("loainhatro") != 'Tất cả') {
            query.loai = Session.get("loainhatro");
        }
        if (Session.get("mucgia") && Session.get("mucgia") != 'Chọn mức giá' && Session.get("mucgia") != 'Tất cả') {
            switch (Session.get("mucgia")) {
                case 'Dưới 1 triệu':
                    query.gia = {
                        $lt: 1000000
                    }
                    break;
                case '1-2 triệu':
                    query.gia = {
                        $gte: 1000000,
                        $lte: 2000000
                    }
                    break;
                case '2-3 triệu':
                    query.gia = {
                        $gte: 2000000,
                        $lte: 3000000
                    }
                    break;
                case 'Trên 3 triệu':
                    query.gia = {
                        $gte: 3000000
                    }
                    break;
                default:
                    break;
            }
        }
        if (Session.get("dientich") && Session.get("dientich") != 'Chọn diện tích' && Session.get("dientich") != 'Tất cả') {
            switch (Session.get("dientich")) {
                case 'Dưới 10 m2':
                    query.dientich = {
                        $lt: 10
                    }
                    break;
                case '10-15 m2':
                    query.dientich = {
                        $gte: 10,
                        $lte: 15
                    }
                    break;
                case '15-20 m2':
                    query.dientich = {
                        $gte: 15,
                        $lte: 20
                    }
                    break;
                case '20-25 m2':
                    query.dientich = {
                        $gte: 20,
                        $lte: 25
                    }
                    break;
                case 'Trên 25 m2':
                    query.dientich = {
                        $gte: 25
                    }
                    break;
                default:
                    break;
            }
        }
        if (Session.get("dieuhoa")) {
            query.dieuhoa = true;
        }
        if (Session.get("nonglanh")) {
            query.nonglanh = true;
        }
        if (Session.get("khepkin")) {
            query.khepkin = true;
        }
        console.log(query);
        return Article.find(query, {
            sort: {
                time: -1
            },
            limit: Session.get("limitsearch")
        }).fetch();
    },
    convertTime: function(time) {
        var datetime = new Date(time);
        return datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds() + ' ' + datetime.getDate() + '/' + (datetime.getMonth() + 1) + '/' + (datetime.getYear() + 1900);
    },
    urlMap: function(lat, lng) {
        return VazcoMaps.gMaps().staticMapURL({
            size: [280, 140],
            lat: lat,
            lng: lng,
            markers: [{
                lat: lat,
                lng: lng
            }]
        });
    },
    numberWithCommas: function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
})

Template.search.events({
    'click [id=loc]': function(event, template) {
        event.preventDefault();
        Session.set("loainhatro", $("input.select-dropdown")[0].value);
        Session.set("mucgia", $("input.select-dropdown")[1].value);
        Session.set("dientich", $("input.select-dropdown")[2].value);
        Session.set("dieuhoa", $('#dieuhoa').is(':checked'));
        Session.set("nonglanh", $('#nonglanh').is(':checked'));
        Session.set("khepkin", $('#khepkin').is(':checked'));
    }
})