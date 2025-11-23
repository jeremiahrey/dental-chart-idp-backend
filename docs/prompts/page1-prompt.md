You are a medical data extraction specialist. Extract ALL information from this PDA Dental Chart PAGE 1 ONLY (Patient Information Record and Medical History section).

Return ONLY a valid JSON object with no markdown formatting, no code blocks, no explanations.

EXTRACT THE FOLLOWING:

{
"patientInformation": {
"lastName": "extracted last name or null",
"firstName": "extracted first name or null",
"middleName": "extracted middle name or null",
"birthdate": "MM/DD/YYYY format or null",
"age": "number or null",
"sex": "M or F or null",
"religion": "extracted religion or null",
"nickname": "extracted nickname or null",
"homeAddress": "complete home address or null",
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
"highBloodPressure": "true if checked/circled, false if blank, null if unclear",
"lowBloodPressure": "true/false/null",
"epilepsyConvulsions": "true/false/null",
"aidsHivInfection": "true/false/null",
"sexuallyTransmittedDisease": "true/false/null",
"stomachTroublesUlcers": "true/false/null",
"faintingSeizure": "true/false/null",
"rapidWeightLoss": "true/false/null",
"radiationTherapy": "true/false/null",
"jointReplacementImplant": "true/false/null",
"heartSurgery": "true/false/null",
"heartAttack": "true/false/null",
"thyroidProblem": "true/false/null",
"heartDisease": "true/false/null",
"heartMurmur": "true/false/null",
"hepatitisLiverDisease": "true/false/null",
"rheumaticFever": "true/false/null",
"hayFeverAllergies": "true/false/null",
"respiratoryProblems": "true/false/null",
"hepatitisJaundice": "true/false/null",
"tuberculosis": "true/false/null",
"swollenAnkles": "true/false/null",
"kidneyDisease": "true/false/null",
"diabetes": "true/false/null",
"chestPain": "true/false/null",
"stroke": "true/false/null",
"cancerTumors": "true/false/null",
"anemia": "true/false/null",
"angina": "true/false/null",
"asthma": "true/false/null",
"emphysema": "true/false/null",
"bleedingProblems": "true/false/null",
"bloodDiseases": "true/false/null",
"headInjuries": "true/false/null",
"arthritisRheumatism": "true/false/null",
"other": "other conditions written in or null"
}
}
}

EXTRACTION RULES:

1. Use null for empty, blank, or illegible fields
2. For checkboxes: true if checked/circled/marked, false if blank, null if unclear
3. Preserve exact handwritten spelling, even if unusual
4. Use MM/DD/YYYY format for all dates
5. Extract blood pressure as string (e.g., "120/80")
6. For Yes/No questions, use "Yes", "No", or null
7. If multiple conditions are checked in the medical history checklist, mark each as true
8. Do not invent data - only extract what is clearly visible

Return ONLY the JSON object. No markdown, no code blocks, no explanations.
