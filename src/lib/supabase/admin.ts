import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getPublicEnv } from "@/lib/env";
import { getServerEnv } from "@/lib/server-env";

/**
 * Privileged client that bypasses Row Level Security.
 * Only for narrowly scoped server operations such as calling `place_order`.
 * Never import from client code or pass its results through unfiltered.
 */
export function createSupabaseAdminClient(): SupabaseClient {
  return createClient(
    getPublicEnv().NEXT_PUBLIC_SUPABASE_URL,
    getServerEnv().SUPABASE_SECRET_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  );
}
