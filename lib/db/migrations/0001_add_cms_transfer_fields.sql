-- Add CMS transfer tracking fields to appointments table
ALTER TABLE appointments 
ADD COLUMN transferred_to_cms BOOLEAN DEFAULT false,
ADD COLUMN transferred_at TIMESTAMP;

-- Add comment for documentation
COMMENT ON COLUMN appointments.transferred_to_cms IS 'Tracks if appointment has been manually transferred to CMS';
COMMENT ON COLUMN appointments.transferred_at IS 'Timestamp when appointment was transferred to CMS';


