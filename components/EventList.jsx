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
import {collection, deleteDoc, doc, onSnapshot, query, updateDoc, where} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import Link from "next/link";

const EventList = () => {
    const [events, setEvents] = React.useState([]);
    const {  user } = useAuth();
    const toast = useToast();
    const deleteEvent = async (docId) => {
        try {
            const eventRef = doc(db, user.uid, docId);
            await deleteDoc(eventRef);
        } catch (err) {
            console.log(err);
        }
    };

    const refreshData = () => {
        if (!user) {
            setEvents([]);
            return;
        }
        const q = query(collection(db, user.uid), where("type", "==", "event"));
        onSnapshot(q, (querySnapshot) => {
            let ar = [];
            querySnapshot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setEvents(ar);
        });
    };
    useEffect(() => {
        refreshData();
    }, [user]);
    const handleEventDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this event?")) {
            deleteEvent(id);
            toast({ title: "Event deleted successfully", status: "success" });
        }
    };

    return (

        <Box mt={5}>
                {events &&
                    events
                        .sort((a, b) => a.date > b.date ? 1 : -1 )
                        .map((event) => (
                        <Box
                            p={3}
                            boxShadow="2xl"
                            shadow={"dark-lg"}
                            transition="0.2s"
                            _hover={{ boxShadow: "sm" }}
                            w={[300,500,600]}
                            margin={"0 auto"}
                            mt={"10"}

                        >
                            <Heading as="h3" fontSize={"xl"}>
                                {event.title}{" "}
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
                                    onClick={() => handleEventDelete(event.id)}
                                >
                                    <FaTrash />
                                </Badge>


                            </Heading>
                            <Text>{event.description}</Text>
                            <Text>{event.date}</Text>
                            <Link key={event.id} href={`event/${event.id}`}
                            >
                                Edit
                            </Link>

                        </Box>
                    ))}

        </Box>

    );
};
export default EventList;