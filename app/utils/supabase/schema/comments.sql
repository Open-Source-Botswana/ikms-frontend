-- 01/08/2026 initial comments table for folklore
create table public.folklore_comments (
  id uuid primary key default gen_random_uuid(),
  item_id UUID  REFERENCES public.language_riddles_items(id) ON DELETE CASCADE,
  parent_id uuid references public.folklore_comments(id) on delete cascade,
  user_id uuid references auth.users(id),
  content text not null,
  is_deleted boolean default false,
  is_moderated boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.folklore_comment_votes (
  id uuid primary key default gen_random_uuid(),
  comment_id uuid references folklore_comments(id) on delete cascade,
  user_id uuid not null,
  vote smallint check (vote in (-1, 1)),
  created_at timestamptz default now(),
  unique (comment_id, user_id)
);


create table comment_moderation (
  id uuid primary key default gen_random_uuid(),
  comment_id uuid references comments(id),
  admin_id uuid not null,
  feedback text,
  tags text[] not null,
  created_at timestamptz default now()
);

-- Performance indexes
create index idx_comments_item_id on public.folklore_comments(item_id);
create index idx_comments_parent_id on public.folklore_comments(parent_id);
create index idx_comments_created_at on public.folklore_comments(created_at);
create index idx_comments_user_id on public.folklore_comments(user_id);
create index idx_comments_is_deleted on public.folklore_comments(is_deleted);
create index idx_comments_is_moderated on folklore_comments(is_moderated);

-- Threading & feeds
create index idx_comments_item_id
  on public.comments(item_id);

create index idx_comments_parent_id
  on public.comments(parent_id);

-- Visibility filters
create index idx_comments_is_deleted
  on public.comments(is_deleted);

create index idx_comments_is_moderated
  on public.comments(is_moderated);

-- Sorting
create index idx_comments_created_at
  on public.comments(created_at);

-- Votes
create index idx_votes_comment_id
  on public.comment_votes(comment_id);

create index idx_votes_user_id
  on public.comment_votes(user_id);

create unique index idx_votes_unique
  on public.comment_votes(comment_id, user_id);


-- Core composite index for feeds & threads
create index idx_comments_item_parent_moderated
on public.folklore_comments(item_id, parent_id, is_moderated);

-- Supporting indexes
create index idx_comments_created_at on public.folklore_comments(created_at);
create index idx_comments_user_id on public.folklore_comments(user_id);

-- Trigger to update updated_at on row modification
create function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
    end;
$$ language 'plpgsql';
create trigger trg_update_comments_updated_at
before update on public.comments
for each row
execute procedure update_updated_at_column();
;
-- Enable Row Level Security
alter table public.comments enable row level security;
-- Policies
create policy "Allow logged-in users to insert comments"
on public.comments
for insert
to authenticated
using (auth.uid() is not null);
create policy "Allow users to select comments"
    on public.comments
    for select
    to public
    using (is_deleted = false);
create policy "Allow comment owners to update their comments"
    on public.comments
    for update
    to authenticated
    using (user_id = auth.uid());
create policy "Allow comment owners to delete their comments"
    on public.comments
    for delete
    to authenticated
    using (user_id = auth.uid());
create policy "Allow comment owners to view their deleted comments"
    on public.comments
    for select
    to authenticated
    using (user_id = auth.uid());
create policy "Allow comment owners to update their deleted comments"
    on public.comments
    for update
    to authenticated
    using (user_id = auth.uid());
create policy "Allow comment owners to delete their deleted comments"
    on public.comments
    for delete
    to authenticated
    using (user_id = auth.uid());
-- Grant select to anon for public viewing
grant select on public.comments to anonymous;
grant insert on public.comments to anonymous;
grant update on public.comments to anonymous;
grant delete on public.comments to anonymous;
grant select on public.comments to authenticated;
grant insert on public.comments to authenticated;
grant update on public.comments to authenticated;
grant delete on public.comments to authenticated;
grant select on public.comments to service_role;
grant insert on public.comments to service_role;
grant update on public.comments to service_role;
grant delete on public.comments to service_role;
grant usage, select on all sequences in public to anonymous;
grant usage, select on all sequences in public to authenticated;
grant usage, select on all sequences in public to service_role;

-- End of comments table schema

-- Test Scripts --
insert into public.folklore_comments (item_id, user_id, content)
values (
  '7e4c378a-2744-46ee-aff6-628b8579a4dd',
  '58f9164b-1985-4699-904a-21ab2c9aa556',
  'This riddle is clever and funny!'
);

-- Voting --
insert into public.folklore_comment_votes (comment_id, user_id, vote)
values (
  'd3b68d52-aeb3-480c-803a-7e336310b0e7',
  '58f9164b-1985-4699-904a-21ab2c9aa556',
  1
)
on conflict (comment_id, user_id)
do update set vote = 1;

insert into public.folklore_comment_votes (comment_id, user_id, vote)
values (
  'd3b68d52-aeb3-480c-803a-7e336310b0e7',
  '62d571c5-4b25-4ec3-883e-1f5636542de6',
  1
)
on conflict (comment_id, user_id)
do update set vote = 1;

insert into public.folklore_comment_votes (comment_id, user_id, vote)
values (
  'd3b68d52-aeb3-480c-803a-7e336310b0e7',
  '58f9164b-1985-4699-904a-21ab2c9aa556',
  1
)
on conflict (comment_id, user_id)
do update set vote = -1;

-- Post a reply --
insert into public.folklore_comments (item_id, parent_id, user_id, content)
values (
    '7e4c378a-2744-46ee-aff6-628b8579a4dd',
    'd3b68d52-aeb3-480c-803a-7e336310b0e7',
    '62d571c5-4b25-4ec3-883e-1f5636542de6',
    'I totally agree with you!'
    );


-- Moderation --
insert into public.comment_moderation (comment_id, admin_id, feedback, tags)
values (
    'd3b68d52-aeb3-480c-803a-7e336310b0e7',
    'admin-uuid-here',
    'Inappropriate language used.',
    array['inappropriate', 'offensive']
    );

-- Fetch comments for an item with vote counts and reply counts
select
  c.*,
  coalesce(SUM(cv.vote), 0) as vote_score,
  COUNT(r.id) as reply_count
from public.folklore_comments c
left join public.folklore_comment_votes cv on c.id = cv.comment_id
left join public.folklore_comments r on r.parent_id = c.id
where c.item_id = '7e4c378a-2744-46ee-aff6-628b8579a4dd'
  and c.is_deleted = false
    and c.is_moderated = false
group by c.id
order by c.created_at desc
limit 10
offset 0;
-- Fetch replies for a specific comment
select
  c.*,
  coalesce(SUM(cv.vote), 0) as vote_score
from public.folklore_comments c
left join public.folklore_comment_votes cv on c.id = cv.comment_id
where c.parent_id = 'd3b68d52-aeb3-480c-803a-7e336310b0e7'
  and c.is_deleted = false
    and c.is_moderated = false
group by c.id
order by c.created_at asc;
-- Fetch a single comment with its vote score
select
  c.*,
  coalesce(SUM(cv.vote), 0) as vote_score
from public.folklore_comments c
left join public.folklore_comment_votes cv on c.id = cv.comment_id
where c.id = 'd3b68d52-aeb3-480c-803a-7e336310b0e7'
  and c.is_deleted = false
    and c.is_moderated = false
group by c.id;
-- End of test scripts --
