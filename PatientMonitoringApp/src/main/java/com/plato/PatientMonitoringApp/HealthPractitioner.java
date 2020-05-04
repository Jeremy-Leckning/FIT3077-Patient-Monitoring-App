package com.plato.PatientMonitoringApp;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class HealthPractitioner {
    private String healthPractitionerId = "";

    public HealthPractitioner(String practitionerId) {
        this.healthPractitionerId = practitionerId;
    }

    private Set<String> patientList = new HashSet<String>();

//    public HealthPractitioner() {
//        List<String> patientList = new ArrayList<>();
//    }
    public Set<String> getPatientList() {return this.patientList;}

    public void getPatientListService() throws IOException {
        JSONObject json = HttpService.readJsonFromUrl("https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Encounter?_include=Encounter.participant.individual&_include=Encounter.patient&participant.identifier=http%3A%2F%2Fhl7.org%2Ffhir%2Fsid%2Fus-npi%7C500&_format=json");

        JSONArray resourceArray = json.getJSONArray("entry");
        for (int i = 0; i < resourceArray.length(); i++) {
            String patientNames = resourceArray.getJSONObject(i).getJSONObject("resource").getJSONObject("subject").getString("display");
            String practitionerId = resourceArray.getJSONObject(i).getJSONObject("resource").getJSONArray("participant").getJSONObject(0).getJSONObject("individual").getString("reference");
            if (practitionerId.equals("Practitioner/"+this.healthPractitionerId)) {
                this.patientList.add(patientNames);
            }
        }
    }
}
