import type { CollegeInfrastructure } from "@/types/college";

export function hasClinicalData(infrastructure: CollegeInfrastructure): boolean {
  return (
    infrastructure.beds > 0 ||
    infrastructure.patientFlowPerDay > 0 ||
    infrastructure.facilities.length > 0
  );
}
