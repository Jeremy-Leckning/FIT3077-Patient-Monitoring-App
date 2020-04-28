import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

public class Patient {
    String firstName;
    String lastName;
    float cholesterolValue;
    String gender;
    String address;

    public void getCholesterolInfo() throws IOException {
        JSONObject json = HttpService.readJsonFromUrl("https://fhir.monash.edu/hapi-fhir-jpaserver/fhir/Patient/1?_format=json");
        System.out.println(json.getString("gender"));
        System.out.println(json.getJSONArray("name").getJSONObject(0));
        this.lastName = json.getJSONArray("name").getJSONObject(0).getString("family");
        System.out.println(this.lastName);
        System.out.println(json.toString());
    }
}
