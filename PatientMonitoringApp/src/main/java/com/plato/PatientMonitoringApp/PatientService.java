package com.plato.PatientMonitoringApp;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class PatientService {
    List<Patient> getPatientData() throws IOException {
        Patient patient = new Patient();
        patient.getCholesterolInfo();

        final List<Patient> PATIENT = new ArrayList<>();

        PATIENT.add(patient);
        return PATIENT;
    }

    Set<String> getPatientList(String practitionerId) throws IOException {
        HealthPractitioner healthPractitioner = new HealthPractitioner(practitionerId);
        healthPractitioner.getPatientListService();


        return healthPractitioner.getPatientList();
    }

}
