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
const AddContact = () => {
    const [name, setName] = React.useState("");
    const [number, setNumber] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [relationship, setRelationship] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handleContactCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to add a contact",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        setIsLoading(true);
        const contact = {
            userId: user.uid,
            name,
            number,
            email,
            relationship
        };
        const addContact = async ({ userId, name, number, email, relationship }) => {
            try {
                await addDoc(collection(db, userId), {
                    type: "contact",
                    name: name,
                    number: number,
                    email: email,
                    relationship: relationship,
                    createdAt: new Date().getTime(),
                });
            } catch (err) {}
        };
        await addContact(contact);
        setIsLoading(false);
        setName("");
        setNumber("");
        setEmail("");
        setRelationship("");
        toast({ title: "Contact created successfully", status: "success" });
    };
    return (
        <>
            <h2 className="text-center mt-5">Contacts</h2>
            <Box w={[300,400,500]} margin={"0 auto"} display="block" mt={5}>
                <Stack direction="column">
                    <Input
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        placeholder="Number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="Relationship"
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                    />

                    <Button
                        onClick={() => handleContactCreate()}
                        disabled={name.length < 1 || number.length < 1 || isLoading}
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
export default AddContact;