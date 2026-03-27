import Image from "next/image";
import Link from "next/link";

import { getDoctorPatients } from "@/lib/actions/doctor.actions";

export const dynamic = "force-dynamic";

const DoctorPatientsPage = async ({
  params,
}: {
  params: { doctorName: string };
}) => {
  const doctorName = decodeURIComponent(params.doctorName);
  const doctorPatients = await getDoctorPatients(doctorName);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-10 px-5 py-10 xl:px-12">
      <header className="admin-header">
        <Link href="/doctors" className="cursor-pointer text-14-medium text-green-500">
          Back to Doctors
        </Link>
        <p className="text-16-semibold">Doctor Patients</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-3">
          <div className="flex items-center gap-3">
            <Image
              src={doctorPatients.doctor.image}
              alt={doctorPatients.doctor.name}
              width={60}
              height={60}
              className="size-14 rounded-full object-cover"
            />
            <div>
              <h1 className="header">Dr. {doctorPatients.doctor.name}</h1>
              <p className="text-dark-700">
                Total assigned patients: {doctorPatients.totalPatients}
              </p>
            </div>
          </div>
        </section>

        <section className="w-full overflow-hidden rounded-lg border border-dark-400">
          <table className="w-full text-left">
            <thead className="bg-dark-200">
              <tr>
                <th className="px-4 py-3 text-14-medium">#</th>
                <th className="px-4 py-3 text-14-medium">Patient Name</th>
                <th className="px-4 py-3 text-14-medium">Email</th>
                <th className="px-4 py-3 text-14-medium">Phone</th>
              </tr>
            </thead>
            <tbody>
              {doctorPatients.patients.length > 0 ? (
                doctorPatients.patients.map((patient: any, index: number) => (
                  <tr key={patient.$id} className="border-t border-dark-400">
                    <td className="px-4 py-3 text-14-regular">{index + 1}</td>
                    <td className="px-4 py-3 text-14-regular">{patient.name}</td>
                    <td className="px-4 py-3 text-14-regular">{patient.email}</td>
                    <td className="px-4 py-3 text-14-regular">{patient.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-6 text-14-regular text-dark-700" colSpan={4}>
                    No patients assigned to this doctor yet.
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

export default DoctorPatientsPage;
