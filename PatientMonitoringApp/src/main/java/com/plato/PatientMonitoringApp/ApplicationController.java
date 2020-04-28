package com.plato.PatientMonitoringApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1/patient-data")
@CrossOrigin("*")
public class ApplicationController {

    private final PatientService patientService;

    @Autowired
    public ApplicationController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    public List<Patient> getPatientData() throws IOException {
        return patientService.getPatientData();
    }
}
