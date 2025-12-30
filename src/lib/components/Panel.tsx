import { useSnapshot } from "valtio";
import { state, steps } from "../store";
import { Input } from "./Input";

export function Panel() {
  const { activeStep } = useSnapshot(state);
  const step = steps[activeStep];
  return (
    <div className="container mx-4 max-w-lg rounded-xl bg-white p-8 md:mx-auto md:mt-12 md:bg-transparent">
      <h2 className="text-xl font-bold text-blue-900 text-shadow-blue-900 md:text-3xl">
        {step.title}
      </h2>

      <p className="text-gray-500 md:pt-2">{step.description}</p>

      <Step1 />
    </div>
  );
}

const Step1 = () => {
  return (
    <div className="my-4 flex w-full flex-col gap-4 md:gap-8">
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
