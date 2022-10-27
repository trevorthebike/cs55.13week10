import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    IconButton
    } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash, FaPlusSquare } from "react-icons/fa";
import { deleteevent, updateevent} from "../api/event";

const EventList = () => {
    const [event, setevent] = React.useState([]);

    const {  user } = useAuth();
    const toast = useToast();
    useEffect(() => {
        if (!user) {
            setevent([]);
        return;
        }
        const q = query(collection(db, "event"), where("user", "==", user.uid));
        onSnapshot(q, (querySnapchot) => {
        let ar = [];
        querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
        });
        setevent(ar);
        });
    }, [user]);

    const handleeventDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this event?")) {
            deleteevent(id);
            toast({ title: "event deleted successfully", status: "success" });
        }
    };
    
    const handleeventUpdate = async (id) => {
        updateevent(id);
        console.log("first")
    };


    return (
        <Box mt={5}>
            <Text>EventList</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {event &&
            event.map((event) => (
            <Box 
            key={contact.id}
            p={3}
            background = "lightblue"
            boxShadow="2xl"
            transition="0.2s"
            _hover={{ boxShadow: "sm" }}
            >
            <Heading as="h1" fontSize={"xl"}>

            <IconButton
            size = 'lg'
            color="red"
            float="right"
            onClick={() => handleeventDelete(event.id)}
            icon={<FaTrash/>}
            >
            </IconButton>

            <IconButton
            size = 'lg'
            color="yellow"
            background = "black"
            float="right"
            onClick={() => handleeventUpdate(event.id)}
            icon={<FaPlusSquare/>}
            >
            </IconButton>

            {"Event Title: "}{event.title}

            </Heading>
            <Text>{"Event Description: "}{event.description}</Text>
            <Text>{"Event Estimated Time: "}{event.estimatedtime}</Text>
          
            </Box>
            ))}
            </SimpleGrid>
        </Box>
    );
};
export default EventList;