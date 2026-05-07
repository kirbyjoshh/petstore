-- ============================================================
-- Seed data: 20 pets across all four categories (5 per category)
-- ============================================================

-- DOGS
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES
  ('Buddy','DOG','Golden Retriever',18,'Friendly and energetic Golden Retriever who loves to play fetch and cuddle with the family.',850.00,true),
  ('Max','DOG','German Shepherd',24,'Loyal and intelligent German Shepherd, excellent with families and great as a watch dog.',950.00,true),
  ('Charlie','DOG','Beagle',8,'Curious Beagle puppy with a great nose for adventure. Playful and good with children.',550.00,true),
  ('Rocky','DOG','French Bulldog',14,'Compact and charming French Bulldog. Very low maintenance and perfect for apartment living.',1200.00,true),
  ('Bella','DOG','Labrador Retriever',36,'Gentle Labrador Retriever, well trained and great with kids and other pets.',750.00,false);

-- CATS
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES
  ('Luna','CAT','Siamese',12,'Elegant Siamese with striking blue eyes. Very vocal and loves attention.',400.00,true),
  ('Mochi','CAT','Persian',6,'Fluffy Persian kitten with a calm temperament. Perfect indoor companion.',500.00,false),
  ('Nala','CAT','Maine Coon',10,'Majestic Maine Coon with a silky coat. Friendly, curious and dog-like in personality.',650.00,true),
  ('Oliver','CAT','British Shorthair',18,'Round-faced British Shorthair. Independent, calm and very easy to care for.',480.00,true),
  ('Cleo','CAT','Sphynx',9,'Hairless Sphynx cat — warm, affectionate and endlessly entertaining.',700.00,true);

-- BIRDS
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES
  ('Kiwi','BIRD','Budgerigar',3,'Cheerful budgie already starting to mimic words. Easy to tame and great for beginners.',80.00,true),
  ('Rio','BIRD','African Grey Parrot',14,'Highly intelligent African Grey with an impressive vocabulary. Requires daily interaction.',1200.00,true),
  ('Sunny','BIRD','Cockatiel',5,'Sweet Cockatiel with a yellow crest. Loves to whistle and sit on shoulders.',120.00,true),
  ('Pepper','BIRD','Lovebird',7,'Vibrant Lovebird pair. Playful, social and full of personality. Sold as a pair.',180.00,false),
  ('Echo','BIRD','Blue-and-Gold Macaw',30,'Stunning Macaw with brilliant plumage. Experienced owner required.',2500.00,true);

-- FISH
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES
  ('Nemo','FISH','Clownfish',2,'Vibrant Clownfish with classic orange and white markings. Great for reef tanks.',25.00,true),
  ('Ariel','FISH','Betta',1,'Stunning Betta with flowing iridescent fins. Keep in its own tank.',15.00,true),
  ('Bubbles','FISH','Goldfish',4,'Classic fancy Goldfish with twin tail. Very hardy and ideal for beginners.',10.00,true),
  ('Dory','FISH','Blue Tang',6,'Vivid Blue Tang — requires a large reef aquarium and experienced care.',95.00,true),
  ('Flash','FISH','Discus',8,'Show-quality Discus fish with brilliant red and blue pattern. For advanced hobbyists.',150.00,false);

-- PRIMARY PHOTOS (one per pet using placehold.co)
-- Note: pet_id references will be auto-generated as 1-20
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES
  (1,'https://placehold.co/400x300/f5a623/ffffff?text=Buddy',true,0),
  (2,'https://placehold.co/400x300/8b5e3c/ffffff?text=Max',true,0),
  (3,'https://placehold.co/400x300/c8a26b/ffffff?text=Charlie',true,0),
  (4,'https://placehold.co/400x300/aaaaaa/ffffff?text=Rocky',true,0),
  (5,'https://placehold.co/400x300/f5d08a/ffffff?text=Bella',true,0),
  (6,'https://placehold.co/400x300/87ceeb/ffffff?text=Luna',true,0),
  (7,'https://placehold.co/400x300/d4a0d4/ffffff?text=Mochi',true,0),
  (8,'https://placehold.co/400x300/8fbc8f/ffffff?text=Nala',true,0),
  (9,'https://placehold.co/400x300/708090/ffffff?text=Oliver',true,0),
  (10,'https://placehold.co/400x300/e8d5b7/333333?text=Cleo',true,0),
  (11,'https://placehold.co/400x300/98fb98/333333?text=Kiwi',true,0),
  (12,'https://placehold.co/400x300/808080/ffffff?text=Rio',true,0),
  (13,'https://placehold.co/400x300/ffeb99/333333?text=Sunny',true,0),
  (14,'https://placehold.co/400x300/ffb3ba/333333?text=Pepper',true,0),
  (15,'https://placehold.co/400x300/3d5a80/ffffff?text=Echo',true,0),
  (16,'https://placehold.co/400x300/ff9999/ffffff?text=Nemo',true,0),
  (17,'https://placehold.co/400x300/ff4444/ffffff?text=Ariel',true,0),
  (18,'https://placehold.co/400x300/ffcc00/333333?text=Bubbles',true,0),
  (19,'https://placehold.co/400x300/4dd0e1/ffffff?text=Dory',true,0),
  (20,'https://placehold.co/400x300/ff6699/ffffff?text=Flash',true,0);
  ('a0000003-0000-0000-0000-000000000003','https://placehold.co/400x300/ffd700/333333?text=Sunny',true,0),
  ('a0000003-0000-0000-0000-000000000004','https://placehold.co/400x300/ff6347/ffffff?text=Pepper',true,0),
  ('a0000003-0000-0000-0000-000000000005','https://placehold.co/400x300/4169e1/ffffff?text=Echo',true,0),
  ('a0000004-0000-0000-0000-000000000001','https://placehold.co/400x300/ff8c00/ffffff?text=Nemo',true,0),
  ('a0000004-0000-0000-0000-000000000002','https://placehold.co/400x300/dc143c/ffffff?text=Ariel',true,0),
  ('a0000004-0000-0000-0000-000000000003','https://placehold.co/400x300/ffd700/333333?text=Bubbles',true,0),
  ('a0000004-0000-0000-0000-000000000004','https://placehold.co/400x300/00bfff/ffffff?text=Dory',true,0),
  ('a0000004-0000-0000-0000-000000000005','https://placehold.co/400x300/ff4500/ffffff?text=Flash',true,0);
