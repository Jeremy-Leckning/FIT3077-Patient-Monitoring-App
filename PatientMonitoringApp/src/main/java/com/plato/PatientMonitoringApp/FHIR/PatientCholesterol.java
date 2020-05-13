package com.plato.PatientMonitoringApp.FHIR;

import java.io.IOException;

public interface PatientCholesterol {
    String getCholesterol(String patientId) throws IOException;
}
