module.exports = {
  apps: [
    {
      name: 'yaqeen',
      script: 'npx',
      args: 'next start -p 3000 -H 0.0.0.0',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        MONGODB_URI: 'mongodb+srv://mahmoudnageeb2709_db_user:Bia97bZP8crXnX5O@cluster0.cvjmeww.mongodb.net/yaqeen?retryWrites=true&w=majority&appName=Cluster0',
        JWT_SECRET: 'yaqeen-secret-key-2026',
        CLOUDINARY_CLOUD_NAME: 'djfn7fkp0',
        CLOUDINARY_API_KEY: '564481979951638',
        CLOUDINARY_API_SECRET: 'j0Z2K8D-I6lATbwvOOCEN1iAf8o',
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
