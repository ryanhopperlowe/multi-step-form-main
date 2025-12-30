import advancedIcon from "@/assets/images/icon-advanced.svg";
import arcadeIcon from "@/assets/images/icon-arcade.svg";
import checkmarkIcon from "@/assets/images/icon-checkmark.svg";
import proIcon from "@/assets/images/icon-pro.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { useSnapshot } from "valtio";
import { z } from "zod";
import { state, steps } from "../store";
import { Input } from "./Input";

const schema1 = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().min(1, "Email is required"),
  phone: z
    .string("Phone is required")
    .min(1, "Phone is required")
    .min(10, "Invalid phone number"),
});

const schema2 = z.object({
  plan: z.string("Plan option is required").min(1, "Plan option is required"),
  yearly: z.boolean(),
});

const schema3 = z.object({
  onlineService: z.boolean(),
  largerStorage: z.boolean(),
  customizable: z.boolean(),
});

const totalSchema = z
  .object({})
  .extend(schema1.shape)
  .extend(schema2.shape)
  .extend(schema3.shape);

const schemas = [schema1, schema2, schema3, totalSchema];

export function Panel() {
  const { activeStep, isLastStep, nextStep } = useSnapshot(state);
  const step = steps[activeStep];

  const form = useForm<z.infer<typeof totalSchema>>({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      yearly: false,
      customizable: false,
      largerStorage: false,
      onlineService: false,
    },
    resolver: zodResolver(schemas[activeStep]) as any,
    mode: "onTouched",
  });

  useEffect(() => {
    return form.watch(console.log).unsubscribe;
  }, []);

  const onSubmit = form.handleSubmit((_values) => {
    if (!isLastStep) {
      nextStep();
      return;
    }
  });

  const isYearly = form.watch("yearly");

  return (
    <div className="mx-4 max-w-xl rounded-xl bg-white p-8 md:mx-auto md:mt-12 md:w-full md:bg-transparent">
      <h2 className="text-xl font-bold text-blue-900 text-shadow-blue-900 md:text-3xl">
        {step.title}
      </h2>

      <p className="text-gray-500 md:pt-2">{step.description}</p>

      <FormProvider {...form}>
        <form id="panel-form" onSubmit={onSubmit}>
          {activeStep === 0 && <Step1 />}
          {activeStep === 1 && <Step2 />}
          {activeStep === 2 && <Step3 isYearly={isYearly} />}
          {activeStep === 3 && <Step4 />}
        </form>
      </FormProvider>
    </div>
  );
}

const Step1 = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<z.infer<typeof schema1>>();

  return (
    <div className="my-4 space-y-4 md:gap-8">
      <Input
        label="Name"
        placeholder="e.g. Stephen King"
        {...register("name")}
        error={errors.name?.message}
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="e.g. stephenking@lorem.com"
        {...register("email")}
        error={errors.email?.message}
      />
      <PatternFormat
        format="+# (###) ###-####"
        mask=" "
        customInput={Input}
        label="Phone Number"
        placeholder="e.g. +1 234 567 8900"
        {...register("phone", { onChange: () => null })}
        error={errors.phone?.message}
        onValueChange={({ value }) => setValue("phone", "+" + value)}
      />
    </div>
  );
};

