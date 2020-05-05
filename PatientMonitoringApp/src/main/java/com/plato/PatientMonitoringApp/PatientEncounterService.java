package com.plato.PatientMonitoringApp;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

public class PatientEncounterService implements PatientEncounter {
    private Set<String> patientList = new HashSet<String>();

    @Override
    public Set<String> getEncounters(String practitionerId) throws IOException {
        JSONObject json = HttpService.readJsonFromUrl("https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Encounter?_include=" +
                "Encounter.participant.individual&_include=Encounter.patient&participant.identifier=http%3A%2F%2Fhl7.org%2Ffhir%2Fsid%2Fus-npi%7C500&_format=json");

        JSONArray resourceArray = json.getJSONArray("entry");
        for (int i = 0; i < resourceArray.length(); i++) {
            String patientNames = resourceArray.getJSONObject(i).getJSONObject("resource").getJSONObject("subject").getString("display");

            this.patientList.add(patientNames);

        }
        System.out.println("practitioner id is " + practitionerId);
        System.out.println("In getEncounterss");
        return this.patientList;
    }
}
