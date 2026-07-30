-- Forge Web Studio — project questionnaire submissions
-- Run this in the Supabase SQL editor (or via the Supabase CLI) once, before
-- going live. The server action inserts here with the service-role key, and
-- the admin dashboard reads from it.

create table if not exists public.submissions (
  id           uuid primary key,
  reference    text not null unique,
  status       text not null default 'new'
               check (status in ('new', 'reviewing', 'accepted', 'rejected')),
  submitted_at timestamptz not null default now(),
  payload      jsonb not null,
  created_at   timestamptz not null default now()
);

-- Admin dashboard orders by newest first.
create index if not exists submissions_submitted_at_idx
  on public.submissions (submitted_at desc);

-- Fast lookups when updating status by reference.
create index if not exists submissions_reference_idx
  on public.submissions (reference);

-- Row Level Security: lock the table down. The server uses the service-role
-- key, which bypasses RLS, so no anon/public policies are granted. This
-- prevents any client-side (anon key) access to submission data.
alter table public.submissions enable row level security;
