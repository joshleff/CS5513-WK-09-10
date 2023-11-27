"use client";

import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import Counter from "../components/Counter";

export default function Home() {
  return (
      <Container maxW="7xl">
        <Auth />
        <Counter />
          <AddTodo />
        <TodoList />
      </Container>
  );
}