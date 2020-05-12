package com.plato.PatientMonitoringApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Set;

@RestController
@RequestMapping("api/v1")
@CrossOrigin("*")
//Main controller of the program, access to all the API
public class ApplicationController {
    private final HealthPractitioner healthPractitioner;

    @Autowired
    public ApplicationController(HealthPractitioner healthPractitioner) {
        this.healthPractitioner = healthPractitioner;
    }

    //The function searches all the encounters that the practitioner has an adds all the patients to a list. The function also checks that there are no duplicates
    @RequestMapping("/patient-list")
    public Set<String> getPatientList(@RequestParam(name="practitionerIdentifier", required = false, defaultValue = "500") String practitionerIdentifier) throws IOException {
        healthPractitioner.setHealthPractitionerId(practitionerIdentifier);

        PatientEncounter patientEncounter = new PatientEncounterService();
        Set<String> patientList = patientEncounter.getEncounters(practitionerIdentifier);

        healthPractitioner.setPatientList(patientList);
        return patientList;
    }

//    The function returns basic information required about a patient
    @RequestMapping("/patient-data")
    public String getPatientData(@RequestParam(name="patientId", required = false, defaultValue = "253406") String patientId) throws IOException {
        PatientInfo patientInfo = new PatientInfoService();

        return patientInfo.getInfo(patientId);
    }

//    The function returns the latest value of a patient's cholesterol and its effective date. It returns a 0 if the patient does not have any cholesteorl records
    @RequestMapping("/patient-cholesterol")
    public String getPatientCholesterol(@RequestParam(name="patientId", required = false, defaultValue = "253406") String patientId) throws IOException {
        PatientCholesterol patientCholesterol = new PatientCholesterolService();

        return patientCholesterol.getCholesterol(patientId);
    }
}
