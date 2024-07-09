import { RemoveTodo, addTodo, getTodos } from "@/api/todos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Todo } from "@/types/todo";
import { Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = async () => {
    const inputValue = inputRef.current?.value;
    if (inputValue) {
      const { data } = await addTodo(inputValue);
      await setTodos((prev) => [...prev, data]);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const removeTodo = async (id: number) => {
    const { data } = await RemoveTodo(id);
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const handleGetTodos = async () => {
    const { data } = await getTodos();
    setTodos(data);
  };

  useEffect(() => {
    handleGetTodos();
  }, []);

  return (
    <main>
      <div className="w-[40%] m-auto mt-20">
        <div className="flex gap-5">
          <Input type="input" placeholder="Add todo" ref={inputRef} />
          <Button className="min-w-20" onClick={() => handleAddTodo()}>
            Add
          </Button>
        </div>
        <div className="mt-20">
          <ul>
            {todos.map((item: Todo) => {
              return (
                <li key={item.id} className="flex justify-between items-center">
                  {item.task}
                  <Button variant="ghost" className="p-2" onClick={() => removeTodo(item.id)}>
                    <Trash2 />
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
