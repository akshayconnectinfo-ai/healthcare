import Image from "next/image";
import Link from "next/link";

import { getDoctorsWithPatients } from "@/lib/actions/doctor.actions";

export const dynamic = "force-dynamic";

const DoctorsPage = async () => {
  const doctorsData = await getDoctorsWithPatients();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-10 px-5 py-10 xl:px-12">
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
        <p className="text-16-semibold">Doctors Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-3">
          <h1 className="header">Doctors With Assigned Patients</h1>
          <p className="text-dark-700">
            Total doctors: {doctorsData.totalDoctors} | Total patients: {doctorsData.totalPatients}
          </p>
        </section>

        <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-3">
          {doctorsData.doctors.length > 0 ? (
            doctorsData.doctors.map((entry: any) => (
              <article
                key={entry.doctor.name}
                className="rounded-2xl border border-dark-400 bg-dark-200 p-6 shadow-lg"
              >
                <div className="mb-4 flex items-center gap-3">
                  <Image
                    src={entry.doctor.image}
                    alt={entry.doctor.name}
                    width={56}
                    height={56}
                    className="size-14 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-18-bold">Dr. {entry.doctor.name}</h2>
                    <p className="text-14-regular text-dark-700">
                      Assigned patients: {entry.patientCount}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/doctors/${encodeURIComponent(entry.doctor.name)}/patients`}
                  className="text-14-medium text-green-500"
                >
                  View Patients
                </Link>
              </article>
            ))
          ) : (
            <p className="text-14-regular text-dark-700">No doctor assignments found.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default DoctorsPage;
