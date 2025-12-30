import advancedIcon from "@/assets/images/icon-advanced.svg";
import arcadeIcon from "@/assets/images/icon-arcade.svg";
import proIcon from "@/assets/images/icon-pro.svg";
import checkmarkIcon from "@/assets/images/icon-checkmark.svg";
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
      {activeStep === 2 && <Step3 />}
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
        {radioInfo.map(({ icon, label, monthly, id }) => (
          <label
            key={id}
            className="flex items-center gap-4 rounded-lg border border-gray-500 p-4 has-checked:border-purple-600 has-checked:bg-blue-100 has-focus-within:outline has-focus-within:outline-purple-600"
          >
            <img src={icon} alt={icon} className="" />

            <span className="flex flex-col">
              <span className="font-bold">{label}</span>

              <span className="text-sm text-gray-500">${monthly}/mo</span>
            </span>
            <input type="radio" name="plan" value={id} className="sr-only" />
          </label>
        ))}
      </div>

      <label className="group flex items-center justify-center gap-8 rounded-md bg-blue-100 p-4 font-medium has-focus-within:outline has-focus-within:outline-purple-600">
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

const checkboxInfo = [
  {
    title: "Online Service",
    description: "Access to multiplayer games",
    monthly: 1,
  },
  {
    title: "Larger Storage",
    description: "Extra 1TB of cloude save",
    monthly: 2,
  },
  {
    title: "Customizable Profile",
    description: "Custom theme on your profile",
    monthly: 2,
  },
];

const Step3 = () => {
  return (
    <div className="my-4 flex flex-col gap-4">
      {checkboxInfo.map(({ description, monthly, title }) => (
        <label
          key={title}
          className="group flex items-center gap-4 rounded-xl p-4 outline outline-gray-500 transition-all duration-100 has-checked:bg-blue-100 has-checked:outline-purple-600 has-focus-within:outline-2 has-focus-within:outline-purple-600"
        >
          <span className="justify-center rounded-sm border border-gray-500 transition-all duration-300 has-checked:bg-purple-600">
            <img
              src={checkmarkIcon}
              className="invisible size-4 p-1 transition-all duration-300 group-has-checked:visible"
              alt="checked"
            />
            <input type="checkbox" className="sr-only" />
          </span>

          <span className="flex flex-1 flex-col">
            <span className="font-bold">{title}</span>
            <span className="text-gray-500">{description}</span>
          </span>

          <span className="text-purple-600">+${monthly}/mo</span>
        </label>
      ))}
    </div>
  );
};
