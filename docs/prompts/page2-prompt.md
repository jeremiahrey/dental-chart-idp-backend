You are a dental data extraction specialist. Extract ALL information from this PDA Dental Chart PAGE 2 ONLY (Dental Chart with tooth diagram and examination findings).

CRITICAL INSTRUCTION FOR STATUS BOXES:
The tooth diagram has square boxes labeled "STATUS" corresponding to each tooth. ONLY extract the text codes written INSIDE these STATUS boxes. DO NOT interpret drawings or circles on the teeth.

Return ONLY a valid JSON object.

TOOTH NUMBERING REFERENCE (FDI System):

- Permanent Upper: 18-11 (Right), 21-28 (Left)
- Permanent Lower: 48-41 (Right), 31-38 (Left)
- Temporary Upper: 55-51 (Right), 61-65 (Left)
- Temporary Lower: 85-81 (Right), 71-75 (Left)

EXTRACT THE FOLLOWING:

{
"header": {
"name": "extracted name from top or null",
"age": "extracted age or null",
"gender": "extracted gender (M/F) or null",
"date": "MM/DD/YYYY or null"
},
"dentalChart": {
"statusBoxes": {
"permanentUpperTeeth": [
{ "toothNumber": "18", "statusCode": "text or null" },
{ "toothNumber": "17", "statusCode": "text or null" },
{ "toothNumber": "16", "statusCode": "text or null" },
{ "toothNumber": "15", "statusCode": "text or null" },
{ "toothNumber": "14", "statusCode": "text or null" },
{ "toothNumber": "13", "statusCode": "text or null" },
{ "toothNumber": "12", "statusCode": "text or null" },
{ "toothNumber": "11", "statusCode": "text or null" },
{ "toothNumber": "21", "statusCode": "text or null" },
{ "toothNumber": "22", "statusCode": "text or null" },
{ "toothNumber": "23", "statusCode": "text or null" },
{ "toothNumber": "24", "statusCode": "text or null" },
{ "toothNumber": "25", "statusCode": "text or null" },
{ "toothNumber": "26", "statusCode": "text or null" },
{ "toothNumber": "27", "statusCode": "text or null" },
{ "toothNumber": "28", "statusCode": "text or null" }
],
"temporaryUpperTeeth": [
{ "toothNumber": "55", "statusCode": "text or null" },
{ "toothNumber": "54", "statusCode": "text or null" },
{ "toothNumber": "53", "statusCode": "text or null" },
{ "toothNumber": "52", "statusCode": "text or null" },
{ "toothNumber": "51", "statusCode": "text or null" },
{ "toothNumber": "61", "statusCode": "text or null" },
{ "toothNumber": "62", "statusCode": "text or null" },
{ "toothNumber": "63", "statusCode": "text or null" },
{ "toothNumber": "64", "statusCode": "text or null" },
{ "toothNumber": "65", "statusCode": "text or null" }
],
"temporaryLowerTeeth": [
{ "toothNumber": "85", "statusCode": "text or null" },
{ "toothNumber": "84", "statusCode": "text or null" },
{ "toothNumber": "83", "statusCode": "text or null" },
{ "toothNumber": "82", "statusCode": "text or null" },
{ "toothNumber": "81", "statusCode": "text or null" },
{ "toothNumber": "71", "statusCode": "text or null" },
{ "toothNumber": "72", "statusCode": "text or null" },
{ "toothNumber": "73", "statusCode": "text or null" },
{ "toothNumber": "74", "statusCode": "text or null" },
{ "toothNumber": "75", "statusCode": "text or null" }
],
"permanentLowerTeeth": [
{ "toothNumber": "48", "statusCode": "text or null" },
{ "toothNumber": "47", "statusCode": "text or null" },
{ "toothNumber": "46", "statusCode": "text or null" },
{ "toothNumber": "45", "statusCode": "text or null" },
{ "toothNumber": "44", "statusCode": "text or null" },
{ "toothNumber": "43", "statusCode": "text or null" },
{ "toothNumber": "42", "statusCode": "text or null" },
{ "toothNumber": "41", "statusCode": "text or null" },
{ "toothNumber": "31", "statusCode": "text or null" },
{ "toothNumber": "32", "statusCode": "text or null" },
{ "toothNumber": "33", "statusCode": "text or null" },
{ "toothNumber": "34", "statusCode": "text or null" },
{ "toothNumber": "35", "statusCode": "text or null" },
{ "toothNumber": "36", "statusCode": "text or null" },
{ "toothNumber": "37", "statusCode": "text or null" },
{ "toothNumber": "38", "statusCode": "text or null" }
]
},
"periodontalScreening": {
"codeExtracted": "PSR code number or text or null",
"gingivitis": "true/false/null",
"earlyPeriodontitis": "true/false/null",
"moderatePeriodontitis": "true/false/null",
"advancedPeriodontitis": "true/false/null"
},
"occlusion": {
"molarClassification": "Class I/II/III or extracted text or null",
"overjettMm": "measurement in mm or null",
"overbiteMm": "measurement in mm or null",
"midlineDeviationMm": "measurement in mm or null",
"crossbite": "description or Yes/No/null"
},
"appliances": {
"orthodontic": "true/false/null",
"stayplate": "true/false/null",
"others": "description of other appliances or null"
},
"tmd": {
"clenching": "true/false/null",
"clicking": "true/false/null",
"trismus": "true/false/null",
"muscleSpasm": "true/false/null"
}
}
}
