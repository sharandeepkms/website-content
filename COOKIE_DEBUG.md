# Cookie Debugging Guide

If you're experiencing authentication issues, follow these steps to debug:

## Step 1: Check if Cookie is Set

After logging in, check browser DevTools:

1. **Open DevTools** (F12)
2. Go to **Application** tab → **Cookies**
3. Look for `admin_session` cookie
4. Check:
   - **Name**: `admin_session`
   - **Value**: Should be a long base64 string
   - **Path**: Should be `/`
   - **Domain**: Your domain
   - **HttpOnly**: Should be checked
   - **Secure**: Should match your HTTPS setting

## Step 2: Check Network Requests

1. **Open DevTools** → **Network** tab
2. **Login** with password
3. Check the **POST** request to `/api/admin/auth`:
   - **Status**: Should be 200
   - **Response Headers**: Look for `Set-Cookie: admin_session=...`
   - **Response**: Should have `{"success": true}`

4. Check the **GET** request to `/api/admin/auth`:
   - **Request Headers**: Look for `Cookie: admin_session=...`
   - **Status**: Should be 200 (not 401)

## Step 3: Manual Cookie Test

Open browser console and run:

```javascript
// Check if cookie exists
document.cookie

// Should show: admin_session=...
```

## Step 4: Common Issues

### Issue 1: Cookie Not Set
**Symptom**: No `admin_session` cookie in Application tab

**Solution**:
- Check if login response has `Set-Cookie` header
- Check browser console for errors
- Try clearing all cookies and logging in again

### Issue 2: Cookie Not Sent
**Symptom**: Cookie exists but not in request headers

**Solution**:
- Check cookie **Path** is `/` (not `/palc-staging`)
- Check cookie **Domain** matches your domain
- Ensure `credentials: 'include'` is in fetch requests

### Issue 3: Cookie Expired Immediately
**Symptom**: Cookie exists but auth check fails

**Solution**:
- Check `ADMIN_SESSION_SECRET` matches in `.env`
- Restart PM2 after changing environment variables
- Check server time is correct

## Step 5: Server-Side Debug

SSH into server and check:

```bash
# Check if ADMIN_PASSWORD is loaded
pm2 show palc-staging | grep ADMIN_PASSWORD

# Check logs for auth errors
pm2 logs palc-staging --lines 50 | grep -i auth

# Test cookie reading (if you have access to server logs)
# Check if cookies are being read correctly
```

## Quick Fixes

1. **Clear all cookies** for your domain
2. **Restart PM2**: `pm2 restart palc-staging`
3. **Use incognito/private mode** to test fresh
4. **Check .env file** has correct `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`

## Still Not Working?

If cookies still don't work, we can switch to:
- LocalStorage (less secure but works)
- Session-based auth with database
- JWT tokens in Authorization header

Let me know what you find in the debugging steps!

