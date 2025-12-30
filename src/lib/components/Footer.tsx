import { useSnapshot } from "valtio";
import { state } from "../store";

export function Footer() {
  const { nextStep, prevStep, hasPrev } = useSnapshot(state);
  return (
    <div className="z-30 flex w-full max-w-xl items-center justify-between bg-white p-4 md:mx-auto md:bg-transparent md:p-8 md:pb-12">
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
        className="rounded-sm bg-blue-900 px-4 py-2 text-sm font-medium text-blue-100 hover:bg-blue-900/70"
        onClick={nextStep}
      >
        Next Step
      </button>
    </div>
  );
}
