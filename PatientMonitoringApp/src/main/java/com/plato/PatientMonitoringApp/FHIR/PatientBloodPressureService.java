package com.plato.PatientMonitoringApp.FHIR;

import com.plato.PatientMonitoringApp.HTTP.HttpService;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

//Gets the latest cholesterol value from a patient along with its effective time
public class PatientBloodPressureService implements PatientBloodPressure {
    private Set<String> systolicBloodPressureRecords = new HashSet<String>();

    @Override
    public String getBloodPressure(String patientId) throws IOException {
        JSONObject json = HttpService.readJsonFromUrl("https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Observation?_count=10&code=55284-4&patient="+
                patientId+"&_sort=-date&_format=json");

        JSONObject jsonObject = new JSONObject();

        if (json.getInt("total") == 0) {
            jsonObject.put("systolicBloodPressure", 0);
            jsonObject.put("diastolicBloodPressure", 0);
            jsonObject.put("effectiveDateTime", "-");
        }
         else {
            String effectiveDateTime = json.getJSONArray("entry").getJSONObject(0).getJSONObject("resource").getString("effectiveDateTime");
            Integer systolicBloodPressure = json.getJSONArray("entry").getJSONObject(0).getJSONObject("resource").getJSONArray("component").getJSONObject(0).getJSONObject("valueQuantity").getInt("value");
            Integer diastolicBloodPressure = json.getJSONArray("entry").getJSONObject(0).getJSONObject("resource").getJSONArray("component").getJSONObject(1).getJSONObject("valueQuantity").getInt("value");

            jsonObject.put("systolicBloodPressure", systolicBloodPressure);
            jsonObject.put("diastolicBloodPressure", diastolicBloodPressure);
            jsonObject.put("effectiveDateTime", effectiveDateTime);
        }

        return jsonObject.toString();
    }

    @Override
    public String getLastFiveSystolicBP(String patientId) throws IOException{
        JSONObject json = HttpService.readJsonFromUrl("https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Observation?_count=10&code=55284-4&patient="+
                patientId+"&_sort=-date&_format=json");
        systolicBloodPressureRecords = new HashSet<String>();
        int numberRecords = 0;
        if (json.getInt("total") >= 5) {
            numberRecords = 5;
        }
        else {
            numberRecords = json.getInt("total");
        }
//        this.systolicBloodPressureRecords.add(Integer.toString(numberRecords));
        String result = "";
        JSONObject json2 = HttpService.readJsonFromUrl("https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Patient/"+patientId+"?_format=json");
        String firstName = json2.getJSONArray("name").getJSONObject(0).getJSONArray("given").getString(0);
        String lastName = json2.getJSONArray("name").getJSONObject(0).getString("family");
        String fullName = firstName + " " + lastName;
        result = fullName + ": ";
        for (int i = 0; i < numberRecords; i++) {
            String issuedDate = json.getJSONArray("entry").getJSONObject(i).getJSONObject("resource").getString("issued");
            Integer systolicBloodPressure = json.getJSONArray("entry").getJSONObject(i).getJSONObject("resource").getJSONArray("component").getJSONObject(0).getJSONObject("valueQuantity").getInt("value");

            result += systolicBloodPressure + " (" + issuedDate;

            if (i == numberRecords-1) {
                result += ")";
            }
            else{
                result += "), ";
            }
//            JSONObject jsonObject = new JSONObject();
//            jsonObject.put("systolicBloodPressure", systolicBloodPressure);
//            jsonObject.put("issued", issuedDate);
//            this.systolicBloodPressureRecords.add(jsonObject.toString());
        }

//        return this.systolicBloodPressureRecords;
        return result;
    }
}

