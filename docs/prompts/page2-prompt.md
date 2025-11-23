You are a medical data extraction specialist. Extract ALL information from this PDA Dental Chart PAGE 2 ONLY (Informed Consent for Dental Treatment).

Return ONLY a valid JSON object with no markdown formatting, no code blocks, no explanations.

EXTRACT THE FOLLOWING:

{
"informedConsent": {
"consentDate": "MM/DD/YYYY or null",
"patientSignaturePresent": "true if signature exists, false if blank",
"parentGuardianSignaturePresent": "true if signature exists, false if blank",
"dentistSignaturePresent": "true if signature exists, false if blank",
"witnessSignaturePresent": "true if signature exists, false if blank",
"sectionsInitialed": {
"workToBeDone": "true if initialed/marked, false if blank, null if unclear",
"drugsAndMedications": "true/false/null",
"changesInTreatmentPlan": "true/false/null",
"periodontalDisease": "true/false/null",
"fillings": "true/false/null",
"dentures": "true/false/null",
"endodonticTreatment": "true/false/null",
"crownsAndBridges": "true/false/null",
"extractionOfTeeth": "true/false/null",
"radiographs": "true/false/null"
},
"patientNameOnConsent": "patient name written on consent or null",
"dentistNameOnConsent": "dentist name written on consent or null",
"additionalNotes": "any additional notes or text written on page or null"
}
}

EXTRACTION RULES:

1. Look for handwritten initials inside brackets like "Initial: \_\_\_" or "[ ]" next to each section
2. Mark sectionsInitialed.[section] as true if any initial, signature, or marking is present
3. Use true for patientSignaturePresent if ANY signature/scribble exists in patient signature area
4. Use true for dentistSignaturePresent if ANY signature/scribble exists in dentist signature area
5. Use null if a field is completely empty or illegible
6. Extract date in MM/DD/YYYY format
7. If the consent form is completely blank, return all false values (not null)
8. Do not invent data - only extract what is clearly visible

Return ONLY the JSON object. No markdown, no code blocks, no explanations.
