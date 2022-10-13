import {db} from "../firebase";

import {
    collection,
    addDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";

const addWork = async ({ userId, mytitle, mydescription, myestimatedtime  }) => {
try {
        await addDoc(
            collection(db, "work"),
            {
                user: userId,
                title: mytitle,
                description: mydescription,
                estimatedtime: myestimatedtime,
                createdAt: new Date().getTime(),
            }
        )
    } catch(err) {
        console.log(err)
    }
}

const deleteWork = async (docId) => {
    try {
    const todoRef = doc(db, "work", docId);
    await deleteDoc(todoRef);
    } catch (err) {
    console.log(err);
    }
};

export { addWork, deleteWork };