import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, GitBranch, Zap, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Rocket className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-slate-900">Shiply</span>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Effortless frontend deployments from Git</h1>
          <p className="text-xl text-slate-600 mb-4">A lightweight Vercel alternative</p>
          <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto">
            Deploy your frontend projects instantly from any Git repository. Simple, fast, and reliable hosting for
            modern web applications.
          </p>

          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 py-6">
              <Rocket className="mr-2 h-5 w-5" />
              Go to Dashboard
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <GitBranch className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Git Integration</h3>
              <p className="text-slate-600">
                Connect any Git repository and deploy with a single click. Automatic deployments on every push.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-slate-600">
                Optimized build process and global CDN ensure your sites load instantly for users worldwide.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
              <p className="text-slate-600">
                Built-in SSL certificates, DDoS protection, and 99.9% uptime guarantee for your applications.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
