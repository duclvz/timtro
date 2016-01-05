Template.news.onRendered(function() {
    $('select').material_select();
    var tmpl = this;
    var searchInput = this.$('#diachi');
    VazcoMaps.init({}, function() {
        tmpl.mapEngine = VazcoMaps.gMaps();
        tmpl.newMap = new tmpl.mapEngine({
            div: '#map-canvas',
            lat: 21.036702037921792,
            lng: 105.78249335289001
        });
        tmpl.newMap.addMarker({
            lat: 21.036702037921792,
            lng: 105.78249335289001,
            draggable: true,
            dragend: function() {
                var point = this.getPosition();
                tmpl.mapEngine.geocode({
                    location: point,
                    callback: function(results) {
                        tmpl.newMap.setCenter(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    }
                });
            }
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
            content: 'Lấy từ địa chỉ',
            style: {
                margin: '5px',
                padding: '1px 6px',
                border: 'solid 1px #717B87',
                background: '#fff'
            },
            events: {
                click: function() {
                    tmpl.mapEngine.geocode({
                        address: $('#diachi').val(),
                        callback: function(results, status) {
                            if (status == 'OK') {
                                var latlng = results[0].geometry.location;
                                tmpl.newMap.setCenter(latlng.lat(), latlng.lng());
                                tmpl.newMap.markers[0].setPosition(new google.maps.LatLng(latlng.lat(), latlng.lng()));
                            }
                        }
                    });
                }
            }
        });
        tmpl.mapEngine.on('click', tmpl.newMap.map, function(event) {
            var lat = event.latLng.lat();
            var lng = event.latLng.lng();
            tmpl.newMap.markers[0].setPosition(new google.maps.LatLng(lat, lng));
            tmpl.mapEngine.geocode({
                location: tmpl.newMap.markers[0].getPosition(),
                callback: function(results) {
                    tmpl.newMap.setCenter(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                }
            });
        });
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

Template.news.events({
    'click [id=dangtin]': function(event, template) {
        event.preventDefault();
        Article.insert({
            owner: Meteor.userId(),
            ownername: Meteor.user().username,
            time: (new Date()).getTime(),
            tieude: $('#tieude').val(),
            dienthoai: $('#dienthoai').val(),
            diachi: $('#diachi').val(),
            mota: $('#mota').val(),
            loai: $(".select-dropdown").val(),
            gia: parseInt($('#gia').val()),
            dientich: parseInt($('#dientich').val()),
            giadien: $('#giadien').val(),
            gianuoc: $('#gianuoc').val(),
            internet: $('#internet').val(),
            dieuhoa: $("#dieuhoa").is(':checked'),
            nonglanh: $("#nonglanh").is(':checked'),
            khepkin: $("#khepkin").is(':checked'),
            lat: template.newMap.markers[0].getPosition().lat(),
            lng: template.newMap.markers[0].getPosition().lng(),
            tieudekd: khongdau($('#tieude').val()),
            diachikd: khongdau($('#diachi').val()),
            motakd: khongdau($('#mota').val()),
            loaikd: khongdau($(".select-dropdown").val()),
            giadienkd: khongdau($('#giadien').val()),
            gianuockd: khongdau($('#gianuoc').val()),
            internetkd: khongdau($('#internet').val())
        }, function(err, res) {
            if (err) {
                Materialize.toast('Đăng bài lỗi, xin kiểm tra lại form', 3000, 'rounded');
            }
            else {
                Materialize.toast('Đăng bài thành công', 3000, 'rounded');
                Router.go('/');
            }
        })
    }
});