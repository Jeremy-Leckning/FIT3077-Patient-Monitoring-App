package com.plato.PatientMonitoringApp;

import org.json.JSONObject;
import java.io.IOException;

//This function gets all the basic information needed of our patient
public class PatientInfoService implements PatientInfo {
    @Override
    public String getInfo(String patientId) throws IOException {
        JSONObject json = HttpService.readJsonFromUrl("https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Patient/"+patientId+"?_format=json");
        String firstName = json.getJSONArray("name").getJSONObject(0).getJSONArray("given").getString(0);
        String lastName = json.getJSONArray("name").getJSONObject(0).getString("family");
        String fullName = firstName + " " + lastName;
        String gender = json.getString("gender");
        String address = json.getJSONArray("address").getJSONObject(0).getJSONArray("line").getString(0) + " " +
                "" + json.getJSONArray("address").getJSONObject(0).getString("city") + " " +
                "" + json.getJSONArray("address").getJSONObject(0).getString("state")+ " ";
        String address2;
        try {
            address2 = "" + json.getJSONArray("address").getJSONObject(0).getString("postalCode")+ " " +
                    "" + json.getJSONArray("address").getJSONObject(0).getString("country");
        }
        catch (Exception e)
        {
            address2 = "" + json.getJSONArray("address").getJSONObject(0).getString("country");
        }

        address += address2;

        String birthDate = json.getString("birthDate");

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("firstName", firstName);
        jsonObject.put("lastName", lastName);
        jsonObject.put("gender", gender);
        jsonObject.put("address", address);
        jsonObject.put("birthDate", birthDate);

        return jsonObject.toString();
    }
}
