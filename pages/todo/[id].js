import React from "react";
import {  
    Box,
    Heading,
    SimpleGrid,
    Text 
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore"
import { db } from "../../firebase";

// define jsx component to show one single todo
const TodoItem = ({itemData}) => {
    const { user } = useAuth() || {};
    if(!user){
        return
    }
    console.log(itemData)
    console.log(itemData.title)
    return(
        <Box mt = {5}>
            <Heading as="h2" fontSize ={'xl'}>
                {itemData.title}
            </Heading>
            <Text>
                {itemData.description}
            </Text>
            <Text>
                {itemData.createdAt}
            </Text>
        </Box>
    );
};

export async function getServerSideProps(context) {
    let itemData = null;
    const docRef = doc( db, 'todo', context.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() ) {
        itemData = docSnap.data();
    }
    return{
        props:{
            itemData
        }
    }      
}

export default TodoItem;