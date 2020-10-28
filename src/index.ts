/* eslint-disable no-console */

import makePdf from './makePdf';

import firebase from './firebase';

export type InputData = {
  name?: string | null;
  text?: string | null;
};
// const getData = (): Promise<Array<firebase.firestore.DocumentData | null>> => {
//   return new Promise((res, err) => {});
// };
async function main(): Promise<void> {
  const auth = firebase.auth();
  const signedIn = await auth.signInAnonymously();
  const user = await signedIn.user;
  const uid = user?.uid;
  console.log('user ', uid);
  const firestore = firebase.firestore();
  let docArray: Array<firebase.firestore.DocumentData | null> = [];
  firestore
    .collection('print')
    .where('printed', '==', false)
    .onSnapshot(docs => {
      docArray = [];
      docs.forEach(doc => {
        docArray.push(doc.data());
      });
      docArray.forEach(doc => {
        console.log(doc);
        makePdf({ name: doc?.name || 'none', text: doc?.text });
      });
      docs.forEach(doc => {
        doc.ref.set({ printed: true }, { merge: true });
      });
      console.log('done');
    });

  //   makePdf(data);

  //
}
main();

// Create a document
