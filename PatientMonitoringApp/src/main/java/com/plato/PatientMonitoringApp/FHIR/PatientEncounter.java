package com.plato.PatientMonitoringApp.FHIR;

import org.json.JSONObject;

import java.io.IOException;
import java.util.Set;

public interface PatientEncounter {
    Set<String> getEncounters(String practitionerId) throws IOException;
}
