# CloudRest Environment Variables

Copy this file to `.env.local` and fill in your actual values.

## Sanity Configuration
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-12-11
```

## Email Configuration (Nodemailer)
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=CloudRest <noreply@cloudrest.com>
EMAIL_TO=admin@cloudrest.com
```

### Gmail Setup Instructions
1. Enable 2FA on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in EMAIL_PASSWORD field
