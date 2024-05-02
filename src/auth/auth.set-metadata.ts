import { SetMetadata } from "@nestjs/common";

/**
 * Key for the metadata that we will set on routes that are public.
 */
export const IS_PUBLIC_KEY = "isPublic";

/**
 * Key for the metadata that we will set on routes that are only accessible to admins.
 * This is not used in this example, but it is here to show how you can use multiple metadata keys.
 * You can also just use the same key for both public and admin routes if you want to keep it simple.
 * If you want to use multiple keys, you will need to update the JwtAuthGuard to check for both keys.
 * You can see an example of this in the NestJS documentation here:
 * https://docs.nestjs.com/guards#role-based-authentication
 */
export const IS_ADMIN_KEY = "isAdmin";

/**
 * This is a custom decorator that we will use to mark routes as public.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/**
 * This is a custom decorator that we will use to mark routes as admin only.
 */

export const Admin = () => SetMetadata(IS_ADMIN_KEY, true);