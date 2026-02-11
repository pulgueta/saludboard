import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { useOrganizationData } from "@/hooks/use-organization-data";
import type { HealthFieldId } from "@/lib/health-fields";

/** Whether the user is a patient or a healthcare professional. */
export type UserType = "patient" | "professional";

/** Professional sub-type: solo practitioner or multi-seat org. */
export type ProfessionalType = "individual" | "organization";

export type OnboardingStep =
  | "welcome"
  | "user-type"
  | "professional-type"
  | "health-field"
  | "profile"
  | "confirmation";

/**
 * Step order depends on the user-type selection.
 * Patients only see welcome + user-type, then get redirected.
 * Professionals go through the full onboarding funnel.
 */
const PROFESSIONAL_STEPS: OnboardingStep[] = [
  "welcome",
  "user-type",
  "professional-type",
  "health-field",
  "profile",
  "confirmation",
];

const PATIENT_STEPS: OnboardingStep[] = ["welcome", "user-type"];

function getStepsForUserType(userType: UserType | null): OnboardingStep[] {
  if (userType === "patient") return PATIENT_STEPS;
  if (userType === "professional") return PROFESSIONAL_STEPS;
  // Before any selection, show full professional steps for the indicator
  return PROFESSIONAL_STEPS;
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

type OnboardingState = {
  currentStep: OnboardingStep;
  userType: UserType | null;
  professionalType: ProfessionalType | null;
  selectedFields: HealthFieldId[];
  profile: {
    fullName: string;
    email: string;
    phone: string;
    documentNumber: string;
    licenseNumber: string;
  };
  /** Whether the user has selected a plan via PricingTable. */
  planSelected: boolean;
  footerConfig: {
    nextLabel?: string;
    onComplete?: () => void;
  };
};

type OnboardingAction =
  | { type: "SET_STEP"; step: OnboardingStep }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_USER_TYPE"; userType: UserType }
  | { type: "SET_PROFESSIONAL_TYPE"; professionalType: ProfessionalType }
  | { type: "TOGGLE_FIELD"; fieldId: HealthFieldId }
  | { type: "SET_FIELD"; fieldId: HealthFieldId }
  | {
      type: "UPDATE_PROFILE";
      field: keyof OnboardingState["profile"];
      value: string;
    }
  | { type: "SET_PLAN_SELECTED"; selected: boolean }
  | { type: "SET_FOOTER_CONFIG"; config: OnboardingState["footerConfig"] }
  | { type: "RESET" };

const initialState: OnboardingState = {
  currentStep: "welcome",
  userType: null,
  professionalType: null,
  selectedFields: [],
  profile: {
    fullName: "",
    email: "",
    phone: "",
    documentNumber: "",
    licenseNumber: "",
  },
  planSelected: false,
  footerConfig: {},
};

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction,
): OnboardingState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.step };

    case "NEXT_STEP": {
      const steps = getStepsForUserType(state.userType);
      const currentIndex = steps.indexOf(state.currentStep);
      const nextStep = steps[currentIndex + 1];
      if (nextStep) return { ...state, currentStep: nextStep };
      return state;
    }

    case "PREV_STEP": {
      const steps = getStepsForUserType(state.userType);
      const currentIndex = steps.indexOf(state.currentStep);
      const prevStep = steps[currentIndex - 1];
      if (prevStep) return { ...state, currentStep: prevStep };
      return state;
    }

    case "SET_USER_TYPE":
      return {
        ...state,
        userType: action.userType,
        // Reset downstream selections when user type changes
        professionalType:
          action.userType === "professional" ? "individual" : null,
        selectedFields: [],
        planSelected: false,
      };

    case "SET_PROFESSIONAL_TYPE":
      return {
        ...state,
        professionalType: action.professionalType,
        // Reset plan when switching between individual/org
        planSelected: false,
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

    case "SET_PLAN_SELECTED":
      return { ...state, planSelected: action.selected };

    case "SET_FOOTER_CONFIG":
      return { ...state, footerConfig: action.config };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

type OnboardingContextValue = {
  state: OnboardingState;
  steps: OnboardingStep[];
  stepIndex: number;
  totalSteps: number;
  progressPercent: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  isLastStep: boolean;
  nextStep: () => void;
  prevStep: () => void;
  setUserType: (type: UserType) => void;
  setProfessionalType: (type: ProfessionalType) => void;
  toggleField: (fieldId: HealthFieldId) => void;
  setField: (fieldId: HealthFieldId) => void;
  updateProfile: (
    field: keyof OnboardingState["profile"],
    value: string,
  ) => void;
  setPlanSelected: (selected: boolean) => void;
  setFooterConfig: (config: OnboardingState["footerConfig"]) => void;
  reset: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  const { currentOrg, organizations } = useOrganizationData();

  const steps = getStepsForUserType(state.userType);
  const stepIndex = steps.indexOf(state.currentStep);
  const totalSteps = steps.length;
  const progressPercent =
    totalSteps > 1 ? (stepIndex / (totalSteps - 1)) * 100 : 0;
  const isLastStep = stepIndex === totalSteps - 1;

  const canGoNext = useMemo(() => {
    switch (state.currentStep) {
      case "welcome":
        return true;
      case "user-type":
        return state.userType !== null;
      case "professional-type": {
        if (!state.professionalType) return false;
        if (state.professionalType === "organization") {
          const hasOrganization =
            !!currentOrg || !!(organizations && organizations.length > 0);
          return hasOrganization;
        }
        return state.planSelected;
      }
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
  }, [state, currentOrg, organizations]);

  const canGoPrev = stepIndex > 0;

  const nextStep = useCallback(() => dispatch({ type: "NEXT_STEP" }), []);
  const prevStep = useCallback(() => dispatch({ type: "PREV_STEP" }), []);
  const setUserType = useCallback(
    (userType: UserType) => dispatch({ type: "SET_USER_TYPE", userType }),
    [],
  );
  const setProfessionalType = useCallback(
    (professionalType: ProfessionalType) =>
      dispatch({ type: "SET_PROFESSIONAL_TYPE", professionalType }),
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
  const setPlanSelected = useCallback(
    (selected: boolean) => dispatch({ type: "SET_PLAN_SELECTED", selected }),
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
      steps,
      stepIndex,
      totalSteps,
      progressPercent,
      canGoNext,
      canGoPrev,
      isLastStep,
      nextStep,
      prevStep,
      setUserType,
      setProfessionalType,
      toggleField,
      setField,
      updateProfile,
      setPlanSelected,
      setFooterConfig,
      reset,
    }),
    [
      state,
      steps,
      stepIndex,
      progressPercent,
      canGoNext,
      canGoPrev,
      isLastStep,
      nextStep,
      prevStep,
      setUserType,
      setProfessionalType,
      toggleField,
      setField,
      updateProfile,
      setPlanSelected,
      setFooterConfig,
      reset,
      totalSteps,
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
