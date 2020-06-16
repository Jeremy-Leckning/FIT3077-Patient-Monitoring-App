package com.plato.PatientMonitoringApp.FHIR;

import java.io.IOException;
import java.util.Set;

public interface PatientBloodPressure {
    String getBloodPressure(String patientId) throws IOException;
    String getLastFiveSystolicBP(String patientId) throws IOException;
}
