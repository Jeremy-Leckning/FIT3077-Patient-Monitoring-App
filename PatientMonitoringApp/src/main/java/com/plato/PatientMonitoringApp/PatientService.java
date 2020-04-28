package com.plato.PatientMonitoringApp;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PatientService {
    List<Patient> getPatientData() throws IOException {
        Patient patient = new Patient();
        patient.getCholesterolInfo();

//        final List<Integer> INTEGER = new ArrayList<>();
//
//        INTEGER.add(5);
//        return INTEGER;

        final List<Patient> PATIENT = new ArrayList<>();

        PATIENT.add(patient);
        return PATIENT;
    }

}
