-- NIRF Medical category ranks (Ministry of Education India Rankings).

ALTER TABLE app.colleges
  ADD COLUMN IF NOT EXISTS nirf_institution_id TEXT,
  ADD COLUMN IF NOT EXISTS nirf_medical_rank INTEGER,
  ADD COLUMN IF NOT EXISTS nirf_medical_score NUMERIC(5, 2),
  ADD COLUMN IF NOT EXISTS nirf_ranking_year INTEGER;

CREATE UNIQUE INDEX IF NOT EXISTS colleges_nirf_institution_id_key
  ON app.colleges (nirf_institution_id)
  WHERE nirf_institution_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS colleges_nirf_medical_rank_idx
  ON app.colleges (nirf_ranking_year, nirf_medical_rank)
  WHERE nirf_medical_rank IS NOT NULL;
