-- Enable real-time on all tables
ALTER PUBLICATION supabase_realtime ADD TABLE users;
ALTER PUBLICATION supabase_realtime ADD TABLE warnings;
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE offers;

-- Update RLS policies to allow real-time subscriptions
DROP POLICY IF EXISTS "Users can view all users" ON users;
CREATE POLICY "Users can view all users" ON users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own data" ON users;
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Anyone can insert users" ON users;
CREATE POLICY "Anyone can insert users" ON users FOR INSERT WITH CHECK (true);

-- Warnings policies
DROP POLICY IF EXISTS "Users can view own warnings" ON warnings;
CREATE POLICY "Users can view own warnings" ON warnings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert warnings" ON warnings;
CREATE POLICY "Anyone can insert warnings" ON warnings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update own warnings" ON warnings;
CREATE POLICY "Users can update own warnings" ON warnings FOR UPDATE USING (true);

-- Notifications policies
DROP POLICY IF EXISTS "Anyone can view notifications" ON notifications;
CREATE POLICY "Anyone can view notifications" ON notifications FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert notifications" ON notifications;
CREATE POLICY "Anyone can insert notifications" ON notifications FOR INSERT WITH CHECK (true);

-- Offers policies
DROP POLICY IF EXISTS "Anyone can view offers" ON offers;
CREATE POLICY "Anyone can view offers" ON offers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can insert offers" ON offers;
CREATE POLICY "Anyone can insert offers" ON offers FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can delete offers" ON offers;
CREATE POLICY "Anyone can delete offers" ON offers FOR DELETE USING (true);
