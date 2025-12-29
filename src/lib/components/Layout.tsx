import { Stepper } from "./Stepper";

export function Layout() {
  return (
    <div className="h-screen flex flex-col bg-blue-50">
      <Stepper />
      <div className="flex-1">
        <Panel />
      </div>
      <Footer />
    </div>
  );
}

function Panel() {
  return "Panel";
}

function Footer() {
  return "Footer";
}
