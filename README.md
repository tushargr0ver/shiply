# 🚀 Shiply

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=flat&logo=bun&logoColor=white)](https://bun.sh/)
[![Hono](https://img.shields.io/badge/Hono-000000?style=flat&logo=hono&logoColor=white)](https://hono.dev/)

A lightweight Vercel alternative for deploying frontend projects from Git repositories. Shiply provides a simple, fast, and reliable hosting solution for modern web applications.

## ✨ Features

- 🔄 **Git Integration**: Connect any Git repository and deploy with a single click
- ⚡ **Lightning Fast**: Optimized build process and global CDN
- 🔒 **Secure & Reliable**: Built-in SSL certificates and DDoS protection
- 🎯 **Simple Deployment**: Deploy your frontend projects instantly
- 📊 **Deployment History**: Track all your past deployments
- 🌐 **Custom Domains**: Deploy to your own domain

## 🏗️ Architecture

Shiply consists of four main components:

1. **Client** (`/client`): Next.js web application for the user interface
2. **Uploader** (`/uploader`): Service to handle Git repository cloning and file uploads
3. **Deployer** (`/deployer`): Service to build and deploy projects
4. **S3 Reverse Proxy** (`/s3-reverse-proxy`): Handles serving deployed applications

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend Services**: Bun, Hono, TypeScript
- **Infrastructure**: AWS S3, Redis
- **Authentication**: Clerk
- **Styling**: shadcn/ui, Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher) for client
- Bun (Latest version) for backend services
- AWS Account with S3 access
- Redis instance

### Client Setup

```bash
cd client
npm install --legacy-peer-deps  # Use this if regular npm install fails
npm run dev
```

### Uploader Setup

```bash
cd uploader
bun install
bun run dev
```

### Deployer Setup

```bash
cd deployer
bun install
bun run index.ts
```

### S3 Reverse Proxy Setup

```bash
cd s3-reverse-proxy
bun install
bun run dev
```

### Environment Variables

Create `.env` files in each component directory with the following variables:

#### Client

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard

NEXT_PUBLIC_API_URL=your_api_url
```

#### Uploader

```
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
```

#### Deployer

```
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

Tushar Grover - [@tushargr0ver](https://github.com/tushargr0ver)

Project Link: [https://github.com/tushargr0ver/shiply](https://github.com/tushargr0ver/shiply)
