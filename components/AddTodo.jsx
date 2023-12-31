import React from "react";
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addTodo } from "@/api/todo";
const AddTodo = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [status, setStatus] = React.useState("pending");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handleTodoCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to create a todo",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        setIsLoading(true);
        const todo = {
            title,
            description,
            status,
            userId: user.uid,
        };
        await addTodo(todo);
        setIsLoading(false);
        setTitle("");
        setDescription("");
        setStatus("pending");
        toast({ title: "Todo created successfully", status: "success" });
    };
    return (
        <>
            <h2 className="text-center mt-5">To-do List</h2>
            <Box w={[300,400,500]} margin={"0 auto"} display="block" mt={5}>
                <Stack direction="column">
                    <Input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Button
                        onClick={() => handleTodoCreate()}
                        disabled={title.length < 1 || description.length < 1 || isLoading}
                        variantcolor="teal"
                        variant="solid"
                    >
                        Add
                    </Button>
                </Stack>
            </Box>
        </>
    );
};
export default AddTodo;