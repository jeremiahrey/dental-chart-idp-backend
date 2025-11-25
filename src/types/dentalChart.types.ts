import { Prisma } from "@prisma/client";

// Patient Information Types
export interface PatientInformation {
  lastName: string | null;
  firstName: string | null;
  middleName: string | null;
  birthdate: string | null;
  age: string | null;
  sex: "M" | "F" | null;
  religion: string | null;
  nickname: string | null;
  homeAddress: string | null;
  homeNo: string | null;
  occupation: string | null;
  officeNo: string | null;
  dentalInsurance: string | null;
  faxNo: string | null;
  effectiveDate: string | null;
  cellMobileNo: string | null;
  emailAddress: string | null;
  parentGuardianName: string | null;
  parentOccupation: string | null;
  referredBy: string | null;
  consultationReason: string | null;
}

// Medical History Allergies
export interface MedicalAllergies {
  localAnesthetic: "Yes" | "No" | null;
  penicillin: "Yes" | "No" | null;
  antibiotics: "Yes" | "No" | null;
  sulfaDrugs: "Yes" | "No" | null;
  aspirin: "Yes" | "No" | null;
  latex: "Yes" | "No" | null;
  others: string | null;
}

// Medical History For Women Only
export interface ForWomenOnly {
  pregnant: "Yes" | "No" | null;
  nursing: "Yes" | "No" | null;
  birthControlPills: "Yes" | "No" | null;
}

// Medical Conditions
export interface MedicalConditions {
  highBloodPressure: boolean | null;
  lowBloodPressure: boolean | null;
  epilepsyConvulsions: boolean | null;
  aidsHivInfection: boolean | null;
  sexuallyTransmittedDisease: boolean | null;
  stomachTroublesUlcers: boolean | null;
  faintingSeizure: boolean | null;
  rapidWeightLoss: boolean | null;
  radiationTherapy: boolean | null;
  jointReplacementImplant: boolean | null;
  heartSurgery: boolean | null;
  heartAttack: boolean | null;
  thyroidProblem: boolean | null;
  heartDisease: boolean | null;
  heartMurmur: boolean | null;
  hepatitisLiverDisease: boolean | null;
  rheumaticFever: boolean | null;
  hayFeverAllergies: boolean | null;
  respiratoryProblems: boolean | null;
  hepatitisJaundice: boolean | null;
  tuberculosis: boolean | null;
  swollenAnkles: boolean | null;
  kidneyDisease: boolean | null;
  diabetes: boolean | null;
  chestPain: boolean | null;
  stroke: boolean | null;
  cancerTumors: boolean | null;
  anemia: boolean | null;
  angina: boolean | null;
  asthma: boolean | null;
  emphysema: boolean | null;
  bleedingProblems: boolean | null;
  bloodDiseases: boolean | null;
  headInjuries: boolean | null;
  arthritisRheumatism: boolean | null;
  other: string | null;
}

// Page 1 Data Structure
export interface Page1Data {
  patientInformation: PatientInformation;
  dentalHistory: {
    previousDentist: string | null;
    lastDentalVisit: string | null;
  };
  medicalHistory: {
    physicianName: string | null;
    physicianAddress: string | null;
    physicianSpecialty: string | null;
    physicianOfficeNumber: string | null;
    goodHealth: "Yes" | "No" | null;
    underMedicalTreatment: "Yes" | "No" | null;
    medicalConditionBeingTreated: string | null;
    seriousIllnessSurgery: "Yes" | "No" | null;
    illnessOrOperationDetails: string | null;
    hospitalized: "Yes" | "No" | null;
    hospitalizationDetails: string | null;
    takingMedication: "Yes" | "No" | null;
    medicationDetails: string | null;
    useTobacco: "Yes" | "No" | null;
    useAlcoholDrugs: "Yes" | "No" | null;
    allergies: MedicalAllergies;
    bleedingTime: string | null;
    forWomenOnly: ForWomenOnly;
    bloodType: string | null;
    bloodPressure: string | null;
    conditions: MedicalConditions;
  };
}

// Tooth Status
export interface ToothStatus {
  toothNumber: string;
  statusCode: string | null;
}

// Page 2 Data Structure (FIXED: Added Temporary Teeth arrays)
export interface Page2Data {
  header: {
    name: string | null;
    age: string | null;
    gender: string | null;
    date: string | null;
  };
  dentalChart: {
    statusBoxes: {
      permanentUpperTeeth: ToothStatus[];
      permanentLowerTeeth: ToothStatus[];
      temporaryUpperTeeth: ToothStatus[];
      temporaryLowerTeeth: ToothStatus[];
    };
    periodontalScreening: {
      codeExtracted: string | null;
      gingivitis: boolean | null;
      earlyPeriodontitis: boolean | null;
      moderatePeriodontitis: boolean | null;
      advancedPeriodontitis: boolean | null;
    };
    occlusion: {
      molarClassification: string | null;
      overjettMm: string | null;
      overbiteMm: string | null;
      midlineDeviationMm: string | null;
      crossbite: string | null;
    };
    appliances: {
      orthodontic: boolean | null;
      stayplate: boolean | null;
      others: string | null;
    };
    tmd: {
      clenching: boolean | null;
      clicking: boolean | null;
      trismus: boolean | null;
      muscleSpasm: boolean | null;
    };
  };
}

// Page 3 Data Structure
export interface Page3Data {
  informedConsent: {
    consentDate: string | null;
    patientOrGuardianSignaturePresent: boolean;
    dentistSignaturePresent: boolean;
    sectionsInitialed: {
      treatmentToBeDone: string | null; // Renamed to match prompt
      drugsAndMedications: string | null;
      changesInTreatmentPlan: string | null;
      radiograph: string | null; // Renamed to match prompt
      removalOfTeeth: string | null;
      crownsAndBridges: string | null;
      endodontics: string | null; // Renamed to match prompt
      periodontalDisease: string | null;
      fillings: string | null;
      dentures: string | null;
    };
  };
}

// Treatment Record Entry (FIXED: Added nextAppointment)
export interface TreatmentEntry {
  date: string | null;
  toothNumber: string | null;
  procedure: string | null;
  dentist: string | null;
  amountCharged: number | null;
  amountPaid: number | null;
  balance: number | null;
  nextAppointment: string | null;
}

// Page 4 Data Structure
export interface Page4Data {
  treatmentRecord: {
    header: {
      name: string | null;
      age: string | null;
      gender: string | null;
    };
    entries: TreatmentEntry[];
  };
}

// Gemini Service Response
export interface GeminiExtractionResult {
  success: boolean;
  data?: any;
  rawResponse?: string;
  error?: string;
  details?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  chartId?: string;
}
