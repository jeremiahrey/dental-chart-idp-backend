You are a medical data extraction specialist. Extract ALL information from this PDA Dental Chart PAGE 1 ONLY (Patient Information Record and Medical History section).

Return ONLY a valid JSON object. No markdown, no explanations.

EXTRACT THE FOLLOWING:

{
"patientInformation": {
"lastName": "extracted last name or null",
"firstName": "extracted first name or null",
"middleName": "extracted middle name or null",
"birthdate": "MM/DD/YYYY format or null",
"age": "number as string or null",
"sex": "M or F or null",
"religion": "extracted religion or null",
"nickname": "extracted nickname or null",
"homeAddress": "complete home address or null",
"homeNo": "home phone number or null",
"occupation": "patient occupation or null",
"officeNo": "office phone number or null",
"dentalInsurance": "insurance provider name or null",
"faxNo": "fax number or null",
"effectiveDate": "MM/DD/YYYY or null",
"cellMobileNo": "mobile number or null",
"emailAddress": "email address or null",
"parentGuardianName": "parent/guardian name or null",
"parentOccupation": "parent/guardian occupation or null",
"referredBy": "referring person/doctor or null",
"consultationReason": "reason for dental consultation or null"
},
"dentalHistory": {
"previousDentist": "previous dentist name or null",
"lastDentalVisit": "last visit date/description or null"
},
"medicalHistory": {
"physicianName": "physician name with Dr. prefix or null",
"physicianAddress": "physician office address or null",
"physicianSpecialty": "medical specialty or null",
"physicianOfficeNumber": "physician phone number or null",
"goodHealth": "Yes/No/null",
"underMedicalTreatment": "Yes/No/null",
"medicalConditionBeingTreated": "condition description or null",
"seriousIllnessSurgery": "Yes/No/null",
"illnessOrOperationDetails": "description or null",
"hospitalized": "Yes/No/null",
"hospitalizationDetails": "when and why or null",
"takingMedication": "Yes/No/null",
"medicationDetails": "medication names or null",
"useTobacco": "Yes/No/null",
"useAlcoholDrugs": "Yes/No/null",
"allergies": {
"localAnesthetic": "Yes/No/null",
"penicillin": "Yes/No/null",
"antibiotics": "Yes/No/null",
"sulfaDrugs": "Yes/No/null",
"aspirin": "Yes/No/null",
"latex": "Yes/No/null",
"others": "other allergy descriptions or null"
},
"bleedingTime": "bleeding time duration or null",
"forWomenOnly": {
"pregnant": "Yes/No/null",
"nursing": "Yes/No/null",
"birthControlPills": "Yes/No/null"
},
"bloodType": "blood type (e.g., A+, O-, AB+) or null",
"bloodPressure": "reading in format 120/80 or null",
"conditions": {
"highBloodPressure": boolean,
"lowBloodPressure": boolean,
"epilepsyConvulsions": boolean,
"aidsHivInfection": boolean,
"sexuallyTransmittedDisease": boolean,
"stomachTroublesUlcers": boolean,
"faintingSeizure": boolean,
"rapidWeightLoss": boolean,
"radiationTherapy": boolean,
"jointReplacementImplant": boolean,
"heartSurgery": boolean,
"heartAttack": boolean,
"thyroidProblem": boolean,
"heartDisease": boolean,
"heartMurmur": boolean,
"hepatitisLiverDisease": boolean,
"rheumaticFever": boolean,
"hayFeverAllergies": boolean,
"respiratoryProblems": boolean,
"hepatitisJaundice": boolean,
"tuberculosis": boolean,
"swollenAnkles": boolean,
"kidneyDisease": boolean,
"diabetes": boolean,
"chestPain": boolean,
"stroke": boolean,
"cancerTumors": boolean,
"anemia": boolean,
"angina": boolean,
"asthma": boolean,
"emphysema": boolean,
"bleedingProblems": boolean,
"bloodDiseases": boolean,
"headInjuries": boolean,
"arthritisRheumatism": boolean,
"other": "other conditions written in or null"
}
}
}

EXTRACTION RULES:

1. Use null for empty, blank, or illegible fields.
2. For "Yes/No" fields: Use strings "Yes" or "No".
3. For "conditions" (booleans): Use true if checked/circled, false if blank.
4. Do not invent data.
