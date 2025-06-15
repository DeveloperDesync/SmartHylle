-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  full_name TEXT,
  banned BOOLEAN DEFAULT FALSE,
  favorites TEXT[] DEFAULT '{}',
  barcode TEXT,
  items_saved INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create warnings table
CREATE TABLE IF NOT EXISTS warnings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  type TEXT DEFAULT 'warning' CHECK (type IN ('warning', 'items_update')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create offers table
CREATE TABLE IF NOT EXISTS offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  discount INTEGER NOT NULL,
  expiry_date DATE NOT NULL,
  description TEXT NOT NULL,
  ai_suggested BOOLEAN DEFAULT FALSE,
  approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  discount INTEGER NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE warnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read all users" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);
CREATE POLICY "Admins can update any user" ON users FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND role = 'admin'
  )
);
CREATE POLICY "Anyone can insert users" ON users FOR INSERT WITH CHECK (true);

-- Create policies for warnings table
CREATE POLICY "Users can read their own warnings" ON warnings FOR SELECT USING (
  user_id::text = auth.uid()::text OR
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND role = 'admin'
  )
);
CREATE POLICY "Admins can insert warnings" ON warnings FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND role = 'admin'
  )
);
CREATE POLICY "Users can update their own warnings" ON warnings FOR UPDATE USING (user_id::text = auth.uid()::text);

-- Create policies for offers and notifications
CREATE POLICY "Anyone can read offers" ON offers FOR SELECT USING (true);
CREATE POLICY "Admins can manage offers" ON offers FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND role = 'admin'
  )
);

CREATE POLICY "Anyone can read notifications" ON notifications FOR SELECT USING (true);
CREATE POLICY "Admins can manage notifications" ON notifications FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id::text = auth.uid()::text 
    AND role = 'admin'
  )
);

-- Insert initial data
INSERT INTO users (username, password, role, full_name, items_saved, barcode) VALUES
('bruker1', 'pass1', 'user', 'Test Bruker 1', 15, 'SHBRU123456'),
('bruker2', 'pass2', 'user', 'Test Bruker 2', 8, 'SHBRU234567'),
('bruker3', 'pass3', 'user', 'Test Bruker 3', 23, 'SHBRU345678'),
('bruker4', 'pass4', 'user', 'Test Bruker 4', 12, 'SHBRU456789'),
('bruker5', 'pass5', 'user', 'Test Bruker 5', 31, 'SHBRU567890'),
('admin1', 'adminpass1', 'admin', 'Admin 1', 0, 'SHADM123456'),
('admin2', 'adminpass2', 'admin', 'Admin 2', 0, 'SHADM234567')
ON CONFLICT (username) DO NOTHING;

INSERT INTO offers (product_name, discount, expiry_date, description) VALUES
('Økologisk melk', 30, CURRENT_DATE + INTERVAL '2 days', 'Fersk økologisk melk som utløper snart'),
('Fersk laks', 40, CURRENT_DATE + INTERVAL '1 day', 'Høykvalitets laks, perfekt for middag'),
('Italiensk pasta', 25, CURRENT_DATE + INTERVAL '5 days', 'Autentisk italiensk pasta på tilbud')
ON CONFLICT DO NOTHING;

INSERT INTO notifications (product_name, discount, description) VALUES
('Økologisk melk', 30, 'Ny rabatt tilgjengelig på økologisk melk!'),
('Fersk laks', 40, 'Stor rabatt på fersk laks - ikke gå glipp av dette!')
ON CONFLICT DO NOTHING;
