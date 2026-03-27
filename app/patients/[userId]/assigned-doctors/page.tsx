import Image from "next/image";
import Link from "next/link";

import { getAssignedDoctorsForPatient } from "@/lib/actions/doctor.actions";

export const dynamic = "force-dynamic";

const AssignedDoctorsPage = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const assignment = await getAssignedDoctorsForPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <section className="space-y-6">
            <h1 className="header">Assigned Doctors</h1>

            {assignment.patient ? (
              <>
                <p className="text-14-regular text-dark-700">
                  Patient: {assignment.patient.name}
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  {assignment.doctors.length > 0 ? (
                    assignment.doctors.map((doctor: any) => (
                      <article
                        key={doctor.name}
                        className="rounded-2xl border border-dark-400 bg-dark-200 p-6"
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={doctor.image}
                            alt={doctor.name}
                            width={56}
                            height={56}
                            className="size-14 rounded-full object-cover"
                          />
                          <div>
                            <h2 className="text-18-bold">Dr. {doctor.name}</h2>
                            <p className="text-14-regular text-dark-700">
                              Primary assigned physician
                            </p>
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="text-14-regular text-dark-700">
                      No doctor assigned yet.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <p className="text-14-regular text-dark-700">Patient record not found.</p>
            )}

            <Link href={`/patients/${userId}/new-appointment`} className="text-14-medium text-green-500">
              Back to Appointment Page
            </Link>
          </section>

          <p className="copyright mt-10 py-12">© 2026 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default AssignedDoctorsPage;
