import { proxy } from "valtio";

export const steps = [
  { id: 1, title: "Your Info" },
  { id: 2, title: "Select Plan" },
  { id: 3, title: "Add-Ons" },
  { id: 4, title: "Summary" },
];

export const state = proxy({
  activeStep: 0,
  size: steps.length,
  setStep: (step: number) => (state.activeStep = step),
  nextStep: () => {
    if (state.activeStep < state.size) {
      state.activeStep++;
    }
  },
  prevStep: () => {
    if (state.activeStep > 0) {
      state.activeStep -= 1;
    }
  },
});
