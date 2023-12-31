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
import { db } from "@/lib/firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo } from "@/api/todo";
import Link from "next/link";
const TodoList = () => {
    const [todos, setTodos] = React.useState([]);
    const toast = useToast();
    const { isLoggedIn, user} = useAuth();
    console.log(user);
    const refreshData = () => {
        if (!user) {
            setTodos([]);
            return;
        }
        const q = query(collection(db, user.uid), where("type", "==", "todo"));
        onSnapshot(q, (querySnapshot) => {
            let ar = [];
            querySnapshot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setTodos(ar);
            console.log(ar);
        });
    };
    useEffect(() => {
        refreshData();
    }, [user]);
    const handleTodoDelete = async (user, id) => {
        if (confirm("Are you sure you wanna delete this todo?")) {
            await deleteTodo(user, id);
            toast({ title: "Todo deleted successfully", status: "success" });
        }
    };

    return (

        <Box mt={5}>

                {todos &&
                    todos.map((todo) => (
                        <Box
                            p={3}
                            boxShadow="2xl"
                            shadow={"dark-lg"}
                            transition="0.2s"
                            _hover={{ boxShadow: "sm" }}
                            margin={"0 auto"}
                            mt={"10"}
                            w={[300,500,600]}
                        >
                            <Heading as="h3" fontSize={"xl"}>
                                {todo.title}{" "}
                                <Badge
                                    color="red.500"
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleTodoDelete(user.uid, todo.id)}
                                >
                                    <FaTrash />
                                </Badge>

                            </Heading>
                            <Text>{todo.description}</Text>
                            <Link key={todo.id} href={`todo/${todo.id}`}
                                  >

                            Edit
                            </Link>
                        </Box>
                    ))}
        </Box>

    );
};
export default TodoList;