-- create type language_item_type as enum (
--   'riddle',
--   'idiom',
--   'proverb'
-- );

-- DROP TYPE IF EXISTS language_item_difficulty_enum;

-- CREATE TYPE new_difficulty_enum AS ENUM ('easy','medium','hard','very_hard');

-- create type language_item_difficulty_enum as enum ('1', '2', '3', '4', '5');

-- create table public.language_items (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   type JSONB NOT NULL CHECK ((type->>'type')::language_item_type IS NOT NULL),
--   difficulty JSONB NOT NULL CHECK ((difficulty->>'difficulty')::language_item_difficulty_enum IS NOT NULL),

--   category TEXT NOT NULL,
--   language TEXT NOT NULL,

--   question TEXT,
--   answer TEXT,
--   options JSONB,     -- array of strings
--   hints JSONB,       -- object (deleteLetters, revealLetter, etc.)
--   context TEXT,
--   tags JSONB,        -- array of strings

--   version INT NOT NULL DEFAULT 1,

--   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

-- -- 4. Trigger to auto-update updated_at
-- CREATE FUNCTION update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = NOW();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER trigger_update_updated_at
-- BEFORE UPDATE ON public.language_items
-- FOR EACH ROW
-- EXECUTE PROCEDURE update_updated_at_column();

-- INSERT INTO public.language_items (
--   type,
--   difficulty,
--   category,
--   language,
--   question,
--   answer,
--   options,
--   hints,
--   tags
-- ) VALUES (
--   '{"type": "riddle"}'::jsonb,
--   '{"difficulty": 3}'::jsonb,
--   'logic',
--   'en',
--   'What has keys but cannot open locks?',
--   'piano',
--   '["piano", "map", "keyboard"]'::jsonb,
--   '{"deleteLetters": 2, "solveCost": 5}'::jsonb,
--   '["music", "brain-teaser"]'::jsonb
-- );
-- ALTER TABLE public.language_items ALTER COLUMN difficulty TYPE new_difficulty_enum USING difficulty::text::new_difficulty_enum;
-- ALTER TABLE public.language_items ALTER COLUMN difficulty TYPE new_difficulty_enum USING CAST(CAST(difficulty AS text) AS new_difficulty_enum)
-- SELECT DISTINCT (difficulty ->> 'difficulty') AS val FROM public.language_items;

-- UPDATE public.language_items SET difficulty = jsonb_build_object('difficulty', '3') WHERE (difficulty ->> 'difficulty') = '3';
-- ALTER TABLE public.language_items ALTER COLUMN difficulty TYPE language_item_difficulty_enum USING ((difficulty ->> 'difficulty')::text)::language_item_difficulty_enum;

-- create table public.language_riddles_items (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   category TEXT NOT NULL,
--   language TEXT NOT NULL,
--   question TEXT,
--   answer TEXT,
--   context TEXT,
--   usage TEXT,
--   tags JSONB,
--   version INT NOT NULL DEFAULT 1,
--   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--   updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
-- );

-- CREATE FUNCTION riddles_update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = NOW();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;


-- CREATE TRIGGER trigger_riddles_update_updated_at
-- BEFORE UPDATE ON public.language_riddles_items
-- FOR EACH ROW
-- EXECUTE PROCEDURE riddles_update_updated_at_column();

-- INSERT INTO public.language_riddles_items (
--   category, language, question, answer, context, usage, tags
-- ) VALUES
-- (
--   'logic',
--   'en',
--   'What has keys but cannot open locks?',
--   'piano',
--   'This riddle plays on the double meaning of "keys" - referring to piano keys rather than door keys.',
--   'Common brain teaser used in puzzle games and team-building activities.',
--   '["music", "brain-teaser", "wordplay"]'::jsonb
-- ),
-- (
--   'nature',
--   'en',
--   'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?',
--   'echo',
--   'This riddle describes the phenomenon of sound reflection.',
--   'Popular riddle used to teach children about sound waves and natural phenomena.',
--   '["nature", "sound", "physics"]'::jsonb
-- ),
-- (
--   'wordplay',
--   'en',
--   'What has a head and a tail but no body?',
--   'coin',
--   'This riddle uses the literal parts of a coin (heads and tails sides).',
--   'Common riddle used in games and educational settings to teach about currency and word meanings.',
--   '["money", "wordplay", "everyday"]'::jsonb
-- );

7e4c378a-2744-46ee-aff6-628b8579a4dd

SELECT *
FROM language_riddles_items
WHERE id = '7e4c378a-2744-46ee-aff6-628b8579a4dd'::uuid
LIMIT 100;

UPDATE language_riddles_items
SET tags = '["music","brain-teaser","wordplay","testing"]'::jsonb
WHERE id = '7e4c378a-2744-46ee-aff6-628b8579a4dd'::uuid;




-- create type language_item_difficulty_enum as enum ('1', '2', '3', '4', '5');
drop table public.folklore_feedback
create type feedback_category_enum   as enum ('meaning', 'translation', 'options', 'context', 'lexical')

create table public.folklore_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid() ,
  itemId UUID  REFERENCES public.language_riddles_items(id) ON DELETE CASCADE,
  category JSONB NOT NULL CHECK ((category->>'category')::language_item_type IS NOT NULL),
  feedBackType JSONB NOT NULL CHECK ((feedBackType->>'feedBackType')::feedback_category_enum  IS NOT NULL),
  message TEXT NOT NULL,
  userEmail TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);


