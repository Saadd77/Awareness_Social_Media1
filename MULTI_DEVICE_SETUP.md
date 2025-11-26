# Multi-Device Setup Guide

## Overview

The Recommended-For-You Identity Engine now supports multi-device synchronization. One admin can control the algorithm, and multiple users on different devices can see the effects in real-time.

## Database Schema Setup

Run the following SQL in your Supabase SQL editor to create the required tables:

```sql
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_code text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  current_day integer DEFAULT 1
);

CREATE TABLE IF NOT EXISTS participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'user')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(session_id, user_id)
);

CREATE TABLE IF NOT EXISTS admin_directives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  nationalism_level integer DEFAULT 30 CHECK (nationalism_level >= 0 AND nationalism_level <= 100),
  censorship_level integer DEFAULT 20 CHECK (censorship_level >= 0 AND censorship_level <= 100),
  outrage_boost integer DEFAULT 25 CHECK (outrage_boost >= 0 AND outrage_boost <= 100),
  screen_time_boost integer DEFAULT 40 CHECK (screen_time_boost >= 0 AND screen_time_boost <= 100),
  pro_american_content boolean DEFAULT false,
  anti_foreign_platforms boolean DEFAULT false,
  strong_leader_content boolean DEFAULT false,
  influencer_obsession integer DEFAULT 35 CHECK (influencer_obsession >= 0 AND influencer_obsession <= 100),
  emotional_manipulation integer DEFAULT 30 CHECK (emotional_manipulation >= 0 AND emotional_manipulation <= 100),
  wealth_flexing boolean DEFAULT false,
  national_pride boolean DEFAULT false,
  short_clip_priority boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_states (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  radicalization integer DEFAULT 20 CHECK (radicalization >= 0 AND radicalization <= 100),
  nationalism integer DEFAULT 15 CHECK (nationalism >= 0 AND nationalism <= 100),
  consumerism integer DEFAULT 30 CHECK (consumerism >= 0 AND consumerism <= 100),
  anxiety integer DEFAULT 25 CHECK (anxiety >= 0 AND anxiety <= 100),
  screen_time_addiction integer DEFAULT 35 CHECK (screen_time_addiction >= 0 AND screen_time_addiction <= 100),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(session_id, user_id)
);

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_directives ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_states ENABLE ROW LEVEL SECURITY;

-- Sessions policies
CREATE POLICY "Users can read sessions they're in"
  ON sessions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM participants
      WHERE participants.session_id = sessions.id
      AND participants.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can create sessions"
  ON sessions FOR INSERT
  TO authenticated
  WITH CHECK (admin_id = auth.uid());

CREATE POLICY "Admins can update their sessions"
  ON sessions FOR UPDATE
  TO authenticated
  USING (admin_id = auth.uid())
  WITH CHECK (admin_id = auth.uid());

-- Participants policies
CREATE POLICY "Users can read their session participants"
  ON participants FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM participants p
      WHERE p.session_id = participants.session_id
      AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join sessions"
  ON participants FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Admin directives policies
CREATE POLICY "Users can read directives for their session"
  ON admin_directives FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM participants
      WHERE participants.session_id = admin_directives.session_id
      AND participants.user_id = auth.uid()
    )
  );

CREATE POLICY "Only admins can update directives"
  ON admin_directives FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM participants
      WHERE participants.session_id = admin_directives.session_id
      AND participants.user_id = auth.uid()
      AND participants.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM participants
      WHERE participants.session_id = admin_directives.session_id
      AND participants.user_id = auth.uid()
      AND participants.role = 'admin'
    )
  );

CREATE POLICY "Only admins can insert directives"
  ON admin_directives FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM participants
      WHERE participants.session_id = admin_directives.session_id
      AND participants.user_id = auth.uid()
      AND participants.role = 'admin'
    )
  );

-- User states policies
CREATE POLICY "Users can read their user state"
  ON user_states FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM participants p
      WHERE p.session_id = user_states.session_id
      AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own state"
  ON user_states FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can insert their state"
  ON user_states FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX idx_sessions_admin_id ON sessions(admin_id);
CREATE INDEX idx_participants_session_id ON participants(session_id);
CREATE INDEX idx_participants_user_id ON participants(user_id);
CREATE INDEX idx_admin_directives_session_id ON admin_directives(session_id);
CREATE INDEX idx_user_states_session_id ON user_states(session_id);
CREATE INDEX idx_user_states_user_id ON user_states(user_id);
```

## How It Works

### Admin Flow
1. Sign in or create an account
2. Select "Admin Mode" on the role selection screen
3. Generate a session code (6 characters)
4. Share the code with users
5. Adjust directives in the control room
6. Changes sync to all connected user devices in real-time

### User Flow
1. Sign in or create an account
2. Select "User Mode" on the role selection screen
3. Enter the session code provided by the admin
4. View the feed and watch your identity metrics change
5. Changes reflect instantly as the admin adjusts directives

## Real-Time Features

- **Instant Sync**: Uses Supabase's real-time subscriptions
- **Multi-Device**: Works across phones, tablets, and desktops
- **Session Management**: Each session is isolated with its own admin directives
- **RLS Security**: Users can only access their own sessions' data

## Architecture

### Key Components

- **AuthContext**: Handles user authentication and role selection
- **SimulationContext**: Manages admin state and real-time syncing with Supabase
- **LoginPage**: Email/password authentication
- **RoleSelectPage**: Choose admin or user role, manage session codes
- **UserFeed & AdminPanel**: Updated to show session info and user email

### Real-Time Updates

The app uses Supabase's `postgres_changes` subscription to listen for updates to `admin_directives`:

```typescript
supabase
  .channel(`directives:${sessionId}`)
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'admin_directives',
      filter: `session_id=eq.${sessionId}`,
    },
    (payload) => {
      // Update state with new directives
    }
  )
  .subscribe();
```

## Demo Mode

You can test the app without database setup:

1. Visit `/demo` to see the original single-device simulation
2. The main app (`/`) requires authentication but will work with mock data if the database isn't ready

## Troubleshooting

### Sessions Not Syncing
- Ensure the `admin_directives` table has proper RLS policies
- Check that Realtime is enabled in your Supabase project settings
- Verify the session code matches on both devices

### Auth Errors
- Confirm Supabase email/password auth is enabled
- Check that environment variables are set correctly

### Database Connection Issues
- Verify `.env` file contains `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Ensure the Supabase project is active
