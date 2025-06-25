"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, User, Lock } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

interface Note {
  id: string
  title: string
  subject: string
  branch: string
  year: string
  uploadedBy: string
  uploadDate: string
  downloads: number
  fileSize: string
  fileType: string
}

interface NoteCardProps {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const isPremium = user?.role === "premium" || user?.role === "admin"

  const handleDownload = () => {
    if (!isPremium) {
      toast({
        title: "Premium Required",
        description: "Upgrade to premium to download notes",
        variant: "destructive",
      })
      return
    }

    // Simulate download
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
      toast({
        title: "Download Started",
        description: `Downloading ${note.title}`,
      })
    }, 1000)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3 }}
    >
      <Card
        className={`sci-fi-card transition-all duration-300 ${isHovered ? "border-primary/30" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <motion.div
                className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FileText className="h-6 w-6 text-primary" />
              </motion.div>

              <div>
                <h3 className="font-medium">{note.title}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="secondary">{note.subject}</Badge>
                  <Badge variant="outline">{note.branch}</Badge>
                  <Badge variant="outline">{note.year}</Badge>
                </div>

                <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {note.uploadedBy}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(note.uploadDate)}
                  </div>
                  <div>
                    {note.downloads} downloads • {note.fileSize} • {note.fileType}
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant={isPremium ? "default" : "outline"}
              className="sci-fi-button"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isPremium ? (
                <>
                  <motion.div
                    animate={isDownloading ? { rotate: 360 } : {}}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                    className="mr-2"
                  >
                    <Download className="h-4 w-4" />
                  </motion.div>
                  {isDownloading ? "Downloading..." : "Download"}
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Premium
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
