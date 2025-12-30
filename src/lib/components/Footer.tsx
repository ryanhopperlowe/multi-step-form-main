import { useSnapshot } from "valtio";
import { state } from "../store";
import { cn } from "../utils";

export function Footer() {
  const { prevStep, hasPrev, isLastStep } = useSnapshot(state);

  return (
    <div className="z-30 mt-8 flex w-full items-center justify-between bg-white p-4 md:mx-auto md:max-w-xl md:bg-transparent md:p-8 md:pb-12">
      {hasPrev ? (
        <button
          onClick={prevStep}
          className="rounded-sm px-4 py-2 text-sm font-medium text-gray-500 hover:bg-blue-100"
        >
          Go Back
        </button>
      ) : (
        <div />
      )}
      <button
        className={cn(
          "rounded-sm bg-blue-900 px-4 py-2 text-sm font-medium text-blue-100 hover:bg-blue-900/80",
          {
            ["bg-purple-600 hover:bg-purple-600/80"]: isLastStep,
          },
        )}
        type="submit"
        form="panel-form"
      >
        {isLastStep ? "Confirm" : "Next Step"}
      </button>
    </div>
  );
}
