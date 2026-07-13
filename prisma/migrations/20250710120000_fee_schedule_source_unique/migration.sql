-- Allow one fee schedule per college/year/source (e.g. karnataka_dump + mcc_fee_csv).
DROP INDEX IF EXISTS "app"."fee_schedules_college_id_academic_year_key";

CREATE UNIQUE INDEX "fee_schedules_college_id_academic_year_source_key"
    ON "app"."fee_schedules"("college_id", "academic_year", "source");
