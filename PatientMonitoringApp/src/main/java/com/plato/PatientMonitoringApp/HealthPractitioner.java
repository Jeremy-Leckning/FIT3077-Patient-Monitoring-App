package com.plato.PatientMonitoringApp;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
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
