package com.plato.PatientMonitoringApp.FHIR;

import com.plato.PatientMonitoringApp.HTTP.HttpService;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

//The function crawls through all the encounter pages and adds any patient that the practitioner has encountered.
//Duplicates are checked using HashSet
public class PatientEncounterService implements PatientEncounter {
    private Set<String> patientList = new HashSet<String>();

    @Override
    public Set<String> getEncounters(String practitionerIdentifier) throws IOException {
        boolean next_page = true;
        String next_url = "https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Encounter?_include=" +
                "Encounter.participant.individual&_include=Encounter.patient&participant.identifier=http%3A%2F%2Fhl7.org%2Ffhir%2Fsid%2Fus-npi%7C"+
                practitionerIdentifier+"&_format=json";
        int count_page = 0;
        int count_patient = 0;

        while (next_page && count_page<2) {
            JSONObject json = HttpService.readJsonFromUrl(next_url);
            next_page = false;

            for (int i = 0; i < json.getJSONArray("link").length(); i++) {
                if (json.getJSONArray("link").getJSONObject(i).getString("relation").equals("next")){
                    next_page = true;
                    next_url = json.getJSONArray("link").getJSONObject(i).getString("url");
                    count_page += 1;
                }
            }
            JSONArray resourceArray = json.getJSONArray("entry");

            for (int i = 0; i < resourceArray.length(); i++) {
                String patientNames = resourceArray.getJSONObject(i).getJSONObject("resource").getJSONObject("subject").getString("display");
                String patientId = resourceArray.getJSONObject(i).getJSONObject("resource").getJSONObject("subject").getString("reference").split("/", 2)[1];

                JSONObject jsonObject = new JSONObject();
                jsonObject.put("patientName", patientNames);
                jsonObject.put("patientId", patientId);

                this.patientList.add(jsonObject.toString());
            }
        }
        return this.patientList;
    }
}
