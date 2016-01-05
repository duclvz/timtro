Template.tabs.onRendered(function() {
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'home');
    $('li > a[href=#news]').click(function() {
        Router.go('/news')
    })
    $('li > a[href=#maps]').click(function() {
        Router.go('/maps')
    })
});