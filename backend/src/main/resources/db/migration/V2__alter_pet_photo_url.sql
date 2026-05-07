-- Change pet_photos.url to TEXT to allow storing data URLs and long image URLs
ALTER TABLE pet_photos ALTER COLUMN url TYPE TEXT;
