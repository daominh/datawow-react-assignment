import {
  AddTodoForm,
  AppErrorMessage,
  Container,
  Progress,
  TodoList,
  TodoStatusFilter,
} from "@/components";

function App() {
  return (
    <>
      <Container>
        <AppErrorMessage />
        <Progress />
        <TodoStatusFilter />
        <TodoList />
        <AddTodoForm />
      </Container>
    </>
  );
}

export default App;
