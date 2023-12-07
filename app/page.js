"use client";

import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import AddEvent from "@/components/AddEvent";
import EventList from "@/components/EventList";
import AddContact from "@/components/AddContact";
import ContactList from "@/components/ContactList";
export default function Home() {
  return (
      <Container maxW="7xl">
        <Auth />

          <Tabs position='relative' variant='soft-rounded' colorScheme='blue' mt={"4"}>
              <TabList>
                  <Tab>To-Do List</Tab>
                  <Tab>Events</Tab>
                      <Tab>Contacts</Tab>
              </TabList>
              <TabPanels>
                  <TabPanel>
                      <AddTodo />
                      <TodoList />
                  </TabPanel>
                  <TabPanel>
                      <AddEvent />
                      <EventList />

                  </TabPanel>
                  <TabPanel>
                      <AddContact />
                      <ContactList />
                  </TabPanel>
              </TabPanels>
          </Tabs>



      </Container>
  );
}