You are a dental data extraction specialist. Extract ALL information from this PDA Dental Chart PAGE 4 ONLY (Treatment Record table).

Return ONLY a valid JSON object. No markdown.

EXTRACT THE FOLLOWING:

{
"treatmentRecord": {
"header": {
"name": "extracted name from top or null",
"age": "extracted age or null",
"gender": "extracted gender (M/F) or null"
},
"entries": [
{
"date": "MM/DD/YYYY or null",
"toothNumber": "tooth number(s) or null",
"procedure": "procedure description or null",
"dentist": "dentist name or initials or null",
"amountCharged": number or null,
"amountPaid": number or null,
"balance": number or null,
"nextAppointment": "date or text or null"
}
]
}
}

EXTRACTION RULES:

1. Extract each row from the treatment table as a separate entry.
2. If the treatment table is empty, return "entries": [].
3. **MISSING COLUMN:** Ensure you extract the "Next Appt." column into "nextAppointment".
4. **NUMBERS:** Extract amounts as clean numbers (remove commas).
5. If an amount field has a dash "-", "0", or is blank, handle appropriately.
6. Use MM/DD/YYYY format for all dates.
7. If tooth number has multiple teeth (e.g., "14, 15, 16" or "ALL"), extract exactly as written.
