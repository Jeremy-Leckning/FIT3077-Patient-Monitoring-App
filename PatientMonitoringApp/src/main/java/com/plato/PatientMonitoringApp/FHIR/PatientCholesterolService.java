package com.plato.PatientMonitoringApp.FHIR;

import com.plato.PatientMonitoringApp.HTTP.HttpService;
import org.json.JSONObject;
import java.io.IOException;

//Gets the latest cholesterol value from a patient along with its effective time
public class PatientCholesterolService implements PatientCholesterol {
    @Override
    public String getCholesterol(String patientId) throws IOException {
        JSONObject json = HttpService.readJsonFromUrl("https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Observation?_count=10&code=2093-3&patient="+
                patientId+"&_sort=-date&_format=json");

        JSONObject jsonObject = new JSONObject();

        if (json.getInt("total") == 0) {
            jsonObject.put("cholesterolValue", 0);
            jsonObject.put("effectiveDateTime", "-");
        }
         else {
            String effectiveDateTime = json.getJSONArray("entry").getJSONObject(0).getJSONObject("resource").getString("effectiveDateTime");
            Float cholesterolValue = json.getJSONArray("entry").getJSONObject(0).getJSONObject("resource").getJSONObject("valueQuantity").getFloat("value");

            jsonObject.put("cholesterolValue", cholesterolValue);
            jsonObject.put("effectiveDateTime", effectiveDateTime);
        }


        return jsonObject.toString();
    }
}
