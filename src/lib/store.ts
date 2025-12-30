import { proxy } from "valtio";

type Step = {
  id: number;
  title: string;
  label: string;
  description: string;
};

export const steps: Step[] = [
  {
    id: 1,
    label: "Your info",
    title: "Personal Info",
    description: "Please provide your name, email address, and phone number",
  },
  {
    id: 2,
    label: "Select Plan",
    title: "Select your plan",
    description: "You have the option of monthly or yearly billing",
  },
  {
    id: 3,
    label: "Add-Ons",
    title: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience",
  },
  {
    id: 4,
    label: "Summary",
    title: "Finishing up",
    description: "Double-check everything looks OK before confirming",
  },
];

export const state = proxy({
  activeStep: 0,
  size: steps.length,
  setStep: (step: number) => (state.activeStep = step),
  nextStep: () => {
    if (state.activeStep < state.size - 1) {
      state.activeStep++;
    }
  },
  prevStep: () => {
    if (state.activeStep > 0) {
      state.activeStep -= 1;
    }
  },
  get isLastStep() {
    return state.activeStep === state.size - 1;
  },
  get hasPrev() {
    return state.activeStep > 0;
  },
});
