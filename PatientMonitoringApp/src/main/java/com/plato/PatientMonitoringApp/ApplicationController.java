package com.plato.PatientMonitoringApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/v1")
@CrossOrigin("*")
public class ApplicationController {

    private final PatientService patientService;

    @Autowired
    public ApplicationController(PatientService patientService) {
        this.patientService = patientService;
    }

    @RequestMapping("/patient-data")
    public List<Patient> getPatientData() throws IOException {
        return patientService.getPatientData();
    }

    @RequestMapping("/patient-list")
    public Set<String> getPatientList(@RequestParam(name="practitionerId", required = false, defaultValue = "29165") String practitionerId) throws IOException {
        return patientService.getPatientList(practitionerId);
    }
}
