import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

import type { HealthFieldId } from "@/lib/health-fields";

export type AccountType = "individual" | "organization";

export type OnboardingStep =
  | "welcome"
  | "account-type"
  | "health-field"
  | "profile"
  | "confirmation";

const STEP_ORDER: OnboardingStep[] = [
  "welcome",
  "account-type",
  "health-field",
  "profile",
  "confirmation",
];

type OnboardingState = {
  currentStep: OnboardingStep;
  accountType: AccountType | null;
  selectedFields: HealthFieldId[];
  profile: {
    fullName: string;
    email: string;
    phone: string;
    documentNumber: string;
    licenseNumber: string;
  };
  footerConfig: {
    nextLabel?: string;
    onComplete?: () => void;
  };
};

type OnboardingAction =
  | { type: "SET_STEP"; step: OnboardingStep }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_ACCOUNT_TYPE"; accountType: AccountType }
  | { type: "TOGGLE_FIELD"; fieldId: HealthFieldId }
  | { type: "SET_FIELD"; fieldId: HealthFieldId }
  | {
      type: "UPDATE_PROFILE";
      field: keyof OnboardingState["profile"];
      value: string;
    }
  | { type: "SET_FOOTER_CONFIG"; config: OnboardingState["footerConfig"] }
  | { type: "RESET" };

const initialState: OnboardingState = {
  currentStep: "welcome",
  accountType: null,
  selectedFields: [],
  profile: {
    fullName: "",
    email: "",
    phone: "",
    documentNumber: "",
    licenseNumber: "",
  },
  footerConfig: {},
};

function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction,
): OnboardingState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.step };

    case "NEXT_STEP": {
      const currentIndex = STEP_ORDER.indexOf(state.currentStep);
      const nextStep = STEP_ORDER[currentIndex + 1];
      if (nextStep) return { ...state, currentStep: nextStep };
      return state;
    }

    case "PREV_STEP": {
      const currentIndex = STEP_ORDER.indexOf(state.currentStep);
      const prevStep = STEP_ORDER[currentIndex - 1];
      if (prevStep) return { ...state, currentStep: prevStep };
      return state;
    }

    case "SET_ACCOUNT_TYPE":
      return {
        ...state,
        accountType: action.accountType,
        selectedFields: [],
      };

    case "TOGGLE_FIELD":
      return {
        ...state,
        selectedFields: state.selectedFields.includes(action.fieldId)
          ? state.selectedFields.filter((id) => id !== action.fieldId)
          : [...state.selectedFields, action.fieldId],
      };

    case "SET_FIELD":
      return { ...state, selectedFields: [action.fieldId] };

    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: { ...state.profile, [action.field]: action.value },
      };

    case "SET_FOOTER_CONFIG":
      return { ...state, footerConfig: action.config };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

type OnboardingContextValue = {
  state: OnboardingState;
  stepIndex: number;
  totalSteps: number;
  progressPercent: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  isLastStep: boolean;
  nextStep: () => void;
  prevStep: () => void;
  setAccountType: (type: AccountType) => void;
  toggleField: (fieldId: HealthFieldId) => void;
  setField: (fieldId: HealthFieldId) => void;
  updateProfile: (
    field: keyof OnboardingState["profile"],
    value: string,
  ) => void;
  setFooterConfig: (config: OnboardingState["footerConfig"]) => void;
  reset: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  const stepIndex = STEP_ORDER.indexOf(state.currentStep);
  const totalSteps = STEP_ORDER.length;
  const progressPercent = (stepIndex / (totalSteps - 1)) * 100;
  const isLastStep = stepIndex === totalSteps - 1;

  const canGoNext = useMemo(() => {
    switch (state.currentStep) {
      case "welcome":
        return true;
      case "account-type":
        return state.accountType !== null;
      case "health-field":
        return state.selectedFields.length > 0;
      case "profile":
        return (
          state.profile.fullName.trim().length > 0 &&
          state.profile.email.trim().length > 0 &&
          state.profile.documentNumber.trim().length > 0
        );
      case "confirmation":
        return true;
      default:
        return false;
    }
  }, [state]);

  const canGoPrev = stepIndex > 0;

  const nextStep = useCallback(() => dispatch({ type: "NEXT_STEP" }), []);
  const prevStep = useCallback(() => dispatch({ type: "PREV_STEP" }), []);
  const setAccountType = useCallback(
    (accountType: AccountType) =>
      dispatch({ type: "SET_ACCOUNT_TYPE", accountType }),
    [],
  );
  const toggleField = useCallback(
    (fieldId: HealthFieldId) => dispatch({ type: "TOGGLE_FIELD", fieldId }),
    [],
  );
  const setField = useCallback(
    (fieldId: HealthFieldId) => dispatch({ type: "SET_FIELD", fieldId }),
    [],
  );
  const updateProfile = useCallback(
    (field: keyof OnboardingState["profile"], value: string) =>
      dispatch({ type: "UPDATE_PROFILE", field, value }),
    [],
  );
  const setFooterConfig = useCallback(
    (config: OnboardingState["footerConfig"]) =>
      dispatch({ type: "SET_FOOTER_CONFIG", config }),
    [],
  );
  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  const value = useMemo(
    () => ({
      state,
      stepIndex,
      totalSteps,
      progressPercent,
      canGoNext,
      canGoPrev,
      isLastStep,
      nextStep,
      prevStep,
      setAccountType,
      toggleField,
      setField,
      updateProfile,
      setFooterConfig,
      reset,
    }),
    [
      state,
      stepIndex,
      progressPercent,
      canGoNext,
      canGoPrev,
      isLastStep,
      nextStep,
      prevStep,
      setAccountType,
      toggleField,
      setField,
      updateProfile,
      setFooterConfig,
      reset,
    ],
  );

  return <OnboardingContext value={value}>{children}</OnboardingContext>;
}

export function useOnboarding(): OnboardingContextValue {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
