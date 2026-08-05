import { useState } from "react";
import { usePageTitle } from "@/hooks/use-page-title";
import { motion } from "framer-motion";
import { Search, MapPin, Briefcase, Clock, Upload, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const jobs = [
  { id: 1, title: "Senior Academic Counselor", company: "Leading EdTech Unicorn", location: "Gurugram, India", type: "Full-time", category: "EdTech" },
  { id: 2, title: "Principal Architect", company: "Luxury Design Studio", location: "Delhi NCR", type: "Full-time", category: "Architecture" },
  { id: 3, title: "Inside Sales Manager", company: "Fast-growing E-Learning Startup", location: "Remote", type: "Full-time", category: "EdTech" },
  { id: 4, title: "3D Visualizer (3ds Max/V-Ray)", company: "Global Interior Firm", location: "Mumbai, India", type: "Contract", category: "Design" },
  { id: 5, title: "Head of Operations", company: "EdTech Enterprise", location: "Bangalore, India", type: "Full-time", category: "EdTech" },
  { id: 6, title: "Senior Interior Designer", company: "Boutique Studio", location: "Gurugram, India", type: "Full-time", category: "Design" },
];

export default function Careers() {
  usePageTitle("Careers");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || job.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      {/* Header */}
      <section className="bg-primary py-16 text-primary-foreground text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Next Big Move</h1>
        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
          Explore exclusive opportunities with top-tier companies in EdTech and Design.
        </p>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Actions / Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="flex-1 w-full flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search job titles or companies..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-48">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="EdTech">EdTech</SelectItem>
                  <SelectItem value="Architecture">Architecture</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                <Upload className="w-4 h-4" /> Drop Resume Directly
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Submit Your Resume</DialogTitle>
                <DialogDescription>
                  Don't see a perfect fit? Drop your resume to our general talent pool.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 pt-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Primary Industry</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="edtech">EdTech</SelectItem>
                      <SelectItem value="design">Interior Design & Architecture</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume (PDF)</Label>
                  <Input id="resume" type="file" accept=".pdf" required />
                </div>
                <Button type="submit" className="w-full">Submit Profile</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, idx) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-card border border-border p-6 rounded-xl shadow-sm hover:border-primary/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" /> {job.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {job.type}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {job.category}
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Apply Now</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Apply for {job.title}</DialogTitle>
                        <DialogDescription>Fill out the form below to apply for this position.</DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4 pt-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                          <Label htmlFor={`name-${job.id}`}>Full Name</Label>
                          <Input id={`name-${job.id}`} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`email-${job.id}`}>Email</Label>
                          <Input id={`email-${job.id}`} type="email" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`resume-${job.id}`}>Resume</Label>
                          <Input id={`resume-${job.id}`} type="file" accept=".pdf,.doc,.docx" required />
                        </div>
                        <Button type="submit" className="w-full">Submit Application <Send className="w-4 h-4 ml-2" /></Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              No jobs found matching your criteria. Try adjusting your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
