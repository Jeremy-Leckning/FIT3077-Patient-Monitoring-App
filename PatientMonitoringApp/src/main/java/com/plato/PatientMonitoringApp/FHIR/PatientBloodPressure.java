package com.plato.PatientMonitoringApp.FHIR;

import java.io.IOException;

public interface PatientBloodPressure {
    String getBloodPressure(String patientId) throws IOException;
}
