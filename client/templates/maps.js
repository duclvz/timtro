Template.maps.onRendered(function() {
    var tmpl = this;
    var articles = Article.find({}).fetch();
    VazcoMaps.init({}, function() {
        tmpl.mapEngine = VazcoMaps.gMaps();
        tmpl.newMap = new tmpl.mapEngine({
            div: '#map-canvas',
            lat: 21.036702037921792,
            lng: 105.78249335289001
        });
        tmpl.mapEngine.geolocate({
            success: function(position) {
                tmpl.newMap.setCenter(position.coords.latitude, position.coords.longitude);
            },
            error: function(error) {
                alert('Geolocation failed: ' + error.message);
            },
            not_supported: function() {
                alert("Your browser/app does not support geolocation");
            }
        });
        if (Router.current().params.query.q && Router.current().params.query.q.length > 0) {
            tmpl.mapEngine.geocode({
                address: Router.current().params.query.q,
                callback: function(results, status) {
                    if (status == 'OK') {
                        var latlng = results[0].geometry.location;
                        tmpl.newMap.setCenter(latlng.lat(), latlng.lng());
                    }
                }
            });
        }
        for (var i = 0; i < articles.length; i++) {
            tmpl.newMap.addMarker({
                lat: articles[i].lat,
                lng: articles[i].lng,
                infoWindow: {
                    content: '<div id="mapcontent"><p><b>ĐT: </b><span><a href="tel:' + articles[i].dienthoai + '">' + articles[i].dienthoai + '</a></span></p><p><b>Giá: </b><span>' + (articles[i].gia / 1000) + 'K</span></p><p><span>' + articles[i].loai + '</span></p><p><b><a href="/article/' + articles[i]._id + '">Xem chi tiết</a></b></p></div>'
                }
            })
        }
        tmpl.newMap.addControl({
            position: 'top_right',
            content: 'Định vị',
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
            content: 'Tìm từ địa chỉ',
            style: {
                margin: '5px',
                padding: '1px 6px',
                border: 'solid 1px #717B87',
                background: '#fff'
            },
            events: {
                click: function() {
                    tmpl.mapEngine.geocode({
                        address: $('#search').val(),
                        callback: function(results, status) {
                            if (status == 'OK') {
                                var latlng = results[0].geometry.location;
                                tmpl.newMap.setCenter(latlng.lat(), latlng.lng());
                            }
                        }
                    });
                }
            }
        });
    });
    $('#search').val(Router.current().params.query.q);
})