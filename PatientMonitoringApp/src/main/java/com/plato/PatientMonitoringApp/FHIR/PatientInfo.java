package com.plato.PatientMonitoringApp.FHIR;

import java.io.IOException;
import java.util.Map;

public interface PatientInfo {
    String getInfo(String patientId) throws IOException;
}
