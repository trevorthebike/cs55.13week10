import {db} from "../firebase";

import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";

const addcontact = async ({ userId, myname, myphonenumber, myaddress, myjob  }) => {
try {
        await addDoc(
            collection(db, "contact"),
            {
                user: userId,
                name: myname,
                phonenumber: myphonenumber,
                address: myaddress,
                job: myjob,
                createdAt: new Date().getTime(),
            }
        )
    } catch(err) {
        console.log(err)
    }
}

const deletecontact = async (docId) => {
    try {
    const todoRef = doc(db, "contact", docId);
    await deleteDoc(todoRef);
    } catch (err) {
    console.log(err);
    }
};
const updatecontact = async( docId) => {
    try{
    const contactRef = doc(db, "contact", docId);
    if(!contactRef.empty){
        let newname = prompt("Name: ")
        let newphonenumber = prompt("Phone Number: ")
        let newaddress = prompt("Address: ")
        let newjob = prompt("Job: ")
        await updateDoc(contactRef, {
            "name": newname,
            "phonenumber": newphonenumber,
            "address":newaddress,
            "job": newjob,
        });
    }
    } catch (err) {
        console.log(err)
    }   
};

export { addcontact, deletecontact, updatecontact };