Template.menu.onRendered(function (){
  $('#menu a').css('width', '60%')
})

Template.menu.helpers({
  isLoggedIn() {
    return !!Meteor.userId();
  }
});