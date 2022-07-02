import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import SignUpScreen from "./src/screen/SignUpScreen";

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <SignUpScreen />
    </TailwindProvider>
  );
}
