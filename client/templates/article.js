Template.article.helpers({
    article: function() {
        return Article.findOne({
            _id: Router.current().params._id
        });
    },
    convertTime: function(time) {
        var datetime = new Date(time);
        return datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds() + ' ' + datetime.getDate() + '/' + (datetime.getMonth() + 1) + '/' + (datetime.getYear() + 1900);
    },
    numberWithCommas: function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});

Template.article.onRendered(function() {
    var article = Article.findOne({
        _id: Router.current().params._id
    });
    if (Meteor.userId() == article.owner) {
        $('#thongtin').append('<div class="collection-item"><button id="xoabai" class="waves-effect waves-light btn-large" style="width: 100%;">Xóa bài đăng</button></div>');
    }
})

Template.article.events({
    'click [id=xoabai]': function(event, template) {
        event.preventDefault();
        Article.remove({
            _id: Router.current().params._id
        }, function(err, res) {
            if (err) {
                Materialize.toast('Lỗi, không thể xóa', 3000, 'rounded');
            }
            else {
                Materialize.toast('Đã xóa bài đăng', 3000, 'rounded');
                Router.go('/');
            }
        })
    }
});

Template.mapCanvas.onRendered(function() {

    var tmpl = this;
    var article = Article.findOne({
        _id: Router.current().params._id
    });

    document.getElementById("dieuhoa").checked = article.dieuhoa;
    document.getElementById("nonglanh").checked = article.nonglanh;
    document.getElementById("khepkin").checked = article.khepkin;
    VazcoMaps.init({}, function() {
        tmpl.mapEngine = VazcoMaps.gMaps();
        tmpl.newMap = new tmpl.mapEngine({
            div: '#map-canvas',
            lat: article.lat,
            lng: article.lng
        });
        tmpl.newMap.addMarker({
            lat: article.lat,
            lng: article.lng
        });
        tmpl.newMap.addControl({
            position: 'top_right',
            content: 'Dẫn đường',
            style: {
                margin: '5px',
                padding: '1px 6px',
                border: 'solid 1px #717B87',
                background: '#fff'
            },
            events: {
                click: function() {
                    tmpl.mapEngine.geolocate({
                        success: function(position) {
                            tmpl.newMap.setCenter(position.coords.latitude, position.coords.longitude);
                            tmpl.newMap.drawRoute({
                                origin: [position.coords.latitude, position.coords.longitude],
                                destination: [article.lat, article.lng],
                                travelMode: 'driving',
                                strokeColor: '#131540',
                                strokeOpacity: 0.6,
                                strokeWeight: 6
                            });
                        },
                        error: function(error) {
                            alert('Geolocation failed: ' + error.message);
                        },
                        not_supported: function() {
                            alert("Your browser/app does not support geolocation");
                        }
                    });
                }
            }
        });
        tmpl.newMap.addControl({
            position: 'left_bottom',
            content: 'Xem địa chỉ',
            style: {
                margin: '5px',
                padding: '1px 6px',
                border: 'solid 1px #717B87',
                background: '#fff'
            },
            events: {
                click: function() {
                    tmpl.newMap.setCenter(article.lat, article.lng);
                }
            }
        });
    });
});