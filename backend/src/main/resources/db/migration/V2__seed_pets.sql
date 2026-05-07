-- Seed pets and photos
BEGIN;

-- Insert 20 pets: 5 dogs, 5 cats, 5 birds, 5 fish
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Buddy', 'DOG', 'Golden Retriever', 18, 'Friendly and energetic Golden Retriever who loves to play fetch and cuddle with the family.', 850.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Max', 'DOG', 'German Shepherd', 24, 'Loyal and intelligent German Shepherd, excellent with families and great as a watch dog.', 950.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Charlie', 'DOG', 'Beagle', 8, 'Curious Beagle puppy with a great nose for adventure. Playful and good with children.', 550.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Rocky', 'DOG', 'French Bulldog', 14, 'Compact and charming French Bulldog. Very low maintenance and perfect for apartment living.', 1200.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Bella', 'DOG', 'Labrador Retriever', 36, 'Gentle Labrador Retriever, well trained and great with kids and other pets.', 750.00, false);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Luna', 'CAT', 'Siamese', 12, 'Elegant Siamese with striking blue eyes. Very vocal and loves attention.', 400.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Mochi', 'CAT', 'Persian', 6, 'Fluffy Persian kitten with a calm temperament. Perfect indoor companion.', 500.00, false);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Nala', 'CAT', 'Maine Coon', 10, 'Majestic Maine Coon with a silky coat. Friendly, curious and dog-like in personality.', 650.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Oliver', 'CAT', 'British Shorthair', 18, 'Round-faced British Shorthair. Independent, calm and very easy to care for.', 480.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Cleo', 'CAT', 'Sphynx', 9, 'Hairless Sphynx cat with warm, affectionate personality. Endlessly entertaining.', 700.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Kiwi', 'BIRD', 'Budgerigar', 3, 'Cheerful budgie already starting to mimic words. Easy to tame and great for beginners.', 80.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Rio', 'BIRD', 'African Grey Parrot', 14, 'Highly intelligent African Grey with an impressive vocabulary. Requires daily interaction.', 1200.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Sunny', 'BIRD', 'Cockatiel', 5, 'Sweet Cockatiel with a yellow crest. Loves to whistle and sit on shoulders.', 120.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Pepper', 'BIRD', 'Lovebird', 7, 'Vibrant Lovebird pair. Playful, social and full of personality. Sold as a pair.', 180.00, false);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Echo', 'BIRD', 'Blue-and-Gold Macaw', 30, 'Stunning Macaw with brilliant plumage. Experienced owner required.', 2500.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Nemo', 'FISH', 'Clownfish', 2, 'Vibrant Clownfish with classic orange and white markings. Great for reef tanks.', 25.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Ariel', 'FISH', 'Betta', 1, 'Stunning Betta with flowing iridescent fins. Keep in its own tank.', 15.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Bubbles', 'FISH', 'Goldfish', 4, 'Classic fancy Goldfish with twin tail. Very hardy and ideal for beginners.', 10.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Dory', 'FISH', 'Blue Tang', 6, 'Vivid Blue Tang requires a large reef aquarium and experienced care.', 95.00, true);
INSERT INTO pets (name, category, breed, age_months, description, price, available) VALUES ('Flash', 'FISH', 'Discus', 8, 'Show-quality Discus fish with brilliant red and blue pattern. For advanced hobbyists.', 150.00, false);

-- Insert photos for each pet (one per pet)
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (1, 'https://placehold.co/400x300/f5a623/ffffff?text=Buddy', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (2, 'https://placehold.co/400x300/8b5e3c/ffffff?text=Max', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (3, 'https://placehold.co/400x300/c8a26b/ffffff?text=Charlie', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (4, 'https://placehold.co/400x300/aaaaaa/ffffff?text=Rocky', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (5, 'https://placehold.co/400x300/f5d08a/ffffff?text=Bella', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (6, 'https://placehold.co/400x300/87ceeb/ffffff?text=Luna', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (7, 'https://placehold.co/400x300/d4a0d4/ffffff?text=Mochi', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (8, 'https://placehold.co/400x300/8fbc8f/ffffff?text=Nala', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (9, 'https://placehold.co/400x300/708090/ffffff?text=Oliver', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (10, 'https://placehold.co/400x300/e8d5b7/333333?text=Cleo', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (11, 'https://placehold.co/400x300/98fb98/333333?text=Kiwi', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (12, 'https://placehold.co/400x300/808080/ffffff?text=Rio', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (13, 'https://placehold.co/400x300/ffeb99/333333?text=Sunny', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (14, 'https://placehold.co/400x300/ffb3ba/333333?text=Pepper', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (15, 'https://placehold.co/400x300/3d5a80/ffffff?text=Echo', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (16, 'https://placehold.co/400x300/ff9999/ffffff?text=Nemo', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (17, 'https://placehold.co/400x300/ff4444/ffffff?text=Ariel', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (18, 'https://placehold.co/400x300/ffcc00/333333?text=Bubbles', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (19, 'https://placehold.co/400x300/4dd0e1/ffffff?text=Dory', true, 0);
INSERT INTO pet_photos (pet_id, url, is_primary, sort_order) VALUES (20, 'https://placehold.co/400x300/ff6699/ffffff?text=Flash', true, 0);

COMMIT;
