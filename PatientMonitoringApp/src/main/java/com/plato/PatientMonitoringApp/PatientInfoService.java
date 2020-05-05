package com.plato.PatientMonitoringApp;

import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class PatientInfoService implements PatientInfo {
    @Override
    public String getInfo() throws IOException {
        JSONObject json = HttpService.readJsonFromUrl("https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Patient/106582?_format=json");
        String firstName = json.getJSONArray("name").getJSONObject(0).getJSONArray("given").getString(0);
        System.out.println("FirstName:" + firstName);

        String lastName = json.getJSONArray("name").getJSONObject(0).getString("family");
        System.out.println("LastName:" + lastName);

        String fullName = firstName + " " + lastName;

        String gender = json.getString("gender");

        System.out.println("Gender:" + gender);

        String address = json.getJSONArray("address").getJSONObject(0).getJSONArray("line").getString(0) + " " +
                "" + json.getJSONArray("address").getJSONObject(0).getString("city") + " " +
                "" + json.getJSONArray("address").getJSONObject(0).getString("state")+ " " +
                "" + json.getJSONArray("address").getJSONObject(0).getString("postalCode")+ " " +
                "" + json.getJSONArray("address").getJSONObject(0).getString("country");
        System.out.println("Address:" + address);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("firstName", firstName);
        jsonObject.put("lastName", lastName);
        jsonObject.put("gender", gender);
        jsonObject.put("address", address);

        return jsonObject.toString();
    }
}
