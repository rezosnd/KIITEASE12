import Navbar from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Upload } from "lucide-react"
import NoteCard from "@/components/note-card"

// Mock data for notes
const notes = [
  {
    id: "1",
    title: "Data Structures and Algorithms Complete Notes",
    subject: "Data Structures",
    branch: "CSE",
    year: "2nd Year",
    uploadedBy: "Rahul Sharma",
    uploadDate: "2023-10-15",
    downloads: 342,
    fileSize: "2.4 MB",
    fileType: "PDF",
  },
  {
    id: "2",
    title: "Database Management Systems Handwritten Notes",
    subject: "DBMS",
    branch: "IT",
    year: "3rd Year",
    uploadedBy: "Priya Patel",
    uploadDate: "2023-11-02",
    downloads: 256,
    fileSize: "3.1 MB",
    fileType: "PDF",
  },
  {
    id: "3",
    title: "Operating Systems Concepts and Examples",
    subject: "Operating Systems",
    branch: "CSE",
    year: "2nd Year",
    uploadedBy: "Amit Kumar",
    uploadDate: "2023-09-28",
    downloads: 189,
    fileSize: "1.8 MB",
    fileType: "PDF",
  },
  {
    id: "4",
    title: "Computer Networks Complete Reference",
    subject: "Computer Networks",
    branch: "CSSE",
    year: "3rd Year",
    uploadedBy: "Neha Singh",
    uploadDate: "2023-10-10",
    downloads: 275,
    fileSize: "4.2 MB",
    fileType: "PDF",
  },
  {
    id: "5",
    title: "Artificial Intelligence and Machine Learning",
    subject: "AI & ML",
    branch: "CSCE",
    year: "4th Year",
    uploadedBy: "Vikram Reddy",
    uploadDate: "2023-11-15",
    downloads: 312,
    fileSize: "5.6 MB",
    fileType: "PDF",
  },
  {
    id: "6",
    title: "Web Development Technologies",
    subject: "Web Development",
    branch: "IT",
    year: "3rd Year",
    uploadedBy: "Sanjay Mishra",
    uploadDate: "2023-10-05",
    downloads: 198,
    fileSize: "2.9 MB",
    fileType: "PDF",
  },
]

// Filter options
const branches = ["CSE", "IT", "CSSE", "CSCE"]
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"]
const subjects = ["Data Structures", "DBMS", "Operating Systems", "Computer Networks", "AI & ML", "Web Development"]

export default function NotesPage() {
  return (
    <div className="sci-fi-container">
      <Navbar />

      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Study Notes</h1>
            <p className="text-muted-foreground">Browse and download premium study notes</p>
          </div>

          <div className="flex items-center gap-2">
            <Button className="sci-fi-button sci-fi-glow">
              <Upload className="h-4 w-4 mr-2" />
              Upload Notes
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-64 space-y-4">
            <Card className="sci-fi-card">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Search</h3>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input type="search" placeholder="Search notes..." className="pl-8 sci-fi-input" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Branch</h3>
                    <div className="flex flex-wrap gap-2">
                      {branches.map((branch) => (
                        <Badge key={branch} variant="outline" className="cursor-pointer">
                          {branch}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Year</h3>
                    <div className="flex flex-wrap gap-2">
                      {years.map((year) => (
                        <Badge key={year} variant="outline" className="cursor-pointer">
                          {year}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Subject</h3>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((subject) => (
                        <Badge key={subject} variant="outline" className="cursor-pointer">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="sci-fi-card">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Premium Access</h3>
                  <p className="text-xs text-muted-foreground">
                    Upgrade to premium to download and upload study notes.
                  </p>
                  <Button className="w-full sci-fi-button sci-fi-glow">Upgrade Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="outline" className="sci-fi-button">
                Load More Notes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
