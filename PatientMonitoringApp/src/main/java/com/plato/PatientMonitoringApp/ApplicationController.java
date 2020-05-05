package com.plato.PatientMonitoringApp;

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
    public Set<String> getPatientList(@RequestParam(name="practitionerId", required = false, defaultValue = "29165") String practitionerId) throws IOException {
        healthPractitioner.setHealthPractitionerId(practitionerId);

        PatientEncounter patientEncounter = new PatientEncounterService();
        Set<String> patientList = patientEncounter.getEncounters(practitionerId);

        healthPractitioner.setPatientList(patientList);
        return patientList;
    }

    @RequestMapping("/patient-data")
    public String getPatientData() throws IOException {
        PatientInfo patientInfo = new PatientInfoService();

        return patientInfo.getInfo();
    }

    @RequestMapping("/patient-cholesterol")
    public String getPatientCholesterol() throws IOException {
        PatientCholesterol patientCholesterol = new PatientCholesterolService();

        return patientCholesterol.getCholesterol();
    }
}
