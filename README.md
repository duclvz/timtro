## Cơ bản về giao diện
Giao diện trên web lẫn mobile (Android/iOS) đều giống nhau, được thiết kế bởi các template đc viết bằng HTML5, được tổ chức trong thư mục /client.
Ứng dụng này sử dụng thư viện Materialize CSS và các style CSS riêng trong thư mục /client/styles.

## Các mẫu (template) được thiết kế theo từng màn hình:
index.html: Header HTML5 cho các template.
masterLayout.html: Mẫu bao bên ngoài cho toàn bộ các màn hình giao diện, bao gồm các vùng như nav, tab, và vùng nội dung.
search.html: Mẫu giao diện cho màn hình tìm kiếm.
nav.html: Mẫu giao diện thanh nav mặc định (có thanh tìm kiếm)
tabs.html: Mẫu giao diện thanh tab menu.
article.html: Mẫu giao diện màn hình chi tiết bài đăng phòng trọ.
home.html: Mẫu giao diện tab trang chủ (danh sách các bài đăng)
news.html: Mẫu giao diện đăng bài phòng trọ.
maps.html: Mẫu giao diện bản đồ hiển thị các địa điểm cho thuê phòng trọ(các bài đăng).
menu.html: Mẫu giao diện menu điều khiển, bao gồm đăng bài, xem bản đồ, đăng xuất, đăng nhập, đổi mật khẩu.
navDefault.html: Mẫu giao diện thanh nav mặc định (chỉ có tiêu đề)
navSearch.html: Mẫu giao diện thanh nav cho màn hình tìm kiếm.
navNews.html: Mẫu giao diện thanh nav cho màn hình đăng bài.
navMap.html: Mẫu giao diện thanh nav cho màn hình bản đồ

## Cài đặt Meteor
HĐH Mac, Linux: Chạy dòng lệnh sau
curl https://install.meteor.com/ | sh

HĐH Windows:
Download file cài đặt tại địa chỉ https://install.meteor.com/windows

## Khởi chạy ứng dụng Server:
meteor run

Ngoài ra còn có thể deploy lên trên internet theo hướng dẫn: https://www.meteor.com/tutorials/blaze/deploying-your-app
Build ứng dụng client ra nên tảng iOS hoặc Android: https://www.meteor.com/tutorials/blaze/running-on-mobile

## Chạy demo/test:
Hiện tại nhóm đã deploy ứng dụng lên trang web https://www.timtro.meteor.com