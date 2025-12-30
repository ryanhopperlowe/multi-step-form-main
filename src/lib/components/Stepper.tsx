import desktopImg from "@/assets/images/bg-sidebar-desktop.svg";
import mobileImg from "@/assets/images/bg-sidebar-mobile.svg";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";
import { useSnapshot } from "valtio";
import { state, steps } from "../store";

export function Stepper() {
  const { activeStep } = useSnapshot(state);

  const { isSm } = useBreakpoint();

  return (
    <div className={`relative md:m-4`}>
      <ul className="my-8 flex w-full justify-center gap-4 overflow-visible md:ms-8 md:w-75 md:flex-col md:items-start md:justify-start md:gap-12">
        {steps.map(({ id, title }, i) => (
          <li key={id} className="z-10">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "m-auto flex size-8 items-center justify-center rounded-full border border-blue-200 text-center font-bold text-blue-200 transition-all duration-300",
                  {
                    ["bg-blue-200 text-blue-900"]: activeStep === i,
                  },
                )}
              >
                {id}
              </div>

              <div className="hidden flex-col text-start md:flex">
                <label className="font-medium text-blue-300">
                  STEP {i + 1}
                </label>

                <p className="text-lg font-bold text-blue-100">
                  {title.toUpperCase()}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {isSm ? (
        <img src={mobileImg} className="absolute inset-0 w-full object-fill" />
      ) : (
        <img
          src={desktopImg}
          className="absolute inset-0 h-full w-full rounded-xl object-cover"
          alt=""
        />
      )}
    </div>
  );
}
