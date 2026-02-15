import { AddNumForm } from "./components/addNumForm/AddNumForm";
import { SelectTheme } from "./components/addNumForm/components/SelectTheme";

export default function Home() {
  return (
    <main className="p-2 min-h-dvh bg-body-background">
      <SelectTheme />
      <div className="flex flex-row justify-center items-center min-h-[calc(100dvh-72px)]">
        <AddNumForm />
      </div>
    </main>
  );
}
