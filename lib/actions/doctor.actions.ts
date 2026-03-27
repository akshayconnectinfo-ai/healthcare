"use server";

import { Query } from "node-appwrite";

import { Doctors } from "@/constants";
import { Patient } from "@/types/appwrite.types";

import {
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

const doctorLookup = new Map(Doctors.map((doctor) => [doctor.name, doctor]));

const withDoctorMeta = (doctorName: string) => {
  const doctor = doctorLookup.get(doctorName);
  return {
    name: doctorName,
    image: doctor?.image ?? "/assets/icons/user.svg",
  };
};

export const getDoctorsWithPatients = async () => {
  try {
    const patientsResult = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.orderAsc("name")]
    );

    const patients = patientsResult.documents as Patient[];
    const groupedByDoctor = patients.reduce<Record<string, Patient[]>>(
      (acc, patient) => {
        const doctorName = patient.primaryPhysician?.trim();
        if (!doctorName) return acc;

        if (!acc[doctorName]) {
          acc[doctorName] = [];
        }

        acc[doctorName].push(patient);
        return acc;
      },
      {}
    );

    const doctors = Object.entries(groupedByDoctor)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([doctorName, assignedPatients]) => ({
        doctor: withDoctorMeta(doctorName),
        patientCount: assignedPatients.length,
        patients: assignedPatients,
      }));

    return parseStringify({
      totalDoctors: doctors.length,
      totalPatients: patients.length,
      doctors,
    });
  } catch (error) {
    console.error("An error occurred while retrieving doctors with patients:", error);
    return {
      totalDoctors: 0,
      totalPatients: 0,
      doctors: [],
    };
  }
};

export const getDoctorPatients = async (doctorName: string) => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("primaryPhysician", [doctorName]), Query.orderAsc("name")]
    );

    return parseStringify({
      doctor: withDoctorMeta(doctorName),
      totalPatients: result.total,
      patients: result.documents,
    });
  } catch (error) {
    console.error("An error occurred while retrieving doctor patients:", error);
    return {
      doctor: withDoctorMeta(doctorName),
      totalPatients: 0,
      patients: [],
    };
  }
};

export const getAssignedDoctorsForPatient = async (userId: string) => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    const patient = result.documents[0] as Patient | undefined;
    if (!patient) {
      return parseStringify({
        patient: null,
        doctors: [],
      });
    }

    const doctorName = patient.primaryPhysician?.trim();
    const doctors = doctorName ? [withDoctorMeta(doctorName)] : [];

    return parseStringify({
      patient,
      doctors,
    });
  } catch (error) {
    console.error(
      "An error occurred while retrieving assigned doctors for patient:",
      error
    );
    return {
      patient: null,
      doctors: [],
    };
  }
};
