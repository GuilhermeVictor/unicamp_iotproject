// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '590643434438155', // your App ID
        'clientSecret'  : '2010ca570270d449d031881cf22db017', // your App Secret
        'callbackURL'   : '/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '539031058944-h7kn8kg1gplkhde0ri4v9jc0sjsnjpla.apps.googleusercontent.com',
        'clientSecret'  : 'nkSeEXyzc_QhmWEvlVZhCPBa',
        'callbackURL'   : '/google/oauth2/callback'
    }

};
