Article = new Meteor.Collection('article');

var perms = {
  insert: function(userId, doc) {
    return userId && doc.tieude && doc.diachi && doc.dienthoai && doc.gia && doc.giadien && doc.gianuoc && doc.dientich && doc.internet && doc.lat && doc.lng && doc.owner === userId;
  },
  update: function(userId, doc) {
    return doc && doc.owner === userId;
  },
  remove: function(userId, doc) {
    return doc && doc.owner === userId;
  }
};

var deny = {
  update: function(userId, docs, fields) {
    return fields.indexOf('owner') > -1;
  }
};
Article.allow(perms);
Article.deny(deny);

if (Meteor.isClient) {
  touchSupported = () => {
    return 'ontouchstart' in window;
  };

  Meteor.startup(function() {
    Meteor.subscribe('article');
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    Meteor.publish('article', function() {
      return Article.find({});
    });
  });
}