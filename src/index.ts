/* eslint-disable no-console */

import makePdf from './makePdf';

import firebase from './firebase';
import printFile from './printFile';
export type InputData = {
  uid?: string | null;
  name?: string | null;
  text?: string | null;
};
// const getData = (): Promise<Array<firebase.firestore.DocumentData | null>> => {
//   return new Promise((res, err) => {});
// };
function timeout(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(): Promise<void> {
  const auth = firebase.auth();
  const signedIn = await auth.signInAnonymously();
  const user = signedIn.user;
  const uid = user?.uid;
  console.log('user ', uid);
  const firestore = firebase.firestore();

  const printJob = async (
    data: firebase.firestore.DocumentData | null,
    doc: firebase.firestore.QueryDocumentSnapshot<
      firebase.firestore.DocumentData
    > | null,
  ): Promise<void> => {
    const filename = await makePdf({
      uid: data?.uid,
      name: data?.name || 'none',
      text: data?.text,
    });
    await timeout(300);
    const printed = await printFile(filename);
    console.log('printed ', printed);
    await doc?.ref.set({ printed: true }, { merge: true });
  };
  firestore
    .collection('print')
    .where('printed', '==', false)
    .onSnapshot(docs => {
      const docArray: Array<firebase.firestore.DocumentData | null> = [];
      docs.forEach(doc => {
        docArray.push({ data: doc.data(), ref: doc });
      });
      docArray.forEach(obj => {
        console.log(obj);
        printJob(obj?.data, obj?.ref);
      });
    });

  //   makePdf(data);

  //
}
main();

// Create a document