INSERT INTO public.folklore_feedback (
  itemId,
  category,
  feedBackType,
  message,
  userEmail
) VALUES (
  '7e4c378a-2744-46ee-aff6-628b8579a4dd',
  '{"category": "riddle"}'::jsonb,
  '{"feedBackType": "meaning"}'::jsonb,
  'I think the meaning can be clarified a bit more.',
  'user@example.com'
);


create type feedback_status_enum  as enum ('pending', 'approved', 'rejected')


select * from public.folklore_feedback limit 5
-- SELECT
--   id,
--   itemId,
--   category,
--   feedBackType,
--   message,
--   userEmail,
--   created_at
-- FROM folklore_feedback
-- WHERE itemId = '7e4c378a-2744-46ee-aff6-628b8579a4dd'::uuid
-- ORDER BY created_at DESC;

ALTER TABLE public.folklore_feedback DROP COLUMN status;
ALTER TABLE public.folklore_feedback
ADD COLUMN status_enum feedback_status_enum NOT NULL DEFAULT 'pending';

ALTER TABLE public.folklore_feedback
ADD COLUMN parent_id UUID REFERENCES public.folklore_feedback(id) ON DELETE CASCADE;

SELECT
  f.*,
  COUNT(r.id) as reply_count
FROM folklore_feedback f
LEFT JOIN folklore_feedback r ON r.parent_id = f.id
WHERE f.itemId = '7e4c378a-2744-46ee-aff6-628b8579a4dd'::uuid
  AND f.parent_id IS NULL  -- Only top-level comments
GROUP BY f.id
ORDER BY f.created_at DESC
LIMIT 10;

UPDATE public.folklore_feedback
SET status = 'pending'
WHERE status IS NULL;

-- Create a function to get feedback with reply counts
CREATE OR REPLACE FUNCTION get_feedback_with_replies(
  item_id UUID,
  page_limit INTEGER DEFAULT 10,
  page_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  itemId UUID,
  category JSONB,
  feedBackType JSONB,
  message TEXT,
  userEmail TEXT,
  parent_id UUID,
  status feedback_status_enum,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  reply_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    f.id,
    f.itemId,
    f.category,
    f.feedBackType,
    f.message,
    f.userEmail,
    f.parent_id,
    f.status,
    f.created_at,
    f.updated_at,
    COUNT(r.id) as reply_count
  FROM folklore_feedback f
  LEFT JOIN folklore_feedback r ON r.parent_id = f.id AND r.status = 'approved'
  WHERE f.itemId = item_id
    AND f.parent_id IS NULL  -- Only top-level comments
    AND f.status = 'approved' -- Only show approved comments
  GROUP BY f.id, f.created_at
  ORDER BY f.created_at DESC
  LIMIT page_limit
  OFFSET page_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TABLE public.waiting_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  researchPurpose TEXT NOT NULL,

  username TEXT NOT NULL,
  organization TEXT,
  interests TEXT[] NOT NULL,

  useremail TEXT NOT NULL,
  usercontact TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


INSERT INTO public.waiting_list (
  researchPurpose,
  username,
  organization,
  interests,
  useremail,
  usercontact
) VALUES (
  'commercial',
  'user',
  'usertest', '{"AI"}','user@example.com',  '+267 2222222'
);

select * from public.waiting_list
-- to be implemented against language_items
  -- CONSTRAINT fk_feedback_item
  --   FOREIGN KEY (item_id)
  --   REFERENCES public.language_riddles_items(id)
  --   ON DELETE CASCADE


UPDATE public.folklore_feedback
SET status_enum = 'approved'
WHERE id = '4f94c18f-4ffd-4d5d-8fbe-fccd17ce2b4e'::uuid;

ALTER TABLE public.folklore_feedback
ADD COLUMN status_comment text DEFAULT null;

ALTER TABLE language_riddles_items
ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT FALSE;


-- ALTER TABLE "table_name"
-- RENAME COLUMN "old_column_name" TO "new_column_name";
