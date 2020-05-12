package com.plato.PatientMonitoringApp;


import org.springframework.stereotype.Service;
import java.util.Set;

@Service
//Stores information about the health practitioner, might be useful in future extension of the applicaiton e.g. login
public class HealthPractitioner {
    private String healthPractitionerId = "";
    private Set<String> patientList;

    public void setPatientList(Set<String> patientList) {
        this.patientList = patientList;
    }

    public void setHealthPractitionerId(String healthPractitionerId) {
        this.healthPractitionerId = healthPractitionerId;
    }
}
