"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, GitBranch, Calendar } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { mockGetDeployments, type Deployment } from "@/lib/api"

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeployments = async () => {
      try {
        const data = await mockGetDeployments()
        setDeployments(data)
      } catch (error) {
        console.error("Failed to fetch deployments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDeployments()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "uploading":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Past Deployments</h1>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Past Deployments</h1>

          {deployments.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <GitBranch className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No deployments yet</h3>
                <p className="text-slate-500">Deploy your first project to see it here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {deployments.map((deployment) => (
                <Card key={deployment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <GitBranch className="h-4 w-4 text-slate-500" />
                          <span className="font-mono text-sm text-slate-600 truncate">{deployment.gitUrl}</span>
                          <Badge className={getStatusColor(deployment.status)}>{deployment.status}</Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(deployment.createdAt)}
                          </div>
                          {deployment.deployedUrl && (
                            <div className="flex items-center gap-1">
                              <span className="font-mono">{deployment.deployedUrl}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {deployment.deployedUrl && deployment.status === "deployed" && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={`https://${deployment.deployedUrl}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
