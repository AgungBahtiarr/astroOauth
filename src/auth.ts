import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { db, user, session } from "astro:db"
import { GitHub } from "arctic";

export const github = new GitHub(
    import.meta.env.GITHUB_CLIENT_ID,
    import.meta.env.GITHUB_CLIENT_SECRET
);

const adapter = new DrizzleSQLiteAdapter(db, session as any, user as any); // your adapter

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: import.meta.env.PROD
        }
    },
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            githubId: attributes.github_id,
            username: attributes.username
        };
    }
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    github_id: number;
    username: string;
}

