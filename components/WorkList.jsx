import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteWork} from "../api/work";

const WorkList = () => {
    const [todos, setTodos] = React.useState([]);
    const {  user } = useAuth();
    const toast = useToast();
    useEffect(() => {
        if (!user) {
            setTodos([]);
        return;
        }
        const q = query(collection(db, "work"), where("user", "==", user.uid));
        onSnapshot(q, (querySnapchot) => {
        let ar = [];
        querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
        });
        setTodos(ar);
        });
    }, [user]);
    const handleTodoDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this todo?")) {
    deleteWork(id);
    toast({ title: "Todo deleted successfully", status: "success" });
    }
    };
    
    return (
        <Box mt={5}>
            <Text>WorkList</Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {todos &&
            todos.map((todo) => (
            <Box
            p={3}
            boxShadow="2xl"
            shadow={"dark-lg"}
            transition="0.2s"
            _hover={{ boxShadow: "sm" }}
            >
            <Heading as="h3" fontSize={"xl"}>
            {todo.title}{" "}
            <Badge
            color="red.500"
            float="right"
            onClick={() => handleTodoDelete(todo.id)}
            >
            <FaTrash />
            </Badge>
            <Badge
            float="right"
            opacity="0.8"
            >
            </Badge>
            </Heading>
            <Text>{todo.description}</Text>
            <Text>{todo.estimatedtime}</Text>
            </Box>
            ))}
            </SimpleGrid>
        </Box>
    );
};
export default WorkList;