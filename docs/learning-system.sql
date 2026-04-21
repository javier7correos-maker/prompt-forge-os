-- ============================================================
-- PFOS — SISTEMA DE APRENDIZAJE COMPUESTO
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Activar pgvector (búsqueda semántica de errores similares)
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Tabla de patrones de error — el corazón del sistema
CREATE TABLE IF NOT EXISTS error_patterns (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  error_message text NOT NULL,
  error_context text,
  fix text NOT NULL,
  prevention_code text,
  project_type text,
  stack text DEFAULT 'nextjs-supabase',
  times_occurred integer DEFAULT 1,
  last_seen timestamp DEFAULT now(),
  embedding vector(1536),
  created_at timestamp DEFAULT now()
);

-- 3. Tabla de skills con versión y efectividad
CREATE TABLE IF NOT EXISTS skills (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  version integer DEFAULT 1,
  content text NOT NULL,
  effectiveness_score float DEFAULT 0.5,
  times_used integer DEFAULT 0,
  wins integer DEFAULT 0,
  project_types text[] DEFAULT '{}',
  updated_at timestamp DEFAULT now(),
  created_at timestamp DEFAULT now()
);

-- 4. Tabla de proyectos completados (memoria de sesiones)
CREATE TABLE IF NOT EXISTS project_memory (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  project_type text,
  errors_encountered jsonb DEFAULT '[]',
  fixes_applied jsonb DEFAULT '[]',
  quality_score float DEFAULT 0,
  lessons_learned text,
  session_data jsonb DEFAULT '{}',
  embedding vector(1536),
  created_at timestamp DEFAULT now()
);

-- 5. Índices HNSW para búsqueda semántica (5-20ms en 1M vectores)
CREATE INDEX IF NOT EXISTS error_patterns_embedding_idx
  ON error_patterns USING hnsw (embedding vector_cosine_ops);

CREATE INDEX IF NOT EXISTS project_memory_embedding_idx
  ON project_memory USING hnsw (embedding vector_cosine_ops);

-- 6. RLS
ALTER TABLE error_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_memory ENABLE ROW LEVEL SECURITY;

-- error_patterns: solo lectura para usuarios autenticados, escritura desde server
CREATE POLICY "Authenticated users can read error patterns"
  ON error_patterns FOR SELECT
  TO authenticated
  USING (true);

-- project_memory: cada usuario solo ve la suya
CREATE POLICY "Users see own project memory"
  ON project_memory FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own project memory"
  ON project_memory FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- skills: lectura pública para autenticados
CREATE POLICY "Authenticated users can read skills"
  ON skills FOR SELECT
  TO authenticated
  USING (true);

-- 7. Función de búsqueda semántica de errores similares
CREATE OR REPLACE FUNCTION search_similar_errors(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.75,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  error_message text,
  fix text,
  prevention_code text,
  project_type text,
  times_occurred integer,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ep.id,
    ep.error_message,
    ep.fix,
    ep.prevention_code,
    ep.project_type,
    ep.times_occurred,
    1 - (ep.embedding <=> query_embedding) AS similarity
  FROM error_patterns ep
  WHERE ep.embedding IS NOT NULL
    AND 1 - (ep.embedding <=> query_embedding) > match_threshold
  ORDER BY ep.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 8. Función para incrementar contador cuando se repite un error
CREATE OR REPLACE FUNCTION increment_error_occurrence(
  p_error_message text,
  p_fix text
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE error_patterns
  SET
    times_occurred = times_occurred + 1,
    last_seen = now()
  WHERE error_message = p_error_message;

  IF NOT FOUND THEN
    INSERT INTO error_patterns (error_message, fix)
    VALUES (p_error_message, p_fix);
  END IF;
END;
$$;
