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
import {addDoc, collection} from "firebase/firestore";
import {db} from "@/lib/firebase";
const AddEvent = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [date, setDate] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handleEventCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to create a event",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        setIsLoading(true);
        const event = {
            userId: user.uid,
            title,
            description,
            date
        };
        const addEvent = async ({ userId, title, description, date }) => {
            try {
                await addDoc(collection(db, userId), {
                    type: "event",
                    title: title,
                    description: description,
                    date: date,
                    createdAt: new Date().getTime(),
                });
            } catch (err) {}
        };
        await addEvent(event);
        setIsLoading(false);
        setTitle("");
        setDescription("");
        setDate("");
        toast({ title: "Event created successfully", status: "success" });
    };
    return (
        <>
            <h2 className="text-center mt-5">Events</h2>
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
                    <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                        value={date} onChange={(e) => setDate(e.target.value)}
                    />
                    <Button
                        onClick={() => handleEventCreate()}
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
export default AddEvent;