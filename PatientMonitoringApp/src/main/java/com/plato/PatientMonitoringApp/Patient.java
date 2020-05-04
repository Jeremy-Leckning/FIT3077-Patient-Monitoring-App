package com.plato.PatientMonitoringApp;

import org.json.JSONObject;

import java.io.IOException;

public class Patient {
    String firstName;
    String lastName;
    float cholesterolValue;
    String gender;
    String address;
    String effectiveDateTime;

    public String getFirstName(){
        return firstName;
    }
    public String getLastName(){
        return lastName;
    }
    public float getCholesterolValue(){
        return cholesterolValue;
    }
    public String getGender(){
        return gender;
    }
    public String getAddress(){
        return address;
    }
    public String getDate() { return effectiveDateTime; }

    public void getCholesterolInfo() throws IOException {
        JSONObject json = HttpService.readJsonFromUrl("https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Patient/1?_format=json");
        JSONObject json2 = HttpService.readJsonFromUrl("https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Observation?_count=10&code=2093-3&patient=1&_sort=-date&_format=json");

        this.firstName = json.getJSONArray("name").getJSONObject(0).getJSONArray("given").getString(0);
        System.out.println("FirstName:" + this.firstName);

        this.lastName = json.getJSONArray("name").getJSONObject(0).getString("family");
        System.out.println("LastName:" + this.lastName);

        this.effectiveDateTime = json2.getJSONArray("entry").getJSONObject(0).getJSONObject("resource").getString("effectiveDateTime");
        System.out.println("Date:" + this.effectiveDateTime);

        this.cholesterolValue = json2.getJSONArray("entry").getJSONObject(0).getJSONObject("resource").getJSONObject("valueQuantity").getFloat("value");
        System.out.println("Cholesterol:" + this.cholesterolValue);

        this.gender = json.getString("gender");
        System.out.println("Gender:" + this.gender);

        this.address = json.getJSONArray("address").getJSONObject(0).getJSONArray("line").getString(0) + " " +
                "" + json.getJSONArray("address").getJSONObject(0).getString("city") + " " +
                "" + json.getJSONArray("address").getJSONObject(0).getString("state")+ " " +
                "" + json.getJSONArray("address").getJSONObject(0).getString("postalCode")+ " " +
                "" + json.getJSONArray("address").getJSONObject(0).getString("country");
        System.out.println("Address:" + this.address);
    }
}
