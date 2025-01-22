import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kwvlzrmjmcnivcajycal.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3dmx6cm1qbWNuaXZjYWp5Y2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyOTgwODksImV4cCI6MjA1Mjg3NDA4OX0.OB1W5b8-j6eDZ3BlIMcWUesOHJbqfrfswrpwnlTxWBk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
