package com.plato.PatientMonitoringApp;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("api/v1")
@CrossOrigin("*")
public class ApplicationController {

    private final HealthPractitioner healthPractitioner;

    @Autowired
    public ApplicationController(HealthPractitioner healthPractitioner) {
        this.healthPractitioner = healthPractitioner;
    }

    @RequestMapping("/patient-list")
    public Set<String> getPatientList(@RequestParam(name="practitionerIdentifier", required = false, defaultValue = "500") String practitionerIdentifier) throws IOException {
        healthPractitioner.setHealthPractitionerId(practitionerIdentifier);

        PatientEncounter patientEncounter = new PatientEncounterService();
        Set<String> patientList = patientEncounter.getEncounters(practitionerIdentifier);

        healthPractitioner.setPatientList(patientList);
        return patientList;
    }

    @RequestMapping("/patient-data")
    public String getPatientData(@RequestParam(name="patientId", required = false, defaultValue = "93991") String patientId) throws IOException {
        PatientInfo patientInfo = new PatientInfoService();

        return patientInfo.getInfo(patientId);
    }

    @RequestMapping("/patient-cholesterol")
    public String getPatientCholesterol(@RequestParam(name="patientId", required = false, defaultValue = "1") String patientId) throws IOException {
        PatientCholesterol patientCholesterol = new PatientCholesterolService();

        return patientCholesterol.getCholesterol(patientId);
    }
}
