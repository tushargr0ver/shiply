"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ExternalLink, AlertCircle, CheckCircle2, Upload } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { mockUpload, mockGetStatus, type DeploymentStatus } from "@/lib/api"

export default function DashboardPage() {
  const [gitUrl, setGitUrl] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentId, setDeploymentId] = useState<string | null>(null)
  const [status, setStatus] = useState<DeploymentStatus | null>(null)
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null)
  const [showError, setShowError] = useState(false)
  const [uploadStartTime, setUploadStartTime] = useState<number | null>(null)

  const handleDeploy = async () => {
    if (!gitUrl.trim()) return

    setIsDeploying(true)
    setStatus(null)
    setDeployedUrl(null)
    setShowError(false)
    setUploadStartTime(Date.now())

    try {
      const result = await mockUpload(gitUrl)
      setDeploymentId(result.deploymentId)
      setStatus("uploading")
    } catch (error) {
      setIsDeploying(false)
      setShowError(true)
    }
  }

  // Poll status when deployment is active
  useEffect(() => {
    if (!deploymentId || !isDeploying) return

    const pollStatus = async () => {
      try {
        const result = await mockGetStatus(deploymentId)
        setStatus(result.status)

        if (result.status === "deployed") {
          setDeployedUrl(result.url!)
          setIsDeploying(false)
        } else if (result.status === "failed") {
          setIsDeploying(false)
          setShowError(true)
        }
      } catch (error) {
        setIsDeploying(false)
        setShowError(true)
      }
    }
    const interval = setInterval(pollStatus, 1000)
    return () => clearInterval(interval)
  }, [deploymentId, isDeploying])

  // Check for timeout
  useEffect(() => {
    if (status === "uploaded" && uploadStartTime) {
      const timeout = setTimeout(() => {
        if (status === "uploaded") {
          setShowError(true)
          setIsDeploying(false)
        }
      }, 30000)

      return () => clearTimeout(timeout)
    }
  }, [status, uploadStartTime])

  const getStatusIcon = () => {
    switch (status) {
      case "uploading":
        return <Loader2 className="h-4 w-4 animate-spin" />
      case "uploaded":
        return <Upload className="h-4 w-4" />
      case "deployed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "uploading":
        return "Uploading..."
      case "uploaded":
        return "Uploaded"
      case "deployed":
        return "Deployed!"
      default:
        return ""
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "uploading":
        return "bg-blue-100 text-blue-800"
      case "uploaded":
        return "bg-yellow-100 text-yellow-800"
      case "deployed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Deploy New Project</h1>

          <Card>
            <CardHeader>
              <CardTitle>Git Repository</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="https://github.com/username/repository"
                  value={gitUrl}
                  onChange={(e) => setGitUrl(e.target.value)}
                  disabled={isDeploying}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleDeploy()
                    }
                  }}
                />
              </div>

              <Button onClick={handleDeploy} disabled={!gitUrl.trim() || isDeploying}
              className="w-full">
                {isDeploying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  "Deploy"
                )}
              </Button>

              {status && (
                <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon()}
                    <Badge className={getStatusColor()}>{getStatusText()}</Badge>
                  </div>

                  {deployedUrl && (
                    <div className="mt-4">
                      <p className="text-sm text-slate-600 mb-2">Your site is live at:</p>
                      <div className="flex items-center gap-2 p-3 bg-white rounded border">
                        <span className="font-mono text-sm flex-1">{deployedUrl}</span>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`https://${deployedUrl}`} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {showError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Deployment failed. Please check your repository URL and try again.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