const planInfo = [
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
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<z.infer<typeof schema2>>();

  const isYearly = watch("yearly");

  return (
    <div className="my-4 flex w-full flex-col gap-4 md:gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        {planInfo.map(({ icon, label, monthly, id }) => (
          <label
            key={id}
            className="flex items-center gap-4 rounded-lg border border-gray-500 p-4 has-checked:border-purple-600 has-checked:bg-blue-100 has-focus-within:outline has-focus-within:outline-purple-600 md:flex-1 md:flex-col md:items-start md:gap-8"
          >
            <img src={icon} alt={icon} className="" />

            <span className="flex flex-col">
              <span className="font-bold">{label}</span>

              <span className="text-gray-500">
                {calculatePrice(monthly, isYearly)}
              </span>
              {isYearly && <span className="text-sm">2 months free</span>}
            </span>
            <input
              type="radio"
              value={id}
              className="sr-only"
              {...register("plan")}
            />
          </label>
        ))}
      </div>
      <p className="text-red-500">{errors.plan?.message}</p>

      <label className="group flex items-center justify-center gap-8 rounded-md bg-blue-100 p-4 font-medium has-focus-within:outline has-focus-within:outline-purple-600">
        <span className="text-blue-900 transition-all duration-300 group-has-checked:text-gray-500">
          Monthly{" "}
        </span>
        <span className="relative h-6 w-12 rounded-full bg-blue-900">
          <span className="absolute z-40 m-1 size-4 rounded-full bg-white transition-all duration-300 has-checked:translate-x-6">
            <input
              type="checkbox"
              className="peer sr-only"
              {...register("yearly")}
            />
          </span>
        </span>{" "}
        <span className="text-gray-500 transition-all duration-300 group-has-checked:text-blue-900">
          Yearly
        </span>
      </label>
    </div>
  );
};

const addonInfo = [
  {
    id: "onlineService" as const,
    title: "Online Service",
    description: "Access to multiplayer games",
    monthly: 1,
  },
  {
    id: "largerStorage" as const,
    title: "Larger Storage",
    description: "Extra 1TB of cloude save",
    monthly: 2,
  },
  {
    id: "customizable" as const,
    title: "Customizable Profile",
    description: "Custom theme on your profile",
    monthly: 2,
  },
];

const Step3 = ({ isYearly }: { isYearly: boolean }) => {
  const { register } = useFormContext<z.infer<typeof schema3>>();

  return (
    <div className="my-4 flex flex-col gap-4">
      {addonInfo.map(({ description, monthly, title, id }) => (
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
            <input type="checkbox" className="sr-only" {...register(id)} />
          </span>

          <span className="flex flex-1 flex-col">
            <span className="font-bold">{title}</span>
            <span className="text-gray-500">{description}</span>
          </span>

          <span className="text-purple-600">
            {calculatePrice(monthly, isYearly)}
          </span>
        </label>
      ))}
    </div>
  );
};

const Step4 = () => {
  const { watch } = useFormContext<z.infer<typeof totalSchema>>();

  const plan = watch("plan");
  const yearly = watch("yearly");

  const foundPlan = planInfo.find(({ id }) => id === plan);

  const addons = addonInfo.filter((addon) => watch(addon.id));

  const totalMonthly = [
    foundPlan?.monthly ?? 0,
    ...addons.map((a) => a.monthly),
  ].reduce((sum, val) => sum + val, 0);

  return (
    <div className="mt-8 space-y-4">
      <div className="space-y-4 rounded-md bg-blue-100 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold">
              {foundPlan?.label} ({yearly ? "Yearly" : "Monthly"})
            </p>
            <button
              className="cursor-pointer text-gray-500 underline"
              onClick={() => state.setStep(2)}
            >
              Change
            </button>
          </div>

          <p className="font-bold">
            {calculatePrice(foundPlan?.monthly ?? 0, yearly)}
          </p>
        </div>

        <div className="h-px w-full bg-gray-500/60" />

        {addons.map((addon) => {
          return (
            <div className="flex items-center justify-between" key={addon.id}>
              <p className="text-gray-500">{addon.title}</p>

              <p className="font-medium">
                +{calculatePrice(addon.monthly ?? 0, yearly)}
              </p>
            </div>
          );
        })}
      </div>

      <p className="flex items-center justify-between p-4">
        <span className="text-gray-500">
          Total (per {yearly ? "year" : "month"})
        </span>

        <span className="text-lg font-bold text-purple-600">
          {calculatePrice(totalMonthly, yearly)}
        </span>
      </p>
    </div>
  );
};

function calculatePrice(monthly: number, yearly: boolean) {
  if (yearly) return `$${monthly * 10}/yr`;
  return `$${monthly}/mo`;
}
