name: Vercel Deploy Backend
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
  HUSKY: 'disable'
on:
  push: 
    branches: 
      - develop
  # pull_request:
  #   branches:
  #     - develop
  #   types: [closed]
    paths:
      - "apps/server/**"
      - ".github/workflows/deploy_backend.yml"

jobs:
  deploy_production:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Vercel CLI
      
        run: npm install --global vercel@latest
      - name: Install npm dependencies
        run: npm i

      - name: Install NestJS CLI
        run: npm install -g @nestjs/cli

      - name: Build NestJS Project
        run: | 
          cd apps/server
          npm run build

      - name: Pull Vercel Environment Information
        run: |
          cd apps/server
          vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Build Project Artifacts
        run: |
          cd apps/server
          vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Deploy Project Artifacts to Vercel
        run: |
          cd apps/server
          vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}