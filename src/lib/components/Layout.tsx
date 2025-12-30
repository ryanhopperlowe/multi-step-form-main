import { useSnapshot } from "valtio";
import { Footer } from "./Footer";
import { Panel } from "./Panel";
import { Stepper } from "./Stepper";
import { state } from "../store";

export function Layout() {
  const { finished } = useSnapshot(state);

  return (
    <div className="flex h-screen flex-col bg-blue-100 md:flex-row md:bg-blue-50">
      <Stepper />

      <div className="z-20 flex flex-1 flex-col justify-between">
        <div className="flex-1">
          <Panel />
        </div>

        {!finished && <Footer />}
      </div>
    </div>
  );
}
