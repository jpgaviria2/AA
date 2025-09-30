-- Create membership_signups table to capture join form submissions
create extension if not exists "pgcrypto";

create table if not exists public.membership_signups (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null check (char_length(email) > 3),
  phone text,
  membership_plan text,
  trips_per_season integer default 0,
  interests text[] default array[]::text[],
  notes text,
  created_at timestamptz not null default now()
);

create unique index if not exists membership_signups_email_key
  on public.membership_signups (lower(email));

alter table public.membership_signups enable row level security;

-- Grant anon insert capability for the join form
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'membership_signups'
      and policyname = 'Allow anon inserts'
  ) then
    create policy "Allow anon inserts"
      on public.membership_signups
      for insert
      to anon
      with check (true);
  end if;
end $$;

-- Allow service role full access for admin tools
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'membership_signups'
      and policyname = 'Allow service_role all'
  ) then
    create policy "Allow service_role all"
      on public.membership_signups
      for all
      to service_role
      using (true)
      with check (true);
  end if;
end $$;

