Router.configure({
  layoutTemplate: 'masterLayout',
  yieldTemplates: {
    navDefault: {
      to: 'nav'
    }
  }
});

Router.map(function() {
  this.route('', {
    path: '/',
    yieldRegions: {
      'nav': {
        to: 'nav'
      },
      'tabs': {
        to: 'tabs'
      }
    }
  });
  this.route('article', {
    path: '/article/:_id'
  });
  this.route('search', {
    path: '/search',
    yieldRegions: {
      'navSearch': {
        to: 'nav'
      },
      '': {
        to: 'tabs'
      }
    }
  });
  this.route('maps', {
    path: '/maps',
    yieldRegions: {
      'navMap': {
        to: 'nav'
      },
      '': {
        to: 'tabs'
      }
    }
  });
  this.route('news', {
    path: '/news',
    yieldRegions: {
      'navNews': {
        to: 'nav'
      },
      '': {
        to: 'tabs'
      }
    }
  });
});

Router.plugin('ensureSignedIn', {
  only: ['news']
});

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');