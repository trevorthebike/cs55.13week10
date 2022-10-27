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
import { deletecontact, updatecontact} from "../api/contact";

const contactList = () => {
    const [contact, setcontact] = React.useState([]);
    const {user} = useAuth();
    const toast = useToast();
    useEffect(() => {
        if (!user) {
            setcontact([]);
        return;
        }
        const q = query(collection(db, "contact"), where("user", "==", user.uid));
        onSnapshot(q, (querySnapchot) => {
        let ar = [];
        querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
        });
        setcontact(ar);
        });
    }, [user]);

    const handlecontactDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this contact?")) {
            deletecontact(id);
            toast({ title: "contact deleted successfully", status: "success" });
        }
    };
    
    const handlecontactUpdate = async (id) => {
        updatecontact(id);
        console.log("first")
    };


    return (
        <Box key={contact.id} mt={5}>
            <Text>contactList</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {contact &&
            contact.map((contact) => (
            <Box
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
            onClick={() => handlecontactDelete(contact.id)}
            icon={<FaTrash/>}
            >
            </IconButton>

            <IconButton
            size = 'lg'
            color="yellow"
            background = "black"
            float="right"
            onClick={() => handlecontactUpdate(contact.id)}
            icon={<FaPlusSquare/>}
            >
            </IconButton>

            {"Contact Name: "}{contact.name}
            </Heading>
            <Text>{"Contact Phone Number: "}{contact.phonenumber}</Text>
            <Text>{"Cntact Address: "}{contact.address}</Text>
            <Text>{"Contact Job: " + contact.job}</Text>
            </Box>
            ))}
            </SimpleGrid>
        </Box>
    );
};
export default contactList;