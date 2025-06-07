// Mock API functions for development

export type DeploymentStatus = "uploading" | "uploaded" | "deployed" | "failed"

export interface Deployment {
  id: string
  gitUrl: string
  status: DeploymentStatus
  deployedUrl?: string
  createdAt: string
}



// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))


export async function mockUpload(gitUrl: string): Promise<{ deploymentId: string }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ repoUrl: gitUrl }),
  });

  const data = await response.json();

  const deploymentId = data.id

  // Store deployment in localStorage for persistence across page reloads
  const deployments = getStoredDeployments()
  const newDeployment: Deployment = {
    id: deploymentId,
    gitUrl,
    status: "uploading",
    createdAt: new Date().toISOString(),
  }

  deployments.unshift(newDeployment)
  localStorage.setItem("shiply-deployments", JSON.stringify(deployments))

  return { deploymentId }
}

export async function mockGetStatus(deploymentId: string): Promise<{ status: DeploymentStatus; url?: string }> {
  const deployments = getStoredDeployments()
  const deployment = deployments.find((d) => d.id === deploymentId)

  if (!deployment) {
    throw new Error("Deployment not found")
  }

  

  let newStatus: DeploymentStatus = deployment.status
  let deployedUrl = deployment.deployedUrl

  
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/status?id=${deploymentId}`)
    const data = await response.json()
    newStatus = data.status as DeploymentStatus


  if (newStatus === "deployed") {
    
    deployedUrl = `${deploymentId}.goshiply.xyz`

  }

  // Update stored deployment
  if (newStatus !== deployment.status || deployedUrl !== deployment.deployedUrl) {
    deployment.status = newStatus
    if (deployedUrl) deployment.deployedUrl = deployedUrl
    localStorage.setItem("shiply-deployments", JSON.stringify(deployments))
  }

  return {
    status: newStatus,
    url: deployedUrl,
  }
}

// Mock function to get all deployments
export async function mockGetDeployments(): Promise<Deployment[]> {
  await delay(800) // Simulate network delay
  return getStoredDeployments()
}

// Helper function to get deployments from localStorage
function getStoredDeployments(): Deployment[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem("shiply-deployments")
    return stored ? JSON.parse(stored) : getMockDeployments()
  } catch {
    return getMockDeployments()
  }
}

// Initial mock data
function getMockDeployments(): Deployment[] {
  return [
    
  ]
}


