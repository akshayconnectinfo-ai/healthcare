import Image from "next/image";
import Link from "next/link";

import { getDoctorsWithPatients } from "@/lib/actions/doctor.actions";

export const dynamic = "force-dynamic";

const PatientDoctorAssignmentsPage = async () => {
  const doctorsData = await getDoctorsWithPatients();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold">Patient-Doctor Assignments</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Doctor Assigned To Patient</h1>
          <p className="text-dark-700">Assignment view across all registered patients</p>
        </section>

        <section className="w-full overflow-hidden rounded-lg border border-dark-400">
          <table className="w-full text-left">
            <thead className="bg-dark-200">
              <tr>
                <th className="px-4 py-3 text-14-medium">#</th>
                <th className="px-4 py-3 text-14-medium">Patient</th>
                <th className="px-4 py-3 text-14-medium">Doctor</th>
                <th className="px-4 py-3 text-14-medium">Doctor Patients Page</th>
              </tr>
            </thead>
            <tbody>
              {doctorsData.doctors.length > 0 ? (
                doctorsData.doctors.flatMap((entry: any) =>
                  entry.patients.map((patient: any, index: number) => (
                    <tr
                      key={`${entry.doctor.name}-${patient.$id}`}
                      className="border-t border-dark-400"
                    >
                      <td className="px-4 py-3 text-14-regular">{index + 1}</td>
                      <td className="px-4 py-3 text-14-regular">{patient.name}</td>
                      <td className="px-4 py-3 text-14-regular">Dr. {entry.doctor.name}</td>
                      <td className="px-4 py-3 text-14-regular">
                        <Link
                          className="text-green-500"
                          href={`/doctors/${encodeURIComponent(entry.doctor.name)}/patients`}
                        >
                          Open
                        </Link>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td className="px-4 py-6 text-14-regular text-dark-700" colSpan={4}>
                    No patient-doctor assignment found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default PatientDoctorAssignmentsPage;
