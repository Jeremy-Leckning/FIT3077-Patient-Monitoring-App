package com.plato.PatientMonitoringApp;

import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;

public class PatientCholesterolService implements PatientCholesterol {
    @Override
    public String getCholesterol(String patientId) throws IOException {
        JSONObject json = HttpService.readJsonFromUrl("https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Observation?_count=10&code=2093-3&patient="+
                patientId+"&_sort=-date&_format=json");
        
        String effectiveDateTime = json.getJSONArray("entry").getJSONObject(0).getJSONObject("resource").getString("effectiveDateTime");
        System.out.println("Date:" + effectiveDateTime);

        Float cholesterolValue = json.getJSONArray("entry").getJSONObject(0).getJSONObject("resource").getJSONObject("valueQuantity").getFloat("value");
        System.out.println("Cholesterol:" + cholesterolValue);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("cholesterolValue", cholesterolValue);
        jsonObject.put("effectiveDateTime", effectiveDateTime);

        return jsonObject.toString();
    }
}
