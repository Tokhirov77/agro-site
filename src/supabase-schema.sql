-- =====================================================
-- СХЕМА БАЗЫ ДАННЫХ ДЛЯ САЙТА AGRIUS & VELES AGRO
-- =====================================================
-- Как использовать:
-- 1. Зайдите на supabase.com, создайте бесплатный проект
-- 2. Слева в меню откройте "SQL Editor"
-- 3. Вставьте сюда ВЕСЬ этот файл и нажмите "Run"
-- 4. Готово — таблицы, защита данных и триггеры созданы
-- =====================================================

-- Таблица профилей пользователей (имя, которое видно другим)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text not null,
  created_at timestamptz default now()
);

-- Таблица лайков (один пользователь = один лайк на товар)
create table if not exists likes (
  id bigint generated always as identity primary key,
  product_id integer not null,
  user_id uuid references auth.users on delete cascade not null,
  created_at timestamptz default now(),
  unique(product_id, user_id)
);

-- Таблица комментариев
create table if not exists comments (
  id bigint generated always as identity primary key,
  product_id integer not null,
  user_id uuid references auth.users on delete cascade not null,
  display_name text not null,
  text text not null,
  created_at timestamptz default now()
);

-- Индексы для быстрой выборки по товару
create index if not exists likes_product_idx on likes(product_id);
create index if not exists comments_product_idx on comments(product_id);

-- =====================================================
-- АВТОМАТИЧЕСКОЕ СОЗДАНИЕ ПРОФИЛЯ ПРИ РЕГИСТРАЦИИ
-- =====================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =====================================================
-- ЗАЩИТА ДАННЫХ (Row Level Security)
-- Кто угодно может ЧИТАТЬ лайки/комментарии/имена.
-- Писать может только залогиненный пользователь и только от своего имени.
-- =====================================================
alter table profiles enable row level security;
alter table likes enable row level security;
alter table comments enable row level security;

create policy "Профили видны всем" on profiles for select using (true);
create policy "Пользователь редактирует свой профиль" on profiles for update using (auth.uid() = id);

create policy "Лайки видны всем" on likes for select using (true);
create policy "Залогиненный может лайкать" on likes for insert with check (auth.uid() = user_id);
create policy "Пользователь убирает свой лайк" on likes for delete using (auth.uid() = user_id);

create policy "Комментарии видны всем" on comments for select using (true);
create policy "Залогиненный может комментировать" on comments for insert with check (auth.uid() = user_id);
create policy "Пользователь удаляет свой комментарий" on comments for delete using (auth.uid() = user_id);
