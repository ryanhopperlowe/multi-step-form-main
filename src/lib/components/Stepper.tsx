import { state, steps } from "../store";
import { cn } from "@/lib/utils";
import mobileImg from "@/assets/images/bg-sidebar-mobile.svg";
import { useSnapshot } from "valtio";

export function Stepper() {
  const { activeStep, setStep } = useSnapshot(state);
  return (
    <ul className="flex relative justify-center p-8 w-full gap-4 overflow-visible">
      {steps.map(({ id }, i) => (
        <li key={id} className="z-10">
          <button
            className={cn(
              "rounded-full size-8 text-center m-auto text-blue-200 border border-blue-200 font-bold flex items-center justify-center",
              {
                ["bg-blue-200 text-blue-900"]: activeStep === i,
              }
            )}
            onClick={() => setStep(i)}
          >
            {id}
          </button>
        </li>
      ))}

      <img src={mobileImg} className="absolute inset-0" />
    </ul>
  );
}
