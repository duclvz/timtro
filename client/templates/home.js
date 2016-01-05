Template.home.onRendered(function() {
    Session.set("limit", 4);
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() == $(document).height() && $("li.tab > a.active[href=#home]").length>0) {
            if(Session.get("limit")<Article.find().fetch().length)
                Session.set("limit", Session.get("limit") + 4);
        }
    });
    var tmpl = this;
    VazcoMaps.init({}, function() {
        tmpl.mapEngine = VazcoMaps.gMaps();
    });
});
Template.home.helpers({
    articles: function() {
        return Article.find({}, {
            sort: {
                time: -1
            },
            limit: Session.get("limit")
        }).fetch();
    },
    convertTime: function(time) {
        var datetime =  new Date(time); 
        return datetime.getHours()+':'+datetime.getMinutes()+':'+datetime.getSeconds()+' '+datetime.getDate()+'/'+(datetime.getMonth()+1)+'/'+(datetime.getYear()+1900);
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