package com.plato.PatientMonitoringApp;

import java.io.IOException;

public interface PatientCholesterol {
    String getCholesterol(String patientId) throws IOException;
}
