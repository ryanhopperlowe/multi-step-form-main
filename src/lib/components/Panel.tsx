import advancedIcon from "@/assets/images/icon-advanced.svg";
import arcadeIcon from "@/assets/images/icon-arcade.svg";
import proIcon from "@/assets/images/icon-pro.svg";
import { useSnapshot } from "valtio";
import { state, steps } from "../store";
import { Input } from "./Input";

export function Panel() {
  const { activeStep } = useSnapshot(state);
  const step = steps[activeStep];
  return (
    <div className="mx-4 max-w-xl rounded-xl bg-white p-8 md:mx-auto md:mt-12 md:w-full md:bg-transparent">
      <h2 className="text-xl font-bold text-blue-900 text-shadow-blue-900 md:text-3xl">
        {step.title}
      </h2>

      <p className="text-gray-500 md:pt-2">{step.description}</p>

      {activeStep === 0 && <Step1 />}
      {activeStep === 1 && <Step2 />}
    </div>
  );
}

const Step1 = () => {
  return (
    <div className="my-4 flex flex-col gap-4 md:gap-8">
      <Input label="Name" placeholder="e.g. Stephen King" />
      <Input
        label="Email Address"
        type="email"
        placeholder="e.g. stephenking@lorem.com"
      />
      <Input label="Phone Number" placeholder="e.g. +1 234 567 8900" />
    </div>
  );
};

const radioInfo = [
  {
    id: "arcade",
    label: "Arcade",
    monthly: 9,
    icon: arcadeIcon,
  },
  {
    id: "advanced",
    label: "Advanced",
    monthly: 12,
    icon: advancedIcon,
  },
  {
    id: "pro",
    label: "Pro",
    monthly: 15,
    icon: proIcon,
  },
];

const Step2 = () => {
  return (
    <div className="my-4 flex w-full flex-col gap-4 md:gap-8">
      <div className="flex flex-col gap-4">
        {radioInfo.map(({ icon: icon, label, monthly, id }) => (
          <label
            key={id}
            className="flex items-center gap-4 rounded-lg border border-gray-500 p-4 has-checked:border-purple-600 has-checked:bg-blue-100"
          >
            <img src={icon} alt={icon} className="" />

            <span className="flex flex-col">
              <span className="font-bold">{label}</span>

              <span className="text-sm text-gray-500">${monthly}/mo</span>
            </span>
            <input type="radio" name="plan" value={id} className="hidden" />
          </label>
        ))}
      </div>

      <label className="group flex items-center justify-center gap-8 bg-blue-100 p-4 font-medium">
        <span className="text-blue-900 transition-all duration-300 group-has-checked:text-gray-500">
          Monthly{" "}
        </span>
        <span className="relative h-6 w-12 rounded-full bg-blue-900">
          <span className="absolute z-40 m-1 size-4 rounded-full bg-white transition-all duration-300 has-checked:translate-x-6">
            <input type="checkbox" className="peer sr-only" />
          </span>
        </span>{" "}
        <span className="text-gray-500 transition-all duration-300 group-has-checked:text-blue-900">
          Yearly
        </span>
      </label>
    </div>
  );
};
