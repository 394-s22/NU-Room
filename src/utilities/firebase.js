import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { getStorage } from "firebase/storage";
import { useState, useEffect } from "react";
import { getDownloadURL} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAIe24tq4GELA23AwacArSKJh0h_Z5jJ64",
    authDomain: "nu-room-92e71.firebaseapp.com",
    databaseURL: "https://nu-room-92e71-default-rtdb.firebaseio.com",
    projectId: "nu-room-92e71",
    storageBucket: "nu-room-92e71.appspot.com",
    messagingSenderId: "1023006719723",
    appId: "1:1023006719723:web:6451d58949a624aad7c8ae"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const storage = getStorage(firebase);

// const storage = getStorage(firebase);
export default storage;

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) { console.log(`loading ${path}`); }
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (devMode) { console.log(val); }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};

export const useImage = (user_id) => {
    let image_url = "";

    useEffect(() => {
        getDownloadURL(ref(storage, 'images/20220409_184319.jpeg'))
        .then((url) => {
            image_url = url;
            return image_url;
        })
        .catch((error) => {
            // Handle any errors
        });
    }, []);

    
}

export const setData = (path, value) => (
    set(ref(database, path), value)
);