// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.findRoles = functions.https.onCall(async (data, context) => {
  console.log("Running findRoles")
  console.log(data.email,"email")
  let isAdmin = false;
  let isCompany = false;
  try{
    const user = await admin.auth().getUserByEmail(data.email)
    isAdmin = (user.customClaims && user.customClaims.admin === true)
    isCompany = (user.customClaims && user.customClaims.company === true)

    if(isAdmin && isCompany){
      return({message: `User: ${data.email} is a dev with both <admin> and <company> roles!`})
    }else if(isAdmin){
      return({message: `User: ${data.email} is a admin with the <admin> role!`})
    }else if(isCompany){
      return({message: `User: ${data.email} is a company with the <company> role!`})
    }else{
      return({message: `User: ${data.email} is a student with no roles!`})
    }

  }catch(err){
    console.log("Send html error:",err.message)
    throw new functions.https.HttpsError("invalid-argument", err.message)
  }

})

exports.addAdminRole = functions.https.onCall(async (data, context) => {
  console.log("Running addAdmin")
  console.log(data.email,"email")
  try{
    const user = await admin.auth().getUserByEmail(data.email)
    await admin.auth().setCustomUserClaims(user.uid, {admin: true})
    console.log({message: `Successfully made ${data.email} an admin!`}, "return")
    return({message: `Successfully made ${data.email} an admin!`})
  }catch(err){
    console.log("Send html error:",err.message)
    throw new functions.https.HttpsError("invalid-argument", err.message)
  }

})

exports.hello = functions.https.onCall(async (data, context) => {
  console.log("Running hello")
})

exports.addCompanyRole = functions.https.onCall(async (data, context) => {
  console.log("Running add Comp")
  console.log(data.email,"email")
  try{
    const user = await admin.auth().getUserByEmail(data.email)
    await admin.auth().setCustomUserClaims(user.uid, {company: true})
    console.log({message: `Made ${data.email} a company user!`}, "return")
    return({message: `Made ${data.email} a company user!`})
  }catch(err){
    console.log("Send html error:",err.message)
    throw new functions.https.HttpsError("invalid-argument", err.message)
  }

})

exports.addDeveloperRole = functions.https.onCall(async (data, context) => {
  console.log("Running add Dev")
  console.log(data.email,"email")
  try{
    const user = await admin.auth().getUserByEmail(data.email)
    await admin.auth().setCustomUserClaims(user.uid, {company: true, admin: true})
    console.log({message: `Made ${data.email} a developer user!`}, "return")
    return({message: `Made ${data.email} a developer user!`})
  }catch(err){
    console.log("Send html error:",err.message)
    throw new functions.https.HttpsError("invalid-argument", err.message)
  }

})

exports.deleteRoles = functions.https.onCall(async (data, context) => {
  console.log("Running delRoles")
  console.log(data.email,"email")
  try{
    const user = await admin.auth().getUserByEmail(data.email)
    await admin.auth().setCustomUserClaims(user.uid, null)
    console.log({message: `Made ${data.email} a standard user!`}, "return")
    return({message: `Made ${data.email} a standard user!`})
  }catch(err){
    console.log("Send html error:",err.message)
    throw new functions.https.HttpsError("invalid-argument", err.message)
  }

})



exports.createNewCompany = functions.https.onCall(async (data, context) => {
  console.log("Running new Comp")
  console.log(data.formVals,"formVals")
  try{
    console.log("creating new user", data.formValsmname)
    const user = await admin.auth().createUser({
      email: data.formVals.email,
      emailVerified: true,
      password: data.formVals.pwd,
      displayName: data.formVals.name,
    })
    console.log(user)
    await admin.auth().setCustomUserClaims(user.uid, {company: true})
    await admin.firestore().collection("companies").doc(user.uid).set({
      name: data.formVals.name,
      info: data.formVals.info,
      jobs: [],
      hasTempPass: true, 
      logoURL: data.formVals.url
    })

    console.log({message: `Made a new company with uid of: ${user.uid}`}, "return")
    return({message: `Made a new company with uid of: ${user.uid}`})
  }catch(err){
    console.log("Send html error:",err.message)
    throw new functions.https.HttpsError("invalid-argument", err.message)
  }
})

exports.addNewJob = functions.https.onCall(async (data, context) => {
  console.log("Running new Job")
  console.log(data.formVals.companyID,"uid for company")
  console.log(data.formVals.jobTitle,"Job title")
  console.log(data.formVals.jobInfo,"Job info")
  console.log(data.formVals.jobDl,"Job deadline")
  try{

    const compRef =  await admin.firestore().collection("companies").doc(data.formVals.companyID)
    const compDoc = await compRef.get()

    if (compDoc.exists) { // found intended company
      const jobRef = await admin.firestore().collection("jobs").add({
        title: data.formVals.jobTitle,
        info: data.formVals.jobInfo,
        deadline: data.formVals.jobDl,
        companyID: data.formVals.companyID,
        companyName: compDoc.data().name,
        applicants: [],
        downloaded: ""
      })
      await compRef.update({jobs: admin.firestore.FieldValue.arrayUnion(jobRef.id)}) // add the job id to the company doc
      console.log({message: `Job successfully added`}, "return")
      return({message: `Job successfully added`})
    }
    else{
        // doc.data() will be undefined in this case
        console.log("Send html error:",`Company ID ${data.formVals.companyID} not found`)
        throw new functions.https.HttpsError("invalid-argument", `Company ID ${data.formVals.companyID} not found`)
    }
  }catch(err){
    console.log("Send html error:",err.message)
    throw new functions.https.HttpsError("invalid-argument", err.message)
  }
})

exports.hello1234 = functions.https.onCall(async (data, context) => {
  console.log("Running verify email (hello1234)")
  console.log(data.email,"email")
  try{
    const user = await admin.auth().getUserByEmail(data.email)
    await admin.auth().updateUser(user.uid, {emailVerified: true})
    console.log({message: `Verified ${data.email}'s email`}, "return")
    return({message: `Verified ${data.email}'s email!`})
  }catch(err){
    console.log("Send html error:",err.message)
    throw new functions.https.HttpsError("invalid-argument", err.message)
  }
})


//Examples left below for reference:
// // Take the text parameter passed to this HTTP endpoint and insert it into
// // Cloud Firestore under the path /messages/:documentId/original
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Cloud Firestore using the Firebase Admin SDK.
//   const writeResult = await admin.firestore().collection('messages').add({original: original});
//   // Send back a message that we've succesfully written the message
//   res.json({result: `Message with ID: ${writeResult.id} added.`});
// });
//
// // Listens for new messages added to /messages/:documentId/original and creates an
// // uppercase version of the message to /messages/:documentId/uppercase
// exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
//     .onCreate((snap, context) => {
//       // Grab the current value of what was written to Cloud Firestore.
//       const original = snap.data().original;
//
//       // Access the parameter `{documentId}` with `context.params`
//       functions.logger.log('Uppercasing', context.params.documentId, original);
//
//       const uppercase = original.toUpperCase();
//
//       // You must return a Promise when performing asynchronous tasks inside a Functions such as
//       // writing to Cloud Firestore.
//       // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
//       return snap.ref.set({uppercase}, {merge: true});
//     });
