import { Panel } from "./Panel";
import { Stepper } from "./Stepper";

export function Layout() {
  return (
    <div className="flex h-screen flex-col bg-blue-100 md:flex-row md:bg-blue-50">
      <Stepper />

      <div className="z-20 flex flex-1 flex-col justify-between">
        <Panel />

        <Footer />
      </div>
    </div>
  );
}

function Footer() {
  return "Footer";
}
