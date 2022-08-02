import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Todo } from "./pages";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
    </QueryClientProvider>
  );
}

export default App;
