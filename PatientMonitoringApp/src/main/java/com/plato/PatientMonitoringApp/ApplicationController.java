package com.plato.PatientMonitoringApp;

import com.plato.PatientMonitoringApp.FHIR.*;
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
    private PatientEncounter patientEncounter = new PatientEncounterService();
    private PatientInfo patientInfo = new PatientInfoService();
    private PatientCholesterol patientCholesterol = new PatientCholesterolService();

    @Autowired
    public ApplicationController(HealthPractitioner healthPractitioner) {
        this.healthPractitioner = healthPractitioner;
    }

    //The function searches all the encounters that the practitioner has an adds all the patients to a list. The function also checks that there are no duplicates
    @RequestMapping("/patient-list")
    public Set<String> getPatientList(@RequestParam(name="practitionerIdentifier", required = true) String practitionerIdentifier) throws IOException {
        healthPractitioner.setHealthPractitionerId(practitionerIdentifier);
        Set<String> patientList = patientEncounter.getEncounters(practitionerIdentifier);

        healthPractitioner.setPatientList(patientList);
        return patientList;
    }

    //The function returns basic information required about a patient
    @RequestMapping("/patient-data")
    public String getPatientData(@RequestParam(name="patientId", required = true) String patientId) throws IOException {
        return patientInfo.getInfo(patientId);
    }

    //The function returns the latest value of a patient's cholesterol and its effective date. It returns a 0 if the patient does not have any cholesteorl records
    @RequestMapping("/patient-cholesterol")
    public String getPatientCholesterol(@RequestParam(name="patientId", required = true) String patientId) throws IOException {
        return patientCholesterol.getCholesterol(patientId);
    }
}
