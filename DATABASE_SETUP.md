# Database Setup Guide - MySQL Configuration

This guide will help you set up MySQL database connection for the Transporters for Tinubu 2027 application.

## Prerequisites

- MySQL Server installed and running (version 5.7 or higher)
- Node.js and npm installed
- Prisma CLI installed (`npm install -g prisma`)

## Step 1: Create MySQL Database

### Option A: Using MySQL Command Line

```bash
# Connect to MySQL
mysql -u root -p

# Create database
CREATE DATABASE transporters_tinubu;

# Create a dedicated user (recommended for production)
CREATE USER 'tinubu_user'@'localhost' IDENTIFIED BY 'secure_password_here';

# Grant privileges
GRANT ALL PRIVILEGES ON transporters_tinubu.* TO 'tinubu_user'@'localhost';
FLUSH PRIVILEGES;

# Exit MySQL
EXIT;
```

### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Create a new schema named `transporters_tinubu`
3. Create a new user with appropriate privileges

## Step 2: Configure Environment Variables

The `.env` file has been created with the following structure:

```env
DATABASE_URL="mysql://root:password@localhost:3306/transporters_tinubu"
```

### Update the DATABASE_URL with your credentials:

- **username**: MySQL username (default: `root`)
- **password**: MySQL password
- **host**: MySQL server address (default: `localhost`)
- **port**: MySQL port (default: `3306`)
- **database**: Database name (`transporters_tinubu`)

### Example configurations:

**Local Development (default root user):**
```env
DATABASE_URL="mysql://root:@localhost:3306/transporters_tinubu"
```

**With dedicated user:**
```env
DATABASE_URL="mysql://tinubu_user:secure_password_here@localhost:3306/transporters_tinubu"
```

**Remote MySQL Server:**
```env
DATABASE_URL="mysql://username:password@remote-host.com:3306/transporters_tinubu"
```

## Step 3: Generate Prisma Client

```bash
npm run db:generate
```

This generates the Prisma client based on your schema.

## Step 4: Push Schema to Database

```bash
npm run db:push
```

This command:
- Creates all tables defined in `prisma/schema.prisma`
- Sets up relationships and constraints
- Creates indexes

## Step 5: Seed Initial Data (Optional)

Create an admin user by running:

```bash
node seed-admin.js
```

Or use the create-admin script:

```bash
npx tsx scripts/create-admin.ts
```

## Step 6: Verify Connection

Start the development server:

```bash
npm run dev
```

Check the console for:
- ✅ "Ready on http://127.0.0.1:3000"
- ✅ Database connection logs

## Database Schema Overview

The application uses the following tables:

### users
- Stores admin user credentials
- Fields: id, email, name, password, role, createdAt, updatedAt

### posts
- Blog articles and content
- Fields: id, title, slug, content, excerpt, featuredImage, published, authorId, category, tags, createdAt, updatedAt

### pages
- Static and dynamic pages
- Fields: id, title, slug, content, metaTitle, metaDescription, featuredImage, published, pageType, template, authorId, createdAt, updatedAt

### events
- Campaign events
- Fields: id, title, description, date, location, imageUrl, published, createdAt, updatedAt

### team_members
- Team member profiles
- Fields: id, name, title, bio, imageUrl, email, phone, order, published, createdAt, updatedAt

### settings
- Site configuration
- Fields: id, key, value, type, description, createdAt, updatedAt

### media
- File uploads metadata
- Fields: id, filename, originalName, mimeType, size, path, url, alt, caption, createdAt, updatedAt

## Common Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Reset database (WARNING: deletes all data)
npm run db:reset

# Open Prisma Studio (GUI for database)
npx prisma studio
```

## Troubleshooting

### Connection Refused Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution**: Ensure MySQL server is running
```bash
# Windows
net start MySQL80

# macOS
brew services start mysql

# Linux
sudo systemctl start mysql
```

### Access Denied Error
```
Error: Access denied for user 'root'@'localhost'
```
**Solution**: Check your DATABASE_URL credentials in `.env`

### Database Does Not Exist
```
Error: Unknown database 'transporters_tinubu'
```
**Solution**: Create the database using the commands in Step 1

### Prisma Client Not Generated
```
Error: Cannot find module '.prisma/client'
```
**Solution**: Run `npm run db:generate`

## Production Deployment

For production environments:

1. **Use environment-specific .env files:**
   ```bash
   .env.production
   .env.staging
   ```

2. **Generate a secure NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

3. **Use a managed database service:**
   - AWS RDS
   - Google Cloud SQL
   - Azure Database for MySQL
   - DigitalOcean Managed Databases

4. **Update DATABASE_URL:**
   ```env
   DATABASE_URL="mysql://user:password@prod-host.com:3306/transporters_tinubu"
   ```

5. **Run migrations:**
   ```bash
   npm run db:migrate -- --skip-generate
   ```

## Security Best Practices

1. ✅ Never commit `.env` file to version control
2. ✅ Use strong passwords for database users
3. ✅ Restrict database user privileges to specific database
4. ✅ Use SSL/TLS for remote database connections
5. ✅ Enable database backups
6. ✅ Use environment-specific credentials
7. ✅ Rotate secrets regularly

## Backup and Recovery

### Backup Database
```bash
mysqldump -u root -p transporters_tinubu > backup.sql
```

### Restore Database
```bash
mysql -u root -p transporters_tinubu < backup.sql
```

## Next Steps

1. ✅ Configure `.env` with your MySQL credentials
2. ✅ Run `npm run db:push` to create tables
3. ✅ Create admin user with `node seed-admin.js`
4. ✅ Start development server with `npm run dev`
5. ✅ Access admin dashboard at `http://localhost:3000/admin`

For more information, visit:
- [Prisma Documentation](https://www.prisma.io/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
