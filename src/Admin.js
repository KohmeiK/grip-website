var admin = require("firebase-admin");

var serviceAccount = require("./testing2-54b27-firebase-adminsdk-wwgva-2e931a21e6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testing2-54b27.firebaseio.com"
});

