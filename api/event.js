import {db} from "../firebase";

import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";

const addevent = async ({ userId, mytitle, mydescription, myestimatedtime  }) => {
try {
        await addDoc(
            collection(db, "event"),
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

const deleteevent = async (docId) => {
    try {
    const todoRef = doc(db, "event", docId);
    await deleteDoc(todoRef);
    } catch (err) {
    console.log(err);
    }
};
const updateevent = async( docId) => {
    try{
    const eventRef = doc(db, "event", docId);
    if(!eventRef.empty){
        let newtitle = prompt("Title: ")
        let newdescription = prompt("Description: ")
        let newtime = prompt("Estimated Time to Complete: ")
        await updateDoc(eventRef, {
            "title": newtitle,
            "description": newdescription,
            "estimatedtime":newtime
        });
    }
    } catch (err) {
        console.log(err)
    }   
};

export { addevent, deleteevent, updateevent };