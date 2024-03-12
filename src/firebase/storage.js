import { getStorage, ref, getDownloadURL } from "firebase/storage";

function tempInit() {
    const firebaseConfig = {
    apiKey: 'AIzaSyCY_0yMY9ebb5ITeIjyRCY8F2cHEyXy17I',
    authDomain: 'sustainabit-ec733.firebaseapp.com',
    databaseUrl: 'https://sustainabit-ec733.firebaseio.com',
    projectId: 'sustainabit-ec733',
    storageBucket: 'sustainabit-ec733.appspot.com',
    }
    const fbapp = initializeApp(firebaseConfig);
    const db = getFirestore(fbapp);
    return db
}

export function uploadImage(image, uploadPath) {
    db = tempInit();
    const storage = getStorage();
    const uploadRef = ref(storage, uploadPath);

}

export async function downloadImage(storagePath) {
    const storage = getStorage();
    const imReference = ref(storage, storagePath);
    //const imReference = ref(storage, 'gs://sustainabit-ec733.appspot.com/images/profile_pics/iaincopland.png')

    console.log("Downloading image from ", storagePath)
    const img_url = await getDownloadURL(imReference)

    return img_url
}

